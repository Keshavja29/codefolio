import axios from 'axios';

const api = axios.create({
baseURL: 'https://codefolio-7245.onrender.com/api',});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// User APIs
export const getProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data);
export const uploadProfilePicture = (formData) => api.post('/upload/profile-picture', formData);
export const uploadResume = (formData) => api.post('/upload/resume', formData);

// Portfolio API
export const getPublicProfile = (username) => api.get(`/users/${username}`);
export const getPortfolio = getPublicProfile;// Pro APIs
export const upgradeToPro = () => api.post('/users/upgrade-pro');
export const updateCustomDomain = (domain) => api.put('/users/custom-domain', { domain });

export default api;