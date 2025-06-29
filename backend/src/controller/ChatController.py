
from typing import Annotated
from fastapi import APIRouter, Depends
from model.exceptions.UnauthorizedException import UnauthorizedException
from service.Security.Auth0SecurityService import get_current_user
from model.User import User
from service.PipelineServiceFactory import PipelineServiceFactory
from service.ConversationService import ConversationService
from model.ChatRequestDto import ChatRequestDto
from service.ChatServiceFactory import ChatServiceFactory

chatController = APIRouter(tags=['Chat'])

@chatController.post("/chat")
def chat(serviceFactory: Annotated[ChatServiceFactory, Depends()],
         pipelineServiceFactory: Annotated[PipelineServiceFactory, Depends()],
         conversationService: Annotated[ConversationService, Depends()],
        request: ChatRequestDto,
        user: Annotated[User, Depends(get_current_user)]):
    
    chatService = serviceFactory.getService(llmId=request.llmId)
    allowedConversations = conversationService.getByUserId(user.id)
    allowedConversationIds = [c.id for c in allowedConversations]
    if request.conversationId in allowedConversationIds:
        response = chatService.chat(conversationId=request.conversationId, userId=user.id, message=request.message, sourceIds=request.sourceIds)
        existingConversation = conversationService.getById(request.conversationId)
        if ((existingConversation.pgmessages.__len__() > 5) and (existingConversation.title == 'newChat')):
            pipelineService = pipelineServiceFactory.getService(request.llmId)
            res = pipelineService.updateConversationTitle(request.conversationId)
            conversationService.updateName(request.conversationId, res['chatSummarizer']['replies'][0]._content[0].text)
        return response
    else:
        raise UnauthorizedException(detail=f"Attempted to send message in forbidden conversation. ConversationId: {request.conversationId}.")

