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
        const courses = await CourseModel.find({ instructorId: req.user._id });
        if (!courses) return res.send('No current courses found');
        return res.status(200).send(courses);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})

router.get('/courses/:courseId', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const course = await CourseModel.find({ _id: req.params.courseId });
        if (!course) return res.send('No course found');
        return res.status(200).send(course);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
})

// add course 
router.post('/courses/add', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        // check if a courseName and instructor exist
        const courseExists = await CourseModel.findOne({ courseName: req.body.courseName, instructorId: req.user._id });
        if (courseExists) return res.status(400).send('This course exists already.');

        const course = new CourseModel({
            courseName: req.body.courseName,
            instructor: req.user.name,
            instructorId: req.user._id,
            courseLength: req.body.courseLength
        });

        const courseToSave = await course.save();
        return res.status(201).json(courseToSave);

    } catch (err) {
        res.status(400).send(err);
    }
})

// delete courses
router.delete('/courses/:courseId', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        await CourseModel.findOneAndDelete({ _id: courseId });
        return res.status(200).json({ message: 'Successfully deleted course', courseId });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.patch('/courses/:courseId', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const updatedCourse = await CourseModel.findOneAndUpdate(
            { _id: courseId },
            { courseName: req.body.courseName, courseLength: req.body.courseLength },
            { new: true }
        );
        return res.status(200).send(updatedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

/**
 * Grade routes
 */

// add grade
router.post('/grades/add', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const grade = new GradeModel({
            courseId: req.body.courseId,
            userName: req.body.userName,
            userId: req.body.userId,
            grade: req.body.grade
        });

        const gradeToAdd = await grade.save();

        // track gradeId(s) for each course
        const courseToUpdate = await CourseModel.findOneAndUpdate({ _id: req.body.courseId }, { $push: { grades: gradeToAdd } });
        await courseToUpdate.save();
        return res.status(201).send(courseToUpdate);

    } catch (err) {
        res.status(400).send(err);
    }

})
// get course grades
router.get('/grades/:courseId', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const grades = await GradeModel.find({ courseId: req.params.courseId });
        if (!grades) return res.send('No current grades exist');
        return res.status(200).send(grades);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})
// delete grade
router.delete('/grades/:gradeId', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const gradeId = req.params.gradeId;
        await GradeModel.findOneAndDelete({ _id: gradeId });
        return res.status(200).json({ message: 'Successfully deleted grade', gradeId });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
// edit grade
router.patch('/grades/:gradeId', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const gradeId = req.params.gradeId;
        const updatedGrade = await GradeModel.findOneAndUpdate(
            { _id: gradeId },
            { userName: req.body.userName, grade: req.body.grade },
            { new: true }
        );
        return res.status(200).send(updatedGrade);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})


/**
 * User routes
 */
router.get('/users', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) return res.send('No current users found');

        return res.status(200).send(users);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})

router.get('/users/:role', verifyToken, verifyAdminRole, async (req, res) => {
    try {
        const users = await UserModel.find({ role: req.params.role });
        if (!users) return res.send('No current users found');

        return res.status(200).send(users);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
})





module.exports = router;