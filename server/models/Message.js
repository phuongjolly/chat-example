const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  chatRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Chatroom'
  },
  content:{
    type: String,
    required: true
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
