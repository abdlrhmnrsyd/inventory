import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeftFromLine } from 'lucide-react';
import logo from '../assets/avatar.jpg';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
  const [profile, setProfile] = useState({ name: '', username: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3001/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
        setError(''); // Clear any previous errors
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center w-full p-2 bg-white border-2 border-gray-300 rounded-lg shadow-md cursor-pointer" onClick={() => window.location.href = '/profile'}> {/* Added cursor-pointer class */}
        
      <img
        src={logo}
        alt="Avatar"
        className="w-10 h-10 mr-4 rounded-full"
      />
        <Link to="/profile">
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{profile.name}</h2>
        <p className="text-sm text-gray-600">@{profile.username}</p>
      </div>
      </Link>
      
    </div>
  );
};

export default ProfileCard;
