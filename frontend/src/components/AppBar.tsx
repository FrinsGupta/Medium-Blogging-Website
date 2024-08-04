import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BackendUrl } from '../config'

const AppBar = () => {
  const [name, setName] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${BackendUrl}/api/v1/user`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => setName(res.data.response.name))
  }, [])
  
  return (
    <div className="bg-gray-200 rounded-b-2xl">
      <div className="flex justify-between mx-8 ">
        <div className="flex">
        <div className=' font-bold text-3xl py-3 '>
      Medium
    </div>
        </div>
        <div className="flex items-center">
          <p className=" font-semibold text-xl">Hello, {name}</p>
          <button onClick={()=>{
            localStorage.removeItem("token")
            navigate('/')
          }} className="bg-gray-300 font-bold text-xl rounded-full px-3 py-1 ml-4">
            {name.charAt(0)}
            {/* Logout */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppBar
