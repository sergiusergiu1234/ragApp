
from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String
from repository.PostgresSessionFactory import Base


class Material(Base):
    __tablename__='material'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    dateCreated = Column(DateTime, nullable=False)

    userId: Mapped[int] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE")
    )
    user: Mapped["User"] = relationship(
        back_populates='materials',
        passive_deletes=True
    )