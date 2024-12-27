const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    // Additional fields like attendees, status can be added
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
