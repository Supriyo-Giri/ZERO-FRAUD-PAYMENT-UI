const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    ref: 'Transaction'
  },
  verificationCode: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Verification', verificationSchema);