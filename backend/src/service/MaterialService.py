
from typing import Annotated

from fastapi import Depends

from config import Config, getConfig
from pipeline.DocstoreFactory import DocstoreFactory
from repository.MaterialRepository import MaterialRepository


class MaterialService:
    def __init__(self,materialRepo: Annotated[MaterialRepository, Depends()], config: Annotated[Config, Depends(getConfig)]):
        self.__materialRepository = materialRepo
        self.__docstore = DocstoreFactory(config).getDocstore()
    def getAll(self):
        materials = self.__materialRepository.getAll()
        return materials
    
    def getByUserId(self, userId: int):
        materials =self.__materialRepository.getByUserId(userId)
        return materials

    def deleteById(self, id: int):
        deleted = self.__materialRepository.deleteById(id)
        documents = self.__docstore.filter_documents({
             "field":"sourceId", "operator": "==", "value": id
        })
        docIds = [doc.id for doc in documents]
        if docIds:
            removedFromDocstore = self.__docstore.delete_documents(docIds)
        return deleted