import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import { login } from '../services/api';
import axios from 'axios';
import './GlassAuth.css';

function Login() {
  const navigate = useNavigate();
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [googleData, setGoogleData] = useState({
    email: '',
    name: '',
    picture: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleChange = (e) => {
    setGoogleData({
      ...googleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setShowGoogleForm(true);
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google/callback', googleData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
      setLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    const demoData = {
      email: 'demo@gmail.com',
      name: 'Demo User',
      picture: 'https://ui-avatars.com/api/?name=Demo+User&background=10b981&color=fff&size=200'
    };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google/callback', demoData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Quick login failed');
      setLoading(false);
    }
  };

  return (
    <div className="glass-auth-wrapper">
      {/* Animated Background */}
      <div className="glass-background">
        <div className="leaf-shape leaf-1"></div>
        <div className="leaf-shape leaf-2"></div>
        <div className="leaf-shape leaf-3"></div>
        <div className="leaf-shape leaf-4"></div>
        <div className="leaf-shape leaf-5"></div>
      </div>

      {/* Glass Card Container */}
      <div className="glass-card-container">
        {/* Left Side - Info */}
        <div className="glass-card-left">
          <h1 className="glass-title">Let's Get Started</h1>
          <p className="glass-description">
            Welcome to CodeFolio! Please login to your account to continue 
            building your developer portfolio with CodeFolio.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="glass-card-right">
          {!showGoogleForm ? (
            <>
              <h2 className="glass-form-title">Sign in</h2>

              {error && <div className="glass-error">{error}</div>}

              <form onSubmit={handleSubmit} className="glass-form">
                <div className="glass-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>

                <div className="glass-input-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>

                <button type="submit" className="glass-btn-primary" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="glass-divider">
                  <span>OR</span>
                </div>

                <div className="glass-social-icons">
                  <button type="button" className="glass-social-btn facebook">
                    <FaFacebook />
                  </button>
                  <button type="button" className="glass-social-btn twitter">
                    <FaTwitter />
                  </button>
                  <button type="button" className="glass-social-btn google" onClick={handleGoogleLogin}>
                    <FaGoogle />
                  </button>
                </div>
              </form>

              <div className="glass-footer-text">
                Already a Member? <Link to="/register">Sign in here</Link>
              </div>
            </>
          ) : (
            <>
              <img 
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" 
                alt="Google" 
                className="google-logo-small"
              />
              <h2 className="glass-form-title">Sign in with Google</h2>
              <p className="google-subtitle-small">Demo Mode - For Testing</p>

              {error && <div className="glass-error">{error}</div>}

              <form onSubmit={handleGoogleSubmit} className="glass-form">
                <div className="glass-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="your-email@gmail.com"
                    value={googleData.email}
                    onChange={handleGoogleChange}
                    required
                    className="glass-input"
                  />
                </div>

                <div className="glass-input-wrapper">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={googleData.name}
                    onChange={handleGoogleChange}
                    required
                    className="glass-input"
                  />
                </div>

                <div className="glass-input-wrapper">
                  <input
                    type="url"
                    name="picture"
                    placeholder="Profile Picture URL (Optional)"
                    value={googleData.picture}
                    onChange={handleGoogleChange}
                    className="glass-input"
                  />
                </div>

                <button type="submit" className="glass-btn-primary" disabled={loading}>
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </button>

                <button type="button" className="glass-btn-secondary" onClick={handleQuickLogin}>
                  Quick Login (Demo)
                </button>
              </form>

              <div className="glass-footer-text">
                <button onClick={() => setShowGoogleForm(false)} className="glass-back-btn">
                  ← Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer Badge */}
      <div className="glass-presented-by">
        <span>presented by</span>
        <div className="glass-logo-badge">CF</div>
      </div>
    </div>
  );
}

export default Login;