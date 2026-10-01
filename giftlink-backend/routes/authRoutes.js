const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || "giftlink_secret_key_123";

// In-memory array fallback if Mongo isn't connected
const usersMemory = [];

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            const db = await connectToDatabase();
            const collection = db.collection("users");
            const existingUser = await collection.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ error: "Email already registered" });
            }

            const newUser = { firstName, lastName, email, password, createdAt: new Date() };
            const result = await collection.insertOne(newUser);

            const payload = { user: { id: result.insertedId.toString(), email } };
            const authtoken = jwt.sign(payload, JWT_SECRET);

            return res.status(200).json({ authtoken, email });
        } catch (dbErr) {
            // Memory fallback
            const existing = usersMemory.find(u => u.email === email);
            if (existing) return res.status(400).json({ error: "Email already registered" });

            const newUser = { id: Date.now().toString(), firstName, lastName, email, password };
            usersMemory.push(newUser);

            const payload = { user: { id: newUser.id, email } };
            const authtoken = jwt.sign(payload, JWT_SECRET);

            return res.status(200).json({ authtoken, email });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        try {
            const db = await connectToDatabase();
            const collection = db.collection("users");
            const theUser = await collection.findOne({ email });

            if (theUser && theUser.password === password) {
                const payload = { user: { id: theUser._id.toString() } };
                const authtoken = jwt.sign(payload, JWT_SECRET);
                return res.status(200).json({ authtoken, userName: theUser.firstName, userEmail: theUser.email });
            }
        } catch (dbErr) {
            const memoryUser = usersMemory.find(u => u.email === email && u.password === password);
            if (memoryUser) {
                const payload = { user: { id: memoryUser.id } };
                const authtoken = jwt.sign(payload, JWT_SECRET);
                return res.status(200).json({ authtoken, userName: memoryUser.firstName, userEmail: memoryUser.email });
            }
        }

        return res.status(404).json({ error: "User not found or invalid credentials" });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

module.exports = router;