from typing import Annotated, List
from fastapi import APIRouter, Depends, File, Path, Query, Security
from model.exceptions.UnauthorizedException import UnauthorizedException
from service.Security.Auth0SecurityService import get_current_user
from model.User import User
from service.ConversationService import ConversationService



conversationController = APIRouter(tags=['Conversation'])

@conversationController.post("/conversation")
def postConversation(conversationService: Annotated[ConversationService, Depends()],user: Annotated[User, Depends(get_current_user)], conversationTitle: str):
    conversation = conversationService.createOne(title=conversationTitle, userId=user.id)
    return conversation


@conversationController.get("/conversation")
def getConversations(conversationService:Annotated[ConversationService, Depends()],
                     user: Annotated[User, Depends(get_current_user)]):
   
    conversations = conversationService.getByUserId(user.id)
    
    return conversations


@conversationController.get("/conversation/{conversationId}")
def getConversationById(conversationService: Annotated[ConversationService, Depends()],
                        conversationId: Annotated[int, Path(...)],
                        user: Annotated[User, Depends(get_current_user)]):
    try:
        allowedConversations = conversationService.getByUserId(user.id)
        allowedConversationIds = [c.id for c in allowedConversations]
        if conversationId in allowedConversationIds:
            print("Authorization successful, fetching conversation")
            conversationInfo = conversationService.getById(conversationId)
            return conversationInfo
        else:
            print("Authorization failed, raising exception")
            raise UnauthorizedException(detail=f"Forbidden conversation. ConversationId: {conversationId}.")
    except Exception as e:
        print(f"Exception in getConversationById: {e}")
        raise e
 
@conversationController.delete("/conversation/{id}")
def deleteConversationById(conversationService: Annotated[ConversationService, Depends()],
                           id: Annotated[int, Path(...)],
                           user: Annotated[User, Depends(get_current_user)]):
    allowedConversations  = conversationService.getByUserId(user.id)
    if id in allowedConversations:
        deleted  = conversationService.deleteById(id)
        return deleted
    else:
                raise UnauthorizedException(detail=f"Forbidden conversation. ConversationId: {id}.")
