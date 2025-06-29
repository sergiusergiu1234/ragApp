
from haystack import Pipeline
from haystack.dataclasses import ChatMessage

class PipelineService:
    def __init__(self, pipeline: Pipeline):
        self.__pipeline = pipeline

    def updateConversationTitle(self, conversationId: int):
        systemMessageTemplate= """You are a  helpful assistant, helping humans answer questions while follwing the instructions."""
        userMessageTemplate = """Based on the chat history, please provide a representative conversation title to be displayed in the chatbot app.
        Make sure to not include anything in the response, ONLY the conversation title.
            Chat history:
            {{memory}}
        """
        systemMessage= ChatMessage.from_system(systemMessageTemplate)
        userMessage = ChatMessage.from_user(userMessageTemplate)

        pipelineInputs = {
            "memoryRetriever": {
                "conversationId": conversationId
            },
            "titleChangePromptBuilder" :{
                "template": [systemMessage, userMessage]
            }
        }
        response = self.__pipeline.run(pipelineInputs)
        
        return response

