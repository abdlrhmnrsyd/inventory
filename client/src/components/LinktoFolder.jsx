import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2, Eye, Info, ArrowLeft, Folder, Home } from "lucide-react"; // Import Home icon

function LinktoFolder() {
  const [folderPath, setFolderPath] = useState("");
  const [folderTitle, setFolderTitle] = useState("");
  const [savedPaths, setSavedPaths] = useState([]);
  const [folderContents, setFolderContents] = useState({ files: [], folders: [] });
  const [isViewingContents, setIsViewingContents] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [pathHistory, setPathHistory] = useState([]); // New state to track path history
  const [isFormVisible, setIsFormVisible] = useState(false); // New state to control form visibility

  useEffect(() => {
    const loadedPaths = JSON.parse(localStorage.getItem("savedPaths") || "[]");
    setSavedPaths(loadedPaths);
  }, []);

  const handleSavePath = () => {
    if (folderPath && folderTitle) {
      const newPath = { title: folderTitle, path: folderPath };
      const updatedPaths = [...savedPaths, newPath];
      setSavedPaths(updatedPaths);
      localStorage.setItem("savedPaths", JSON.stringify(updatedPaths));
      setFolderPath("");
      setFolderTitle("");
      Swal.fire("Success", "Path saved successfully!", "success");
    } else {
      Swal.fire("Error", "Please enter both a title and a path.", "error");
    }
  };

  const handleDeletePath = (pathToDelete) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPaths = savedPaths.filter(
          (item) => item.path !== pathToDelete
        );
        setSavedPaths(updatedPaths);
        if (currentPath === pathToDelete) {
          setIsViewingContents(false);
          setFolderContents({ files: [], folders: [] });
          setCurrentPath("");
          setPathHistory([]);
        }
        Swal.fire(
          'Deleted!',
          'Your folder has been deleted.',
          'success'
        );
      }
    });
  };

  const handleGetFolderContents = async (pathToCheck) => {
    const path = pathToCheck || folderPath;
    try {
      const response = await axios.post("http://localhost:3001/folder-contents", {
        folderPath: path,
      });
      const { files, folders } = response.data;
      setFolderContents({ files, folders });
      setIsViewingContents(true);
      if (currentPath) {
        setPathHistory((prevHistory) => [...prevHistory, currentPath]); // Update path history
      }
      setCurrentPath(path);
    } catch (error) {
      console.error("Error fetching folder contents:", error);
      Swal.fire("Error", "Failed to fetch folder contents.", "error");
    }
  };

  const handleOpenFile = async (fileName) => {
    const filePath = `${currentPath}/${fileName}`;
    try {
      console.log("Data yang akan dikirim:", JSON.stringify({ filePath }, null, 2));
      const response = await axios.post("http://localhost:3001/open-file", { filePath });
      console.log("Response dari server:", response.data);
      Swal.fire("Success", response.data.message, "success");
    } catch (error) {
      console.error("Error opening file:", error);
      if (error.response) {
        Swal.fire("Error", `Error: ${error.response.data.error}`, "error");
      } else {
        Swal.fire("Error", `Error: ${error.message}`, "error");
      }
    }
  };

  const handleBack = () => {
    if (currentPath) {
      const pathSegments = currentPath.split('/');
      if (pathSegments.length > 1) {
        const newPath = pathSegments.slice(0, -1).join('/');
        setCurrentPath(newPath);
        handleGetFolderContents(newPath);
      } else {
        setIsViewingContents(false);
        setFolderContents({ files: [], folders: [] });
        setCurrentPath("");
      }
    } else {
      setIsViewingContents(false);
      setFolderContents({ files: [], folders: [] });
      setCurrentPath("");
    }
  };
  const handleReturnToSavedPaths = () => {
    setIsViewingContents(false);
    setFolderContents({ files: [], folders: [] });
    setCurrentPath("");
    setPathHistory([]);
  };

  return (
    <div className="p-6 mt-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">
        Link to Folder
      </h2>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="px-4 py-2 mb-4 text-white transition-colors bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg"
      >
        {isFormVisible ? "Hide Add Path Form" : "Add Path"}
      </button>
      {isFormVisible && (
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
            onClick={handleSavePath}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg"
          >
            Save
          </button>
          <button
            onClick={() => handleGetFolderContents()}
            className="px-4 py-2 text-white transition-colors bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg"
          >
            Get Folder Contents
          </button>
        </div>
      )}

      {savedPaths.length > 0 && (
  <div className="p-6 mt-4 bg-gray-700 rounded-lg"> {/* Increased padding */}
    <h3 className="text-xl font-semibold text-gray-300">Your paths:</h3> {/* Increased font size */}
    <div className="flex flex-wrap gap-6"> {/* Increased gap */}
      {savedPaths.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-start justify-between p-4 transition-colors bg-gray-600 rounded-lg hover:bg-gray-500"
        >
          <button
            className="text-lg text-blue-300 transition-colors duration-200 cursor-pointer hover:underline" 
            onClick={() => handleGetFolderContents(item.path)}
          >
            {item.title || item.path}
          </button>
          
          <div className="flex mt-2 space-x-4"> {/* Adjusted position */}
            <button
              className="text-green-500 hover:text-green-700"
              onClick={() => handleGetFolderContents(item.path)}
            >
              <Eye size={20} /> {/* Increased icon size */}
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeletePath(item.path)}
            >
              <Trash2 size={20} /> {/* Increased icon size */}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      {isViewingContents && (
  <div className="p-4 mt-4 bg-gray-700 rounded-lg" style={{ maxHeight: '400px', overflowY: 'auto' }}>
    <div className="flex mb-4 space-x-4">
      <button
        onClick={handleBack}
        className="flex items-center px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back
      </button>
      <button
        onClick={handleReturnToSavedPaths}
        className="flex items-center px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg"
      >
        <Home size={16} className="mr-2" />
        Return to Saved Paths
      </button>
    </div>
    <h3 className="mb-2 text-lg font-semibold text-gray-300">Folder Contents:</h3>
    <p className="mb-2 text-sm text-gray-400">Current Path: {currentPath}</p>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div>
        <h4 className="font-semibold text-gray-300 text-md">Folders:</h4>
        <ul className="text-gray-300 list-disc list-inside">
          {folderContents.folders.map((folder, index) => (
            <li
              key={index}
              className="flex items-center cursor-pointer hover:underline"
              onClick={() => handleGetFolderContents(`${currentPath}/${folder}`)}
            >
              <Folder size={16} className="mr-2" />
              {folder}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-gray-300 text-md">Files:</h4>
        <ul className="text-gray-300 list-disc list-inside">
          {folderContents.files.map((file, index) => (
            <li
              key={index}
              className="cursor-pointer hover:underline"
              onClick={() => handleOpenFile(file)}
            >
              {file}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default LinktoFolder;