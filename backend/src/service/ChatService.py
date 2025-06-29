from typing import List
from haystack.dataclasses import ChatMessage
from haystack import Pipeline
from service.ConversationService import ConversationService
from model.PGMessage import MessageRole, PGMessage
from repository.PGMessageRepository import PGMessageRepository
from config import Config


class ChatService:
    def __init__(self, config: Config, pipeline: Pipeline, messageRepository: PGMessageRepository, ):
        self.__config = config
        self.__pipeline = pipeline
        self.__messageRepository =  messageRepository   

    def chat(self,userId: int, conversationId: int, message: str, sourceIds: List[int]):
        systemMessageTemplate= """You are a  helpful assistant, helping humans answer questions while follwing the instructions."""
        userMessageTemplate = """Based on the documents i provide to you and the chat history, please respond to the user. If the documents don't reveal relevant information, say so and say what you already know. If the user did not ask you a question, then respond normally. Only use the supporting documents if needed and make sense in the conversation.
            My question is: {{question}}
            Supporting documents: 
            {% for doc in documents %}
                {{doc.content}}
            {% endfor %}
            Chat history:
            {{memory}}
        """
        systemMessage= ChatMessage.from_system(systemMessageTemplate)
        userMessage = ChatMessage.from_user(userMessageTemplate)

        self.__messageRepository.createOne(PGMessage(text = message, role = MessageRole.USER,conversationId = conversationId))

        pipelineInputs = {
            "embedder" : {"text" : message},
            "memoryRetriever": {
                "conversationId": conversationId
            },
            "chatPromptBuilder": {
                "question": message,
                "template" : [systemMessage, userMessage]
            },
            "memoryWriter":{
                "conversationId": conversationId
            }
        }

        # Set filters for the retriever component
        self.__pipeline.get_component("retriever").filters = {
            "operator": "OR",
            "conditions": [
                {"field": "sourceId", "operator": "in", "value": sourceIds}
            ]
        }

        response = self.__pipeline.run(pipelineInputs)

     
        return response
    
   