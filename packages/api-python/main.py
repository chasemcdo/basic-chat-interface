from fastapi import FastAPI

from os import environ
from pymongo import MongoClient
from bson.objectid import ObjectId

from langchain_community.chat_message_histories import MongoDBChatMessageHistory

from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

app = FastAPI()

client = MongoClient(environ["MONGODB_URI"])
db = client["chat-interface-0"]
message_collection = db["messages"]

@app.get("/")
def health():
    return {"status": "ok"}

@app.get("/chats/msg")
def get_chat(id: str):
    chat_message_history = MongoDBChatMessageHistory(
        session_id=id,
        connection_string=environ["MONGODB_URI"],
        database_name="chat-interface-0",
        collection_name="messages",
    )

    messages = [
        {
            "message": entry.content,
            "type": entry.type
        }
        for entry in chat_message_history.messages
    ]

    return messages

@app.post("/chats/msg")
def post_chat(id: str, message: str):
    chat_message_history = MongoDBChatMessageHistory(
        session_id=id,
        connection_string=environ["MONGODB_URI"],
        database_name="chat-interface-0",
        collection_name="messages",
    )

    template = """You are a chatbot having a conversation with a human.
{chat_history}
Human: {human_input}
Chatbot:"""

    prompt = PromptTemplate(
        input_variables=["chat_history", "human_input"], template=template
    )
    memory = ConversationBufferMemory(memory_key="chat_history", chat_memory=chat_message_history)

    llm = ChatOpenAI()
    llm_chain = LLMChain(
        llm=llm,
        prompt=prompt,
        verbose=True,
        memory=memory,
    )

    output = llm_chain.predict(human_input=message)

    return {"message": output}

@app.delete("/chats/msg")
def delete_chat(id: str):
    chat_message_history = MongoDBChatMessageHistory(
        session_id=id,
        connection_string=environ["MONGODB_URI"],
        database_name="chat-interface-0",
        collection_name="messages",
    )

    chat_message_history.clear()

    return {"status": "ok"}

@app.get("/chats")
def get_chats():
    chats = message_collection.distinct("SessionId")
    return chats
