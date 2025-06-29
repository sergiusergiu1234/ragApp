from sqlalchemy import select
from sqlalchemy.orm import Session
from model.GeneratorModel import GeneratorModel

class DefaultModelsMigration:
    def __init__(self, session: Session):
        self.__session = session
        self.__default_models = [
            {
                "name": "gpt-3.5-turbo",
                "provider": "openai",
                "isActive": True
            },
            {
                "name": "gpt-4o-mini",
                "provider": "openai",
                "isActive": True
            },
            # {
            #     "name": "claude-3-opus",
            #     "provider": "anthropic",
            #     "isActive": True
            # },
            # {
            #     "name": "claude-3-sonnet",
            #     "provider": "anthropic",
            #     "isActive": True
            # }
        ]

    def run(self):
        """Run the migration to populate default models if they don't exist."""
        try:
            # Check if we already have models in the database
            existing_models = self.__session.execute(select(GeneratorModel)).scalars().all()
            
            if not existing_models:
                # If no models exist, create the default ones
                for model_data in self.__default_models:
                    model = GeneratorModel(**model_data)
                    self.__session.add(model)
                
                self.__session.commit()
                print("Successfully populated default LLM models.")
            else:
                print("LLM models already exist in the database. Skipping default population.")
                
        except Exception as e:
            self.__session.rollback()
            print(f"Error populating default models: {str(e)}")
            raise 