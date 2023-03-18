const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

let scheduleInterview = new mongoose.Schema({
    candidate: { type: mongoose.Types.ObjectId, default: null, required: true },
    interviewer: { type: mongoose.Types.ObjectId, default: null, required: true },
    interviewType: String,
    duration: { type: Number, required: true },
    skills: [],
    scheduleDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now()
    }
});

autoIncrement.initialize(mongoose.connection);
scheduleInterview.plugin(autoIncrement.plugin, { model: 'scheduleInterview', field: 'id' })

module.exports = mongoose.model('scheduleInterview', scheduleInterview, 'scheduleInterview')