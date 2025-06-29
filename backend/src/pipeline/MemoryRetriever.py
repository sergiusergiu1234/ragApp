from haystack.dataclasses import ChatMessage
from typing import List, Dict
from haystack import component
from model.PGMessage import MessageRole, PGMessage
from repository.PGMessageRepository import PGMessageRepository

@component
class MemoryRetriever:
    def __init__(self, pgMessageRepository: PGMessageRepository):
        self.__messageRepository = pgMessageRepository

    @component.output_types(documents=List[ChatMessage])
    def run(self, conversationId: int) -> Dict[str, List[ChatMessage]]:
        pgmessages = self.__messageRepository.getByConversationId(conversationId=conversationId)
        chatMessages: List[ChatMessage] = []
        oldMessages: List[ChatMessage] = []
        for i,pgm in enumerate(pgmessages):
            if pgm.role == MessageRole.USER:
                message = ChatMessage.from_user(pgm.text)
            if pgm.role == MessageRole.ASSISTANT:
                message = ChatMessage.from_assistant(pgm.text)
            if i <= pgmessages.__len__()-10 and pgmessages.__len__() > 10:
                oldMessages.append(message)
            else:
                chatMessages.append(message)
        for p in chatMessages:
            print(f"messages yupw {type(p)}")
        return {"documents": chatMessages}
