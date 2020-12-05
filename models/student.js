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
    }
});

module.exports = mongoose.model('student', UserSchema);