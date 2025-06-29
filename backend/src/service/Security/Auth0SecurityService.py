from datetime import datetime
from typing import Annotated, List, Optional
from auth0Config import Auth0Config, getAuthConfig
import jwt
from fastapi import Depends, Query, HTTPException, status, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, SecurityScopes

from model.User import User
from repository.UserRepository import UserRepository
from model.exceptions import UnauthenticatedException
from model.exceptions.UnauthorizedException import UnauthorizedException

authSchema = HTTPBearer()

async def get_current_user(userRepository: Annotated[UserRepository, Depends()],
                           token: Optional[HTTPAuthorizationCredentials] = Depends(authSchema),
                           security_scopes: SecurityScopes= None):
        
        config = getAuthConfig()
        jwks_url = f'https://{config.domain}/.well-known/jwks.json'
        jwks_client = jwt.PyJWKClient(jwks_url)
        if token is None:
                raise UnauthenticatedException

        try:
            signing_key = jwks_client.get_signing_key_from_jwt(token.credentials).key
        except jwt.exceptions.PyJWKClientError as error:
            raise UnauthorizedException(str(error))
        except jwt.exceptions.DecodeError as error:
            raise UnauthorizedException(str(error))

        try:
            payload = jwt.decode(
                token.credentials,
                signing_key,
                algorithms=config.algorithms,
                audience=config.audience,
                issuer= config.issuer,
            )
        except Exception as error:
            raise UnauthorizedException(str(error))
        existingUser = userRepository.getByAuthSub(payload['sub'])
        if existingUser is None:
            existingUser =  userRepository.create(User(username=payload['email'],oauthId=payload['sub'], dateCreated=datetime.now()))
        # Optional: Check for required scopes/permissions
        if security_scopes.scopes:
            permissions: List[str] = payload.get('permissions', [])
            for scope in security_scopes.scopes:
                if scope not in permissions:
                    raise UnauthorizedException(f"Missing required scope: {scope}")
        
        return existingUser