const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Chatroom', ChatroomSchema);