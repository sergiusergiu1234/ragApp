from typing import Optional # 👈 new imports

import jwt # 👈 new imports
from fastapi import Depends, HTTPException, status # 👈 new imports
from fastapi.security import SecurityScopes, HTTPAuthorizationCredentials, HTTPBearer

from auth0Config import getAuthConfig
from model.exceptions.UnauthorizedException import UnauthorizedException
from model.exceptions import UnauthenticatedException # 👈 new imports


class VerifyToken:
    """Does all the token verification using PyJWT"""
    def __init__(self):
            self.config = getAuthConfig()

            # This gets the JWKS from a given URL and does processing so you can
            # use any of the keys available
            jwks_url = f'https://{self.config.domain}/.well-known/jwks.json'
            self.jwks_client = jwt.PyJWKClient(jwks_url)

    async def verify(self,
                     token: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer())
                     ):
        if token is None:
            raise UnauthenticatedException

        # This gets the 'kid' from the passed token
        try:
            signing_key = self.jwks_client.get_signing_key_from_jwt(
                token.credentials
            ).key
        except jwt.exceptions.PyJWKClientError as error:
            
            raise UnauthorizedException(str(error))
        except jwt.exceptions.DecodeError as error:
            raise UnauthorizedException(str(error))

        try:
            payload = jwt.decode(
                token.credentials,
                signing_key,
                algorithms=self.config.algorithms,
                audience=self.config.audience,
                issuer=self.config.issuer,
            )
        except Exception as error:
            raise UnauthorizedException(str(error))
    
        return payload
