
from fastapi import HTTPException, status


class UnauthenticatedExceptions(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail="Requires authentication")