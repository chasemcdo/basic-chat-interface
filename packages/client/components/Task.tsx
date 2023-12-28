type Props = {
  title: string;
  action: () => Promise<void>;
};

const Task = ({title, action}: Props) => {
  return (
    <button 
      className='max-w-[149px] w-full h-[40px] border border-gray-400 text-gray-400 rounded-full hover:border-gray-900 hover:text-gray-900 hover:bg-gray-100'
      onClick={action}
    >
      {title}
    </button>
  );
};

export default Task;
