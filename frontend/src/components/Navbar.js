// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import logo from "../data/assets/logo.png";
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="InstaFit Logo" className="navbar-logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="nav-link">
          <FaShoppingCart className="nav-icon" />
          <span className="link-text">Cart</span>
        </Link>

        {user ? (
          <>
            <Link to="/sell" className="nav-link">
              <span className="link-text">Sell Item</span>
            </Link>
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
    </nav>
  );
};

export default Navbar;
