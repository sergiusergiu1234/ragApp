from model.Conversation import Conversation
from repository.PostgresSessionFactory import SessionDep
from sqlalchemy import select, delete

class ConversationRepository:
    def __init__(self, session: SessionDep):
        self.__session = session

    def createOne(self, conversation: Conversation):
        try:
           self.__session.add(conversation)
           self.__session.commit()
           self.__session.refresh(conversation)
           return conversation
        except Exception as e:
           self.__session.rollback()
           raise e

    def getAll(self):
        conversations = self.__session.execute(select(Conversation)).scalars().all()
        return conversations
    
    def getById(self, conversationId: int):
        conversation = self.__session.execute(select(Conversation).where(Conversation.id == conversationId)).scalars().one_or_none()
        return conversation
    
    def getByUserId(self, userId: int):
        conversations = self.__session.execute(select(Conversation).where(Conversation.userId == userId)).scalars().all()
        return conversations

    def deleteById(self, id: int) -> bool:
        conversation = self.getById(id)
        if conversation is not None:
            self.__session.execute(delete(Conversation).where(Conversation.id == id))
            self.__session.commit()
            return True
        return False
    

    def update(self, id: int, conversation: Conversation):
        existingConversation = self.getById(id)
        if existingConversation:
            for key, value in conversation.__dict__.items():
                if key != '_sa_instance_state' and hasattr(existingConversation, key):
                    setattr(existingConversation, key, value)
            self.__session.commit()
            self.__session.refresh(existingConversation)
        return existingConversation
