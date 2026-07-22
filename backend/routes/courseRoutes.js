const express = require('express');
const router = express.Router();
const {
    getCourses,
    getPublishedCourses,
    getCourseBySlug,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');
const {
    registerForCourse,
    getMyRegistrations,
    checkRegistration,
    updateProgress
} = require('../controllers/registrationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCourses)
    .post(protect, admin, createCourse);

router.post('/register', protect, registerForCourse);
router.get('/my-registrations', protect, getMyRegistrations);
router.get('/check-registration/:courseId', protect, checkRegistration);
router.put('/progress', protect, updateProgress);

router.get('/published', getPublishedCourses);
router.get('/slug/:slug', getCourseBySlug);

router.route('/:id')
    .put(protect, admin, updateCourse)
    .delete(protect, admin, deleteCourse);

module.exports = router;
