const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    type: { type: String },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Database indexes for performance
appointmentSchema.index({ user: 1, date: -1 });
appointmentSchema.index({ status: 1, date: -1 });
appointmentSchema.index({ email: 1 });
appointmentSchema.index({ date: 1, timeSlot: 1 });
appointmentSchema.index({ createdAt: -1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
