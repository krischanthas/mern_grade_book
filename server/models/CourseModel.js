const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: String, 
        required: true,
        trim: true,
    },
    courseLength: {
        type: String,
        required: true,
 
    },
    grades: {
        type: Array,
        default: []
    },
    createdDate : {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Course', CourseSchema);