import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  const handleTodo = async () => {
    if(!title || !description ) {
      alert("Please fill the both the input fields");
      return;
    } 
    try {
      const response = await axios.post(
        "http://localhost:3000/todo",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Todo added");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo");
    }

   }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create a Todo
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleTodo}
          >
            Add a Todo
          </button>
          <button
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}

