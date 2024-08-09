import { useState, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../config";

interface Blog {
    id: number,
    title: string,
    content: string,
    subHeading: string,
    author:{
        name: string
    }
}

export const useFullBlogs = ({id}:{id:string}) =>{
    const [loading, setLoading] = useState(true);
    const [FullBlog, setFullBlog] = useState<Blog>();

    useEffect(() => {
        axios
        .get(`${BackendUrl}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setFullBlog(res.data.response);
          setLoading(false);
        });
    }, []);
  
    return { loading, FullBlog };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.response);
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
