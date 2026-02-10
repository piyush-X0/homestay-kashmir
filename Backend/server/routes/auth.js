import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role, address, aadhaarNumber } = req.body;

    // Phone validation (FOR ALL USERS)
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        message: 'Valid 10-digit phone number is required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Validate home-stayer fields
    if (role === 'home-stayer' && (!address || !aadhaarNumber)) {
      return res.status(400).json({
        message: 'Address and Aadhaar number are required for home stayers'
      });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      phone,
      role,
      ...(role === 'home-stayer' && { address, aadhaarNumber })
    });

    await user.save();

    // Send welcome email
    await sendEmail(
      email,
      'Welcome to HomeStayKashmir',
      `Welcome ${name}! Your account has been created successfully.`
    );

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate role match
    if (userType !== user.role && user.role !== 'admin') {
      return res.status(400).json({
        message: `You are registered as a ${user.role}. Please use the correct login form.`
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        aadhaarNumber: user.aadhaarNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create admin user
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password, adminSecret } = req.body;

    // Verify admin secret
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid admin secret' });
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new User({
      name: 'Admin',
      email,
      password,
      role: 'admin',
      phone: '0000000000'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Updated verify route
router.get('/verify', auth, async (req, res) => {
  try {
    // Fetch user from database to ensure fresh data
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        aadhaarNumber: user.aadhaarNumber
      }
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;