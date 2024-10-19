import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
   const [ username, setUsername ] = useState(" ");
   const  [ password , setPassword ] =  useState(" ");
   const navigate = useNavigate();

   return <div>
     <input type="email" placeholder="username"  onChange={(e) => {
        setUsername(e.target.value);
     }}/> <br />
     <input type="password" placeholder="username" onChange={(e) => {
        setPassword(e.target.value);
     }} /> <br />
     <button onClick={async () => {
        const response = await axios.post("http://localhost:3000/signin", {
            username,
            password
        })
        localStorage.setItem("token", response.data.token)
        alert("Signin successfull");
        navigate("/todo")

     }} >Signin</button>
   </div>
}