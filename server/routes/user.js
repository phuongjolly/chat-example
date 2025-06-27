const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User")

const router = express.Router();

//get user by user id
router.get('/api/user/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        console.log("Error", err)
        res.status(500).json({ error: "Fetching user failed!"})
    }
});

//create/update user by user id
router.post('/api/user', async(req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {        
        const newUser = new User({ name });
        await newUser.save();
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user"})
    }
})

module.exports = router;