const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// GET all words
router.get('/', async (req, res) => {
    try {
        const words = await Word.find().sort({ createdAt: -1 });
        res.json(words);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new word
router.post('/', async (req, res) => {
    const { word, type, meaning, example } = req.body;

    const newWord = new Word({
        word,
        type,
        meaning,
        example
    });

    try {
        const savedWord = await newWord.save();
        res.status(201).json(savedWord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a word
router.delete('/:id', async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (!word) return res.status(404).json({ message: 'Word not found' });
        
        await word.deleteOne();
        res.json({ message: 'Word deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
