const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  const { message, rating, image } = req.body;
  const feedback = await Feedback.create({
    userId: req.user._id,
    username: req.user.username,
    message,
    rating,
    image,
  });
  res.status(201).json(feedback);
};

exports.getAllFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
};
