const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String // 'customer' or 'organizer'
});

module.exports = mongoose.model('User', userSchema);
