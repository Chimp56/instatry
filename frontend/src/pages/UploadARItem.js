import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UploadARItem.css"; // Import the CSS file

// Component for uploading an item for sale, including AR assets.

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
    
    setTimeout(() => {
      const isAIGenerated = Math.random() < 0.3;
      if (isAIGenerated) {
        alert("Upload denied: The AI authenticator detected AI-generated content.");
      } else {
        alert("Your item has been successfully posted for sale!");
        navigate("/");
      }
    }, 1500);
  };

  const handleTextureFilesChange = (e) => {
    setTextureFiles(Array.from(e.target.files));
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>Upload Item for Sale</h2>
      </div>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Item Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Custom File Upload for Product Image */}
        <div className="form-group">
          <label htmlFor="image">Product Image:</label>
          <label htmlFor="image" className="custom-file-upload">
            {imageFile ? imageFile.name : "Choose File"}
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>

        <div className="checkbox-group">
          <input
            id="includeAR"
            type="checkbox"
            checked={includeAR}
            onChange={(e) => setIncludeAR(e.target.checked)}
          />
          <label htmlFor="includeAR">Include AR Try-On Assets</label>
        </div>

        {includeAR && (
          <>
            <div className="form-group">
              <label htmlFor="gltf">3D Model (GLTF file):</label>
              <label htmlFor="gltf" className="custom-file-upload">
                {gltfFile ? gltfFile.name : "Choose File"}
              </label>
              <input
                id="gltf"
                type="file"
                accept=".gltf"
                onChange={(e) => setGltfFile(e.target.files[0])}
                required={includeAR}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bin">3D Model Binary (BIN file):</label>
              <label htmlFor="bin" className="custom-file-upload">
                {binFile ? binFile.name : "Choose File"}
              </label>
              <input
                id="bin"
                type="file"
                accept=".bin"
                onChange={(e) => setBinFile(e.target.files[0])}
                required={includeAR}
              />
            </div>
            <div className="form-group">
              <label htmlFor="textures">
                Textures (optional; multiple allowed):
              </label>
              <label htmlFor="textures" className="custom-file-upload">
                {textureFiles.length > 0 ? `${textureFiles.length} file(s) selected` : "Choose Files"}
              </label>
              <input
                id="textures"
                type="file"
                accept="image/*"
                multiple
                onChange={handleTextureFilesChange}
              />
            </div>
          </>
        )}
        <button type="submit">Post Item</button>
      </form>
    </div>
  );
};

export default UploadARItem;
