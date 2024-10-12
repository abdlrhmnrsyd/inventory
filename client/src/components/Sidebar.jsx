import { ChevronFirst, ChevronLast, LogOut } from "lucide-react";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.jpg";
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // Tambahkan import useNavigate
import '../index.css';
import Swal from 'sweetalert2'; // Tambahkan import SweetAlert2

const SidebarContext = createContext();


// ProfileCard component
const ProfileCard = () => {
  const { expanded } = useContext(SidebarContext); // Ambil expanded dari SidebarContext
  const [profile, setProfile] = useState({ name: '', username: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inisialisasi useNavigate

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
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Anda yakin ingin logout?',
      text: "Anda akan keluar dari akun Anda.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, logout!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/'); // Arahkan ke halaman login
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <li className="relative flex flex-col items-start px-3 py-2 my-1 font-medium transition-colors rounded-md cursor-pointer group">
      <Link to="/profile" className="w-full">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-200 rounded-full">
            {/* Avatar selalu ditampilkan */}
            <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
          {/* Nama hanya muncul saat sidebar diperluas */}
          {expanded && (
            <span className="text-gray-800">
              <h2 className="text-lg font-semibold">{profile.name}</h2>
            </span>
          )}
        </div>
      </Link>
      <br />
      <button 
  onClick={handleLogout} 
  className="flex items-center p-2 text-gray-600 transition duration-200 rounded-md hover:bg-gray-200"
>
  <LogOut className="mr-2" /> {/* Ikon logout selalu ditampilkan */}
  {expanded && <span>Logout</span>} {/* Teks logout hanya muncul jika sidebar diperluas */}
</button>
    </li>
  );
};

// Sidebar component
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="flex flex-col h-full bg-white border-r shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
  <ul className="flex-1 px-3">
    {children}

    {/* ProfileCard selalu ditampilkan */}
    <ProfileCard />
  </ul>
</SidebarContext.Provider>

      </nav>
    </aside>
  );
}

// SidebarItem component
export function SidebarItem({ icon, text, active }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <span className={`flex items-center justify-center w-8 h-8 text-lg ${expanded ? "mr-3" : ""}`}>
        {icon}
      </span>
      <span className={`overflow-hidden transition-all ${expanded ? "block" : "hidden"}`}>{text}</span>

      {!expanded && (
        <div className="absolute invisible px-2 py-1 ml-4 text-sm text-indigo-800 transition-all bg-indigo-100 rounded-md opacity-0 left-full group-hover:visible group-hover:opacity-100">
          {text}
        </div>
      )}
    </li>
  );
}


