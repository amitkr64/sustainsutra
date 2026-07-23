const mongoose = require('mongoose');

/**
 * Captures inbound leads from the landing-page contact form. Admins view and
 * manage these via /api/leads (protected).
 */
const leadSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    contactName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    sector: {
        type: String,
        trim: true
    },
    processType: {
        type: String,
        trim: true
    },
    reportingStandard: {
        type: String,
        trim: true
    },
    inquiryDetails: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'qualified', 'closed'],
        default: 'new',
        index: true
    }
}, {
    timestamps: true
});

leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
