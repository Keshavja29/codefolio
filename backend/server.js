const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// 1. CORS - sabse pehle
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://codefolio-six.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

// 2. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// 4. Passport
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/auth', require('./routes/googleAuthRoutes'));

// Test Route
app.get('/', (req, res) => {
  res.send('CodeFolio Backend is Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});