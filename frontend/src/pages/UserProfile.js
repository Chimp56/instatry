// src/pages/UploadItem.js

// Import dependencies
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// UploadItem component for selling products
const UploadItem = () => {
  // Form field state values
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Router hook for redirection
  const navigate = useNavigate();

  // Handle form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate item upload process
    console.log("Item posted:", { title, price, description, imageFile });
    alert("Your item has been posted for sale!");
    navigate("/"); // Redirect to homepage
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    // Centered container for upload form
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Sell Your Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Title input field */}
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

        {/* Price input field */}
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

        {/* Description textarea */}
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

        {/* File input for product image */}
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

        {/* Submit button to post item */}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Post Item
        </button>
      </form>
    </div>
  );
};

export default UploadItem;
