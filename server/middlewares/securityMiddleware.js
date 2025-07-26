const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Data sanitization against NoSQL query injection
const sanitize = mongoSanitize();

// Data sanitization against XSS
const cleanXss = xss();

module.exports = {
  limiter,
  sanitize,
  cleanXss
};