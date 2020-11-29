const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// User model
const User = require('../models/student');

// POST Request
// To register a user
router.post('/', (req, res) => {

    // Retrieve data from request body
    const { name, prn, email, password, class_name } = req.body;

    // Check if anything is null
    if(!name || !prn || !email || !password || !class_name)
        return res.status(400).json({ error: "Please enter all fields" });
    
    // Checking for existing user
    User.findOne({ prn })
        .then(user => {

            // Report user already exists
            if(user) return res.status(400).json({ error: "User already exists" });

            const newUser = new User({
                name,
                prn,
                email,
                password,
                class_name
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
                                prn: user.prn,
                                emial: user.email,
                                class_name: user.class_name
                            });
                        });
                });
            });
        });

});

module.exports = router;