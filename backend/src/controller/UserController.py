from typing import Annotated
from fastapi import APIRouter, Path, Query
from fastapi import Depends
from model.exceptions.UnauthorizedException import UnauthorizedException
from model.User import User
from service.Security.Auth0SecurityService import get_current_user
from service.UserService import UserService


userController = APIRouter(tags=['User'])
userServiceDep = Annotated[UserService, Depends()]


@userController.get("/user")
def getUsers(service: userServiceDep):
    users = service.getAll()
    return users

@userController.get("/user/{id}")
def getUsers(service: userServiceDep, id: Annotated[int, Path(...)],
             user: Annotated[User, Depends(get_current_user)] ):
    if id == user.id:
        return user

@userController.post("/user")
def postUser(service: userServiceDep, authId: Annotated[int, Query(...)]):
    user = service.addOne(oauthId=authId)
    return user 

@userController.post("/user/{userSub}/accept-terms")
def acceptTerms(service: userServiceDep, userSub: Annotated[str, Path(...)],
                user: Annotated[User, Depends(get_current_user)]):
    if user.oauthId == userSub:
        updated_user = service.acceptTerms(user.id)
        return updated_user
    else:
        raise UnauthorizedException("Cannot accept terms for another user")

@userController.delete("/user/{id}")
def deleteMaterialsa(service: userServiceDep, id: Annotated[int, Path(...)],
                     user: Annotated[User, Depends(get_current_user)]):
    
    if user.id == id:
        deleted = service.deleteById(id)
        return deleted
    