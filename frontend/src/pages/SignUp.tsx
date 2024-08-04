import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";

export default function () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    return (
        <div className=" flex justify-center items-center h-screen bg-gray-300">
            <div className=" bg-white flex flex-col items-center w-fit h-fit rounded-lg py-4">
                <Heading element={"Sign Up"} />
                <SubHeading
                    subHeading={"Enter your information to create your account"}
                />
                <InputBox type={"text"} label={"Name"} placeholder={"John Doe"} onChange={e=> setName(e.target.value)} />
                <InputBox
                    type={"text"}
                    label={"Email"}
                    placeholder={"johndoe@gmail.com"}
                    onChange={e=> setEmail(e.target.value)}
                />
                <InputBox
                    type={"password"}
                    label={"Password"}
                    placeholder={"password"}
                    onChange={e=> setPassword(e.target.value)}
                />
                <Button btname={"Sign Up"} onClick={async()=>{
                    try {
                        const response = await axios.post(`${BackendUrl}/api/v1/user/signup`,{
                            name: name,
                            email: email,
                            password : password
                         })
                         const token = response.data.token
                         console.log(token);
                         localStorage.setItem('token',token)
                         if (token) {
                             navigate('/blogs')
                         }
                    } catch (error) {
                        console.log(error);
                    }
                    
                }} />
                <BottomWarning warning={"Already have an account?"} link={"Login"} />
            </div>
        </div>
    );
}
