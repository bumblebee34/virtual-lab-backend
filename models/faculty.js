const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const UserSchema = new Schema({
    name: {
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
    register_date: {
        type: Date,
        default: Date.now
    },
    subject: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('faculty', UserSchema);