import Image from 'next/image'

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
          <div className='py-[16px]'>
            {/* Message Input */}
            <input placeholder="What's on your mind?" type="text" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg  sm:text-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>
    </main>
  )
}
