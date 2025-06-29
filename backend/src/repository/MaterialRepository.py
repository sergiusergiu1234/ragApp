from sqlalchemy import select, delete
from repository.PostgresSessionFactory import SessionDep
from model.Material import Material


class MaterialRepository:
    def __init__(self, session: SessionDep):        
        self.__session = session

    def getAll(self):
        stmt = select(Material)
        result = self.__session.execute(stmt)
        return result.scalars().all()

    def getById(self, id: int):
        stmt = select(Material).where(Material.id == id)
        result = self.__session.execute(stmt)
        return result.scalar_one_or_none()

    def create(self, material: Material):
        self.__session.add(material)
        self.__session.commit()
        self.__session.refresh(material)
        return material

    def update(self, id: int, material: Material):
        existing_material = self.getById(id)
        if existing_material:
            for key, value in material.__dict__.items():
                if key != '_sa_instance_state' and hasattr(existing_material, key):
                    setattr(existing_material, key, value)
            self.__session.commit()
            self.__session.refresh(existing_material)
        return existing_material

    def deleteById(self, id: int) -> bool:
        material = self.getById(id)
        if material is not None:
            self.__session.execute(delete(Material).where(Material.id == id))
            self.__session.commit()
            return True
        return False
    
    def getByUserId(self, userId: int):
        materials = self.__session.execute(select(Material).where(Material.userId == userId)).scalars().all()
        return materials