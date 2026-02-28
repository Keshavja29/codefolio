const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { uploadProfilePicture, uploadProjectScreenshot } = require('../controllers/uploadController');

// Upload profile picture
router.post('/profile-picture', auth, upload.single('image'), uploadProfilePicture);

// Upload project screenshot
router.post('/project-screenshot', auth, upload.single('image'), uploadProjectScreenshot);

module.exports = router;