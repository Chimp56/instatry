// src/pages/UploadARItem.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadARItem = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  // Checkbox for including AR assets.
  const [includeAR, setIncludeAR] = useState(false);
  const [gltfFile, setGltfFile] = useState(null);
  const [binFile, setBinFile] = useState(null);
  const [textureFiles, setTextureFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Package the data to be sent to the backend (simulated here)
    const formData = {
      title,
      price,
      description,
      imageFile,
      includeAR,
      gltfFile: includeAR ? gltfFile : null,
      binFile: includeAR ? binFile : null,
      textureFiles: includeAR ? textureFiles : [],
    };

    console.log("Submitting AR Item with data:", formData);
    
    // Simulate an AI authentication check with a delay.
    setTimeout(() => {
      // Simulate a 30% chance the content is flagged as AI-generated.
      const isAIGenerated = Math.random() < 0.3;
      if (isAIGenerated) {
        alert("Upload denied: The AI authenticator detected AI-generated content.");
      } else {
        alert("Your item has been successfully posted for sale!");
        // In a real app, you'd update your products list or trigger a re-fetch.
        navigate("/"); // Redirect to dashboard after successful posting.
      }
    }, 1500); // Simulated delay of 1.5 seconds
  };

  const handleTextureFilesChange = (e) => {
    setTextureFiles(Array.from(e.target.files));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Upload Item for Sale</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">Item Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="image">Product Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="checkbox"
              checked={includeAR}
              onChange={(e) => setIncludeAR(e.target.checked)}
            />
            {" "}Include AR Try-On Assets
          </label>
        </div>
        {includeAR && (
          <>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="gltf">3D Model (GLTF file):</label>
              <input
                id="gltf"
                type="file"
                accept=".gltf"
                onChange={(e) => setGltfFile(e.target.files[0])}
                required={includeAR}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="bin">3D Model Binary (BIN file):</label>
              <input
                id="bin"
                type="file"
                accept=".bin"
                onChange={(e) => setBinFile(e.target.files[0])}
                required={includeAR}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="textures">Textures (optional; multiple allowed):</label>
              <input
                id="textures"
                type="file"
                accept="image/*"
                multiple
                onChange={handleTextureFilesChange}
                style={{ width: "100%" }}
              />
            </div>
          </>
        )}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Post Item
        </button>
      </form>
    </div>
  );
};

export default UploadARItem;
