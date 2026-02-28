const User = require('../models/User');

// Get User Profile (Private)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User Profile (Private)
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Public Portfolio by Username
exports.getPortfolio = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username })
      .select('-password -email');
    
    if (!user) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update Custom Domain (Pro Only)
exports.updateCustomDomain = async (req, res) => {
  try {
    const { customDomain } = req.body;
    
    const user = await User.findById(req.userId);
    
    // Check if user is Pro
    if (!user.isPro) {
      return res.status(403).json({ 
        error: 'Custom domain is a Pro feature. Please upgrade to Pro.' 
      });
    }
    
    // Check if domain is already taken
    if (customDomain) {
      const existingDomain = await User.findOne({ 
        customDomain, 
        _id: { $ne: req.userId } 
      });
      
      if (existingDomain) {
        return res.status(400).json({ 
          error: 'This domain is already taken' 
        });
      }
    }
    
    user.customDomain = customDomain;
    await user.save();
    
    res.json({
      message: 'Custom domain updated successfully',
      customDomain: user.customDomain
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upgrade to Pro
exports.upgradeToPro = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isPro: true },
      { new: true }
    ).select('-password');
    
    res.json({
      message: 'Successfully upgraded to Pro!',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};