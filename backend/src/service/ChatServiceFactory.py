from typing import Annotated
from fastapi import Depends
from config import Config, getConfig
from pipeline.ChatPipelineBuilder import ChatPipelineBuilder
from pipeline.ChatPipelineDirector import ChatPipelineDirector
from repository.GeneratorModelRepository import GeneratorModelRepository
from repository.PostgresSessionFactory import SessionDep
from repository.PGMessageRepository import PGMessageRepository
from service.ChatService import ChatService


class ChatServiceFactory:
    def __init__(
        self, 
        config: Annotated[Config, Depends(getConfig)],
        pg_message_repository: Annotated[PGMessageRepository, Depends()],
        generatorModelRepo: Annotated[GeneratorModelRepository, Depends()]       
    ):
        self.__config = config
        self.__pg_message_repository = pg_message_repository
        self.__generatorModelRepository = generatorModelRepo

    def getService(self,  llmId: int):
        generator = self.__generatorModelRepository.getById(llmId)
        builder = ChatPipelineBuilder(
            config=self.__config,
            llmProvider=generator.provider,
            modelName=generator.name,
            pgMessageRepository=self.__pg_message_repository
        )
        director = ChatPipelineDirector(builder)
        pipeline = director.constructPipeline()
        return ChatService(self.__config, pipeline, self.__pg_message_repository)
