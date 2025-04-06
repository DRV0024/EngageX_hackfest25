const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/book', async (req, res) => {
  const newBooking = new Booking(req.body);
  await newBooking.save();
  res.json({ message: "Booking successful" });
});

router.post('/cancel', async (req, res) => {
  const { ticketId } = req.body;
  const result = await Booking.findOneAndDelete({ ticketId });
  if (result) {
    res.json({ message: "Ticket cancelled" });
  } else {
    res.status(404).json({ error: "Ticket not found" });
  }
});

router.get('/analytics/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const bookings = await Booking.find({ eventId });

  // Dummy aggregation logic (you can improve it)
  const weekWise = {};
  const monthWise = {};
  const regionWise = {};
  const ageWise = {};

  bookings.forEach(b => {
    const date = new Date(b.bookingDate);
    const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
    const month = `${date.getFullYear()}-${date.getMonth()+1}`;
    weekWise[week] = (weekWise[week] || 0) + b.total;
    monthWise[month] = (monthWise[month] || 0) + b.total;
    regionWise[b.region] = (regionWise[b.region] || 0) + b.total;
    ageWise[b.ageRange] = (ageWise[b.ageRange] || 0) + b.total;
  });

  res.json({ weekWise, monthWise, regionWise, ageWise });
});

module.exports = router;
