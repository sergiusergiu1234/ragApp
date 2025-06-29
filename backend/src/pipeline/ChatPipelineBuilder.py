from typing import Any
from haystack import Pipeline
from config import Config
from pipeline.DocstoreFactory import DocstoreFactory
from pipeline.EmbedderFactory import EmbedderFactory
from pipeline.GeneratorFactory import GeneratorFactory
from haystack.components.builders import ChatPromptBuilder, PromptBuilder
from haystack.dataclasses import ChatMessage
from pipeline.MemoryRetriever import MemoryRetriever
from pipeline.MemoryWriter import MemoryWriter
from repository.PGMessageRepository import PGMessageRepository
from sqlalchemy.orm import Session

class ChatPipelineBuilder:
    def __init__(self, config: Config, llmProvider: str, modelName: str, pgMessageRepository: PGMessageRepository, embeddingName: str="gpt-4o-mini"):
        self.__config = config
        self.__embedderFactory = EmbedderFactory(config)
        self.__generatorFactory = GeneratorFactory(config, llmProvider, modelName)
        self.__docstoreFactory = DocstoreFactory(config)
        self.__pgMessageRepository = pgMessageRepository

    def _addComponentToPipeline(self, pipeline: Pipeline, name: str, component_instance: Any):
        pipeline.add_component(name, component_instance)
        print(f"Added component '{name}' to builder.")

    def addTextEmbedder(self, pipeline: Pipeline):
        embedder = self.__embedderFactory.getTextEmbedder()
        name = "embedder"
        self._addComponentToPipeline(pipeline, name, embedder)

    def addRetriever(self, pipeline: Pipeline):
        retriever = self.__docstoreFactory.getRetriever()
        name = 'retriever'
        self._addComponentToPipeline(pipeline, name, retriever)

    def addPromptBuilder(self, pipeline: Pipeline):
        builder = ChatPromptBuilder(variables=["documents","memory","question"],required_variables=["documents","memory","question"])
        name ='chatPromptBuilder'
        self._addComponentToPipeline(pipeline, name, builder)

    def addChatGenerator(self, pipeline: Pipeline):
        generator = self.__generatorFactory.getChatGenerator()
        name = "generator"
        self._addComponentToPipeline(pipeline, name, generator)

    def addMemoryRetrierver(self, pipeline: Pipeline):
        memoryRetriever = MemoryRetriever(self.__pgMessageRepository)
        name = "memoryRetriever"
        self._addComponentToPipeline(pipeline, name, memoryRetriever)

    def addSummarizerPromptBuilder(self, pipeline: Pipeline):
        summarizerTemplate = """You are a helpful assistant who summarizes a conversation history between a chatbot and a human.

        Your task is to summarize the conversation in a concise paragraph, including:
        - All meaningful questions and statements made by the user.
        - Any factual details provided by the user (even if unanswered).
        - A summary of how the assistant responded (even if it could not help).

        Make sure you include dates, names, events, and other specific facts the user mentioned.

        Chat history:
                {% for message in messages %}
                {{message.role.value}}: {{message.text}}
                {% endfor %}

        Provide a clear and informative summary of this conversation.
        """
        summarizerMessage = ChatMessage.from_system(summarizerTemplate)
        builder = ChatPromptBuilder(template=[summarizerMessage], variables=["messages"], required_variables=["messages"])
        name = 'summarizerPromptBuilder'
        self._addComponentToPipeline(pipeline, name, builder)

    def addSimpleCompletionPromptBuilder(self, pipeline: Pipeline):
        builder = ChatPromptBuilder(variables=['memory'])
        name='titleChangePromptBuilder'
        self._addComponentToPipeline(pipeline, name, builder)

    def addChatSummarizer(self, pipeline: Pipeline):
        chatSummarizer = self.__generatorFactory.getChatGenerator()
        name = 'chatSummarizer'
        self._addComponentToPipeline(pipeline, name, chatSummarizer)

    def addMemoryWriter(self, pipeline: Pipeline):
        memoryWriter = MemoryWriter(self.__pgMessageRepository)
        name = 'memoryWriter'
        self._addComponentToPipeline(pipeline, name, memoryWriter)

