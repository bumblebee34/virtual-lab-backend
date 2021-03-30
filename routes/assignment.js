const express = require('express');
const router = express.Router();

// User model
const Assignment = require('../models/assignment');

// POST Request
// To register a user
router.post('/', (req, res) => {

    // Retrieve data from request body
    const { name, estimated_time_to_complete, assigned_date, due_date, completed_count, description, completed_students } = req.body;

    // Check if anything is null
    if(!name || !estimated_time_to_complete || !assigned_date || !due_date || !completed_count || !description || !completed_students)
        return res.status(400).json({ msg: "Please enter all fields" });
    
    const assignment = new Assignment({
        name,
        estimated_time_to_complete,
        assigned_date,
        due_date,
        completed_count,
        description,
        completed_students
    });

    assignment.save()
        .then(assignment => {
            res.json({
                msg: "Registration successful, please login"
            });
        })
        .catch(e => console.log(e));

});

module.exports = router;