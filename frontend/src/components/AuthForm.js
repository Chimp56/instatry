// src/components/AuthForm.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/authStyles.css';

// AuthForm component
// A reusable component for authentication forms (login/signup)
// Includes a logo, title, form fields, and a footer with a link to the opposite page

const AuthForm = ({ 
  title, 
  children, 
  footerText, 
  footerLinkText, 
  footerLinkPath 
}) => {
  return (
    <div className="auth-container">
      <div className="logo-container">
        <img 
          src="/logo.png" 
          alt="App Logo" 
          className="auth-logo" 
        />
      </div>
      
      <h2 className="auth-title">{title}</h2>
      
      {children}
      
      <div className="auth-footer">
        <p>
          {footerText}{" "}
          <Link to={footerLinkPath} className="auth-link">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;