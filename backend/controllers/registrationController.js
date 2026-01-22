const Registration = require('../models/registrationModel');
const Course = require('../models/courseModel');

// @desc    Register for a course
// @route   POST /api/courses/register
// @access  Private
const registerForCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Find the course (by ID or Slug)
        const course = await Course.findOne({
            $or: [{ _id: courseId }, { id: courseId }, { slug: courseId }]
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const existingRegistration = await Registration.findOne({
            user: req.user._id,
            course: course._id
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this course' });
        }

        const registration = await Registration.create({
            user: req.user._id,
            course: course._id
        });

        res.status(201).json({
            success: true,
            registration
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my registrations
// @route   GET /api/courses/my-registrations
// @access  Private
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id })
            .populate('course', 'title slug category level duration price description instructor');

        // Format for frontend compatibility
        const formatted = registrations.map(reg => ({
            id: reg._id,
            courseId: reg.course._id,
            slug: reg.course.slug,
            status: reg.status,
            progress: reg.progress,
            registeredAt: reg.createdAt
        }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Check if registered
// @route   GET /api/courses/check-registration/:courseId
// @access  Private
const checkRegistration = async (req, res) => {
    try {
        const course = await Course.findOne({
            $or: [{ _id: req.params.courseId }, { id: req.params.courseId }, { slug: req.params.courseId }]
        });

        if (!course) {
            return res.json({ registered: false });
        }

        const registration = await Registration.findOne({
            user: req.user._id,
            course: course._id
        });

        res.json({ registered: !!registration });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update progress
// @route   PUT /api/courses/progress
// @access  Private
const updateProgress = async (req, res) => {
    try {
        const { courseId, progress, completedLessons, currentLesson } = req.body;

        const course = await Course.findOne({
            $or: [{ _id: courseId }, { id: courseId }, { slug: courseId }]
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const registration = await Registration.findOneAndUpdate(
            { user: req.user._id, course: course._id },
            { progress, completedLessons, currentLesson },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        res.json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerForCourse,
    getMyRegistrations,
    checkRegistration,
    updateProgress
};
