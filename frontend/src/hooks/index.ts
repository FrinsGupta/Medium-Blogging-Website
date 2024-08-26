import { useState, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../config";
import { useNavigate } from "react-router-dom";

interface Blog {
    id: number,
    title: string,
    content: string,
    subHeading: string,
    createdAt: string,
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
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${BackendUrl}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        
        setBlogs(res.data.response);
        setLoading(false);
        if (res.data.error) {
          navigate('/signup')
        }
      });
  }, []);

  return { loading, blogs };
};
