from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from repository.PostgresSessionFactory import Base

class GeneratorModel(Base):
    __tablename__='generatorModel'
    id = Column(Integer, primary_key = True)
    provider = Column(String, nullable=False)
    name= Column(String(), nullable=True)
    isActive = Column(Boolean(), default=True)
