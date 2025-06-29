
from typing import Annotated
from fastapi import APIRouter, Path, Query
from fastapi import Depends

from service.UserService import UserService


userController = APIRouter(tags=['User'])
userServiceDep = Annotated[UserService, Depends()]


@userController.get("/user")
def getUsers(service: userServiceDep):
    users = service.getAll()
    return users

@userController.get("/user/{id}")
def getUsers(service: userServiceDep, id: Annotated[int, Path(...)]):
    user = service.getById(id)
    return user

@userController.post("/user")
def postUser(service: userServiceDep, authId: Annotated[int, Query(...)], username: Annotated[str, Query(...)]):
    user = service.addOne(oauthId=authId, username=username)
    return user 

@userController.delete("/user/{id}")
def deleteMaterialsa(service: userServiceDep, id: Annotated[int, Path(...)]):
    deleted = service.deleteById(id)
    return deleted