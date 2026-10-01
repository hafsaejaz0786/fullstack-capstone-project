const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');

const initialGifts = [
    { id: "1", name: "Wireless Mouse", category: "Electronics", condition: "Like New", posted_by: "john_doe", zipcode: "10001", date_added: "1693500000" },
    { id: "2", name: "Wooden Coffee Table", category: "Furniture", condition: "Good", posted_by: "jane_smith", zipcode: "10002", date_added: "1693500100" },
    { id: "3", name: "Cotton Jacket", category: "Fashion", condition: "New", posted_by: "ali_khan", zipcode: "10003", date_added: "1693500200" }
];

// GET /api/gifts - Get all gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        if (gifts.length > 0) return res.json(gifts);
        return res.json(initialGifts);
    } catch (e) {
        return res.json(initialGifts);
    }
});

// GET /api/gifts/:id - Get single gift by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.findOne({ id: req.params.id });
        if (gift) return res.json(gift);

        const localGift = initialGifts.find(g => g.id === req.params.id);
        if (localGift) return res.json(localGift);
        return res.status(404).json({ message: "Gift not found" });
    } catch (e) {
        const localGift = initialGifts.find(g => g.id === req.params.id);
        if (localGift) return res.json(localGift);
        return res.status(404).json({ message: "Gift not found" });
    }
});

module.exports = router;