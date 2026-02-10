// models/Room.js
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String
  }],
  nearbyPlaces: {
    type: Map,
    of: {
      available: Boolean,
      distance: Number
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'pending'],
    default: 'available'
  },
  originalAd: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;