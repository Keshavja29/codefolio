const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getProfile, 
  updateProfile, 
  getPortfolio,
  updateCustomDomain,
  upgradeToPro
} = require('../controllers/userController');

// Private Routes (Need Authentication)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/custom-domain', auth, updateCustomDomain);
router.post('/upgrade-pro', auth, upgradeToPro);

// Public Route
router.get('/:username', getPortfolio);

module.exports = router;