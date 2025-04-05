const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: String,
  eventName: String,
  eventId: String,
  ticketType: String,
  tickets: Number,
  totalPrice: Number,
  paymentMethod: String,
  ticketId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
