from haystack import Pipeline
from pipeline.ChatPipelineBuilder import ChatPipelineBuilder

class SimpleCompletionPipelineDirector:
    def __init__(self, builder: ChatPipelineBuilder):
        self.__builder = builder

    def constructPipeline(self):
        pipeline = Pipeline()
        
        self.__builder.addMemoryRetrierver(pipeline)
        self.__builder.addSimpleCompletionPromptBuilder(pipeline)
        self.__builder.addChatSummarizer(pipeline)

        pipeline.connect("memoryRetriever", "titleChangePromptBuilder.memory")
        pipeline.connect("titleChangePromptBuilder","chatSummarizer.messages")

        return pipeline