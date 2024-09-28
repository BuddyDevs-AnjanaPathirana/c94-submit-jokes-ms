const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    jokeType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'  // 'pending', 'approved', 'rejected'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Joke', jokeSchema);
