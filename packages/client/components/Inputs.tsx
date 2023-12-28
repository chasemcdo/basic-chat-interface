import { Dispatch, SetStateAction } from "react";

type Props = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  handleMessage: () => Promise<void>;
};

const Inputs = ({handleMessage, setMessage, message}: Props) => {
  return (
    <form onSubmit={(e) => {e.preventDefault(); handleMessage()}} className={ 'my-[16px] px-[18px] py-4 items-center flex flex-row w-full text-gray-900 border rounded-xl sm:text-md ' + (message ? "border-gray-900" : "border-gray-400") }>
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
    </form>
  );
};

export default Inputs;
