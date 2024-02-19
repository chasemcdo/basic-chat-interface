import { apiGetChatIds } from "@/utils/api";
import { useEffect } from "react";
import { toast } from "./ui/use-toast";

type Props = {
  open: boolean;
  chatId: string;
  chatIds: string[];
  // eslint-disable-next-line no-unused-vars
  setChatId: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  setChatIds: (ids: string[]) => void;
};

const Sidebar = ({ open, chatId, setChatId, chatIds, setChatIds }: Props) => {
  const getChatIds = async () => {
    apiGetChatIds()
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get chat ids");
        }
        res.json().then((data) => setChatIds(data));
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed to get chats",
          description: "Something went wrong. Please try again later",
        });
      });
  };

  useEffect(() => {
    getChatIds(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (open) {
    return (
      <div className="bg-black">
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {chatIds.map((mappedChatId) => {
              return (
                <li key={mappedChatId}>
                  <button
                    className="flex text-nowrap items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-900 text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-1 focus:ring-gray-600 disabled:bg-slate-700 disabled:text-white"
                    onClick={() => setChatId(mappedChatId)}
                    disabled={mappedChatId === chatId}
                  >
                    {mappedChatId}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
};

export default Sidebar;
