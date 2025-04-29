// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type:String,
        required:true,
        trim:true,
  },
  email: {
    type:String,
    required:true,
    trim:true,
  },
  password: {
    type:String,
    required:true,
  },
  role: { type: String, enum: ['client', 'admin'], default: 'client' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
