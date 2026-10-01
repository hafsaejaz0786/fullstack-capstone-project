const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');

const initialGifts = [
    { id: "1", name: "Wireless Mouse", category: "Electronics", condition: "Like New", posted_by: "john_doe", zipcode: "10001", date_added: "1693500000" },
    { id: "2", name: "Wooden Coffee Table", category: "Furniture", condition: "Good", posted_by: "jane_smith", zipcode: "10002", date_added: "1693500100" },
    { id: "3", name: "Cotton Jacket", category: "Fashion", condition: "New", posted_by: "ali_khan", zipcode: "10003", date_added: "1693500200" }
];

router.get('/', async (req, res) => {
    try {
        const { category, condition, name } = req.query;
        let query = {};
        if (category) query.category = category;
        if (condition) query.condition = condition;
        if (name) query.name = { $regex: name, $options: 'i' };

        const db = await connectToDatabase();
        const gifts = await db.collection("gifts").find(query).toArray();
        if (gifts.length > 0) return res.json(gifts);
    } catch (e) {
        // Fallback filtering
    }

    let results = [...initialGifts];
    if (req.query.category) {
        results = results.filter(g => g.category.toLowerCase() === req.query.category.toLowerCase());
    }
    if (req.query.name) {
        results = results.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }
    return res.json(results);
});

module.exports = router;