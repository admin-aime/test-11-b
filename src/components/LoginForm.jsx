import React, { useState } from 'react';

function LoginForm({ onForgotPassword }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="login-card">
      <h1 className="login-title">Sign in to your account</h1>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        
        <button type="submit" className="sign-in-btn">
          Sign In
        </button>
        
        <button 
          type="button" 
          className="forgot-password-btn"
          onClick={onForgotPassword}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
