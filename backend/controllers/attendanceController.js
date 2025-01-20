const Attendance = require('../models/Attendance');  // Correct model name

// Fetch all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const results = await Attendance.findAll();  // Using Attendance model
    if (results.length === 0) {
      return res.status(404).json({ message: 'No attendance records found.' });
    }
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching all attendance records:', err);
    res.status(500).json({ error: 'Failed to fetch attendance records.', details: err.message });
  }
};

// Fetch attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Attendance.findByPk(id);  // Using Attendance model
    if (!record) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error(`Error fetching attendance record with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to fetch attendance record.', details: err.message });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { index_number, date, month, year, time, status1, status2 } = req.body;

    // Validate incoming data
    if (!index_number || !date || !month || !year || !time || !status1 || !status2) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Define valid status options
    const validStatus1 = ['Present', 'Absent', 'Late', 'On Time'];
    const validStatus2 = ['Excused', 'Partial Attendance', 'Late but Present', 'Other Notes'];

    // Validate status values
    if (!validStatus1.includes(status1)) {
      return res.status(400).json({ error: `Invalid status1 value. Accepted values are: ${validStatus1.join(', ')}.` });
    }
    if (!validStatus2.includes(status2)) {
      return res.status(400).json({ error: `Invalid status2 value. Accepted values are: ${validStatus2.join(', ')}.` });
    }

    // Create the new record
    const newRecord = await Attendance.create({
      index_number,
      date,
      month,
      year,
      time,
      status1,
      status2
    });
    res.status(201).json({ message: 'Attendance record created successfully.', id: newRecord.id });
  } catch (err) {
    console.error('Error creating attendance record:', err);
    res.status(500).json({ error: 'Failed to create attendance record.', details: err.message });
  }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const { index_number, date, month, year, time, status1, status2 } = req.body;

    // Validate incoming data: At least one field must be provided for update
    if (!index_number && !date && !month && !year && !time && !status1 && !status2) {
      return res.status(400).json({ error: 'No fields to update.' });
    }

    // Define valid status options
    const validStatus1 = ['Present', 'Absent', 'Late', 'On Time'];
    const validStatus2 = ['Excused', 'Partial Attendance', 'Late but Present', 'Other Notes'];

    // Validate status values if provided
    if (status1 && !validStatus1.includes(status1)) {
      return res.status(400).json({ error: `Invalid status1 value. Accepted values are: ${validStatus1.join(', ')}.` });
    }
    if (status2 && !validStatus2.includes(status2)) {
      return res.status(400).json({ error: `Invalid status2 value. Accepted values are: ${validStatus2.join(', ')}.` });
    }

    // Update the record
    const [updated] = await Attendance.update(
      { index_number, date, month, year, time, status1, status2 },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }

    res.status(200).json({ message: 'Attendance record updated successfully.' });
  } catch (err) {
    console.error(`Error updating attendance record with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to update attendance record.', details: err.message });
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Attendance.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }
    res.status(200).json({ message: 'Attendance record deleted successfully.' });
  } catch (err) {
    console.error(`Error deleting attendance record with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to delete attendance record.', details: err.message });
  }
};
