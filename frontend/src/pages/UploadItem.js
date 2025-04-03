// src/pages/UploadItem.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate posting the item (later replace with API call)
    console.log("Item posted:", { title, price, description, imageFile });
    alert("Your item has been posted for sale!");
    navigate("/"); // redirect to dashboard after posting
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Sell Your Item</h2>
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
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Post Item
        </button>
      </form>
    </div>
  );
};

export default UploadItem;
