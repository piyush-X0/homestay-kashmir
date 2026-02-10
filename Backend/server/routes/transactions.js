import express from 'express';
import { auth } from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Get user's transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate({
        path: 'room',
        select: 'title location images price'
      })
      .sort('-paymentDate');

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { roomId, paymentId, orderId, amount } = req.body;

    const transaction = new Transaction({
      user: req.user._id,
      room: roomId,
      amount,
      paymentId,
      orderId,
      status: 'completed'
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;