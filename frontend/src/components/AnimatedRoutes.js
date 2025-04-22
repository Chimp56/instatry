// src/AnimatedRoutes.js
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadARItem from "./pages/UploadARItem";
import UserProfile from "./pages/UserProfile";

const AnimatedRoutes = ({ user, handleLogin, handleSignup, onLogout }) => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={user ? <Dashboard onLogout={onLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/cart" 
          element={user ? <CartPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/sell" 
          element={user ? <UploadARItem /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <UserProfile user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/" /> : <SignupPage onSignup={handleSignup} />} 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
