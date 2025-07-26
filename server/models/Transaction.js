const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'flagged'],
    default: 'pending'
  },
  verificationCode: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);