import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function LinktoFolder() {
  const [folderPath, setFolderPath] = useState("");
  const [folderTitle, setFolderTitle] = useState(""); // State untuk menyimpan judul folder
  const [savedPaths, setSavedPaths] = useState([]); // Array untuk menyimpan semua path yang disimpan

  // Load saved paths from localStorage on component mount
  useEffect(() => {
    const storedPaths = JSON.parse(localStorage.getItem('savedPaths')) || [];
    setSavedPaths(storedPaths);
  }, []);

  // Save paths to localStorage whenever savedPaths changes
  useEffect(() => {
    localStorage.setItem('savedPaths', JSON.stringify(savedPaths));
  }, [savedPaths]);

  const handleOpenFolder = async (pathToOpen) => {
    const path = pathToOpen || folderPath;
    if (path) {
      try {
        const data = { folderPath: path };
        console.log('Data yang akan dikirim:', JSON.stringify(data, null, 2));

        const response = await axios.post('http://localhost:3001/open-folder', data);
        console.log('Response dari server:', response.data);
        Swal.fire("Success", response.data.message, "success");

        // Simpan path dan judul jika belum ada
        if (!savedPaths.some(item => item.path === path)) {
          setSavedPaths([...savedPaths, { path, title: folderTitle }]);
        }
        setFolderPath("");
        setFolderTitle(""); // Reset judul setelah membuka folder
      } catch (error) {
        console.error('Error opening folder:', error);
        if (error.response) {
          Swal.fire("Error", `Error: ${error.response.data.error}`, "error");
        } else {
          Swal.fire("Error", `Error: ${error.message}`, "error");
        }
      }
    } else {
      Swal.fire("Warning", "please fill in the path.", "warning");
    }
  };

  const handleDeletePath = (pathToDelete) => {
    const updatedPaths = savedPaths.filter(item => item.path !== pathToDelete);
    setSavedPaths(updatedPaths);
  };

  return (
    <div className="p-6 mt-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400"></h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={folderPath}
          onChange={(e) => setFolderPath(e.target.value)}
          className="input input-bordered w-full max-w-lg bg-[#2F4F4F] text-gray-200 border-[#47bcbc] hover:border-[#3A6363] focus:border-[#3A6363] transition-colors p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter path"
        />
        <input
          type="text"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
          className="input input-bordered w-full max-w-lg bg-[#2F4F4F] text-gray-200 border-[#47bcbc] hover:border-[#3A6363] focus:border-[#3A6363] transition-colors p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
        />
        <button
          onClick={() => handleOpenFolder()}
          className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg"
        >
          Open Folder
        </button>
      </div>

      {savedPaths.length > 0 && (
        <div className="p-4 mt-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300">Your path:</h3>
          <div className="flex flex-col space-y-2">
            {savedPaths.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 transition-colors bg-gray-600 rounded-lg hover:bg-gray-500">
                <button
                  className="text-blue-300 transition-colors duration-200 cursor-pointer hover:underline"
                  onClick={() => handleOpenFolder(item.path)}
                >
                  {item.title || item.path} {/* Tampilkan judul atau path jika judul tidak ada */}
                </button>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeletePath(item.path)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LinktoFolder;
