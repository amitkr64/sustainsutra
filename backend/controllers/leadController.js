const asyncHandler = require('express-async-handler');
const Lead = require('../models/leadModel');
const logger = require('../utils/logger');

// @desc    Submit a new lead (public)
// @route   POST /api/leads
// @access  Public
const createLead = asyncHandler(async (req, res) => {
    const { company, contactName, email, phone, sector, processType, reportingStandard, inquiryDetails } = req.body;

    if (!company || !contactName || !email || !inquiryDetails) {
        res.status(400);
        throw new Error('Please provide company, contact name, email, and inquiry details');
    }

    const lead = await Lead.create({
        company,
        contactName,
        email,
        phone: phone || '',
        sector: sector || '',
        processType: processType || '',
        reportingStandard: reportingStandard || '',
        inquiryDetails
    });

    logger.info(`New lead from ${contactName} at ${company} (${email})`);

    if (req.logActivity) {
        req.logActivity({
            action: 'lead.create',
            entityType: 'lead',
            entityId: String(lead._id),
            summary: `New lead: ${contactName} at ${company}`,
            metadata: { email, sector }
        });
    }

    res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. Our team will get back to you within 1-2 business days.',
        leadId: lead._id
    });
});

// @desc    Get all leads (admin)
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const [leads, total] = await Promise.all([
        Lead.find(filter).sort('-createdAt').skip(skip).limit(limit).lean(),
        Lead.countDocuments(filter)
    ]);

    res.status(200).json({
        data: leads,
        total,
        page,
        pages: Math.ceil(total / limit)
    });
});

// @desc    Update lead status (admin)
// @route   PATCH /api/leads/:id/status
// @access  Private/Admin
const updateLeadStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'qualified', 'closed'];

    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid status');
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
        res.status(404);
        throw new Error('Lead not found');
    }

    lead.status = status;
    await lead.save();

    res.status(200).json(lead);
});

module.exports = {
    createLead,
    getLeads,
    updateLeadStatus
};
