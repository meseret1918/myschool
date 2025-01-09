const StudentAttendance = require('../models/studentAttendance');

// Fetch all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const results = await StudentAttendance.findAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Failed to fetch attendance records:', err);
    res.status(500).json({ error: 'Failed to fetch attendance records.' });
  }
};

// Fetch attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await StudentAttendance.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error('Failed to fetch attendance record:', err);
    res.status(500).json({ error: 'Failed to fetch attendance record.' });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const data = req.body;
    const newRecord = await StudentAttendance.create(data);
    res.status(201).json({ message: 'Attendance record created successfully.', id: newRecord.id });
  } catch (err) {
    console.error('Failed to create attendance record:', err);
    res.status(500).json({ error: 'Failed to create attendance record.' });
  }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const [updated] = await StudentAttendance.update(data, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }
    res.status(200).json({ message: 'Attendance record updated successfully.' });
  } catch (err) {
    console.error('Failed to update attendance record:', err);
    res.status(500).json({ error: 'Failed to update attendance record.' });
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await StudentAttendance.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }
    res.status(200).json({ message: 'Attendance record deleted successfully.' });
  } catch (err) {
    console.error('Failed to delete attendance record:', err);
    res.status(500).json({ error: 'Failed to delete attendance record.' });
  }
};
