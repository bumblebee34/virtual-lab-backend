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
    assignment_attempted:[
        {
            prn: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    questions: [
        {
            type:{
                type: String,
                required: true
            },
            question:{
                type: String,
                required: true
            },
            marks:{
                type: String,
                required: true
            },
            answer:{
                type: String,
                required: true
            },
            attempted:[
                {
                    student_name:{
                        type: String,
                        required: true
                    },
                    prn:{
                        type: String,
                        required: true
                    },
                    student_answer:{
                        type: String,
                        required: true
                    },
                    correct:{
                        type: String,
                        required: true
                    },
                    student_marks:{
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('assignment', AssignmentSchema);