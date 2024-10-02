import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import backgroundImage from './assets/april.jpg';
import axios from 'axios'; 

const typingAnimation = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      type: "tween",
      duration:2,
      ease: "easeInOut",
      delay: 1,
      repeat: Infinity, 
      repeatType: "loop",
      repeatDelay: 3
    }
  }
};

const LandingPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3001/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-white bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }} >
      
      <motion.h1 
        className="mb-4 overflow-hidden text-6xl font-bold border-r-4 border-white whitespace-nowrap"
        initial="hidden"
        animate="visible"
        variants={typingAnimation}
        key={userName}
      >
        Welcome, {userName}!
      </motion.h1>
      
      <motion.p 
        className="mb-8 text-xl"
        style={{ fontFamily: 'Roboto, sans-serif' }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
        Manage your assets efficiently.
      </motion.p>
      
      <Link to="/microsoft">
        <motion.button 
          className="px-8 py-4 text-lg text-white transition-transform duration-300 ease-in-out transform rounded-full shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            backgroundColor: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"],
            boxShadow: ["0px 0px 0px rgba(255, 255, 255, 0.2)", "0px 0px 8px rgba(255, 255, 255, 0.5)", "0px 0px 0px rgba(255, 255, 255, 0.2)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  );
};

export default LandingPage;
