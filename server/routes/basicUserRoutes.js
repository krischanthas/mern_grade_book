const router = require('express').Router();

const CourseModel = require('../models/CourseModel');
const GradeModel = require('../models/GradeModel');
const UserModel = require('../models/UserModel');

const verifyToken = require('../util/verifyToken');
const verifyBasicRole = require('../util/verifyBasic');

/**
 * Courses
 */

// request to this route will provide currently enrolled courses for a specific user
router.get('/courses/myCourses', verifyToken, verifyBasicRole, async (req, res) => {
    try {
        const courses = await CourseModel.find({ enrolledUsers: { $in: [req.user._id] } });
        if (!courses) return res.send('User is not enrolled in any courses');
        return res.status(200).send(courses);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})

// client will access this endpoint to get all available courses 
router.get('/courses/available', verifyToken, verifyBasicRole, async (req, res) => {
    try {
        const courses = await CourseModel.find({ enrolledUsers: { $ne: [req.user._id] } });
        if (!courses) return res.send('No current courses found');
        return res.status(200).send(courses);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})

// client will request access to a specific course for basic user to see
router.get('/courses/available/:courseId', verifyToken, verifyBasicRole, async (req, res) => {
    try {
        const course = await CourseModel.find({ _id: req.params.courseId });
        if (!course) return res.send('No course found');
        return res.status(200).send(course);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})

// client request will attempt to enroll basic user in course. Course model will reflect enrolled users, add to array
router.patch('/courses/available/:courseId', verifyToken, verifyBasicRole, async (req, res) => {
    try {
        // fetch specified course
        const course = await CourseModel.findOneAndUpdate({ _id: req.params.courseId }, { $push: { enrolledUsers: req.user._id } }, { new: true });
        if (!course) return res.status(400).send('User enrollment attempt unsuccessful.');


        await course.save();
        return res.status(201).json(course);

    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})


/**
 * Grades
 */
router.get('/grades/:courseId', verifyToken, verifyBasicRole, async (req, res) => {
    try {
        const grades = await GradeModel.find({ courseId: req.params.courseId, userId: req.user._id });
        if (!grades) return res.status(400).send('No grades found');
        return res.status(200).send(grades);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})


module.exports = router;