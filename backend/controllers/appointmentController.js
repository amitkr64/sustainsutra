const asyncHandler = require('express-async-handler');
const Appointment = require('../models/appointmentModel');

// 🛡️ Mock Storage for Demo Mode
let mockAppointments = global.mockAppointments;

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        return res.json(mockAppointments);
    }
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json(appointments);
});

// @desc    Create appointment request
// @route   POST /api/appointments
// @access  Public (or Private user)
const createAppointment = asyncHandler(async (req, res) => {
    const { name, email, date, timeSlot, type } = req.body;

    // Check availability logic could go here

    const appointment = await Appointment.create({
        name,
        email,
        date,
        timeSlot,
        type,
        user: req.user ? req.user._id : undefined
    });

    res.status(201).json(appointment);
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private/Admin
const updateAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
        appointment.status = req.body.status || appointment.status;
        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } else {
        res.status(404);
        throw new Error('Appointment not found');
    }
});

module.exports = {
    getAppointments,
    createAppointment,
    updateAppointment
};
