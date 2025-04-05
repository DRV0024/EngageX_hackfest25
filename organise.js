const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Configure Multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/api/event/submit', upload.single('poster'), (req, res) => {
  const { organizerName, organizerEmail, eventName, eventId, venue, date, vipPrice, premiumPrice, generalPrice, description } = req.body;
  const posterFile = req.file;

  console.log("Event Submission:", {
    organizerName,
    eventName,
    eventId,
    venue,
    date,
    vipPrice,
    premiumPrice,
    generalPrice,
    description,
    posterPath: posterFile?.path
  });

  // Save to DB or process further here...

  res.status(200).json({ message: 'Event submitted successfully!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
