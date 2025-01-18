// class.controller.js
const ClassModel = require('./models/class');  // Updated model import
// Get all classes
exports.getClasses = (req, res) => {
  db.query('SELECT * FROM classes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Get class by ID
exports.getClassById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM classes WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Create a new class
exports.createClass = (req, res) => {
  const { name, subject } = req.body;
  db.query(
    'INSERT INTO classes (name, subject) VALUES (?, ?)',
    [name, subject],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, name, subject });
    }
  );
};

// Update a class
exports.updateClass = (req, res) => {
  const { id } = req.params;
  const { name, subject } = req.body;
  db.query(
    'UPDATE classes SET name = ?, subject = ? WHERE id = ?',
    [name, subject, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json({ id, name, subject });
    }
  );
};

// Delete a class
exports.deleteClass = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM classes WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(204).send();
  });
};
