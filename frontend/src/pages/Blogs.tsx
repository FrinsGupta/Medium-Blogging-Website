import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/Loader";

const Blogs = () => {
  const navigate = useNavigate()

 useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);


  const { blogs, loading } = useBlogs();
  console.log(blogs);

  return (
    <>
      <AppBar />
      <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-75 flex items-center justify-center`}>
      <Loader/>
      </div>
      {blogs.map((element) => {
        return (
          <BlogCard
            key={element.id}
            id={element.id}
            name={element.author.name}
            title={element.title}
            des={element.content}
            date="Dec 3,2023"
          />
        );
      })}
    </>
  );
};

export default Blogs;
