from dotenv import load_dotenv
from pydantic import BaseModel
import os

class Auth0Config(BaseModel):
    domain: str
    audience: str
    issuer: str
    algorithms: str

    def __init__(self):
        super().__init__(
            domain = os.getenv("AUTH0_DOMAIN"),
            audience = os.getenv("AUTH0_AUDIENCE"),
            issuer = os.getenv("AUTH0_ISSUER"),
            algorithms=os.getenv("AUTH0_ALGORITHMS")
        )



def getAuthConfig():
    return Auth0Config()