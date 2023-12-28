"use client";
import Inputs from "@/components/Inputs";
import Messages from "@/components/Messages";
import Task from "@/components/Task";
import { ChatMessage } from "@/helpers/types";
import { apiGetMessages, apiResetMessages, apiSendMessage } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const getChatHistory = async () => {
    await apiGetMessages().then((res) =>
      res.json().then((data) => setChatHistory(data)),
    );
  };

  const handleMessage = async () => {
    if (!message) return;
    setSending(true);
    await apiSendMessage(message);
    setMessage("");
    await getChatHistory();
    setSending(false);
  };

  const resetChat = async () => {
    setLoading(true);
    await apiResetMessages();
    await getChatHistory();
    setLoading(false);
  };

  const initialLoad = async () => {
    await getChatHistory();
    setLoading(false);
  };

  useEffect(() => {
    initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-row w-[770px] h-[610px] m-24">
        <div className="flex flex-row relative w-full h-full bg-white rounded-lg">
          <div className="absolute right-0 top-0 m-4 flex flex-col gap-2">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg> */}
            <button onClick={resetChat}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div className="mx-[70px] w-full flex flex-col">
            <div className="h-full overflow-y-auto my-4">
              <Messages chatHistory={chatHistory} loading={loading} />
            </div>
            <div className="flex flex-row gap-2 justify-between">
              {[1, 2, 3, 4].map((idx) => {
                return (
                  <Task
                    key={idx}
                    title={`Task ${idx}`}
                    action={async () => {
                      console.log(`Task ${idx}`);
                    }}
                  />
                );
              })}
            </div>
            <Inputs
              message={message}
              setMessage={setMessage}
              handleMessage={handleMessage}
              sending={sending}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
