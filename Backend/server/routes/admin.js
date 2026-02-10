import express from 'express';
import { adminAuth } from '../middleware/auth.js';
import Ad from '../models/Ad.js';
import { sendEmail } from '../utils/email.js';
import { getIO } from '../utils/socket.js';
import Room from '../models/Room.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Serve uploaded images
router.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));

// Get pending ads with user details and full image URLs
router.get('/pending-ads', adminAuth, async (req, res) => {
  try {
    const ads = await Ad.find({ status: 'pending' })
      .populate('user', 'name email phone')
      .sort('-createdAt')
      .select('-__v');

    // Add full URLs to image paths
    const adsWithImages = ads.map(ad => ({
      ...ad._doc,
      images: ad.images.map(img => {
        // If the image path already starts with 'http', it's a full URL, so return it as is
        if (img.startsWith('http')) {
          return img;  // No need to prepend the base URL
        }
        // Otherwise, prepend the base URL to the image path
        return `${req.protocol}://${req.get('host')}/uploads/${path.basename(img)}`;
      }),
    }));

    res.json(adsWithImages);
  } catch (error) {
    console.error('Fetch pending ads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/ads/:id/approve', adminAuth, async (req, res) => {
  try {
    // Find the ad by ID
    const ad = await Ad.findById(req.params.id).populate('user', 'email');
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Create a new room from the ad
    const newRoom = new Room({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      location: {
        lat: ad.location.lat,
        lng: ad.location.lng
      },
      images: ad.images,
      amenities: ad.amenities || [],
      nearbyPlaces: ad.nearbyPlaces || new Map(),
      owner: ad.user._id,
      originalAd: ad._id
    });

    // Save the new room
    await newRoom.save();

    // Update ad status
    ad.status = 'active';
    await ad.save();

    // Send notifications
    const io = getIO();
    io.emit('adStatusChanged', {
      id: ad._id,
      status: 'active',
      roomId: newRoom._id
    });

    // Send email notification
    await sendEmail(
      ad.user.email,
      'Ad Approved',
      `Your ad "${ad.title}" has been approved and is now listed in our rooms section.`
    );

    res.status(200).json({ message: 'Ad approved and added to rooms collection' });
  } catch (error) {
    console.error('Error approving ad:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Reject ad
router.post('/ads/:id/reject', adminAuth, async (req, res) => {
  try {
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ message: 'Rejection reason is required' });
    }

    const ad = await Ad.findById(req.params.id)
      .populate('user', 'email');

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    ad.status = 'rejected';
    ad.rejectionReason = reason;
    await ad.save();

    // Notify through WebSocket
    const io = getIO();
    io.emit('adStatusChanged', {
      id: ad._id,
      status: 'rejected',
      reason,
    });

    // Email notification
    await sendEmail(
      ad.user.email,
      'Ad Rejected',
      `Your ad "${ad.title}" has been rejected.\n\nReason: ${reason}`
    );

    res.json({ message: 'Ad rejected successfully' });
  } catch (error) {
    console.error('Ad rejection error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;