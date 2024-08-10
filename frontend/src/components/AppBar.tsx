import { useNavigate,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../config";

const AppBar = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BackendUrl}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) =>{
        setName(res.data.response.name)
      } 
        );
  }, []);

  return (
    <div className="bg-gray-200 rounded-b-2xl">
      <div className="flex justify-between mx-8 ">
        <div className="flex">
        <Link to={'/'}>  <div className=" font-bold text-3xl py-3 " >Medium</div></Link>
        </div>
        <div className="flex items-center">
          <p className=" font-semibold text-xl">Hello, {name.split(" ")[0]}</p>
          <button
            onClick={() => {
              navigate("/publish");
            }}
            className="ml-12 text-white bg-blue-600   font-medium rounded-lg text-sm px-5 py-1.5 me-2   focus:outline-none"
          >
            Write
            {/* Logout */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
