import FullBlog from '../components/FullBlog'
import AppBar from '../components/AppBar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Blog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div>
      <AppBar/>
      <FullBlog/>
    </div>
  )
}

export default Blog
