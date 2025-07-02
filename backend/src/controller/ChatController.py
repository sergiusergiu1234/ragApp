from typing import Annotated, Optional
from fastapi import APIRouter, Depends, Query, Request
from service.UserService import UserService
from model.exceptions.UnauthorizedException import UnauthorizedException
from service.Security.Auth0SecurityService import get_current_user, authSchema
from model.User import User
from service.PipelineServiceFactory import PipelineServiceFactory
from service.ConversationService import ConversationService
from model.ChatRequestDto import ChatRequestDto
from service.ChatServiceFactory import ChatServiceFactory
from fastapi.security import HTTPAuthorizationCredentials, SecurityScopes
from repository.UserRepository import UserRepository

chatController = APIRouter(tags=['Chat'])

async def get_optional_user(
    userRepository: Annotated[UserRepository, Depends()],
    token: Optional[HTTPAuthorizationCredentials] = Depends(authSchema),
    security_scopes: SecurityScopes = None
):
    try:
        return await get_current_user(userRepository, token, security_scopes)
    except Exception:
        return None

@chatController.post("/chat")
async def chat(
    serviceFactory: Annotated[ChatServiceFactory, Depends()],
    pipelineServiceFactory: Annotated[PipelineServiceFactory, Depends()],
    conversationService: Annotated[ConversationService, Depends()],
    userSerice: Annotated[UserService, Depends()],
    request: ChatRequestDto,
    user: Optional[User] = Depends(get_optional_user)
):
    # If user is None, use or create the public user with oauthId '9999'
    if user is None:
        public_user = userSerice.getByOauthId("9999")
        user = public_user
    
    # Now proceed as normal, but activities for public user are done as user with oauthId '9999'
    if user.oauthId == "9999":
        # Handle as public/temporary user
        if request.conversationId is None:
            conversation = conversationService.createOne(userId=user.id, title="Temporary Chat")
            conversationId = conversation.id
        else:
            conversationId = request.conversationId
        chatService = serviceFactory.getService(llmId=request.llmId)
        response = chatService.chat(
            conversationId=None,  # or conversationId if you want to keep the thread
            userId=user.id,
            message=request.message,
            sourceIds=request.sourceIds
        )
        return {"conversationId": conversationId, "response": response}
    else:
        # Normal authenticated user logic
        chatService = serviceFactory.getService(llmId=request.llmId)
        allowedConversations = conversationService.getByUserId(user.id)
        allowedConversationIds = [c.id for c in allowedConversations]
        if request.conversationId in allowedConversationIds:
            response = chatService.chat(
                conversationId=request.conversationId,
                userId=user.id,
                message=request.message,
                sourceIds=request.sourceIds
            )
            existingConversation = conversationService.getById(request.conversationId)
            if ((len(existingConversation.pgmessages) > 5) and (existingConversation.title == 'newChat')):
                pipelineService = pipelineServiceFactory.getService(request.llmId)
                res = pipelineService.updateConversationTitle(request.conversationId)
                conversationService.updateName(
                    request.conversationId,
                    res['chatSummarizer']['replies'][0]._content[0].text
                )
            return response
        else:
            raise UnauthorizedException(
                detail=f"Attempted to send message in forbidden conversation. ConversationId: {request.conversationId}."
            )


@chatController.post("/chat/temporary")
def chat_temporary(serviceFactory: Annotated[ChatServiceFactory, Depends()],
                   request: ChatRequestDto,
                   conversationService: Annotated[ConversationService, Depends()],
                   userId: Annotated[int, Query(..., description="User ID for temporary chat")],
                   conversationId: Annotated[int | None, Query]= None):
    
    if conversationId is None:
        conversation = conversationService.createOne(userId=userId, title="Temporary Chat")
        conversationId = conversation.id
    chatService = serviceFactory.getService(llmId=request.llmId)
    response = chatService.chat(conversationId=None, userId=userId, message=request.message, sourceIds=request.sourceIds)
    return {"conversationId": conversationId, "response": response}