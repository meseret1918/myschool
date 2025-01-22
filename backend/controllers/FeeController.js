const Fee = require('../models/Fee');  // Import the Fee model

// Get all fees
exports.getAllFee = async (req, res) => {
    try {
        const fee = await Fee.findAll();
        res.status(200).json(fee);
    } catch (error) {
        console.error('Error fetching fees:', error);
        res.status(500).json({ error: 'Failed to fetch fee' });
    }
};

// Get a fee by ID
exports.getFeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const fee = await Fee.findByPk(id);

        if (!fee) {
            return res.status(404).json({ error: 'Fee not found' });
        }

        res.status(200).json(fee);
    } catch (error) {
        console.error('Error fetching fee:', error);
        res.status(500).json({ error: 'Failed to fetch fee' });
    }
};

// Add a new fee
exports.addFee = async (req, res) => {
    try {
        const { index_number, year, month, date, paid, _status, student_status } = req.body;

        // Validate input
        if (!index_number || !year || !month || !date || !paid || !_status || !student_status) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create the new fee record
        const newFee = await Fee.create({
            index_number,
            year,
            month,
            date,
            paid,
            _status,
            student_status,
        });

        res.status(201).json({
            message: 'Fee added successfully',
            fee: newFee,
        });
    } catch (error) {
        console.error('Error adding fee:', error);
        res.status(500).json({ error: 'Error adding fee. Please try again.' });
    }
};

// Update an existing fee
exports.updateFee = async (req, res) => {
    try {
        const { id } = req.params;
        const { paid, _status, student_status } = req.body;

        const fee = await Fee.findByPk(id);

        if (!fee) {
            return res.status(404).json({ error: 'Fee not found' });
        }
        // Update fee attributes only if new data is provided
        fee.paid = paid !== undefined ? paid : fee.paid;
        fee._status = _status !== undefined ? _status : fee._status;
        fee.student_status = student_status !== undefined ? student_status : fee.student_status;

        await fee.save();

        res.status(200).json({
            message: 'Fee updated successfully',
            fee,
        });
    } catch (error) {
        console.error('Error updating fee:', error);
        res.status(500).json({ error: 'Error updating fee' });
    }
};

// Delete a fee
exports.deleteFee = async (req, res) => {
    try {
        const { id } = req.params;

        const fee = await Fee.findByPk(id);

        if (!fee) {
            return res.status(404).json({ error: 'Fee not found' });
        }

        // Destroy the fee record
        await fee.destroy();

        res.status(200).json({
            message: 'Fee deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting fee:', error);
        res.status(500).json({ error: 'Error deleting fee' });
    }
};
