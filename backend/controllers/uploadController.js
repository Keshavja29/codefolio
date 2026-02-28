const User = require('../models/User');

// Upload Profile Picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { 'profile.avatar': req.file.path },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile picture uploaded successfully',
      avatar: req.file.path,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload Project Screenshot
exports.uploadProjectScreenshot = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'Screenshot uploaded successfully',
      url: req.file.path
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};