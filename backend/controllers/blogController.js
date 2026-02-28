const Blog = require('../models/Blog');
const User = require('../models/User');

// Create Blog Post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, coverImage, tags, published } = req.body;
    
    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const blog = new Blog({
      userId: req.userId,
      title,
      slug: `${slug}-${Date.now()}`,
      content,
      excerpt,
      coverImage,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      published
    });
    
    await blog.save();
    
    res.json({ message: 'Blog post created successfully', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User's Blogs (Private)
exports.getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Public Blogs by Username
exports.getPublicBlogs = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const blogs = await Blog.find({ userId: user._id, published: true })
      .sort({ createdAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Blog
exports.getBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content, excerpt, coverImage, tags, published } = req.body;
    
    const blog = await Blog.findOneAndUpdate(
      { _id: blogId, userId: req.userId },
      {
        title,
        content,
        excerpt,
        coverImage,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        published,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    
    await Blog.findOneAndDelete({ _id: blogId, userId: req.userId });
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};