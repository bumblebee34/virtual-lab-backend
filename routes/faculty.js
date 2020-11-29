const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// User model
const User = require('../models/faculty');

// POST Request
// To register a user
router.post('/', (req, res) => {

    // Retrieve data from request body
    const { name, email, password, subject } = req.body;

    // Check if anything is null
    if(!name || !email || !password || !subject)
        return res.status(400).json({ error: "Please enter all fields" });
    
    // Checking for existing user
    User.findOne({ email })
        .then(user => {

            // Report user already exists
            if(user) return res.status(400).json({ error: "User already exists" });

            const newUser = new User({
                name,
                email,
                password,
                subject
            });

            // Hash the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Replace password with hash value
                    newUser.password = hash;
                    
                    // Save user to db
                    newUser.save()
                        .then(user => {
                            res.json({
                                id: user.id,
                                name: user.name,
                                emial: user.email,
                                subject: user.subject
                            });
                        });
                });
            });
        });

});

module.exports = router;