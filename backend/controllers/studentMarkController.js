const StudentMark = require('../models/studentMark');

// Fetch all mark records
exports.getAllMarks = async (req, res) => {
  try {
    const results = await StudentMark.findAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Failed to fetch mark records:', err);
    res.status(500).json({ error: 'Failed to fetch mark records.' });
  }
};

// Fetch mark record by ID
exports.getMarkById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await StudentMark.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Mark record not found.' });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error('Failed to fetch mark record:', err);
    res.status(500).json({ error: 'Failed to fetch mark record.' });
  }
};

// Create a new mark record
exports.createMark = async (req, res) => {
  try {
    const { student_id, subject, marks, exam_type, date } = req.body;

    // Validate required fields
    if (!student_id || !subject || !marks || !exam_type || !date) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newRecord = await StudentMark.create({
      student_id,
      subject,
      marks,
      exam_type,
      date,
    });

    res.status(201).json({
      message: 'Mark record created successfully.',
      id: newRecord.id,
    });
  } catch (err) {
    console.error('Failed to create mark record:', err);
    res.status(500).json({ error: 'Failed to create mark record.' });
  }
};

// Update a mark record by ID
exports.updateMark = async (req, res) => {
  try {
    const id = req.params.id;
    const { student_id, subject, marks, exam_type, date } = req.body;

    // Validate required fields
    if (!student_id || !subject || !marks || !exam_type || !date) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const [updated] = await StudentMark.update(
      { student_id, subject, marks, exam_type, date },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Mark record not found.' });
    }

    res.status(200).json({ message: 'Mark record updated successfully.' });
  } catch (err) {
    console.error('Failed to update mark record:', err);
    res.status(500).json({ error: 'Failed to update mark record.' });
  }
};

// Delete a mark record by ID
exports.deleteMark = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await StudentMark.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Mark record not found.' });
    }

    res.status(200).json({ message: 'Mark record deleted successfully.' });
  } catch (err) {
    console.error('Failed to delete mark record:', err);
    res.status(500).json({ error: 'Failed to delete mark record.' });
  }
};
