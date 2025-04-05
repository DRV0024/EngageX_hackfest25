const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  eventName: String,
  eventId: String,
  numberOfTickets: Number,
  maleCount: Number,
  femaleCount: Number,
  ticketType: String,
  ageRange: String,
  isCancelled: Boolean,
});

module.exports = mongoose.model('Ticket', ticketSchema);
