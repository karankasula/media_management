import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./App.css";

const BASE_URL = "http://127.0.0.1:8000/api/v1";
const BASE = "http://127.0.0.1:8000";
function App() {
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const fetchAllFiles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/media/list/`);
      setFiles(response.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setError("Please select at least one file to upload.");
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    try {
      const response = await axios.post(`${BASE_URL}/media/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError("");
      alert("FIle uploaded successfully");
      toast.success("Files uploaded successfully");
      fetchAllFiles();
    } catch (error) {
      const errorMessages = error.response.data;
      setError(Object.values(errorMessages).join(" "));
      toast.error("Something went wrong");
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/media/delete/${fileId}/`
      );
      fetchAllFiles();
      alert("File deleted successfully");

      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleFileDownload = async (fileId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/media/download/${fileId}/`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      const filename = response.headers["content-disposition"]
        ? response.headers["content-disposition"]
            .split("filename=")[1]
            .replace(/"/g, "")
        : "downloaded_file";

      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);
  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input
          style={{ border: "1px solid white", padding: "6px" }}
          type="file"
          multiple
          onChange={(e) => {
            setSelectedFiles([...e.target.files]);
            setError("");
          }}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" style={{ marginLeft: "10px" }}>
          Upload
        </button>
      </form>

      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} ({file.size} bytes)
            <button
              style={{ margin: "10px" }}
              onClick={() => handleFileDownload(file.id, file.name)}
            >
              Download
            </button>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleFileDelete(file.id)}
            >
              Delete
            </button>
            {/* <button
              style={{ margin: "10px" }}
              onClick={() => setPreviewFile(true)}
            >
              View
            </button> */}
            {/* {previewFile && (
              <div>
                <h3>Preview: {file.category}</h3>
                {file.category == "Image" && (
                  <img src={file.file_path} alt={file.name} />
                )}
                {file.category == "Video" && (
                  <video src={file.file_path} controls width="640" />
                )}
                {file.category == "Audio" && (
                  <audio src={file.file_path} controls />
                )}

                <button onClick={() => setPreviewFile(null)}>
                  Close Preview
                </button>
              </div>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
