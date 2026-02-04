require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vocabtion')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const wordsRouter = require('./routes/words');
app.use('/api/words', wordsRouter);

app.get('/', (req, res) => {
    res.send('Vocabtion API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
