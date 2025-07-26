const Transaction = require('../models/Transaction');
const Event = require('../models/Events');
const User = require('../models/Users');
const { generateTransactionId, generateHash } = require('../services/hashService');
const { generateQRCode } = require('../services/qrService');
const { sendReceipt } = require('../services/emailService');

const createTransaction = async (req, res) => {
  const { eventId, amount } = req.body;

  try {
    // Verify event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Verify user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate transaction ID and hash
    const transactionId = generateTransactionId();
    const hashData = `${transactionId}${eventId}${amount}${Date.now()}`;
    const hash = generateHash(hashData);

    const transaction = await Transaction.create({
      transactionId,
      eventId,
      userId: req.user._id,
      amount,
      hash
    });

    // Populate related data
    await transaction.populate('eventId', 'name');
    await transaction.populate('userId', 'name email');

    // Generate QR code data
    const qrData = {
      transactionId,
      eventId,
      amount,
      hash
    };

    const qrCode = await generateQRCode(qrData);

    // Send receipt email
    await sendReceipt(user.email, transaction);

    res.status(201).json({
      ...transaction.toObject(),
      qrCode
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('eventId', 'name')
      .populate('userId', 'name email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findOne({ transactionId });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update transaction status
    transaction.status = 'verified';
    await transaction.save();

    // Populate related data
    await transaction.populate('eventId', 'name');
    await transaction.populate('userId', 'name email');

    res.json({ message: 'Transaction verified successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findOne({ transactionId })
      .populate('eventId', 'name')
      .populate('userId', 'name email');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  verifyTransaction,
  getTransactionById
};