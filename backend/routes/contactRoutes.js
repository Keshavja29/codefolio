const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  submitContact, 
  getMessages, 
  markAsRead, 
  deleteMessage 
} = require('../controllers/contactController');

// Public route
router.post('/submit', submitContact);

// Private routes
router.get('/', auth, getMessages);
router.put('/:messageId/read', auth, markAsRead);
router.delete('/:messageId', auth, deleteMessage);

module.exports = router;