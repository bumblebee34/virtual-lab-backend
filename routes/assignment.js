const express = require('express');
const router = express.Router();

// User model
const Assignment = require('../models/assignment');
const Student = require('../models/student');

// POST Request
// To register a user
router.post('/add_assignment', (req, res) => {

    // Retrieve data from request body
    const { assignment_name, estimated_time_to_complete, assigned_date, due_date, completed_count, total_marks, questions, answered_by } = req.body;

    //Check if anything is null
    if(!assignment_name || !estimated_time_to_complete || !assigned_date || !due_date || !completed_count || !total_marks || !questions || !answered_by)
        return res.status(400).json({ msg: "Please enter all fields" });
    
    const assignment = new Assignment({
        assignment_name, estimated_time_to_complete, assigned_date, due_date, completed_count, total_marks, questions, answered_by
    })

    assignment.save()
        .then(assignment => res.json({ msg: "Assignment added successfully!!!" }))
        .catch(err => res.json({ msg: err }))
});

router.post('/add_submission', (req, res) => {

    // Retrieve data from request body
    const { name, prn, date, total_marks, remark, questions } = req.body;

    //Check if anything is null
    if(!name || !prn || !total_marks || !questions)
        return res.status(400).json({ msg: "Please enter all fields" });
    
    const submission = {
        prn, date, total_marks, remark, questions
    }

    Assignment.findOne({assignment_name: name})
        .then(assignment => {

            var count = (parseInt(assignment.completed_count)+1);
            Assignment.findOneAndUpdate({assignment_name: name}, {$push: { "answered_by": submission}, $set: {"completed_count": count}}, {useFindAndModify: false}) 
            .then(assignment => res.json({ msg: "Submission added successfully!!!" }))
            .catch(err => res.json({ msg: "Fail" })) 

            const student_sub = {
                assignment_name: name,
                student_score: total_marks,
                assignment_score: assignment.total_marks,
                remark, date, questions
            }

            Student.findOneAndUpdate({ prn: prn}, {$push: { "assignments_attempted":  student_sub}})
            .then(assignment => res.json({ msg : assignment}))
            .catch(err => res.json({ msg: err}))

            })
        .catch(err => res.json({ msg: "err" }))
});

router.post('/check_answer', (req, res) => {

    // Retrieve data from request body
    const { name, prn } = req.body;

    // Check if anything is null
    if(!prn || !name)
        return res.status(400).json({ msg: "Please enter all fields" });
    
    Assignment.findOne({assignment_name: name})
    .then(assignment => {
        assignment.answered_by.forEach(element => {
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
    
    Assignment.findOne({assignment_name: name})
    .then(assignment => { res.json({data: assignment }) })
    .catch(e => console.log(e));
});

router.post('/update_data', (req, res) => {

    // Retrieve data from request body
    const { name, prn, que_no, marks, remark } = req.body;

    // Check if anything is null
    if(!name || !prn || !que_no || !marks)
    return res.status(400).json({ msg: "Please enter all fields" });
    
    Assignment.findOne({assignment_name: name}) 
    .then(assignment => {
        assignment.answered_by.forEach(student => {
            if(student.prn == prn){
                var totmarks = parseInt(student.total_marks) - parseInt(student.questions[parseInt(que_no)].student_mark) + parseInt(marks);
                student.total_marks = totmarks.toString();
                student.questions[parseInt(que_no)].student_mark = marks;
                if(remark !== ""){
                    student.remark = remark
                }
            }
        })
        assignment.save()
        .then(ass => res.json({ msg: ass}))
        .catch(err => res.json({msg: err}))
    })
    .catch(err => res.json({ msg: "Fail" })) 

    Student.findOne({prn: prn})
    .then(student => {
        student.assignments_attempted.forEach(assignment => {
            if(assignment.assignment_name == name){
                assignment.questions[parseInt(que_no)].student_mark = marks;
                if(remark !== ""){
                    assignment.remark = remark
                }
            }
        })
        student.save()
        .then(ass => res.json({ msg: ass}))
        .catch(err => res.json({msg: err}))
    })
    .catch(err => res.json({ msg: "Fail" })) 
});

module.exports = router;