
from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String
from repository.PostgresSessionFactory import Base


class Conversation(Base):
    __tablename__='conversation'
    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)

    pgmessages: Mapped[List["PGMessage"]] = relationship(back_populates='conversation', cascade="all,delete, delete-orphan")
    
    userId: Mapped[int] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE")
    )
    
    user: Mapped["User"] = relationship(
        back_populates='conversations',
        passive_deletes=True
    )