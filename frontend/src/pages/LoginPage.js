// Import dependencies and styles
import React, { useState } from "react";
import AuthForm from '../components/AuthForm';
import '../styles/authStyles.css'; // Page-specific styles

// LoginPage component handles user login
const LoginPage = ({ onLogin }) => {
  // Form state for credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", username);
    onLogin(username); // Trigger login callback
  };

  return (
    // AuthForm wrapper with shared layout
    <AuthForm
      title="Login"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkPath="/signup"
    >
      {/* Login input form */}
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Username input field */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </div>
        
        {/* Password input field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        
        {/* Submit button for login */}
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </AuthForm>
  );
};

export default LoginPage;
