import React, { useState } from "react";
import AuthForm from '../components/AuthForm';
import logo from '../data/assets/logo.png'; 
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

  // function to validate password
  // checks for minimum length, presence of numbers and special characters
  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return {
      isValid: password.length >= minLength && hasNumber && hasSpecialChar,
      errors: {
        tooShort: password.length < minLength,
        noNumber: !hasNumber,
        noSpecialChar: !hasSpecialChar,
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up:", formData);

    const passwordValidation = validatePassword(formData.password);
    
    onSignup(formData.username);
    if (!passwordValidation.isValid || !passwordsMatch) {
      alert("Please fix errors!");
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
  const [passwordErrors, setPasswordErrors] = useState({
    tooShort: false,
    noNumber: false,
    noSpecialChar: false,
  });
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Validate password if it's the password field
    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
    }
  };

  const isFormValid = formData.password && formData.confirmPassword && validatePassword(formData.password).isValid && formData.password === formData.confirmPassword;


// function to check if passwords match
const passwordsMatch = formData.password === formData.confirmPassword;

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
            onChange={handlePasswordChange}  // Use the new handler
            required
            className={`form-input ${
              (passwordErrors.tooShort || passwordErrors.noNumber || passwordErrors.noSpecialChar) 
              ? 'error' 
              : ''
            }`}
          />
          {formData.password && (
            <div className="error-messages">
              {passwordErrors.tooShort && (
                <p className="error-message" style={{ color: 'red' }}>Password must be at least 8 characters.</p>
              )}
              {passwordErrors.noNumber && (
                <p className="error-message" style={{ color: 'red' }}>Password must contain at least one number.</p>
              )}
              {passwordErrors.noSpecialChar && (
                <p className="error-message" style={{ color: 'red' }}>Password must contain at least one special character.</p>
              )}
            </div>
          )}
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

        <button type="submit" className="auth-button" disabled={!isFormValid}>
          Sign Up
        </button>
      </form>
    </AuthForm>
  );
};

export default SignupPage;