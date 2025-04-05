const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const Event = require('./models/Event'); // import model

const app = express();
const port = 3000;

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chillr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// API to handle event submission
app.post('/api/event/submit', upload.single('poster'), async (req, res) => {
  try {
    const {
      organizerName, organizerEmail, eventName,
      eventId, venue, date, vipPrice,
      premiumPrice, generalPrice, description
    } = req.body;

    const posterPath = req.file ? req.file.path : null;

    const newEvent = new Event({
      organizerName,
      organizerEmail,
      eventName,
      eventId,
      venue,
      date,
      vipPrice,
      premiumPrice,
      generalPrice,
      description,
      posterPath
    });

    await newEvent.save();

    res.status(200).json({ message: 'Event submitted and saved to database!' });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(409).json({ message: 'Event ID already exists. Please choose another.' });
    } else {
      res.status(500).json({ message: 'Server error during event submission.' });
    }
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
