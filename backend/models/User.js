const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isPro: {
    type: Boolean,
    default: false
  },
    isPro: {
    type: Boolean,
    default: false
  },
  customDomain: {
    type: String,
    default: null
  },
  templateId: {
    type: String,
    default: 'minimalist'
  },
  templateId: {
    type: String,
    default: 'minimalist'
  },
  
  profile: {
    name: String,
    bio: String,
    avatar: String,
    resumeUrl: String,
    socials: {
      github: String,
      linkedin: String,
      twitter: String,
      portfolio: String
    }
  },
  
  projects: [{
    title: String,
    description: String,
    techStack: [String],
    repoLink: String,
    liveLink: String,
    screenshot: String,
    featured: { type: Boolean, default: false },
    order: Number
  }],
  
  skills: {
    frontend: [String],
    backend: [String],
    devops: [String],
    tools: [String]
  },
  
  analytics: {
    totalViews: { type: Number, default: 0 },
    viewHistory: [{
      date: { type: Date, default: Date.now },
      count: { type: Number, default: 1 }
    }]
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);