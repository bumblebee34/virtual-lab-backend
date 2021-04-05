const express = require('express');
const router = express.Router();

// User model
const Assignment = require('../models/assignment');

// POST Request
// To register a user
router.post('/add_assignment', (req, res) => {

    // Retrieve data from request body
    const { name, assignment_attempted, question1, question2, question3 } = req.body;

    //Check if anything is null
    if(!name || !assignment_attempted || !question1 || !question2 || !question3)
        return res.status(400).json({ msg: "Please enter all fields" });
    
    Assignment.findOneAndUpdate({name: name}, {$push: { "assignment_attempted": assignment_attempted}})
    .then(assignment => {
        res.json({
            msg: "Registration successful, please login"
        });
    })
    .catch(e => console.log(e));

    Assignment.findOneAndUpdate({name: name}, {$push: { "questions.0.attempted": question1}})
        .then(assignment => {
            res.json({
                msg: "Registration successful, please login"
            });
        })
        .catch(e => console.log(e));

    Assignment.findOneAndUpdate({name: name}, {$push: { "questions.1.attempted": question2}})
    .then(assignment => {
        res.json({
            msg: "Registration successful, please login"
        });
    })
    .catch(e => console.log(e));

    Assignment.findOneAndUpdate({name: name}, {$push: { "questions.2.attempted": question3}})
    .then(assignment => {
        res.json({
            msg: "Registration successful, please login"
        });
    })
    .catch(e => console.log(e));

    // var assignment = new Assignment({
    //     name, estimated_time_to_complete, assigned_date, due_date, completed_count, description, assignment_attempted, questions
    // })

    // assignment.save()
    // .then(assignment => res.json({ msg : "Success" }))
    // .catch(err => console.log(err));

});

router.post('/check_answer', (req, res) => {

    // Retrieve data from request body
    const { name, prn } = req.body;

    // Check if anything is null
    if(!prn || !name)
        return res.status(400).json({ msg: "Please enter all fields" });
    
    Assignment.findOne({name: name})
    .then(assignment => {
        assignment.assignment_attempted.forEach(element => {
            if(element.prn == prn)
            res.json({
                msg: "Already Submitted"
            });
        });
        res.json({
            msg: "Not Submitted"
        });
    })
    .catch(e => console.log(e));
});

router.post('/get_data', (req, res) => {

    // Retrieve data from request body
    const { name } = req.body;

    // Check if anything is null
    if(!name)
        return res.status(400).json({ msg: "Please enter all fields" });
    
    Assignment.findOne({name: name})
    .then(assignment => {
        res.json({
            data: assignment.assignment_attempted
        })
    })
    .catch(e => res.json({
        msg : e
    }));
});

module.exports = router;