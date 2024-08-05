import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <AppBar />
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
      {/* <BlogCard name="Name Last" title="How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing" des="No need to create a fancy and modern website with hundreds of pages to make money online.Making money is a dream for many" date="Dec 3,2023" />
      <BlogCard name="Name Last" title="How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing" des="No need to create a fancy and modern website with hundreds of pages to make money online.Making money is a dream for many" date="Dec 3,2023" />
      <BlogCard name="Name Last" title="How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing" des="No need to create a fancy and modern website with hundreds of pages to make money online.Making money is a dream for many" date="Dec 3,2023" />
      <BlogCard name="Name Last" title="How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing" des="No need to create a fancy and modern website with hundreds of pages to make money online.Making money is a dream for many" date="Dec 3,2023" />
      <BlogCard name="Name Last" title="How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing" des="No need to create a fancy and modern website with hundreds of pages to make money online.Making money is a dream for many" date="Dec 3,2023" />
      <BlogCard name="Name Last" title="How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing" des="No need to create a fancy and modern website with hundreds of pages to make money online.Making money is a dream for many" date="Dec 3,2023" /> */}
    </>
  );
};

export default Blogs;
