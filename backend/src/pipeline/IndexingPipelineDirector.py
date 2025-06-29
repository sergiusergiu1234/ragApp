


from haystack import Pipeline
from config import Config
from pipeline.IndexingPipelineBuilder import IndexingPipelineBuilder


class IndexingPipelineDirector:
    def __init__(self, builder: IndexingPipelineBuilder):
        self.__pipeline = Pipeline()
        self.__builder = builder

    def constructPipeline(self):
        self.__builder.addConverter(self.__pipeline)
        self.__builder.addMetadataNormalizer(self.__pipeline)
        self.__builder.addCleaner(self.__pipeline)
        self.__builder.addSplitter(self.__pipeline)
        self.__builder.addEmbedder(self.__pipeline)
        self.__builder.addDocumentWriter(self.__pipeline)


        self.__pipeline.connect("converter","normalizer")
        self.__pipeline.connect("normalizer","cleaner")
        self.__pipeline.connect("cleaner","splitter")
        self.__pipeline.connect("splitter","embedder")
        self.__pipeline.connect("embedder","writer")

        return self.__pipeline