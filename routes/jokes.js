const express = require('express');
const router = express.Router();
const Joke = require('../models/joke');
const db = require('../db'); // MySQL connection


// GET /jokes/types - Get available joke types from Azure MySQL
router.get('/types', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT name FROM joke_types');
        const jokeTypes = rows.map(row => row.name);
        res.json(jokeTypes);
    } catch (error) {
        console.error('Error fetching joke types from MySQL:', error);
        res.status(500).json({ message: 'Failed to fetch joke types' });
    }
});


// POST /jokes - Submit a new joke to MongoDB
router.post('/', async (req, res) => {
    const { content, jokeType } = req.body;

    // Validate request
    if (!content || !jokeType) {
        return res.status(400).json({ message: 'Joke content and type are required' });
    }

    try {
        // Save the joke in MongoDB Atlas
        const newJoke = new Joke({ content, jokeType });
        await newJoke.save();
        res.status(201).json({ message: 'Joke submitted successfully', joke: newJoke });
    } catch (error) {
        console.error('Error saving joke to MongoDB:', error);
        res.status(500).json({ message: 'Error submitting joke', error });
    }
});



module.exports = router;
