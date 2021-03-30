const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const AssignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    estimated_time_to_complete: {
        type: String,
        required: true
    },
    assigned_date: {
        type: Date,
        default: Date.now
    },
    due_date:{
        type: Date,
        required: true
    },
    completed_count: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completed_students:[
        {
            student_name:{
                type: String,
                required: true
            },
            prn:{
                type: String,
                required: true
            },
            marks:{
                type: String,
                required: true
            },
            date:{
                type: Date,
                required: true
            },
            time:{
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('assignment', AssignmentSchema);