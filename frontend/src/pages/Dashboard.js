// src/pages/Dashboard.js
import React, { useState, useContext } from "react";
import { productsData } from "../data/products";
import { CartContext } from "../context/CartContext";
import ARTryOn3D from "../components/ARTryOn3D"; // Our AR try-on component

const Dashboard = ({ onLogout }) => {
  const [products] = useState(productsData);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleTryOn = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseAR = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>InstaFit Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "200px",
              marginBottom: "1rem",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button onClick={() => handleTryOn(product)}>Try On</button>
            </div>
          </div>
        ))}
      </div>
      {/* Render AR try-on if a product is selected */}
      {selectedProduct && (
        <ARTryOn3D product={selectedProduct} onClose={handleCloseAR} />
      )}
    </div>
  );
};

export default Dashboard;
