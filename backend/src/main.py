from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller import GeneratorController
from config import getConfig
from controller import ChatController, ConversationController,   MaterialController, UserController
from repository.PostgresSessionFactory import PostgresSessionFactory
from database.migrations.MigrationRunner import MigrationRunner

load_dotenv()
config = getConfig()

@asynccontextmanager
async def lifespan(app:FastAPI):
    sessionFactory = PostgresSessionFactory(database_url=config.postgresURL)
    sessionFactory.create_all()
    
    # Run migrations
    migration_runner = MigrationRunner(sessionFactory)
    migration_runner.run_migrations()
    
    yield

app = FastAPI(title="Rag App Demo API", lifespan=lifespan)

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(router=ChatController.chatController)
app.include_router(router=ConversationController.conversationController)
app.include_router(router = MaterialController.materialController)
app.include_router(router= UserController.userController)
app.include_router(router = GeneratorController.generatorController)