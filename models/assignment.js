const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const AssignmentSchema = new Schema({
    assignment_name: {
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
    total_marks: {
        type: String,
        required: true
    },
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
            keywords: []
        }
    ],
    answered_by: [
        {
            prn: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            total_marks: {
                type: String,
                required: true
            },
            remark: {
                type: String,
            },
            questions: [
                {
                    que_ans: {
                        type: String,
                        required: true
                    },
                    student_mark: {
                        type: String,
                        required: true
                    },
                    marks: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('assignment', AssignmentSchema);