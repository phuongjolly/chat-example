const express = require("express");
const mongoose = require('mongoose');
const Message = require("../models/Message");
const User = require("../models/User");

function createRouter(pubsub) {
    const router = express.Router();


    //get all messages by chatroom id
    router.get('/api/message/:chatRoomId', async(req, res) => {
        try {
            const messages = await Message.find({ chatRoomId: req.params.chatRoomId })
            .sort({ timestamp: 1 })
            .populate('senderId', 'name');

            res.json({messages});
            console.log("check messages", messages);
        }catch (err) {
            console.log("Error", err)
            res.status(500).json({ error: "Fetching message failed!"})
        }
    })

    //send message by sender id
    router.post('/api/message', async(req, res) => {
        const { senderId, chatRoomId, content } = req.body;
        
        if (!senderId || !chatRoomId || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        try {
            const newMessage = new Message({senderId, chatRoomId, content});
            await newMessage.save();

            //get sender name
            const user = await User.findById(senderId);
            const messObject = newMessage.toObject();
            const message = {
                ...messObject,
                senderId: {
                    _id: messObject.senderId,
                    name: user.name,
                }
            }
           
            pubsub.publish(chatRoomId, message);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ error: "server send message failed"})
        }
    })

    return router;
}

module.exports = createRouter;