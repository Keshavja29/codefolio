const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBlog,
  getUserBlogs,
  getPublicBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// Private routes
router.post('/', auth, createBlog);
router.get('/my-blogs', auth, getUserBlogs);
router.put('/:blogId', auth, updateBlog);
router.delete('/:blogId', auth, deleteBlog);

// Public routes
router.get('/user/:username', getPublicBlogs);
router.get('/:slug', getBlog);

module.exports = router;