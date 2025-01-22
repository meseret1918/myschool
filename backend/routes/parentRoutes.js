const express = require('express');
const Parent = require('../models/Parent');
const router = express.Router();

// Helper function to get a parent by ID
const getParentById = async (id) => {
    return await Parent.findOne({ where: { parent_id: id } });
};

// Get all parents
router.get('/', async (req, res) => {
    try {
        const parents = await Parent.findAll();
        res.status(200).json(parents);
    } catch (err) {
        console.error('Error fetching parents:', err); 
        res.status(500).json({ error: 'Failed to fetch parents' });
    }
});

// Get a single parent by ID
router.get('/:id', async (req, res) => {
    try {
        const parent = await getParentById(req.params.id);

        if (!parent) {
            return res.status(404).json({ error: 'Parent not found' });
        }

        res.status(200).json(parent);
    } catch (err) {
        console.error('Error fetching parent:', err); 
        res.status(500).json({ error: 'Failed to fetch parent' });
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
        console.error('Error adding parent:', err);  
        res.status(500).json({ error: 'Failed to add parent' });
    }
});

// Update an existing parent by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const parent = await getParentById(req.params.id);

        if (!parent) {
            return res.status(404).json({ error: 'Parent not found' });
        }

        // Update the parent
        await parent.update({ name, phone, email, address });
        res.status(200).json(parent);
    } catch (err) {
        console.error('Error updating parent:', err);  // More detailed error logging
        res.status(500).json({ error: 'Failed to update parent' });
    }
});

// Delete a parent by ID
router.delete('/:id', async (req, res) => {
    try {
        const parent = await getParentById(req.params.id);

        if (!parent) {
            return res.status(404).json({ error: 'Parent not found' });
        }

        // Delete the parent
        const deletionResult = await parent.destroy();

        if (deletionResult) {
            res.status(204).json(); // No content returned for successful delete
        } else {
            res.status(500).json({ error: 'Failed to delete parent' });
        }
    } catch (err) {
        console.error('Error deleting parent:', err);  // More detailed error logging
        res.status(500).json({ error: 'Failed to delete parent' });
    }
});

module.exports = router;
