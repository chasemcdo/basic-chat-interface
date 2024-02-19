from typing import Union

from fastapi import FastAPI

from os import environ
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

client = AsyncIOMotorClient(environ["MONGODB_URI"])
db = client.get_database("chat-interface-0")
user_collection = db.get_collection("users")

@app.get("/")
def health():
    return {"status": "ok"}
