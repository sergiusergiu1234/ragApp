from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import Session
from model.User import User

class DefaultUserMigration:
    def __init__(self, session: Session):
        self.__session = session
        self.__default_models = [
            {
                "oauthId": "9999",
                "dateCreated": datetime.now(),
                "acceptedTerms": False,
            },
            
            
        ]

    def run(self):
        """Run the migration to populate public user if he doesn't exist."""
        try:
            # Check if we already have models in the database
            existingUser = self.__session.execute(select(User).where(User.oauthId == "999")).scalars().all()
            
            if not existingUser:
                # If no models exist, create the default ones
                for model_data in self.__default_models:
                    model = User(**model_data)
                    self.__session.add(model)
                
                self.__session.commit()
                print("Successfully populated default user.")
            else:
                print("Default user already exists in the database. Skipping default population.")
                
        except Exception as e:
            self.__session.rollback()
            print(f"Error populating default user: {str(e)}")
            raise 