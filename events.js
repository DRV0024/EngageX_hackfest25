const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: storage });

// POST: Create new event
router.post('/create', upload.single('poster'), async (req, res) => {
  try {
    const { organizerName, organizerEmail, eventName, eventId, venue, date, description } = req.body;
    const newEvent = new Event({
      organizerName,
      organizerEmail,
      eventName,
      eventId,
      venue,
      date,
      description,
      posterUrl: req.file ? req.file.path : ''
    });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Search events
router.get('/search', async (req, res) => {
  const { eventName, eventId, eventDate } = req.query;

  try {
    const query = {
      eventName: { $regex: new RegExp(eventName, 'i') },
      ...(eventId && { eventId }),
      ...(eventDate && { date: new Date(eventDate) })
    };
    const events = await Event.find(query);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get event by ID
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
