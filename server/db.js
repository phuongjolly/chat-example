require('dotenv').config();

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/chatapp?authSource=admin';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));
