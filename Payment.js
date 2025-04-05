const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  eventId: String,
  amount: Number,
  mode: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
