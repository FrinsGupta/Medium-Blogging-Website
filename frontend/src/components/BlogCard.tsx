import React from 'react'

const BlogCard = () => {
  return (
    <div className=' flex mx-44 my-8'>
        {/* Left */}
      <div className=' w-[60%] '>
         <div className='flex mt-2'>
         <button className=" bg-gray-300  text-center font-semibold  rounded-full px-[6px]  ">
            N
          </button> 
            <p className='text-base ml-4'>Name Last</p> <p className='text-gray-600 ml-2'>· Dec 3,2023</p>
         </div>
         <div className='font-bold text-xl mt-3'>How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing</div>
         <div className='mt-2'>No need to create a fancy and modern website with hundreds of pages to make money online.Making money is a dream for many</div>
         <div className='flex text-sm my-9'> <p className='bg-gray-200 rounded-xl px-2 py-[2px] mr-2'>Side Hustle</p><p>3 min read</p> </div>
         <div className='bg-gray-300 h-[1px] w-full'></div>
      </div>
      {/* Right */}
      <div className=' w-[30%] min-h-full flex  items-center '>
        <div className='bg-orange-400 w-1/2 h-1/2 ml-44'></div>
      </div>
    </div>
  )
}

export default BlogCard
