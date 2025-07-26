const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const { protect, organizer } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, organizer, createEvent)
  .get(getEvents);

module.exports = router;