type Props = {
  title: string;
  action: () => Promise<void>;
};

export default ({title, action}: Props) => {
  return (
    <button 
      className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'
      onClick={action}
    >
      {title}
    </button>
  );
};
