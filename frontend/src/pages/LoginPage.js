import React, { useState } from "react";
import AuthForm from '../components/AuthForm';
import '../styles/authStyles.css';

// LoginPage component
// handles the login process for existing users
// includes a form for entering username and password
// includes a link to the signup page for new users

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", username);
    onLogin(username);
  };

  return (
    <AuthForm
      title="Login"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkPath="/signup"
    >
      <form onSubmit={handleSubmit} className="auth-form">
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
        
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </AuthForm>
  );
};

export default LoginPage;