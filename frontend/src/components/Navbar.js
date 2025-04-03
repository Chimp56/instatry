// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  // Optionally hide Navbar on login/signup pages.
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
      <Link to="/">Dashboard</Link> | <Link to="/cart">Cart</Link> |{" "}
      {user ? (
        <>
          <Link to="/sell">Sell/Upload AR Item</Link> |{" "}
          <Link to="/profile">Profile</Link> |{" "}
          <span>Welcome, {user}!</span>
          <button onClick={onLogout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
