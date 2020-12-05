const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// User model
const User = require('../models/student');

// POST /user/login
// Authenticate the user
router.post('/', (req,res) => {
    const email = req.body.email_login;
    const password = req.body.password_login;

    // Validation
    if(!email || !password){
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exists' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid password' });

                    res.json({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        type: user.type
                    });
                });
        });
});

module.exports = router;