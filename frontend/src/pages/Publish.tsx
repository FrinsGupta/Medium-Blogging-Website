import React from "react";
import { useState, useEffect } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BackendUrl } from "../config";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Publish = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [loading, setLoading] = useState(false)

  const date = new Date();
          const dateArr = date.toString().split(" ")
          const createdAt = `${dateArr[1]+" "+dateArr[2]+","+dateArr[3]}`
  return (
    <>
      <AppBar  />
      <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-85 flex items-center justify-center`}>
      <Loader/>
      </div>
      <div className="flex flex-col items-center">
        <input
          className=" px-4 h-20 w-2/3 border-[1px] border-gray-400 mt-10 rounded-xl"
          placeholder="Sub Heading"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSubHeading(e.target.value);
          }}
        />
        <input
          className=" px-4 h-20 w-2/3 border-[1px] border-gray-400 mt-10 rounded-xl"
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className=" px-4 py-4 h-80 w-2/3 border-[1px] border-gray-400 mt-8 rounded-xl"
          placeholder="Tell your story..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);
          }}
        />
      </div>
      {createdAt}
      <button
        type="button"
        className="mx-[268px] mt-8 text-white bg-black   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
        onClick={async () => {
          setLoading(true)
          // const date = new Date();
          // const dateArr = date.toString().split(" ")
          // const createdAt = `${dateArr[1]+" "+dateArr[2]+","+dateArr[3]}`

          const response = await axios.post(
            `${BackendUrl}/api/v1/blog`,
            {
              title,
              content,
              subHeading,
              createdAt
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(response);
          const id = response.data.response.id;
          setLoading(false)
          if (id) {
            navigate(`/blog/${id}`);
          }
        }}
      >
        Publish
      </button>
    </>
  );
};

export default Publish;
