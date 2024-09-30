import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function LinktoFolder() {
  const [folderPath, setFolderPath] = useState("");
  const [folderTitle, setFolderTitle] = useState(""); // State untuk menyimpan judul folder
  const [savedPaths, setSavedPaths] = useState([]); // Array untuk menyimpan semua path yang disimpan
  const [folderContents, setFolderContents] = useState([]); // State untuk menyimpan isi folder

  // Load saved paths from localStorage on component mount
  useEffect(() => {
    const storedPaths = JSON.parse(localStorage.getItem("savedPaths")) || [];
    setSavedPaths(storedPaths);
  }, []);

  // Save paths to localStorage whenever savedPaths changes
  useEffect(() => {
    localStorage.setItem("savedPaths", JSON.stringify(savedPaths));
  }, [savedPaths]);

  const handleDeletePath = (pathToDelete) => {
    const updatedPaths = savedPaths.filter(
      (item) => item.path !== pathToDelete
    );
    setSavedPaths(updatedPaths);
  };

  const handleGetFolderContents = async (pathToOpen) => {
    const path = pathToOpen || folderPath;
    if (path) {
      try {
        const data = { folderPath: path };
        console.log("Data yang akan dikirim:", JSON.stringify(data, null, 2));

        const response = await axios.post(
          "http://localhost:3001/folder-contents",
          data
        );
        console.log("Response dari server:", response.data);
        setFolderContents(response.data.files);
        Swal.fire(
          "Success",
          "Folder contents retrieved successfully!",
          "success"
        );
      } catch (error) {
        console.error("Error getting folder contents:", error);
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

  const handleOpenFile = async (fileName) => {
    const filePath = `${folderPath}/${fileName}`;
    try {
      const data = { filePath };
      console.log("Data yang akan dikirim:", JSON.stringify(data, null, 2));

      const response = await axios.post(
        "http://localhost:3001/open-file",
        data
      );
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

  return (
    <div className="p-6 mt-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">
        Link to Folder
      </h2>
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
          onClick={() => handleGetFolderContents()}
          className="px-4 py-2 text-white transition-colors bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg"
        >
          Get Folder Contents
        </button>
      </div>

      {savedPaths.length > 0 && (
        <div className="p-4 mt-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300">Your path:</h3>
          <div className="flex flex-col space-y-2">
            {savedPaths.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 transition-colors bg-gray-600 rounded-lg hover:bg-gray-500"
              >
                <button
                  className="text-blue-300 transition-colors duration-200 cursor-pointer hover:underline"
                  onClick={() => handleOpenFolder(item.path)}
                >
                  {item.title || item.path}{" "}
                  {/* Tampilkan judul atau path jika judul tidak ada */}
                </button>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeletePath(item.path)}
                >
                  Delete
                </button>
                <button
                  className="ml-2 text-green-500 hover:text-green-700"
                  onClick={() => handleGetFolderContents(item.path)}
                >
                  View Contents
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {folderContents.length > 0 && (
        <div className="p-4 mt-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300">
            Folder Contents:
          </h3>
          <ul className="text-gray-300 list-disc list-inside">
            {folderContents.map((file, index) => (
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
      )}
    </div>
  );
}

export default LinktoFolder;
