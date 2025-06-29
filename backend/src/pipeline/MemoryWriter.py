from haystack.dataclasses import ChatMessage
from typing import List
from haystack import component
from model.PGMessage import MessageRole, PGMessage
from repository.PGMessageRepository import PGMessageRepository

@component
class MemoryWriter:
    def __init__(self, pgMessageRepository: PGMessageRepository):
        self.__messageRepository = pgMessageRepository

    @component.output_types(documents=List[PGMessage])
    def run(self, conversationId: int, llmAnswer: List[ChatMessage] = None):
        try:
            writtenMessages = []
            if llmAnswer:
                answer_text = llmAnswer[0]._content[0].text
                assistantMessage = self.__messageRepository.createOne(
                    pgMessage=PGMessage(
                        conversationId=conversationId,
                        text=answer_text,
                        role=MessageRole.ASSISTANT
                    )
                )
                writtenMessages.append(assistantMessage)
           
            return {"writtenMessages": writtenMessages}
        except Exception as e:
            print(f"Error processing message: {e}")
            print(f"LLM Answer: {llmAnswer}")
            raise
        

    