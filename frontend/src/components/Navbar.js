import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaUpload,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../styles/Navbar.css";

// Navbar component with auth-aware links
const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  // Mobile menu toggle state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu on link click
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    // Main navbar container
    <nav className="navbar">
      {/* Logo section, left-aligned */}
      <div className="navbar-left">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="InstaFit Logo" className="navbar-logo" />
        </Link>
      </div>

      {/* Hamburger icon for mobile view */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <FaTimes className="nav-icon" />
        ) : (
          <FaBars className="nav-icon" />
        )}
      </div>

      {/* Main navigation links (desktop) */}
      <div className="navbar-right">
        {/* Cart link */}
        <Link to="/cart" className="nav-link">
          <FaShoppingCart className="nav-icon" />
          <span className="link-text">Cart</span>
        </Link>

        {/* Authenticated user links */}
        {user ? (
          <>
            {/* Sell item link */}
            <Link to="/sell" className="nav-link">
              <FaUpload className="nav-icon" />
              <span className="link-text">Sell Item</span>
            </Link>

            {/* Profile + Logout section */}
            <div className="user-section">
              <Link to="/profile" className="nav-link">
                <FaUserCircle className="nav-icon" />
                <span className="username">{user}</span>
              </Link>
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </>
        ) : (
          // Unauthenticated user links
          <>
            <Link to="/login" className="nav-link">
              <span className="link-text">Login</span>
            </Link>
            <Link to="/signup" className="nav-link">
              <span className="link-text">Sign Up</span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/cart" className="nav-link" onClick={closeMobileMenu}>
            <FaShoppingCart className="nav-icon" />
            <span className="link-text">Cart</span>
          </Link>

          {user ? (
            <>
              <Link to="/sell" className="nav-link" onClick={closeMobileMenu}>
                <FaUpload className="nav-icon" />
                <span className="link-text">Sell Item</span>
              </Link>
              <Link to="/profile" className="nav-link" onClick={closeMobileMenu}>
                <FaUserCircle className="nav-icon" />
                <span className="username">{user}</span>
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  closeMobileMenu();
                }}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMobileMenu}>
                <span className="link-text">Login</span>
              </Link>
              <Link to="/signup" className="nav-link" onClick={closeMobileMenu}>
                <span className="link-text">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
