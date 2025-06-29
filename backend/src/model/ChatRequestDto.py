

from typing import List
from pydantic import BaseModel


class ChatRequestDto(BaseModel):
    message: str
    llmId: int
    sourceIds: List[int]
    conversationId: int