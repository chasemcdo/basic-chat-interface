import { ChatMessage } from "@/helpers/types";
import Spinner from "./Spinner";

type Props = {
  chatHistory: ChatMessage[];
  loading: boolean;
};

const Messages = ({ chatHistory, loading }: Props) => {
  if (loading) {
    return <Spinner height="h-20 w-20" />;
  } else {
    if (chatHistory.length === 0) {
      return (
        <div className="flex flex-col h-full items-center justify-center">
          <span className="text-gray-400">No messages yet.</span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col h-full">
          {chatHistory.map((message, index) => (
            <div key={index} className="flex flex-row items-center">
              <div className="w-[30px] h-[30px] rounded-full bg-gray-400"></div>
              <div className="flex flex-col ml-[10px]">
                <span className="text-gray-900 font-bold">{message.type}</span>
                <span className="text-gray-500">{message.message}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
};

export default Messages;
