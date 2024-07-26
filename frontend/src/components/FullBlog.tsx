import React from "react";

const FullBlog = () => {
  return (
    <div className=" flex mx-44 my-8">
      {/* Left */}
      <div className=" w-[60%] ">
        <div className="font-bold text-3xl mt-3">
          How an Ugly Single-Page Website Makes $5000 a Month with Affiliate
          Marketing
        </div>
        <div className="flex mt-2">
          <p className="text-base ">Posted on</p>{" "}
          <p className="text-gray-600 ml-2">· Dec 3,2023</p>
        </div>
        <div className="mt-2">
          No need to create a fancy and modern website with hundreds of pages to
          make money online.Making money is a dream for many
        </div>
        <div className="flex text-sm my-9">
          {" "}
          <p className="bg-gray-200 rounded-xl px-2 py-[2px] mr-2">
            Side Hustle
          </p>
          <p>3 min read</p>{" "}
        </div>
        <div className="bg-gray-300 h-[1px] w-full"></div>
      </div>
      {/* Right */}
      <div className=" w-[30%] min-h-full mt-6 pl-32 ">
        <p className=" font-semibold">Author</p>

        <div className="flex my-2">
          <button className=" bg-gray-300  text-center font-semibold  rounded-full px-[6px]  ">
            N
          </button>
          <p className="text-lg ml-4 font-bold">Name Last</p>
        </div>
        <p className="text-gray-600 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi nemo dolore minima aut perferendis hic tempore eveniet eum esse facere?</p>
      </div>
    </div>
  );
};

export default FullBlog;
