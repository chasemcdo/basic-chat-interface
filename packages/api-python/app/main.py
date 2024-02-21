from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from json import loads
from datetime import datetime

from os import environ
from pymongo import MongoClient

from langchain_community.chat_message_histories import MongoDBChatMessageHistory
from langchain_core.utils.function_calling import convert_to_openai_tool
from langchain_openai import ChatOpenAI

from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

from .helpers import check_availability

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(environ["MONGODB_URI"])
db = client["chat-interface-0"]
message_collection = db["messages"]

@app.get("/health")
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

    system_prompt = f"""You are a AI having a conversation with a human.
Today's date is {datetime.now()}"""

    template = system_prompt + """{chat_history}
Human: {human_input}
AI:"""

    prompt = PromptTemplate(
        input_variables=["chat_history", "human_input"], template=template
    )
    memory = ConversationBufferMemory(memory_key="chat_history", chat_memory=chat_message_history)

    llm = ChatOpenAI(model_name="gpt-4-turbo-preview")

    tools = [convert_to_openai_tool(check_availability)]
    llm_with_tool = llm.bind_tools(tools=tools)

    formatted_prompt = prompt.format(human_input=message, chat_history=memory.load_memory_variables({})["chat_history"])
    # print(formatted_prompt)
    response = llm_with_tool.invoke(formatted_prompt)
    # print(response)
    if "tool_calls" not in response.additional_kwargs:
        output = response.content
    else:
        tool_call_arguments = loads(response.additional_kwargs["tool_calls"][0]["function"]["arguments"])
        print("Func Info")
        print(tool_call_arguments)
        output = check_availability(month=int(tool_call_arguments["month"]), day=int(tool_call_arguments["day"]), hour=int(tool_call_arguments["hour"]), year=int(tool_call_arguments["year"]) if "year" in tool_call_arguments else 2024)
        # output = "test"
    memory.save_context({"input": message}, {"output": output})

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
