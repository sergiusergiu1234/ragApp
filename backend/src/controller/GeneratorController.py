from typing import Annotated
from fastapi import APIRouter, Path, Body
from fastapi import Depends
from service.GeneratorService import GeneratorService

generatorController = APIRouter(tags=['Generator'])
generatorServiceDep = Annotated[GeneratorService, Depends()]

@generatorController.get("/generator")
def get_generators(service: generatorServiceDep):
    return service.getAll()

@generatorController.get("/generator/{id}")
def get_generator_by_id(service: generatorServiceDep, id: Annotated[int, Path(...)]):
    return service.getById(id)

@generatorController.post("/generator")
def create_generator(service: generatorServiceDep, generator_data: dict = Body(...)):
    return service.create(generator_data)

@generatorController.put("/generator/{id}")
def update_generator(service: generatorServiceDep, id: Annotated[int, Path(...)], generator_data: dict = Body(...)):
    return service.update(id, generator_data)

@generatorController.delete("/generator/{id}")
def delete_generator(service: generatorServiceDep, id: Annotated[int, Path(...)]):
    return service.deleteById(id)
