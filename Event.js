const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventId: String,
  date: Date,
  venue: String,
  organizer: String,
  analytics: {
    weekRevenue: [Number],
    monthRevenue: [Number],
    regionSales: {
      North: Number,
      South: Number,
      East: Number,
      West: Number
    },
    ageGroups: {
      "Below 18": Number,
      "18-25": Number,
      "26-40": Number,
      "41+": Number
    }
  }
});

module.exports = mongoose.model("Event", eventSchema);
