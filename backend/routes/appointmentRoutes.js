const express = require('express');
const router = express.Router();
const { getAppointments, getMyAppointments, createAppointment, updateAppointment } = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getAppointments).post(createAppointment);
router.get('/my', protect, getMyAppointments);
router.route('/:id').put(protect, admin, updateAppointment);

module.exports = router;
