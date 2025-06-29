
from typing import Annotated

from fastapi import Depends
from repository.MaterialRepository import MaterialRepository
from config import Config, getConfig
from pipeline.IndexingPipelineBuilder import IndexingPipelineBuilder
from pipeline.IndexingPipelineDirector import IndexingPipelineDirector
from service.IndexingService import IndexingService


class IndexingServiceFactory:
    def __init__(self, config: Annotated[Config, Depends(getConfig)], 
                 materialRepository: Annotated[MaterialRepository, Depends()]):
        self.__config = config
        self.__materialRepository = materialRepository

    def getService(self):
        builder = IndexingPipelineBuilder(self.__config)
        pipeline = IndexingPipelineDirector(builder).constructPipeline()
        service = IndexingService(pipeline=pipeline, materialRepository = self.__materialRepository)
        return service