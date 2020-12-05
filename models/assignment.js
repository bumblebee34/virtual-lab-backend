const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const AssignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    due_date:{
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    
});

module.exports = mongoose.model('assignment', AssignmentSchema);