import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {
    const [ username, setUsername ] = useState(" ");
    const [ password , setPassword ] = useState(" ");
    const navigate = useNavigate();



    return <div>
        <input type="email" placeholder="email" id="username" className="" onChange={(e) => {
            setUsername(e.target.value);
        }}/><br />
        <input type="password" placeholder="password" id="password" onChange={(e) => {
            setPassword(e.target.value);
        }}/> <br />
        <button onClick={async () => {
           const response =  axios.post("http://localhost:3000/signup", {
                username,
                password
            })
            navigate("/todo")
            alert("SignUp successfull");
        }}> Sign up</button>
    </div>
}