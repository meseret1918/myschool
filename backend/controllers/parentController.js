const Parent = require('../models/Parent');

// Create a new parent
exports.createParent = async (req, res) => {
    const { name, email, phoneNumber, childId } = req.body;
    try {
        const parent = new Parent({ name, email, phoneNumber, childId });
        await parent.save();
        res.status(201).json({ message: 'Parent created successfully', parent });
    } catch (err) {
        res.status(500).json({ message: 'Error creating parent' });
    }
};

// Get all parents
exports.getAllParents = async (req, res) => {
    try {
        const parents = await Parent.find();
        res.status(200).json(parents);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching parents' });
    }
};

// Get a single parent by ID
exports.getParentById = async (req, res) => {
    const { parentId } = req.params;
    try {
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json(parent);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching parent' });
    }
};

// Update parent details
exports.updateParent = async (req, res) => {
    const { parentId } = req.params;
    const { name, email, phoneNumber, childId } = req.body;
    try {
        const parent = await Parent.findByIdAndUpdate(parentId, { name, email, phoneNumber, childId }, { new: true });
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json({ message: 'Parent updated successfully', parent });
    } catch (err) {
        res.status(500).json({ message: 'Error updating parent' });
    }
};

// Delete parent
exports.deleteParent = async (req, res) => {
    const { parentId } = req.params;
    try {
        const parent = await Parent.findByIdAndDelete(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json({ message: 'Parent deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting parent' });
    }
};
