const express = require('express');
const cors = require('cors');
require('dotenv').config();

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3060;

app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('GiftLink Backend Live!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});