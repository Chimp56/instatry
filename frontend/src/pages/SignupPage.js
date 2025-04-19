import React, { useState } from "react";
import AuthForm from '../components/AuthForm';
import '../styles/authStyles.css';

// SignupPage component
// handles the signup process for new users
// includes a form for entering username, email, password, and password confirmation
// includes a link to the login page for users who already have an account

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
    if (!passwordsMatch) {
      alert("Passwords don't match!");
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


// function to check if passwords match
const passwordsMatch = formData.password === formData.confirmPassword;

  return (
    <AuthForm
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

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Verify Password:
          </label>
          <input
            id="confirmPassword"  // Change this ID
            name="confirmPassword"  // Change this name
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`form-input ${formData.confirmPassword && !passwordsMatch ? 'error' : ''}`}
          />
          {formData.confirmPassword && !passwordsMatch && (
            <p className="error-message" style={{ color: 'red' }}>Passwords do not match.</p>
          )}
        </div>

        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
    </AuthForm>
  );
};

export default SignupPage;