import React, { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setEmail('');
    setIsSubmitted(false);
    setError('');
    onBackToLogin();
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-card">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#10B981"/>
            <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="forgot-password-title">Check your email</h1>
        
        <p className="success-message">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        
        <p className="success-subtitle">
          Didn't receive the email? Check your spam folder or try again.
        </p>
        
        <div className="success-actions">
          <button 
            type="button" 
            className="back-to-login-btn"
            onClick={handleBackToLogin}
          >
            Back to Sign In
          </button>
          
          <button 
            type="button" 
            className="resend-btn"
            onClick={() => setIsSubmitted(false)}
          >
            Resend Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-card">
      <h1 className="forgot-password-title">Reset your password</h1>
      
      <p className="forgot-password-subtitle">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${error ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        
        <button 
          type="submit" 
          className="reset-password-btn"
          disabled={isLoading || !email}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
        
        <button 
          type="button" 
          className="back-to-login-btn"
          onClick={handleBackToLogin}
          disabled={isLoading}
        >
          Back to Sign In
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
