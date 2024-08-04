import {Link} from 'react-router-dom'
interface BlogCardType {
  name: string,
  date: string,
  title: string,
  des: string,
  id: number
}

const BlogCard = ({name, date, title, des, id }: BlogCardType) => {
  return (
   <Link to={`/blog/${id}`} >
    <div className=' flex mx-44 my-8'>
        {/* Left */}
      <div className=' w-[60%] '>
         <div className='flex mt-2'>
         <button className=" bg-gray-300  text-center font-semibold  rounded-full px-[6px]  ">
          {name.charAt(0)}
          </button> 
            <p className='text-base ml-4'>{name} </p> <p className='text-gray-600 ml-2'>· {date}</p>
         </div>
         <div className='font-bold text-xl mt-3'>{title} </div>
         <div className='mt-2'>{des}</div>
         <div className='flex text-sm my-9'> <p className='bg-gray-200 rounded-xl px-2 py-[2px] mr-2'>Side Hustle</p><p>3 min read</p> </div>
         <div className='bg-gray-300 h-[1px] w-full'></div>
      </div>
      {/* Right */}
      <div className=' w-[30%] min-h-full flex  items-center '>
        <div className='bg-orange-400 w-1/2 h-1/2 ml-44'></div>
      </div>
    </div>
    </Link>
  )
}

export default BlogCard
