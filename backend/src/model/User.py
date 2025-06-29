

from datetime import datetime
from typing import List
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import Mapped,  relationship
from repository.PostgresSessionFactory import Base


class User(Base):
    __tablename__='user'
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    oauthId = Column(String, nullable=True)
    dateCreated = Column(DateTime, nullable=False)

    materials: Mapped[List["Material"]] = relationship(back_populates='user', cascade="all,delete, delete-orphan")
    conversations: Mapped[List["Conversation"]] = relationship(back_populates='user', cascade="all,delete, delete-orphan")
    