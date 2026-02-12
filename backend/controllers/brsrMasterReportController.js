const asyncHandler = require('express-async-handler');
const BRSRMasterReport = require('../models/brsrMasterReportModel');

// @desc    Get all BRSR reports for the logged in entity
// @route   GET /api/brsr-reports
// @access  Private
const getReports = asyncHandler(async (req, res) => {
    const reports = await BRSRMasterReport.find({ entity: req.user._id });
    res.json(reports);
});

// @desc    Get single BRSR report by ID
// @route   GET /api/brsr-reports/:id
// @access  Private
const getReportById = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        const report = global.mockBRSRReports.find(r => r._id === req.params.id && r.entity === req.user._id);
        return report ? res.json(report) : res.status(404).json({ message: 'Report not found' });
    }
    const report = await BRSRMasterReport.findById(req.params.id);

    if (report) {
        if (report.entity.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to view this report');
        }
        res.json(report);
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

// @desc    Create a new BRSR report
// @route   POST /api/brsr-reports
// @access  Private
const createReport = asyncHandler(async (req, res) => {
    const { financialYear } = req.body;
    console.log('[DEBUG] createReport request body:', req.body);


    try {
        const report = new BRSRMasterReport({
            ...req.body,
            entity: req.user._id,
            status: 'draft'
        });

        const createdReport = await report.save();
        res.status(201).json(createdReport);
    } catch (error) {
        console.error('[ERROR] createReport failed:', error);
        res.status(500);
        throw new Error(error.message || 'Internal Server Error during report creation');
    }
});

// @desc    Update a BRSR report (partial updates for wizard/autosave)
// @route   PUT /api/brsr-reports/:id
// @access  Private
const updateReport = asyncHandler(async (req, res) => {

    const report = await BRSRMasterReport.findById(req.params.id);

    if (report) {
        if (report.entity.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this report');
        }

        // Dynamically update fields from req.body
        Object.keys(req.body).forEach(key => {
            if (key !== 'entity' && key !== '_id') {
                report[key] = req.body[key];
            }
        });

        const updatedReport = await report.save();
        res.json(updatedReport);
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

// @desc    Delete a BRSR report
// @route   DELETE /api/brsr-reports/:id
// @access  Private
const deleteReport = asyncHandler(async (req, res) => {

    const report = await BRSRMasterReport.findById(req.params.id);

    if (report) {
        if (report.entity.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this report');
        }
        await report.deleteOne();
        res.json({ message: 'Report removed' });
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

module.exports = {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
};
