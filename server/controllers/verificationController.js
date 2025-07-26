const Verification = require('../models/Verification');
const Transaction = require('../models/Transaction');

const generateVerificationCode = async (req, res) => {
  const { transactionId } = req.body;
  
  try {
    // Check if transaction exists
    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration (15 minutes)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    
    // Save verification record
    const verification = await Verification.create({
      transactionId,
      verificationCode,
      expiresAt
    });
    
    // In a real app, send code via email/SMS
    res.status(201).json({
      message: 'Verification code generated',
      code: verificationCode, // In production, don't send this in response
      expiresAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyCode = async (req, res) => {
  const { transactionId, code } = req.body;
  
  try {
    // Find verification record
    const verification = await Verification.findOne({
      transactionId,
      verificationCode: code,
      isUsed: false,
      expiresAt: { $gt: Date.now() }
    });
    
    if (!verification) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }
    
    // Mark as used
    verification.isUsed = true;
    await verification.save();
    
    // Update transaction status
    const transaction = await Transaction.findOne({ transactionId });
    transaction.status = 'verified';
    await transaction.save();
    
    // Populate related data
    await transaction.populate('eventId', 'name');
    await transaction.populate('userId', 'name email');
    
    res.json({ message: 'Verification successful', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateVerificationCode,
  verifyCode
};