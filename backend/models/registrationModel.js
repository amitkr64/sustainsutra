const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    status: {
        type: String,
        required: true,
        default: 'active',
        enum: ['active', 'completed', 'cancelled']
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    },
    completedLessons: [{
        type: String
    }],
    currentLesson: {
        type: String
    }
}, {
    timestamps: true
});

// Ensure a user can only register once for the same course
registrationSchema.index({ user: 1, course: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
