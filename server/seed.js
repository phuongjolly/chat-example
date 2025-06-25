
require('dotenv').config();

const mongoose = require('mongoose');
const Chatroom = require('./models/Chatroom');
const User = require('./models/User'); // assuming you have a User model
const Message = require('./models/Message'); // assuming you have a Message model

const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/chatapp?authSource=admin';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data (optional, for dev only)
    await Chatroom.deleteMany({});
    await User.deleteMany({});
    await Message.deleteMany({});

    // Seed chatrooms
    const chatroom = await Chatroom.create({ name: 'general' });

    // Seed users
    const user = await User.create({ name: "Phuong" });

    // Seed messages
    await Message.create({
      senderId: user._id,
      chatRoomId: chatroom._id,
      content: 'Hello world!',
    });

    console.log('Seeding done ✅');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
