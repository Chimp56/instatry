// src/pages/Dashboard.js
import React, { useState, useEffect, useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import ARTryOn3D from "../components/ARTryOn3D";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchProducts, mediaURL } from "../api/api";
import "../styles/Dashboard.css";

import { motion } from "framer-motion";

const Dashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchTerm]);
// filter products
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleTryOn = (product) => setSelectedProduct(product);
  const handleCloseAR = () => setSelectedProduct(null);
// AR Try On with dashboard Sizing.
  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section with Background Image */}
      <div className="dashboard-hero">
        <h1 className="dashboard-title">InstaFit: Your Fashion Marketplace</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="clear-search-btn"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={12} />
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={`${mediaURL}${product.image_filename}`}
                  alt={product.description}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/logo.png";
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
      )}

      {selectedProduct && (
        <ARTryOn3D
          product={selectedProduct}
          onClose={handleCloseAR}
          mediaURL={mediaURL}
        />
      )}
    </motion.div>
  );
};

export default Dashboard;
