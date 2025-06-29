import os
from dotenv import load_dotenv
from pydantic import BaseModel


load_dotenv()


class Config(BaseModel):
    openaiKey: str | None = os.getenv(key='OPENAI_KEY')
    milvusUri : str | None = os.getenv(key='MILVUS_URI')
    milvusToken: str | None = os.getenv(key='MILVUS_TOKEN')
    tikaUri: str | None = os.getenv('TIKA_URI')

    @property
    def postgresURL(self) -> str:
        username = os.getenv(key='POSTGRES_USERNAME')
        password = os.getenv(key='POSTGRES_PASSWORD')
        host = os.getenv(key='POSTGRES_HOST')
        port = os.getenv(key='POSTGRES_PORT')
        db = os.getenv(key='POSTGRES_DB')
        
        if not all([username, password, host, port, db]):
            raise ValueError(
                "Missing required PostgreSQL environment variables. "
                "Please ensure POSTGRES_USRNAME, POSTGRES_PASSWORD, "
                "POSTGRES_HOST, POSTGRES_PORT, and POSTGRES_DB are set"
            )

        return f"postgresql://{username}:{password}@{host}:{port}/{db}"



def getConfig():
    return Config()

    