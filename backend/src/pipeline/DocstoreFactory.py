from config import Config

from milvus_haystack import MilvusDocumentStore, MilvusEmbeddingRetriever
class DocstoreFactory:
    def __init__(self, config: Config):
        self.__config = config

    def getDocstore(self):
        return MilvusDocumentStore(
            connection_args={
                "uri": self.__config.milvusUri,
                "token": self.__config.milvusToken
            },
            collection_name='ragdemo',
            index_params = {"metric_type": "COSINE", 
                "index_type": "AUTOINDEX",
                "params": {}}
                    )
        

    def getRetriever(self, filters: dict[str,any]=None):
        docstore = self.getDocstore()
        retriever = MilvusEmbeddingRetriever(
            document_store=docstore,
            top_k=5,
            filters=filters,
        )
        return retriever

