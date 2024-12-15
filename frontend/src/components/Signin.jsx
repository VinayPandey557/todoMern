import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSignin = async () => {
    if(!username || !password) {
      alert("Please fill in both username and password");
      return;
    }
  setLoading(true);
  try{
    const response = await axios.post("http://localhost:3000/signin", {
      username, 
      password
    });
    localStorage.setItem("token", response.data.token);
    alert("Sign in successfull");
    navigate("/todo");
  } catch(error){
    alert("Sign-in failed. Please check your credentials")
  } finally {
    setLoading(false);
  }
}

return (
  <div>
    <header className="flex items-center justify-center bg-blue-500 text-white py-4">
      <h1 className="text-3xl font-bold">Todo App</h1>
    </header>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Sign In
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`w-full py-2 rounded-lg text-white ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={handleSignin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
