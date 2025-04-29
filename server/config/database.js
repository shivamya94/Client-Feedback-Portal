const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;






// const mongoose = require("mongoose");

// require("dotenv").config();

// exports.connect = () => {
//     mongoose.connect(process.env.MONGODB_URL, {

//     })
//     .then( () => {console.log("DB connected Successfully")})
//     .catch( (err) => {
//         console.log("DB Connection issued");
//         console.error(err);
//         process.exit(1);
//     });

// }