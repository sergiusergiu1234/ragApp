from typing import Annotated, List
from fastapi import APIRouter, Path, Query
from fastapi import Depends
from model.exceptions.UnauthorizedException import UnauthorizedException
from model.User import User
from service.Security.Auth0SecurityService import get_current_user
from service.IndexingServiceFactory import IndexingServiceFactory
from service.MaterialService import MaterialService
from fastapi import APIRouter, Depends, File, Query, UploadFile


materialController = APIRouter(tags=['Material'])
materialServiceDep = Annotated[MaterialService, Depends()]


@materialController.get("/material")
def gerMaterials(service: materialServiceDep, user: Annotated[User, Depends(get_current_user)]):
    materials = service.getByUserId(user.id)
    return materials

@materialController.delete("/material/{id}")
def deleteMaterialsa(service: materialServiceDep, id: Annotated[int, Path(...)],user: Annotated[User, Depends(get_current_user)]):
    usersMaterialIds = [m.id for m in service.getByUserId(user.id)]
    if id in usersMaterialIds:
        deleted = service.deleteById(id)
        return deleted
    else:
        raise UnauthorizedException(detail=f"Attempted to remove forbiudden material {id}.")

@materialController.post("/material")
async def indexFiles(serviceFactory: Annotated[IndexingServiceFactory, Depends()],
                indexedFiles: Annotated[List[UploadFile],File(...)],
                user: Annotated[User, Depends(get_current_user)]):
    
    service = serviceFactory.getService()
    responses = []
    for file in indexedFiles:
        response = await service.indexFile(file=file, userId=user.id)
        responses.append(response)

    return response

