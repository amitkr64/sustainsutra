const asyncHandler = require('express-async-handler');
const Appointment = require('../models/appointmentModel');

// 🛡️ Mock Storage for Demo Mode
let mockAppointments = global.mockAppointments;

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json(appointments);
});

// @desc    Create appointment request
// @route   POST /api/appointments
// @access  Public (or Private user)
const createAppointment = asyncHandler(async (req, res) => {
    const { name, email, date, timeSlot, type } = req.body;

    if (global.isDemoMode) {
        const appointment = {
            _id: 'mock-apt-' + Date.now(),
            name, email, date, timeSlot, type,
            status: 'pending',
            createdAt: new Date()
        };
        global.mockAppointments.push(appointment);
        return res.status(201).json(appointment);
    }

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
    if (global.isDemoMode) {
        const index = global.mockAppointments.findIndex(a => a._id === req.params.id);
        if (index !== -1) {
            global.mockAppointments[index].status = req.body.status || global.mockAppointments[index].status;
            return res.json(global.mockAppointments[index]);
        }
        res.status(404);
        throw new Error('Appointment not found');
    }

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
