import express from 'express';
import { auth } from '../middleware/auth.js';
import Room from '../models/Room.js';
import Transaction from '../models/Transaction.js';
import upload from '../middleware/upload.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Get all rooms with filters
router.get('/', async (req, res) => {
  try {
    const { 
      location, 
      minPrice, 
      maxPrice, 
      amenities,
      furnished,
      ac,
      heater 
    } = req.query;
    
    let query = { status: 'available' };

    // Handle location search
    if (location) {
      const [lat, lng] = location.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        query['location.lat'] = { $gte: lat - 0.1, $lte: lat + 0.1 };
        query['location.lng'] = { $gte: lng - 0.1, $lte: lng + 0.1 };
      }
    }

    // Handle price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Handle amenities filter
    if (amenities) {
      query.amenities = { $all: amenities.split(',') };
    }

    // Handle boolean filters
    if (furnished) query.furnished = furnished === 'true';
    if (ac) query.ac = ac === 'true';
    if (heater) query.heater = heater === 'true';

    let rooms = await Room.find(query)
      .populate('owner', 'name email')
      .sort('-createdAt')
      .lean();

    // Transform and validate room data
    rooms = rooms.map(room => {
      let hospital = 'N/A';
      let market = 'N/A';
      let tourist = [];
      
      try {
        const nearbyPlacesMap = room.nearbyPlaces || new Map();
        hospital = nearbyPlacesMap.get('hospital')?.available ? nearbyPlacesMap.get('hospital').distance?.toString() || 'N/A' : 'N/A';
        market = nearbyPlacesMap.get('market')?.available ? nearbyPlacesMap.get('market').distance?.toString() || 'N/A' : 'N/A';
        tourist = nearbyPlacesMap.get('tourist')?.available 
          ? (Array.isArray(nearbyPlacesMap.get('tourist').distance) ? nearbyPlacesMap.get('tourist').distance : []).map(d => d.toString())
          : [];
      } catch (transformError) {
        console.error(`Error transforming nearbyPlaces for room ${room._id}:`, transformError);
      }

      return {
        _id: room._id,
        title: room.title || 'Untitled Room',
        description: room.description || 'No description available',
        price: room.price || 0,
        location: {
          lat: room.location?.lat || null,
          lng: room.location?.lng || null,
          _id: room.location?._id || room._id
        },
        images: room.images || [],
        amenities: room.amenities || [],
        nearbyPlaces: {
          hospital,
          market,
          tourist
        },
        owner: room.owner || null,
        status: room.status || 'available',
        furnished: !!room.furnished,
        ac: !!room.ac,
        heater: !!room.heater,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt
      };
    });

    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

// Get single room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('owner', 'name email')
      .lean();
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Transform and validate room data
    let hospital = 'N/A';
    let market = 'N/A';
    let tourist = [];
    
    try {
      const nearbyPlacesMap = room.nearbyPlaces || new Map();
      hospital = nearbyPlacesMap.get('hospital')?.available ? nearbyPlacesMap.get('hospital').distance?.toString() || 'N/A' : 'N/A';
      market = nearbyPlacesMap.get('market')?.available ? nearbyPlacesMap.get('market').distance?.toString() || 'N/A' : 'N/A';
      tourist = nearbyPlacesMap.get('tourist')?.available 
        ? (Array.isArray(nearbyPlacesMap.get('tourist').distance) ? nearbyPlacesMap.get('tourist').distance : []).map(d => d.toString())
        : [];
    } catch (transformError) {
      console.error(`Error transforming nearbyPlaces for room ${room._id}:`, transformError);
    }

    const transformedRoom = {
      _id: room._id,
      title: room.title || 'Untitled Room',
      description: room.description || 'No description available',
      price: room.price || 0,
      location: {
        lat: room.location?.lat || null,
        lng: room.location?.lng || null,
        _id: room.location?._id || room._id
      },
      images: room.images || [],
      amenities: room.amenities || [],
      nearbyPlaces: {
        hospital,
        market,
        tourist
      },
      owner: room.owner || null,
      status: room.status || 'available',
      furnished: !!room.furnished,
      ac: !!room.ac,
      heater: !!room.heater,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt
    };

    console.log('Transformed room response:', transformedRoom); // Debug log
    res.json(transformedRoom);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

// Create new room (for admin/homestayer)
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    if (!['admin', 'home-stayer'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const {
      title,
      description,
      price,
      location,
      amenities,
      nearbyPlaces,
      furnished,
      ac,
      heater
    } = req.body;

    // Validate location
    const locationObj = JSON.parse(location);
    if (!locationObj.lat || !locationObj.lng) {
      return res.status(400).json({ message: 'Invalid location data' });
    }

    // Parse nearbyPlaces as a Map
    const nearbyPlacesMap = new Map(Object.entries(JSON.parse(nearbyPlaces)));

    const room = new Room({
      title,
      description,
      price: Number(price),
      location: locationObj,
      images: req.files.map(file => file.path),
      amenities: amenities ? amenities.split(',') : [],
      nearbyPlaces: nearbyPlacesMap,
      owner: req.user._id,
      furnished: furnished === 'true',
      ac: ac === 'true',
      heater: heater === 'true'
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

// Book a room
router.post('/:id/book', auth, upload.array('documents', 5), async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;
    
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.status !== 'available') {
      return res.status(400).json({ message: 'Room is not available' });
    }

    const documents = req.files?.map(file => file.path) || [];

    // Create transaction
    const transaction = new Transaction({
      user: req.user._id,
      room: room._id,
      amount: room.price,
      paymentId,
      orderId,
      documents,
      status: 'completed'
    });

    await transaction.save();

    // Update room status
    room.status = 'booked';
    await room.save();

    // Send email notification
    await sendEmail(
      req.user.email,
      'Booking Confirmation',
      `Your booking for ${room.title} has been confirmed. Transaction ID: ${transaction._id}`
    );

    res.status(201).json({
      message: 'Booking confirmed successfully',
      transaction
    });
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

// Update room (admin/owner only)
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (req.user.role !== 'admin' && room.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updates = { ...req.body };
    if (req.files?.length > 0) {
      updates.images = req.files.map(file => file.path);
    }

    if (updates.location) {
      updates.location = JSON.parse(updates.location);
    }

    if (updates.nearbyPlaces) {
      updates.nearbyPlaces = new Map(Object.entries(JSON.parse(updates.nearbyPlaces)));
    }

    if (updates.amenities) {
      updates.amenities = updates.amenities.split(',');
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

// Delete room (admin/owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (req.user.role !== 'admin' && room.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await room.remove();
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
});

export default router;