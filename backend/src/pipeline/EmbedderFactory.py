
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.utils import Secret

from config import Config


class EmbedderFactory:
    def __init__(self, config: Config):
        self.__config = config

    def getDocumentEmbedder(self):
        return OpenAIDocumentEmbedder(
            api_key= Secret.from_token(self.__config.openaiKey),
            model= 'text-embedding-3-small',
            dimensions= 1536
        )
    
    def getTextEmbedder(self):
        return OpenAITextEmbedder(
            api_key= Secret.from_token(self.__config.openaiKey),
            model= 'text-embedding-3-small',
            dimensions= 1536
        )