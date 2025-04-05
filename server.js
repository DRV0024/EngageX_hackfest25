const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/chillr', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => console.log("✅ Connected to MongoDB"));
db.on('error', console.error);

// ⬇️ IMPORT ROUTES HERE
const ticketRoutes = require('./routes/tickets');

// ⬇️ USE ROUTES HERE
app.use('/api', ticketRoutes);

// ⬇️ START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const eventRoutes = require('./routes/event');
app.use('/api/event', eventRoutes);

const Ticket = require('./models/Ticket');

app.post('/api/payment/complete', async (req, res) => {
  try {
    const ticketData = req.body;
    const newTicket = new Ticket(ticketData);
    await newTicket.save();
    res.status(200).json({ message: 'Payment and ticket recorded.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving ticket data.' });
  }
});
