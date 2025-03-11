import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <motion.h1 
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Create an Account
      </motion.h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <motion.button 
         onClick={async () => {
            const response= await axios.post("http://localhost:5000/signup", {
                username: formData.username,
                password: formData.password
            })
            localStorage.setItem("token", response.data.token)
           alert("Signup successfully");
           navigate("/todo")
         }}
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </form>
      
      <p className="mt-4 text-gray-600">Already have an account? 
        <Link to="/signin" className="text-blue-500 hover:underline"> Sign in</Link>
      </p>
    </div>
  );
}














