from typing import Annotated
from fastapi import Depends
from repository.GeneratorModelRepository import GeneratorModelRepository
from model.GeneratorModel import GeneratorModel

class GeneratorService:
    def __init__(self, generatorRepo: Annotated[GeneratorModelRepository, Depends()]):
        self.__generatorRepository = generatorRepo

    def getAll(self):
        return self.__generatorRepository.getAll()

    def getById(self, id: int):
        return self.__generatorRepository.getById(id)

    def create(self, generator_data: dict):
        generator = GeneratorModel(**generator_data)
        return self.__generatorRepository.createOne(generator)

    def update(self, id: int, generator_data: dict):
        generator = self.__generatorRepository.getById(id)
        if generator:
            for key, value in generator_data.items():
                if hasattr(generator, key):
                    setattr(generator, key, value)
            return self.__generatorRepository.updateOne(generator)
        return None

    def deleteById(self, id: int):
        return self.__generatorRepository.deleteOne(id) 