import React from 'react'
import error from "../assets/error.jpg"


function Error() {
  return (
    <div className=' flex  flex-col items-center justify-center w-screen h-screen'>
        <img src={error} className='overflow-hidden'/>
        <button className='hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-gray-300    md:text-xl hover: bg-green-600  md:p-4 sm:p-2 mt-5 rounded-2xl font-semibold'>Go To Home</button>
    </div>
  ) 
}
export default Error;
