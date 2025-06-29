from milvus_haystack import MilvusDocumentStore
from typing import Any
from haystack import Pipeline
from pipeline.DocstoreFactory import DocstoreFactory
from pipeline.MetadataNormalizer import MetadataNormalizer
from config import Config
from pipeline.EmbedderFactory import EmbedderFactory
from haystack.components.writers import DocumentWriter
from haystack.components.converters import TikaDocumentConverter
from haystack.components.preprocessors import DocumentCleaner
from haystack.components.preprocessors.document_splitter import DocumentSplitter

class IndexingPipelineBuilder:
    def __init__(self, config: Config):
        self.__config = config
        self.__embedderFactory = EmbedderFactory(config)
        self.__docstoreFactory = DocstoreFactory(config)
    def _addComponentToPipeline(self, pipeline: Pipeline, name: str, component_instance: Any):
        pipeline.add_component(name, component_instance)
        print(f"Added component '{name}' to builder.")

    def addDocumentWriter(self, pipeline: Pipeline):
        print(self.__config.milvusUri)
        print(self.__config.milvusToken)
        documentStore = self.__docstoreFactory.getDocstore()
        writer = DocumentWriter(document_store=documentStore)
        name = 'writer'
        self._addComponentToPipeline(pipeline, name, writer)

    def addConverter(self, pipeline: Pipeline):
        converter = TikaDocumentConverter(self.__config.tikaUri)
        name = 'converter'
        self._addComponentToPipeline(pipeline, name, converter)

    def addCleaner(self, pipeline: Pipeline):
        cleaner = DocumentCleaner(remove_substrings=["�"], remove_repeated_substrings=True)
        name = "cleaner"
        self._addComponentToPipeline(pipeline, name, cleaner)

    def addSplitter(self, pipeline: Pipeline):
        splitter = DocumentSplitter(split_length=4, split_by = 'sentence', split_overlap=1 )
        name = "splitter"
        self._addComponentToPipeline(pipeline, name, splitter)

    def addEmbedder(self, pipeline: Pipeline):
        embedder = self.__embedderFactory.getDocumentEmbedder()
        name = "embedder"
        self._addComponentToPipeline(pipeline,name, embedder)

    def addMetadataNormalizer(self, pipeline:Pipeline):
        normalizer = MetadataNormalizer()
        name = "normalizer"
        self._addComponentToPipeline(pipeline, name, normalizer)