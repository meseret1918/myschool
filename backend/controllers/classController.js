const Classes = require('../models/classes');

// Fetch all class records
exports.getAllClasses = async (req, res) => {
  try {
    const results = await Classes.findAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Failed to fetch class records:', err);
    res.status(500).json({ error: 'Failed to fetch class records.' });
  }
};

// Fetch class record by ID
exports.getClassById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Classes.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Class record not found.' });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error('Failed to fetch class record:', err);
    res.status(500).json({ error: 'Failed to fetch class record.' });
  }
};

// Create a new class record
exports.createClass = async (req, res) => {
  try {
    const data = req.body;
    const newRecord = await Classes.create(data);
    res.status(201).json({ message: 'Class record created successfully.', id: newRecord.id });
  } catch (err) {
    console.error('Failed to create class record:', err);
    res.status(500).json({ error: 'Failed to create class record.' });
  }
};

// Update a class record by ID
exports.updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const [updated] = await Classes.update(data, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Class record not found.' });
    }
    res.status(200).json({ message: 'Class record updated successfully.' });
  } catch (err) {
    console.error('Failed to update class record:', err);
    res.status(500).json({ error: 'Failed to update class record.' });
  }
};

// Delete a class record by ID
exports.deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Classes.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Class record not found.' });
    }
    res.status(200).json({ message: 'Class record deleted successfully.' });
  } catch (err) {
    console.error('Failed to delete class record:', err);
    res.status(500).json({ error: 'Failed to delete class record.' });
  }
};