from sqlalchemy import select, delete
from model.User import User
from repository.PostgresSessionFactory import SessionDep



class UserRepository:
    def __init__(self, session: SessionDep):        
        self.__session = session

    def getAll(self):
        stmt = select(User)
        result = self.__session.execute(stmt)
        return result.scalars().all()

    def getById(self, id: int):
        stmt = select(User).where(User.id == id)
        result = self.__session.execute(stmt)
        return result.scalar_one_or_none()

    def create(self, user: User):
        self.__session.add(user)
        self.__session.commit()
        self.__session.refresh(user)
        return user

    def update(self, id: int, user: User):
        existing_user = self.getById(id)
        if existing_user:
            for key, value in user.__dict__.items():
                if key != '_sa_instance_state' and hasattr(existing_user, key):
                    setattr(existing_user, key, value)
            self.__session.commit()
            self.__session.refresh(existing_user)
        return existing_user

    def deleteById(self, id: int) -> bool:
        user = self.getById(id)
        if user is not None:
            self.__session.execute(delete(User).where(User.id == id))
            self.__session.commit()
            return True
        return False
    
    def getByAuthSub(self, sub:str):
        user = self.__session.execute(select(User).where(User.oauthId == sub)).scalar_one_or_none()
        return user