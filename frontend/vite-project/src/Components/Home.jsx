
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      {/* Small Signup/Signin Circle */}
      <div className="absolute top-6 right-6">
        <Link to="/signin">
          <motion.div 
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white font-semibold">🔑</span>
          </motion.div>
        </Link>
      </div>

      {/* Heading */}
      <motion.h1 
        className="text-5xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Organize Your Tasks Effortlessly
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p 
        className="text-lg text-gray-600 text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Stay productive and never forget a task again!
      </motion.p>
      
      {/* Get Started Button */}
      <Link to="/signup">
        <motion.button 
          className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  );
}