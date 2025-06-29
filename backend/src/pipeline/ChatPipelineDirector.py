

from haystack import Pipeline
from pipeline.ChatPipelineBuilder import ChatPipelineBuilder


class ChatPipelineDirector:
    def __init__(self, builder: ChatPipelineBuilder):
        self.__builder = builder

    def constructPipeline(self):
        pipeline = Pipeline()
        self.__builder.addTextEmbedder(pipeline)
        self.__builder.addRetriever(pipeline)
        self.__builder.addMemoryRetrierver(pipeline)
        self.__builder.addSummarizerPromptBuilder(pipeline)
        self.__builder.addChatSummarizer(pipeline)
        self.__builder.addPromptBuilder(pipeline)
        self.__builder.addChatGenerator(pipeline)
        self.__builder.addMemoryWriter(pipeline)
        

        pipeline.connect("embedder","retriever")
        pipeline.connect("retriever.documents","chatPromptBuilder.documents")
        pipeline.connect("memoryRetriever","summarizerPromptBuilder.messages")
        pipeline.connect("summarizerPromptBuilder", "chatSummarizer.messages")
        pipeline.connect("chatSummarizer.replies","chatPromptBuilder.memory")
        pipeline.connect("chatPromptBuilder","generator.messages")
        pipeline.connect("generator.replies","memoryWriter.llmAnswer")

        
        return pipeline

        

        
        

        
