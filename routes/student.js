const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// User model
const User = require('../models/student');

// POST Request
// To register a user
router.post('/', (req, res) => {

    // Retrieve data from request body
    const { name, prn, email, password, year } = req.body;

    // Check if anything is null
    if(!name || !prn || !email || !password || !year )
        return res.status(400).json({ msg: "Please enter all fields" });

    // Checking for existing user
    User.findOne({ prn })
        .then(user => {

            // Report user already exists
            if(user) return res.status(400).json({ msg: "User already exists" });

            const newUser = new User({
                name,
                prn,
                email,
                password,
                year
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
                                msg: "Registration successful, please login"
                            });
                        });
                });
            });
        });

});

module.exports = router;