const Class = require('../models/Class');

// Get all classes
exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch classes", error: err });
    }
};

// Create a new class
exports.createClass = async (req, res) => {
    const { name, subject } = req.body;
    try {
        const newClass = await Class.create({ name, subject });
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ message: "Failed to create class", error: err });
    }
};

// Edit an existing class
exports.updateClass = async (req, res) => {
    const { id } = req.params;
    const { name, subject } = req.body;
    try {
        const updatedClass = await Class.update({ name, subject }, { where: { id } });
        if (updatedClass[0] === 0) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ id, name, subject });
    } catch (err) {
        res.status(400).json({ message: "Failed to update class", error: err });
    }
};

// Delete a class
exports.deleteClass = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClass = await Class.destroy({ where: { id } });
        if (deletedClass === 0) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete class", error: err });
    }
};
