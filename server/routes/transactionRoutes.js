const express = require('express');
const { 
  createTransaction, 
  getTransactions, 
  verifyTransaction,
  getTransactionById
} = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, createTransaction)
  .get(protect, getTransactions);

router.route('/verify/:transactionId')
  .put(protect, verifyTransaction);

router.route('/:transactionId')
  .get(protect, getTransactionById);

module.exports = router;