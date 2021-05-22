const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    prn: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    year : {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: "Student"
    },
    assignments_attempted: [
        {
            assignment_name: {
                type: String,
                required: true
            },
            student_score: {
                type: String,
                required: true
            },
            assignment_score: {
                type: String,
                required: true
            },
            remark: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
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

module.exports = mongoose.model('student', UserSchema);