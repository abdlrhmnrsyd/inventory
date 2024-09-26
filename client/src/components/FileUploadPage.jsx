import React, { useState, useRef } from 'react';

function FileUploadPage() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState("");
  const [folderPath, setFolderPath] = useState(""); // Path folder lokal

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(URL.createObjectURL(selectedFile));
      setFileType(selectedFile.type);
      setFileName(selectedFile.name);
    }
  };

  const handleOpenFile = () => {
    if (file) {
      window.open(file); // Open file in new tab
    } else {
      alert("Please select a file first.");
    }
  };

  const handleDownloadFile = () => {
    if (file) {
      const link = document.createElement('a');
      link.href = file; // Use the object URL created for the file
      link.download = fileName; // Set the file name for download
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up
    } else {
      alert("Tidak ada file untuk diunduh.");
    }
  };

  const handleCloseFile = () => {
    setFile(null);
    setFileType(null);
    setFileName("");
    fileInputRef.current.value = ""; // Reset the file input
  };

  return (
    <div className="container min-h-screen p-8 mx-auto bg-gray-800">
      <h1 className="mb-8 text-4xl font-bold text-center text-blue-400">File Uploader</h1>
      <div className="mb-8">
        <label className="block mb-4 text-lg font-medium text-gray-300" htmlFor="file_input">Upload file</label>
        <input type="file"
          ref={fileInputRef}
          className="file-input file-input-bordered w-full max-w-lg bg-[#2F4F4F] text-gray-200 border-[#47bcbc] hover:border-[#3A6363] focus:border-[#3A6363] transition-colors"
          id="file_input"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx" // Allow Word and Excel files
        />
      </div>

      {file && (
        <div className="relative p-6 mt-8 bg-gray-700 rounded-lg shadow-lg">
          <button
            onClick={handleCloseFile}
            className="absolute px-2 py-1 text-white bg-red-500 rounded-lg top-2 right-2 hover:bg-red-600"
          >
            &times; {/* Cross symbol for closing */}
          </button>
          <h2 className="mb-4 text-2xl font-semibold text-blue-300">Preview:</h2>
          <p className="mb-4 text-gray-300">Nama File: <span className="text-blue-300">{fileName}</span></p>
          {fileType && fileType.startsWith('image/') ? (
            <img src={file} alt="File yang diunggah" className="max-w-full h-auto max-h-[600px] mx-auto rounded-lg shadow-lg" />
          ) : fileType === 'application/pdf' ? (
            <embed src={file} type="application/pdf" className="w-full h-[600px] border-2 border-gray-600 rounded-lg" />
          ) : fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'application/msword' ? (
            <p className="text-xl text-center text-gray-300">Word documents cannot be previewed directly. You can download or open the file.</p>
          ) : fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel' ? (
            <p className="text-xl text-center text-gray-300">Excel files cannot be previewed directly. You can download or open the file.</p>
          ) : (
            <p className="text-xl text-center text-red-400">Tipe file tidak didukung</p>
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleOpenFile}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Buka File
            </button>
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Download File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploadPage;