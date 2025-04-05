const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventId: String,
  venue: String,
});

module.exports = mongoose.model('Event', eventSchema);
