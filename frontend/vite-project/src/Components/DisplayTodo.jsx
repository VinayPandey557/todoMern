import { useEffect, useState } from "react"
import axios from "axios";




export function DisplayTodo() {
    const [todos,setTodos] = useState([]);


    useEffect(() => {
        const fetchTodos = async () => {
            try { 
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/todos", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const data = setTodos(response.data.todos);
                console.log(data);
            }catch(error) {
                console.error("Error fetching todos", error);
            }
        } 
       fetchTodos();
    }, [])

    return (
        <div>
            <h2>Your Todo list</h2>
            <ul>
                {todos.map((todo) =>(
                   <div>
                     <li key={todo._id}>{todo.title}</li>
                   </div>
                    
                ))}
            </ul>
        </div>
    )
}