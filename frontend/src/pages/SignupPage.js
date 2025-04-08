import React, { useState } from "react";
import AuthForm from '../components/AuthForm';
import logo from '../data/assets/logo.png'; 
import '../styles/authStyles.css';

const SignupPage = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up:", formData);
    onSignup(formData.username);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AuthForm
      logo={logo}
      title="Create Account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
    </AuthForm>
  );
};

export default SignupPage;