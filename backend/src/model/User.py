

from datetime import datetime
from typing import List
from sqlalchemy import Column, DateTime, Integer, String, Boolean
from sqlalchemy.orm import Mapped,  relationship
from repository.PostgresSessionFactory import Base


class User(Base):
    __tablename__='user'
    id = Column(Integer, primary_key=True)
    oauthId = Column(String, nullable=True)
    dateCreated = Column(DateTime, nullable=False)
    acceptedTerms = Column(Boolean, default=False)
    materials: Mapped[List["Material"]] = relationship(back_populates='user', cascade="all,delete, delete-orphan")
    conversations: Mapped[List["Conversation"]] = relationship(back_populates='user', cascade="all,delete, delete-orphan")
    