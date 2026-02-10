import mongoose from 'mongoose';
const adSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  roomCount: {
    type: Number,
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
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 4 && v.every(img => typeof img === 'string' && img.trim().length > 0);
      },
      message: 'At least 4 valid images are required'
    }
  },
  amenities: {
    type: [String],
    default: []
  },
  nearbyPlaces: {
    type: Map,
    of: {
      available: Boolean,
      distance: Number
    },
    default: {}
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected', 'expired'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    validate: {
      validator: function (v) {
        // Ensure rejectionReason is only set when status is rejected
        return !this.status || this.status !== 'rejected' || (v && v.trim().length > 0);
      },
      message: 'Rejection reason is required when the status is "rejected".'
    }
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// Pre-save middleware to handle status expiration logic
adSchema.pre('save', function (next) {
  if (this.expiresAt && new Date() > this.expiresAt && this.status !== 'expired') {
    this.status = 'expired';
  }
  next();
});
const Ad = mongoose.model('Ad', adSchema);
export default Ad;
