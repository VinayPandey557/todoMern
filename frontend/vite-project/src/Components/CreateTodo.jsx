import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    console.log(token);

    const handleCreateTodo = async () => {
        try {
            const response = await axios.post("http://localhost:5000/todo", {
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert("Todo added successfully");
                setTitle("");  // Clear input after success
                setDescription("");
            }
            navigate("/todos");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Create a Todo</h2>
                
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none h-24"
                />

                <button 
                    onClick={handleCreateTodo} 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                    Create Todo
                </button>
            </div>
        </div>
    );
}
