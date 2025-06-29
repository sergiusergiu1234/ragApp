from datetime import datetime
from typing import Annotated

from fastapi import Depends

from config import Config, getConfig
from model.User import User
from pipeline.DocstoreFactory import DocstoreFactory
from repository.UserRepository import UserRepository


class UserService:
    def __init__(self,UserRepo: Annotated[UserRepository, Depends()]):
        self.__userRepository = UserRepo

    def getAll(self):
        Users = self.__userRepository.getAll()
        return Users
    
    def addOne(self, oauthId: int, username: str):
        user = self.__userRepository.create(User(username=username,oauthId=oauthId, dateCreated = datetime.now()) )
        return user
    def getById(self, id: int):
        user = self.__userRepository.getById(id)
        if user:
            materials = user.materials
        return user
    
    def deleteById(self, id: int):
        deleted = self.__userRepository.deleteById(id)
       
        return deleted
    
    def acceptTerms(self, id: int):
        user = self.__userRepository.getById(id)
        if user:
            user.acceptedTerms = True
            updated_user = self.__userRepository.update(id, user)
            return updated_user
        return None