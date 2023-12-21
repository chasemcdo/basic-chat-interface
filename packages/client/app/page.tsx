export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-row w-[770px] h-[610px] bg-white rounded-lg'>
        <div className='mx-[70px] w-full flex flex-col'>
          <div className='h-full'>
            {/* Chat History */}
          </div>
          <div className='flex flex-row justify-between'>
            {/* Tasks */}
            {/* Convert to components with adjustable actions and text */}
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
            <button className='w-[149px] h-[40px] border border-gray-400 text-gray-400 rounded-full'>Task</button>
          </div>
          <div className='my-[16px] px-[32px] py-4 flex flex-row w-full text-gray-900 border border-gray-300 rounded-lg sm:text-md'>
            {/* Message Input */}
            <input placeholder="What's on your mind?" type="text" className="focus:outline-none" />
          </div>
        </div>
      </div>
    </main>
  )
}
