from api.endpoints import router
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
import os
import uvicorn
from sqlmodel import SQLModel
from contextlib import asynccontextmanager
from db import engine


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(router)

if os.getenv("ENVIRONMENT") == "production":
    app.mount('/', StaticFiles(directory='client/dist', html=True))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
