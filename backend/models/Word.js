const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String, // e.g., verb, noun, adjective
        required: true,
        trim: true
    },
    meaning: {
        type: String,
        required: true
    },
    example: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Word', wordSchema);
