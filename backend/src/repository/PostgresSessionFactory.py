from contextlib import contextmanager
from typing import Annotated
from dotenv import load_dotenv
from fastapi import Depends
from sqlalchemy import create_engine
from config import getConfig
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase


load_dotenv()
config = getConfig()

class Base(DeclarativeBase):
    pass

class PostgresSessionFactory:
    def __init__(self, database_url: str):
        self.engine = create_engine(url=database_url)

    def create_all(self):
        Base.metadata.create_all(bind=self.engine)

    def get_session(self):
        sessionMaker = sessionmaker(bind = self.engine)
        session = sessionMaker()
        session.expire_on_commit = False 
        try:
            yield session
        finally:
            session.close()
            self.engine.dispose()

    def dispose(self):
        self.engine.dispose()

def getSession():
    session_factory = PostgresSessionFactory(database_url=config.postgresURL)
    yield from session_factory.get_session()
    
SessionDep = Annotated[Session, Depends(dependency=getSession)]

@contextmanager
def create_postgres_session():
    session_factory = PostgresSessionFactory(database_url=config.postgresURL)
    try:
        yield from session_factory.get_session()
    finally:
        session_factory.dispose()