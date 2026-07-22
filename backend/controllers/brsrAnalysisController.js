const asyncHandler = require('express-async-handler');
const BRSRAnalysis = require('../models/brsrAnalysisModel');
const parser = require('../utils/brsrXBRLParser');
const fs = require('fs');

// @desc    Upload and parse XBRL report for analysis
// @route   POST /api/brsr-analysis/upload
// @access  Private
const uploadXBRL = asyncHandler(async (req, res) => {
    console.log('[BRSR Upload] Request received');
    console.log('[BRSR Upload] req.file:', req.file ? 'Found' : 'Not found');
    console.log('[BRSR Upload] req.user:', req.user ? req.user._id : 'Not authenticated');

    if (!req.file) {
        console.error('[BRSR Upload] No file uploaded');
        res.status(400);
        throw new Error('Please upload an XBRL file (.xml)');
    }

    if (!req.user || !req.user._id) {
        console.error('[BRSR Upload] User not authenticated');
        res.status(401);
        throw new Error('User not authenticated');
    }

    try {
        console.log('[BRSR Upload] Reading file from:', req.file.path);
        const xmlContent = fs.readFileSync(req.file.path, 'utf8');
        console.log('[BRSR Upload] File size:', xmlContent.length, 'bytes');
        console.log('[BRSR Upload] Starting XBRL parse...');
        const parsedData = await parser.parseXBRL(xmlContent, req.file.originalname);

        console.log(`[XBRL Import] File: ${req.file.originalname}, Entity: ${parsedData.companyName}, CIN: ${parsedData.cin}, FY: ${parsedData.financialYear}`);

        // Handle collision prevention for files with missing CIN
        let lookupCin = parsedData.cin;
        if (lookupCin === 'N/A') {
            lookupCin = `NA-${Date.now()}`;
            parsedData.cin = lookupCin;
            console.warn(`[XBRL Import] Warning: Missing CIN for ${parsedData.companyName}. Using unique temporary ID: ${lookupCin}`);
        }

        // Demo Mode: Store in memory
        if (global.isDemoMode) {
            // Initialize mock reports array if not exists
            if (!global.mockBRSRReports) {
                global.mockBRSRReports = [];
            }

            // Check if report already exists
            let reportIndex = global.mockBRSRReports.findIndex(
                r => r.cin === lookupCin && r.financialYear === parsedData.financialYear
            );

            let report;
            if (reportIndex !== -1) {
                console.log(`[XBRL Import - DEMO MODE] Updating existing record for ${lookupCin} (${parsedData.financialYear})`);
                // Update existing
                report = global.mockBRSRReports[reportIndex];
                report.indicators = parsedData.indicators;
                report.metrics = parsedData.metrics;
                report.esgScore = parsedData.esgScore;
                report.originalFileName = req.file.originalname;
                report.updatedAt = new Date().toISOString();
            } else {
                console.log(`[XBRL Import - DEMO MODE] Creating new record for ${lookupCin} (${parsedData.financialYear})`);
                // Create new
                report = {
                    _id: `brsr-${Date.now()}`,
                    ...parsedData,
                    uploadedBy: req.user._id,
                    originalFileName: req.file.originalname,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                global.mockBRSRReports.push(report);
            }

            // Clean up temp file
            fs.unlinkSync(req.file.path);

            return res.status(201).json(report);
        }

        // Production Mode: Use MongoDB
        let report = await BRSRAnalysis.findOne({
            cin: lookupCin,
            financialYear: parsedData.financialYear
        });

        if (report) {
            console.log(`[XBRL Import] Updating existing record for ${lookupCin} (${parsedData.financialYear})`);
            // Update existing
            report.indicators = parsedData.indicators;
            report.metrics = parsedData.metrics;
            report.esgScore = parsedData.esgScore;
            report.originalFileName = req.file.originalname;
            await report.save();
        } else {
            console.log(`[XBRL Import] Creating new record for ${lookupCin} (${parsedData.financialYear})`);
            // Create new
            report = await BRSRAnalysis.create({
                ...parsedData,
                uploadedBy: req.user._id,
                originalFileName: req.file.originalname
            });
        }

        // Clean up temp file
        fs.unlinkSync(req.file.path);

        res.status(201).json(report);
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        console.error('XBRL Import Error:', error);
        res.status(400);
        throw new Error('Failed to parse XBRL: ' + error.message);
    }
});

// @desc    Get all analysis reports
// @route   GET /api/brsr-analysis
// @access  Private
const getAnalysisReports = asyncHandler(async (req, res) => {
    // Demo Mode: Return mock reports
    if (global.isDemoMode) {
        return res.json(global.mockBRSRReports || []);
    }

    const reports = await BRSRAnalysis.find({}).sort({ updatedAt: -1 });
    res.json(reports);
});

// @desc    Get comparison data for multiple reports
// @route   GET /api/brsr-analysis/compare
// @access  Private
const getComparison = asyncHandler(async (req, res) => {
    const { ids } = req.query;
    if (!ids) {
        res.status(400);
        throw new Error('Please provide internal report IDs for comparison');
    }

    const reportIds = ids.split(',');

    // Demo Mode: Return mock reports
    if (global.isDemoMode) {
        const reports = (global.mockBRSRReports || []).filter(r => reportIds.includes(r._id));
        return res.json(reports);
    }

    const reports = await BRSRAnalysis.find({ _id: { $in: reportIds } });
    res.json(reports);
});

// @desc    Delete an analysis report
// @route   DELETE /api/brsr-analysis/:id
// @access  Private
const deleteAnalysisReport = asyncHandler(async (req, res) => {
    // Demo Mode: Delete from mock array
    if (global.isDemoMode) {
        const reportIndex = (global.mockBRSRReports || []).findIndex(r => r._id === req.params.id);

        if (reportIndex !== -1) {
            global.mockBRSRReports.splice(reportIndex, 1);
            return res.json({ message: 'Analysis report removed (Demo Mode)' });
        } else {
            res.status(404);
            throw new Error('Report not found');
        }
    }

    // Production Mode: Use MongoDB
    const report = await BRSRAnalysis.findById(req.params.id);

    if (report) {
        await report.deleteOne();
        res.json({ message: 'Analysis report removed' });
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

module.exports = {
    uploadXBRL,
    getAnalysisReports,
    getComparison,
    deleteAnalysisReport
};
