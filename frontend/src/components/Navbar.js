// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import logo from "../data/assets/logo.png";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  // Optionally hide Navbar on login/signup pages.
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    
    <nav style={styles.navbar}>
    <div style={styles.leftSection}>
      <Link to="/" style={styles.logoLink}>
        <img src={logo} alt="InstaFit Logo" style={styles.logo} />
      </Link>
    </div>

    <div style={styles.rightSection}>
      <Link to="/cart" style={styles.navLink}>
        <FaShoppingCart style={styles.icon} />
        <span style={styles.linkText}>Cart</span>
      </Link>

      {user ? (
        <>
          <Link to="/sell" style={styles.navLink}>
            <span style={styles.linkText}>Sell Item</span>
          </Link>
          <div style={styles.userSection}>
            <Link to="/profile" style={styles.navLink}>
              <FaUserCircle style={styles.icon} />
              <span style={styles.userName}>{user}</span>
            </Link>
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" style={styles.navLink}>
            <span style={styles.linkText}>Login</span>
          </Link>
          <Link to="/signup" style={styles.navLink}>
            <span style={styles.linkText}>Sign Up</span>
          </Link>
        </>
      )}
    </div>
  </nav>
);
};

// Styles
const styles = {
navbar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  zIndex: 100
},
leftSection: {
  display: "flex",
  alignItems: "left center"
},
logoLink: {
  display: "flex",
  alignItems: "center"
},
logo: {
  height: "40px",
  width: "auto"
},
rightSection: {
  display: "flex",
  alignItems: "center",
  gap: "1.5rem"
},
navLink: {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "#333",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "0.9rem",
  transition: "color 0.2s",
  ":hover": {
    color: "#F25C5C"
  }
},
icon: {
  fontSize: "1.2rem"
},
linkText: {
  marginLeft: "0.3rem"
},
userSection: {
  display: "flex",
  alignItems: "center",
  gap: "1rem"
},
userName: {
  marginLeft: "0.3rem",
  fontWeight: "600"
},
logoutButton: {
  padding: "0.4rem 0.8rem",
  backgroundColor: "#F25C5C",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.8rem",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#A43E3E"
  }
}
};

export default Navbar;
