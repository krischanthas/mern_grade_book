const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    courseId: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    grade : {
        type: Number,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Grade', GradeSchema);