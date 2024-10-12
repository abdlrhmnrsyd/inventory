import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './assets/ali.jpg';
import Logo from './assets/logo.png';
import { Link } from "react-router-dom";
import { User, Lock } from 'lucide-react'; // Import the User and Lock icons

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token); // Simpan token
      localStorage.setItem('username', response.data.username); // Simpan username
      setError('');
      window.location.href = '/welcome'; // Redirect ke halaman Welcome setelah login
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || 'Error');
      setError(err.response?.data?.message || 'Error during login.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                April Learning Institute
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                <Link to="/register">April</Link> Learning Institute is one of APRIL Group's
                efforts to provide training to develop capabilities, increase knowledge, and skills of employees in the
                pulp and paper industry, as well as meeting your career development needs, with a focus on innovation
                and technology.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src={Logo}
                  alt="Logo"
                />
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <User className="w-5 h-5 mx-2 text-gray-400" /> {/* User icon */}
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <Lock className="w-5 h-5 mx-2 text-gray-400" /> {/* Lock icon */}
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;