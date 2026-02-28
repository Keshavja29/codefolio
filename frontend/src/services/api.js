import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// User APIs
export const getProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data);
export const getPortfolio = (username) => api.get(`/users/${username}`);

export default api;
// Image Upload APIs
export const uploadProfilePicture = (formData) => {
  return api.post('/upload/profile-picture', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const uploadProjectScreenshot = (formData) => {
  return api.post('/upload/project-screenshot', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
// Pro Features
export const upgradeToPro = () => api.post('/users/upgrade-pro');
export const updateCustomDomain = (domain) => api.put('/users/custom-domain', { customDomain: domain });

// Blog APIs
export const createBlog = (data) => api.post('/blogs', data);
export const getUserBlogs = () => api.get('/blogs/my-blogs');
export const getPublicBlogs = (username) => api.get(`/blogs/user/${username}`);
export const getBlog = (slug) => api.get(`/blogs/${slug}`);
export const updateBlog = (blogId, data) => api.put(`/blogs/${blogId}`, data);
export const deleteBlog = (blogId) => api.delete(`/blogs/${blogId}`);