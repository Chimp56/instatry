import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaUpload, FaBars, FaTimes } from "react-icons/fa";
import logo from "../data/assets/logo.png";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <img src={logo} alt="InstaFit Logo" className="navbar-logo" />
        </Link>
      </div>

      {/* Hamburger icon for mobile view */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes className="nav-icon" /> : <FaBars className="nav-icon" />}
      </div>

      {/* Right nav links for desktop; hidden on mobile */}
      <div className="navbar-right">
        <Link to="/cart" className="nav-link">
          <FaShoppingCart className="nav-icon" />
          <span className="link-text">Cart</span>
        </Link>

        {user ? (
          <>
            <Link to="/sell" className="nav-link">
              <FaUpload className="nav-icon" />
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

      {/* Mobile menu overlay */}
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
              <button onClick={() => { onLogout(); closeMobileMenu(); }} className="logout-btn">
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
