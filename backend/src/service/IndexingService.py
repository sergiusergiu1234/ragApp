from datetime import datetime
from io import BytesIO
from fastapi import File, UploadFile
from haystack import Pipeline
import tempfile
import os

from model.Material import Material
from repository.MaterialRepository import MaterialRepository


class IndexingService:
    def __init__(self, pipeline: Pipeline, materialRepository: MaterialRepository):
        self.__pipeline = pipeline
        self.__materialRepository = materialRepository

    async def indexFile(self, file: UploadFile, userId: int):
    
        contents = await file.read()
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            temp_file.write(contents)
            temp_file_path = temp_file.name

        try: 
            material = self.__materialRepository.create(Material(name=file.filename, dateCreated=datetime.now(), userId=userId))

            response = self.__pipeline.run({
                "converter": {"sources": [temp_file_path]},
                "normalizer": {
                    "sourceId": material.id
                }
            })
           
            return {
                "indexingResponse": response,
                "indexedMaterial": material
            }
        finally:
            os.unlink(temp_file_path)