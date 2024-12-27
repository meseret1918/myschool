const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    // Additional fields like marks, attendance can be added later
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
