from typing import Annotated
from fastapi import Depends
from service.PipelineService import PipelineService
from service.ConversationService import ConversationService
from pipeline.SimpleCompletionPipelineDirector import SimpleCompletionPipelineDirector
from config import Config, getConfig
from pipeline.ChatPipelineBuilder import ChatPipelineBuilder
from repository.GeneratorModelRepository import GeneratorModelRepository
from repository.PGMessageRepository import PGMessageRepository
from model.Conversation import Conversation
from repository.ConversationRepository import ConversationRepository


class PipelineServiceFactory:
    def __init__(self,
                 config: Annotated[Config, Depends(getConfig)],
                 conversationRepository: Annotated[ConversationRepository, Depends()],
                 pg_message_repository: Annotated[PGMessageRepository, Depends()],
                 generatorModelRepo: Annotated[GeneratorModelRepository, Depends()]):
        self.__conversationRepository = conversationRepository
        self.__pgMessageRepostory = pg_message_repository
        self.__generatorModelRepository = generatorModelRepo
        self.__config = config

    def getService(self, llmId: int):
        generator = self.__generatorModelRepository.getById(llmId)
        builder = ChatPipelineBuilder(
            config=self.__config,
            llmProvider=generator.provider,
            modelName=generator.name,
            pgMessageRepository=self.__pgMessageRepostory
        )
        director = SimpleCompletionPipelineDirector(builder)
        pipeline = director.constructPipeline()
        return PipelineService(pipeline)