import { ChatMessage } from "@/helpers/types";

type Props = {
  chatHistory: ChatMessage[];
};

const Messages = ({chatHistory}: Props) => {
  return (
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
  );
};

export default Messages;
