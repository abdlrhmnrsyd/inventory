import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Info, Database, Monitor, Server, Network, Briefcase, FolderTree, BookOpen, BarChartHorizontal, Folder } from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Navbar from "./components/Navbar"; // Import Navbar
import ProfileCard from './components/ProfileCard';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
        setError('');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setProfile(null);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put('http://localhost:3001/profile/change-password', {
        oldPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data.message || 'Failed to change password.');
      setMessage('');
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar>
          <Link to="/budget">
            <SidebarItem icon={<Database size={20} />} text="ISA" />
          </Link>
          <Link to="/pc">
            <SidebarItem icon={<Monitor size={20} />} text="PC" />
          </Link>
          <Link to="/dc">
            <SidebarItem icon={<Server size={20} />} text="DC" />
          </Link>
          <Link to="/telnet">
            <SidebarItem icon={<Network size={20} />} text="Telnet" />
          </Link>
          <Link to="/project">
            <SidebarItem icon={<Briefcase size={20} />} text="Project" />
          </Link>
          <Link to="/cab">
            <SidebarItem icon={<FolderTree size={20} />} text="CAB" />
          </Link>
          <Link to="/sop_cp">
            <SidebarItem icon={<BookOpen size={20} />} text="SOP/CP" />
          </Link>
          <Link to="/SurveyFeedbackAveris">
            <SidebarItem icon={<BarChartHorizontal size={20} />} text="Survey Feedback Averis" />
          </Link>
          <Link to="/OtherDocuments">
            <SidebarItem icon={<Folder size={20} />} text="Other Documents" />
          </Link>
          <Link to="/help">
            <SidebarItem icon={<Info size={20} />} text="Help" />
          </Link>
          <hr className="my-3" />
        </Sidebar>

        <div className="flex-1 p-6">
          <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Profile</h1>

            {loading ? (
              <div className="text-center text-gray-500">Loading profile...</div>
            ) : profile ? (
              <div className="mb-8">
                <div className="mb-4">
                  <span className="font-bold text-gray-700">Name:</span> {profile.name}
                </div>
                <div className="mb-4">
                  <span className="font-bold text-gray-700">Username:</span> {profile.username}
                </div>
              </div>
            ) : (
              <div className="text-red-500">{error}</div>
            )}

            <h2 className="mb-6 text-2xl font-bold text-gray-900">Change Password</h2>

            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 font-bold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Change Password
              </button>

              {message && !error && <div className="mt-4 text-green-500">{message}</div>}
              {error && !message && <div className="mt-4 text-red-500">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
