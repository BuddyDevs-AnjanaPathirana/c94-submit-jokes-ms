const express = require('express');
const router = express.Router();
const Joke = require('../models/joke');

// POST /jokes - Submit a new joke
router.post('/', async (req, res) => {
    const { content, jokeType } = req.body;

    // Validate request
    if (!content || !jokeType) {
        return res.status(400).json({ message: 'Joke content and type are required' });
    }

    try {
        const newJoke = new Joke({ content, jokeType });
        await newJoke.save();
        res.status(201).json({ message: 'Joke submitted successfully', joke: newJoke });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting joke', error });
    }
});

module.exports = router;
