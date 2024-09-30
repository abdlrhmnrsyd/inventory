import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Info, Database, Monitor, Server, Network, Briefcase, FolderTree, BookOpen, BarChartHorizontal, Folder } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import Navbar from "../../components/Navbar"; // Import Navbar
import ProfileCard from '../../components/ProfileCard';
import axios from 'axios';

function ProjectComponent() {

  const [selectedPath, setSelectedPath] = useState(''); // Path yang dipilih
  const [folderContents, setFolderContents] = useState([]); // Isi folder
  const [rootFolders, setRootFolders] = useState([]); // Folder root untuk ditampilkan pertama kali

  // Fungsi untuk mengambil isi folder berdasarkan path yang diklik
  const handleFolderClick = (path) => {
    setSelectedPath(path);
  };

  // Ambil isi folder saat path dipilih
  useEffect(() => {
    if (selectedPath) {
      axios.get(/api/folder-contents?path=${selectedPath})
        .then(response => {
          setFolderContents(response.data.files); // Set isi folder yang dipilih
        })
        .catch(error => {
          console.error('Error fetching folder contents:', error);
        });
    }
  }, [selectedPath]);

  // Ambil folder root saat pertama kali komponen dimuat
  useEffect(() => {
    axios.get(/api/folder-contents?path=/) // Ambil isi folder root
      .then(response => {
        setRootFolders(response.data.files); // Set folder root
      })
      .catch(error => {
        console.error('Error fetching root folder contents:', error);
      });
  }, []);

  return (
    <>
      <div className="flex">
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
            <SidebarItem icon={<Briefcase size={20} />} text="Project" active />
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

        <div className="flex-1 p-6 main-content">
          <h2>Folder Management</h2>

          {/* Tampilkan daftar folder root */}
          {!selectedPath && (
            <div>
              <h3>Root Folders</h3>
              <ul>
                {rootFolders.map((folder, index) => (
                  <li key={index} onClick={() => handleFolderClick(/${folder})} style={{ cursor: 'pointer', color: 'blue' }}>
                    {folder}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Jika folder dipilih, tampilkan isi folder */}
          {selectedPath && (
            <div>
              <h3>Contents of {selectedPath}</h3>
              <ul>
                {folderContents.map((file, index) => (
                  <li key={index} onClick={() => handleFolderClick(${selectedPath}/${file})} style={{ cursor: 'pointer', color: 'green' }}>
                    {file}
                  </li>
                ))}
              </ul>
              {/* Tombol untuk kembali ke folder sebelumnya */}
              <button onClick={() => setSelectedPath('')} style={{ marginTop: '20px' }}>Back to Root</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectComponent;
