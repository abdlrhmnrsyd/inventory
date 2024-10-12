import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Redirect after successful registration

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/register', formData);
      setSuccess('Registration successful!');
      setError('');
      setFormData({
        username: '',
        password: '',
        name: '',
      });
      setTimeout(() => navigate('/'), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 transition-transform transform bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Register</h1>
        
        {success && <div className="p-2 mb-4 text-green-800 bg-green-100 rounded-md">{success}</div>}
        {error && <div className="p-2 mb-4 text-red-800 bg-red-100 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mb-3 text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
          <Link to="/">
            <button
              type="button"
              className="w-full px-4 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
