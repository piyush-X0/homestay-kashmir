import express from 'express';
import { auth } from '../middleware/auth.js';
import Ad from '../models/Ad.js';
import upload from '../middleware/upload.js';
import { sendEmail } from '../utils/email.js';
import { getIO } from '../utils/socket.js';

const router = express.Router();

// Create new ad
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    // DEBUG: Log what we receive
    console.log('=== AD CREATION REQUEST ===');
    console.log('req.files exists:', !!req.files);
    console.log('req.files length:', req.files?.length);
    console.log('req.body keys:', Object.keys(req.body));
    if (req.files && req.files.length > 0) {
      console.log('Files received:', req.files.map(f => ({
        fieldname: f.fieldname,
        originalname: f.originalname,
        size: f.size,
        mimetype: f.mimetype,
        path: f.path
      })));
    } else {
      console.log('WARNING: No files in req.files');
    }
    
    if (req.user.role !== 'home-stayer') {
      return res.status(403).json({ message: 'Only home stayers can create ads' });
    }

    const {
      title,
      description,
      roomCount,
      price,
      location,
      amenities,
      nearbyPlaces
    } = req.body;

    // Validate required fields
    if (!title || !description || !roomCount || !price || !location) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const images = req.files?.map(file => file.path);

    if (!images || images.length < 4) {
      return res.status(400).json({ message: 'Minimum 4 images required' });
    }

    // Set expiration date to 30 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const ad = new Ad({
      user: req.user._id,
      title,
      description,
      roomCount: Number(roomCount),
      price: Number(price),
      location: JSON.parse(location),
      images,
      amenities: JSON.parse(amenities || '[]'),
      nearbyPlaces: JSON.parse(nearbyPlaces || '{}'),
      expiresAt
    });

    await ad.save();

    // Notify admin through WebSocket
    const io = getIO();
    io.emit('newPendingAd', {
      id: ad._id,
      title: ad.title,
      user: {
        name: req.user.name,
        email: req.user.email
      }
    });

    // Send email notification to admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      'New Ad Submission',
      `A new ad "${title}" has been submitted for verification.`
    );

    res.status(201).json(ad);
  } catch (error) {
    console.error('Ad creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's ads with detailed status
router.get('/my-ads', auth, async (req, res) => {
  try {
    const ads = await Ad.find({ user: req.user._id })
      .select('-__v')
      .sort('-createdAt');
    res.json(ads);
  } catch (error) {
    console.error('Fetch ads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;