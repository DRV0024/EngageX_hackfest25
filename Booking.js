module.exports = mongoose.model('Booking', bookingSchema);
// Event Schema
const EventSchema = new mongoose.Schema({
    eventName: String,
    eventId: String,
    ticketTypes: [{ type: String, price: Number }],
  });
  
  // Booking Schema
  const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    eventName: String,
    eventId: String,
    ticketType: String,
    ticketPrice: Number,
    quantity: Number,
    totalPrice: Number,
    males: Number,
    females: Number,
    ageRange: String,
    timestamp: { type: Date, default: Date.now }
  });
  