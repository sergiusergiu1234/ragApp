from sqlalchemy import select
from model.PGMessage import PGMessage
from repository.PostgresSessionFactory import SessionDep


class PGMessageRepository:
    def __init__(self, session: SessionDep):
        self.__session = session

    def getByConversationId(self, conversationId: int):
        messages = self.__session.execute(select(PGMessage).where(PGMessage.conversationId == conversationId)).scalars().all()
        return messages

    def createOne(self, pgMessage: PGMessage):
        try:
           self.__session.add(pgMessage)
           self.__session.commit()
           self.__session.refresh(pgMessage)
           return pgMessage
       
        except Exception as e:
           self.__session.rollback()
           raise e

