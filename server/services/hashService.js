const crypto = require('crypto');

const generateHash = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

const generateTransactionId = () => {
  return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
};

module.exports = {
  generateHash,
  generateTransactionId
};