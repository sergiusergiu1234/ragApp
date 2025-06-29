from sqlalchemy.orm import Session, sessionmaker
from database.migrations.DefaultModelsMigration import DefaultModelsMigration
from repository.PostgresSessionFactory import PostgresSessionFactory

class MigrationRunner:
    def __init__(self, session_factory: PostgresSessionFactory):
        self.__session_factory = session_factory

    def run_migrations(self):
        """Run all database migrations in order."""
        session_maker = sessionmaker(bind=self.__session_factory.engine)
        session = session_maker()
        session.expire_on_commit = False
        
        try:
            # Run default models migration
            default_models_migration = DefaultModelsMigration(session)
            default_models_migration.run()
            session.commit()
            print("All migrations completed successfully.")
        except Exception as e:
            session.rollback()
            print(f"Error running migrations: {str(e)}")
            raise
        finally:
            session.close() 