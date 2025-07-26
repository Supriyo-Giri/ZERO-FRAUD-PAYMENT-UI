const express = require('express');
const { generateVerificationCode, verifyCode } = require('../controllers/verificationController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/generate', protect, generateVerificationCode);
router.post('/verify', protect, verifyCode);

module.exports = router;