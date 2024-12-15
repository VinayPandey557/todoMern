import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Sign Up
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={async () => {
              const response = await axios.post("http://localhost:3000/signup", {
                username,
                password,
              });
              navigate("/todo");
              alert("Sign-up successful");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
