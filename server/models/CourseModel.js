const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        default: 'No description available',
        trim: true
    },
    instructor: {
        type: String,
        required: true,
        trim: true,
    },
    instructorId: {
        type: String,
        required: true,
    },
    courseLength: {
        type: String,
        required: true,

    },
    enrolledUsers: {
        type: Array,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Course', CourseSchema);