"use client"
import { apiGetMessages, apiSendMessage } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{message: string, type: string}[]>([]);

  const getChatHistory = async () => {
    await apiGetMessages()
      .then((res) => 
          res.json()
            .then((data) => 
              setChatHistory(data)
            )
        );
  }

  const handleMessage = async () => {
    await apiSendMessage(message);
    setMessage('');
    await getChatHistory();
  }

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-row w-[770px] h-[610px] bg-white rounded-lg'>
        <div className='mx-[70px] w-full flex flex-col'>
          <div className='h-full overflow-y-auto my-4'>
            {/* Chat History */}
            <div className='flex flex-col h-full'>
              {chatHistory.map((message, index) => (
                <div key={index} className='flex flex-row items-center'>
                  <div className='w-[30px] h-[30px] rounded-full bg-gray-400'></div>
                  <div className='flex flex-col ml-[10px]'>
                    <span className='text-gray-900 font-bold'>{message.type}</span>
                    <span className='text-gray-500'>{message.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-row justify-between'>
            {/* Tasks */}
            {/* Convert to components with adjustable actions and text */}
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
          </div>
          <div className={ 'my-[16px] px-[18px] py-4 items-center flex flex-row w-full text-gray-900 border rounded-xl sm:text-md ' + (message ? "border-gray-900" : "border-gray-400") }>
            {/* Message Input */}
            <button className="px-[4px] text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] h-[30px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <input
              placeholder="What's on your mind?"
              type="text"
              className="focus:outline-none w-full"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMessage(event.target.value);
              }}
              value={message}
            />
            <button 
              className={message ? "text-gray-900" : "text-gray-400"}
              disabled={message.length === 0}
              onClick={handleMessage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] h-[30px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
