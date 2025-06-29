from typing import Annotated

from fastapi import Depends

from model.Conversation import Conversation
from repository.ConversationRepository import ConversationRepository


class ConversationService:
    def __init__(self, conversationRepository: Annotated[ConversationRepository, Depends()]):
        self.__conversationRepository = conversationRepository

    def createOne(self, title: str, userId: int):
        conversation = self.__conversationRepository.createOne(Conversation(title=title,userId=userId))
        return conversation
        
    def getAll(self):
        conversations = self.__conversationRepository.getAll()
        return conversations
    
    def getByUserId(self,userId: int):
        conversations = self.__conversationRepository.getByUserId(userId)
        return conversations
        
    def getById(self, conversationId:int):
        conversation = self.__conversationRepository.getById(conversationId)
        if conversation:
            messages = conversation.pgmessages
            return conversation
        else:
            raise Exception(f"Conversation with ID {conversationId} not found")
    
    def deleteById(self, conversationId: int) -> bool:
        return self.__conversationRepository.deleteById(conversationId)
    

    def updateName(self, conversationId: int, newName: str):
        conversation = Conversation(id=conversationId, title=newName)
        return self.__conversationRepository.update(conversationId, conversation)