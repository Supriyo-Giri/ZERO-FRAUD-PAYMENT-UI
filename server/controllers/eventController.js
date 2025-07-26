const Event = require('../models/Events');

const createEvent = async (req, res) => {
  const { name, description, date, location, price } = req.body;

  try {
    const event = await Event.create({
      name,
      description,
      date,
      location,
      price,
      organizer: req.user._id
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate('organizer', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents
};