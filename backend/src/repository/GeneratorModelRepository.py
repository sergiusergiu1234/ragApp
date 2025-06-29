from model.GeneratorModel import GeneratorModel
from repository.PostgresSessionFactory import SessionDep
from sqlalchemy import select

class GeneratorModelRepository:
    def __init__(self, session: SessionDep):
        self.__session = session

    def getAll(self) -> list[GeneratorModel]:
        llms = self.__session.execute(select(GeneratorModel)).scalars().all()
        return llms

    def getById(self, id: int) -> GeneratorModel:
        llm = self.__session.execute(select(GeneratorModel).filter_by(id=id)).scalar_one_or_none()
        return llm

    def createOne(self, generatorModel: GeneratorModel) -> GeneratorModel:
        self.__session.add(generatorModel)
        self.__session.commit()
        self.__session.refresh(generatorModel)
        return generatorModel

    def updateOne(self, generatorModel: GeneratorModel) -> GeneratorModel:
        self.__session.merge(generatorModel)
        self.__session.commit()
        self.__session.refresh(generatorModel)
        return generatorModel

    def deleteOne(self, id: int) -> bool:
        obj = self.getById(id)
        if obj is not None:
            self.__session.execute(delete(GeneratorModel).filter_by(id=id))
            self.__session.commit()
            return True
        return False