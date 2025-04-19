import React, { useState } from "react";
import AuthForm from '../components/AuthForm';
import '../styles/authStyles.css'; // Shared auth form styles

// SignupPage component for new users
const SignupPage = ({ onSignup }) => {
  // Form field state object
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Password validation logic
  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Return validation result and errors
    return {
      isValid: password.length >= minLength && hasNumber && hasSpecialChar,
      errors: {
        tooShort: password.length < minLength,
        noNumber: !hasNumber,
        noSpecialChar: !hasSpecialChar,
      },
    };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up:", formData);

    const passwordValidation = validatePassword(formData.password);

    // Early exit if form invalid
    if (!passwordValidation.isValid || !passwordsMatch) {
      alert("Please fix errors!");
      return;
    }

    // Trigger signup callback
    onSignup(formData.username);
  };

  // Update form field values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Password error state object
  const [passwordErrors, setPasswordErrors] = useState({
    tooShort: false,
    noNumber: false,
    noSpecialChar: false,
  });

  // Handle password change + validation
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
    }
  };

  // Check overall form validity
  const isFormValid =
    formData.password &&
    formData.confirmPassword &&
    validatePassword(formData.password).isValid &&
    formData.password === formData.confirmPassword;

  // Check if passwords match
  const passwordsMatch = formData.password === formData.confirmPassword;

  return (
    // Reusable auth form layout
    <AuthForm
      title="Create Account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
    >
      {/* Signup form starts here */}
      <form onSubmit={handleSubmit}>
        {/* Username field */}
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

        {/* Email field */}
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

        {/* Password field with validation feedback */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
            className={`form-input ${
              (passwordErrors.tooShort || passwordErrors.noNumber || passwordErrors.noSpecialChar) 
              ? 'error' 
              : ''
            }`}
          />
          {/* Conditional password error messages */}
          {formData.password && (
            <div className="error-messages">
              {passwordErrors.tooShort && (
                <p className="error-message" style={{ color: 'red' }}>
                  Password must be at least 8 characters.
                </p>
              )}
              {passwordErrors.noNumber && (
                <p className="error-message" style={{ color: 'red' }}>
                  Password must contain at least one number.
                </p>
              )}
              {passwordErrors.noSpecialChar && (
                <p className="error-message" style={{ color: 'red' }}>
                  Password must contain at least one special character.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Confirm password field */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Verify Password:
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`form-input ${
              formData.confirmPassword && !passwordsMatch ? 'error' : ''
            }`}
          />
          {/* Password match error message */}
          {formData.confirmPassword && !passwordsMatch && (
            <p className="error-message" style={{ color: 'red' }}>
              Passwords do not match.
            </p>
          )}
        </div>

        {/* Submit button for signup */}
        <button type="submit" className="auth-button" disabled={!isFormValid}>
          Sign Up
        </button>
      </form>
    </AuthForm>
  );
};

export default SignupPage;
