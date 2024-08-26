import { useFullBlogs } from "../hooks";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const FullBlog = () => {
  const {id} = useParams();
  const { loading, FullBlog } = useFullBlogs({
    id: id || ""
  })
  console.log(FullBlog,loading);

  const des = FullBlog?.content || " "

  const desArr = des.split(" ")
  const readTime = Math.trunc(desArr.length/200)+1
  
  return (
    <div className=" flex mx-44 my-8">
      <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-75 flex items-center justify-center`}>
      <Loader/>
      </div>
      {/* Left */}
      <div className=" w-[60%] ">
        <div className="font-bold text-3xl mt-3">
          {FullBlog?.title}
        </div>
        <div className="flex mt-2">
          <p className="text-base ">Posted on</p>{" "}
          <p className="text-gray-600 ml-2">· {FullBlog?.createdAt}</p>
        </div>
        <div className="mt-2">
          {FullBlog?.content}
        </div>
        <div className="flex text-sm my-9">
          {" "}
          <p className="bg-gray-200 rounded-xl px-2 py-[2px] mr-2">
            {FullBlog?.subHeading}
          </p>
          <p>{readTime} min read</p>{" "}
        </div>
        <div className="bg-gray-300 h-[1px] w-full"></div>
      </div>
      {/* Right */}
      <div className=" w-[30%] min-h-full mt-6 pl-32 ">
        <p className=" font-semibold">Author</p>

        <div className="flex my-2">
          <button className=" bg-gray-300  text-center font-semibold  rounded-full px-[6px]  ">
            {FullBlog?.author.name.charAt(0)}
          </button>
          <p className="text-lg ml-4 font-bold">{FullBlog?.author.name}</p>
        </div>
        <p className="text-gray-600 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi nemo dolore minima aut perferendis hic tempore eveniet eum esse facere?</p>
      </div>
    </div>
  );
};

export default FullBlog;
