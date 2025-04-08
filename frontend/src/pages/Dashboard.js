// src/pages/Dashboard.js
import React, { useState, useContext } from "react";
import { productsData } from "../data/products";
import { CartContext } from "../context/CartContext";
import ARTryOn3D from "../components/ARTryOn3D"; // Our AR try-on component
import "../styles/Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [products] = useState(productsData);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleTryOn = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseAR = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>InstaFit Dashboard</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.description}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/assets/logo.png';
                }}
              />
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price}</p>
              <div className="product-actions">
                <button
                  className="action-btn add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="action-btn try-on"
                  onClick={() => handleTryOn(product)}
                >
                  Try On
                </button>
              </div>
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