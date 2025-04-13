// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadARItem from "./pages/UploadARItem";
import UserProfile from "./pages/UserProfile";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
    console.log("User logged in:", username);
  };

  const handleSignup = (username) => {
    setUser(username);
    console.log("User signed up:", username);
  };

  const handleLogout = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={user ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <CartPage username={user} /> : <Navigate to="/login" />} />
        <Route path="/sell" element={user ? <UploadARItem /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <UserProfile user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupPage onSignup={handleSignup} />} />
      </Routes>
    </Router>
  );
}

export default App;
