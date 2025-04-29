const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String },
  message:  { type: String, required: true },
  rating:   { type: Number, min: 1, max: 5 },
  image:    { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
