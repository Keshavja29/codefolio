const Contact = require('../models/Contact');
const User = require('../models/User');

// Submit Contact Form (Public)
exports.submitContact = async (req, res) => {
  try {
    const { username, name, email, message } = req.body;
    
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const contact = new Contact({
      userId: user._id,
      name,
      email,
      message
    });
    
    await contact.save();
    
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Messages (Private)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark as Read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Contact.findOneAndUpdate(
      { _id: messageId, userId: req.userId },
      { read: true },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    
    await Contact.findOneAndDelete({ _id: messageId, userId: req.userId });
    
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};