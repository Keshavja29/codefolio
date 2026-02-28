import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import { register } from '../services/api';
import axios from 'axios';
import './GlassAuth.css';

function Register() {
  const navigate = useNavigate();
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
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
      setError('Google signup failed');
      setLoading(false);
    }
  };

  const handleQuickSignup = async () => {
    const demoData = {
      email: 'newuser@gmail.com',
      name: 'New User',
      picture: 'https://ui-avatars.com/api/?name=New+User&background=10b981&color=fff&size=200'
    };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google/callback', demoData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Quick signup failed');
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
            Welcome to CodeFolio! Create your account to start building 
            your developer portfolio and showcase your projects to the world.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="glass-card-right">
          {!showGoogleForm ? (
            <>
              <h2 className="glass-form-title">Sign up</h2>

              {error && <div className="glass-error">{error}</div>}

              <form onSubmit={handleSubmit} className="glass-form">
                <div className="glass-input-wrapper">
                  <input
                    type="text"
                    name="username"
                    placeholder="Your name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>

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
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>

                <div className="glass-input-wrapper">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>

                <button type="submit" className="glass-btn-primary" disabled={loading}>
                  {loading ? 'Creating account...' : 'Sign up'}
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
                Already a Member? <Link to="/login">Sign in here</Link>
              </div>
            </>
          ) : (
            <>
              <img 
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" 
                alt="Google" 
                className="google-logo-small"
              />
              <h2 className="glass-form-title">Sign up with Google</h2>
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
                  {loading ? 'Creating account...' : 'Continue with Google'}
                </button>

                <button type="button" className="glass-btn-secondary" onClick={handleQuickSignup}>
                  Quick Signup (Demo)
                </button>
              </form>

              <div className="glass-footer-text">
                <button onClick={() => setShowGoogleForm(false)} className="glass-back-btn">
                  ← Back to Sign up
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

export default Register;