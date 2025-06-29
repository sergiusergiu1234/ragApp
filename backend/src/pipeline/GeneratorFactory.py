from haystack.components.generators.chat import OpenAIChatGenerator
from config import Config
from haystack.components.generators import OpenAIGenerator
from haystack.utils import Secret

class GeneratorFactory:
    def __init__(self, config: Config, llmProvider: str, modelName: str):
        self.__config = config
        self.__llmProvider = llmProvider
        self.__modelName = modelName

    def getChatGenerator(self):
        if self.__llmProvider == "openai":
            return OpenAIChatGenerator(
                api_key= Secret.from_token(self.__config.openaiKey),
                model= self.__modelName)
        else:
            raise ValueError(f"Unsupported LLM: {self.__modelName}")

    def getGenerator(self):
        if self.__llmProvider == 'openai':
            return OpenAIGenerator(
                api_key= Secret.from_token(self.__config.openaiKey),
                model = self.__modelName,
            )
        else:
            raise ValueError(f"Unsupported LLM: {self.__modelName}")
