const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Temporary: Google OAuth simulation (for testing)
router.get('/google', (req, res) => {
  // Redirect to a demo Google login page
  res.redirect('http://localhost:3000/google-login-demo');
});

// Google OAuth callback (demo)
router.post('/google/callback', async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
      const randomPassword = 'google-' + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        username,
        email,
        password: hashedPassword,
        profile: {
          name,
          avatar: picture
        },
        googleId: email // Using email as googleId for demo
      });

      await user.save();
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;