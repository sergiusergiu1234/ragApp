from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from repository.PostgresSessionFactory import Base
from model.Conversation import Conversation



class MessageRole(enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"

class PGMessage(Base):
    __tablename__='pgmessage'
    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False)
    role = Column(Enum(MessageRole, name='message_role'), nullable=False)
    
    conversationId: Mapped[int] = mapped_column(
        ForeignKey("conversation.id", ondelete="CASCADE")
    )
    conversation: Mapped["Conversation"] = relationship(
        back_populates='pgmessages',
        passive_deletes=True
    )