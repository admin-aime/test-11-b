import React, { useState } from 'react';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'register', 'forgot-password', 'dashboard'
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setLoginError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setLoginError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setCurrentScreen('dashboard');
        setFormData({ email: '', password: '' });
        console.log('✅ Login successful:', data.user);
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setCurrentScreen('forgot-password');
    setLoginError('');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setLoginError('');
  };

  const handleShowRegister = () => {
    setCurrentScreen('register');
    setLoginError('');
  };

  const handleRegistrationSuccess = (newUser) => {
    // Automatically switch to login after successful registration
    setTimeout(() => {
      setCurrentScreen('login');
      setFormData({ email: newUser.email, password: '' });
    }, 2000);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
    setFormData({ email: '', password: '' });
    setLoginError('');
  };

  // If user is logged in, show dashboard
  if (currentScreen === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="app">
      {/* Background decorative elements */}
      <div className="bg-decoration top-right"></div>
      <div className="bg-decoration bottom-left"></div>
      
      {/* Main content */}
      <div className="main-content">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo">
            <div className="logo-icon">
              <span className="logo-d">D</span>
            </div>
            <div className="logo-text">
              <span className="diligent">DILIGENT</span>
              <span className="pharma">PHARMA</span>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on current screen */}
        {currentScreen === 'login' ? (
          <>
            {/* Login Card */}
            <div className="login-card">
              <h1 className="login-title">Sign in to your account</h1>
              
              <form onSubmit={handleSubmit} className="login-form">
                {loginError && (
                  <div className="error-banner">
                    {loginError}
                  </div>
                )}
                
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading}
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
                    disabled={isLoading}
                    required
                  />
                </div>
                
                <button type="submit" className="sign-in-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="forgot-password-btn"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </form>
            </div>

            {/* Register Button */}
            <button className="become-member-btn" onClick={handleShowRegister}>
              Click here to become a Diligent member
            </button>
          </>
        ) : currentScreen === 'register' ? (
          <Register 
            onBackToLogin={handleBackToLogin} 
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        ) : (
          /* Forgot Password Screen */
          <ForgotPassword onBackToLogin={handleBackToLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
