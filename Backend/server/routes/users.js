import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, address, aadhaarNumber } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate home-stayer required fields
    if (user.role === 'home-stayer' && (!address || !aadhaarNumber)) {
      return res.status(400).json({
        message: 'Address and Aadhaar number are required for home stayers'
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    if (user.role === 'home-stayer') {
      user.address = address || user.address;
      user.aadhaarNumber = aadhaarNumber || user.aadhaarNumber;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      address: updatedUser.address,
      aadhaarNumber: updatedUser.aadhaarNumber
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;