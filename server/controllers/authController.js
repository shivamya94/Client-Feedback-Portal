const User = require('../models/User');
const generateToken = require('../utils/generatetokens');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, email, password });
  res.status(201).json({ token: generateToken(user._id), role: user.role });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.matchPassword(password)) {
    res.json({ token: generateToken(user._id), role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
