const Registration = require('../models/registrationModel');
const Course = require('../models/courseModel');

// In-memory registrations for Demo Mode
const demoRegistrations = [];

// @desc    Register for a course
// @route   POST /api/courses/register
// @access  Private
const registerForCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (global.isDemoMode) {
            const existing = demoRegistrations.find(r => r.courseId === courseId && r.userId === req.user._id);
            if (existing) {
                return res.status(400).json({ message: 'Already registered for this course (Demo)' });
            }

            const registration = {
                _id: Date.now().toString(),
                userId: req.user._id,
                courseId: courseId,
                status: 'active',
                progress: 0,
                createdAt: new Date()
            };
            demoRegistrations.push(registration);
            return res.status(201).json({ success: true, registration });
        }

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
        if (global.isDemoMode) {
            const userRegs = demoRegistrations.filter(r => r.userId === req.user._id);
            // We can't easily populate in demo mode without the courses, but we'll return what we have
            return res.json(userRegs.map(r => ({
                id: r._id,
                courseId: r.courseId,
                status: r.status,
                progress: r.progress,
                registeredAt: r.createdAt
            })));
        }

        const registrations = await Registration.find({ user: req.user._id })
            .populate('course', 'title slug category level duration price description instructor');

        // Format for frontend compatibility
        const formatted = registrations.map(reg => ({
            id: reg._id,
            courseId: reg.course?._id || reg.course,
            slug: reg.course?.slug,
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
        if (global.isDemoMode) {
            const registered = demoRegistrations.some(r => r.courseId === req.params.courseId && r.userId === req.user._id);
            return res.json({ registered });
        }

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

        if (global.isDemoMode) {
            const index = demoRegistrations.findIndex(r => r.courseId === courseId && r.userId === req.user._id);
            if (index !== -1) {
                demoRegistrations[index] = { ...demoRegistrations[index], progress, completedLessons, currentLesson };
                return res.json(demoRegistrations[index]);
            }
            return res.status(404).json({ message: 'Registration not found (Demo)' });
        }

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
