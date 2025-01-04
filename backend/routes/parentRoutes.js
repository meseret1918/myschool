const express = require('express');
const Parent = require('../models/Parent'); // Ensure this path is correct
const router = express.Router();

// Get all parents
router.get('/', async (req, res) => {
    try {
        const parents = await Parent.findAll();
        res.json(parents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch parents' });
    }
});

// Add a new parent
router.post('/', async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const parent = await Parent.create({ name, phone, email, address });
        res.status(201).json(parent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add parent' });
    }
});

module.exports = router;
