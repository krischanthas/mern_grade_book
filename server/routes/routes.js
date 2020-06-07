const router = require('express').Router();
// ../models
const CourseModel = require('../models/CourseModel');
const GradeModel = require('../models/GradeModel');
const UserModel = require('../models/UserModel');

// ../util
const verifyToken = require('../util/verifyToken');
const verifyAdminRole = require('../util/verifyAdmin');


// get all courses
router.get('/courses', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const courses = await CourseModel.find();
        if (!courses) return res.send('No current courses found');

        return res.status(200).send(courses);
    } catch (err) {
        res.status(400).send(err);
    }
})

// add course 
router.post('/courses/add', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        // check if a courseName and instructor exist
        const courseExists = await CourseModel.findOne({ courseName: req.body.courseName, instructor: req.body.instructor });
        if (courseExists) return res.status(400).send('This course exists already.');

        const course = new CourseModel({
            courseName: req.body.courseName,
            instructor: req.body.instructor,
            courseLength: req.body.courseLength
        });

        const courseToSave = await course.save();
        return res.status(201).send(courseToSave);

    } catch (err) {
        res.status(400).send(err);
    }
})

// add grade
router.post('/grades/add', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const grade = new GradeModel({
            courseId: req.body.courseId,
            userId: req.body.userId,
            grade: req.body.grade
        });

        const gradeToAdd = await grade.save();

        // track gradeId(s) for each course
        const courseToUpdate = await CourseModel.findOneAndUpdate({ _id: req.body.courseId }, { $push: { grades: gradeToAdd._id } });
        await courseToUpdate.save();
        return res.status(201).send(courseToUpdate);

    } catch (err) {
        res.status(400).send(err);
    }

})

// get all users
router.get('/users', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) return res.send('No current users found');

        return res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err);
    }
})






module.exports = router;