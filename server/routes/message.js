const express = require("express");
const mongoose = require('mongoose');
const Message = require("../models/Message");

function createRouter(pubsub) {
    const router = express.Router();


    //get all messages by chatroom id
    router.get('/api/message/:chatRoomId', async(req, res) => {
        try {
            const messages = await Message.find({ chatRoomId: req.params.chatRoomId }).sort({timestamp: 1});
            res.json(messages);
        }catch (err) {
            console.log("Error", err)
            res.status(500).json({ error: "Fetching message failed!"})
        }
    })

    //send message by sender id
    router.post('/api/message', async(req, res) => {
        const { senderId, chatRoomId, content } = req.body;
        
        if (!senderId || !chatRoomId || !content) {
            return res.status(400).json({ error: 'Missing required failed' });
        }
        
        try {
            const newMessage = new Message({senderId, chatRoomId, content});
            await newMessage.save();
            pubsub.publish(chatRoomId, newMessage);
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ error: "Failed to send message"})
        }
    })

    return router;
}

module.exports = createRouter;