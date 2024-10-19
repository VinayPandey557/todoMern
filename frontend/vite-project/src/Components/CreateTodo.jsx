import { useState } from "react";
import axios from "axios";

export function CreateTodo(props) {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const token = localStorage.getItem("token");

    return <div>
        <input type="text" id="title" placeholder="title" className="px-12 py-12 m-10" onChange={(e) => {
            setTitle(e.target.value)
        }} /> <br />
        <input id="desc" type="text" placeholder="description" onChange={(e) => {
            setDescription(e.target.value);
        }} /> <br />

        <button onClick={async () => {
         try {
            const response = await  axios.post("http://localhost:3000/todo", {
                title, 
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 200) {
                alert("Todo added");
            } 
         } catch(error) {
            console.log("Error adding todo: ", error);
            alert("Failed to add todo");
         }
        }}>Add a todo</button>
    </div>
}