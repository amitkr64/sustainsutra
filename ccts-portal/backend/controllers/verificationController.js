const asyncHandler = require('express-async-handler');
const VerificationReport = require('../models/verificationReportModel');
const MonitoringData = require('../models/monitoringDataModel');
const CCTSEntity = require('../models/cctsEntityModel');
const CarbonCreditBalance = require('../models/carbonCreditBalanceModel');

/**
 * @desc    Get all verification reports (with filtering)
 * @route   GET /api/ccts/verification
 * @access  Private/Verifier or Admin
 */
const getVerificationReports = asyncHandler(async (req, res) => {
    const { status, complianceYear } = req.query;

    let query = {};

    // Verifiers only see their assigned reports
    if (req.user.role === 'ccts-verifier') {
        query.verifier = req.user._id;
    }

    if (status) {
        query.status = status;
    }

    if (complianceYear) {
        query['reportingPeriod.complianceYear'] = complianceYear;
    }

    const reports = await VerificationReport.find(query)
        .populate('entity', 'entityName registrationNumber sector')
        .populate('verifier', 'name email verifierAccreditation')
        .populate('monitoringData', 'reportingPeriod totalGHGEmissions ghgEmissionIntensity')
        .sort({ verificationDate: -1 });

    res.json({
        success: true,
        count: reports.length,
        data: reports
    });
});

/**
 * @desc    Get pending verification requests (for verifiers)
 * @route   GET /api/ccts/verification/pending
 * @access  Private/Verifier
 */
const getPendingVerifications = asyncHandler(async (req, res) => {
    // Get monitoring data that's submitted but not assigned or assigned to this verifier
    const pendingData = await MonitoringData.find({
        verificationStatus: { $in: ['submitted', 'under-review'] },
        $or: [
            { verifier: req.user._id },
            { verifier: { $exists: false } },
            { verifier: null }
        ]
    })
        .populate('entity', 'entityName registrationNumber sector subSector')
        .populate('submittedBy', 'name email')
        .sort({ submittedAt: 1 });

    res.json({
        success: true,
        count: pendingData.length,
        data: pendingData
    });
});

/**
 * @desc    Get verification report by ID
 * @route   GET /api/ccts/verification/:id
 * @access  Private/Verifier or Entity Owner or Admin
 */
const getVerificationReportById = asyncHandler(async (req, res) => {
    const report = await VerificationReport.findById(req.params.id)
        .populate('entity', 'entityName registrationNumber sector subSector baselineYear baselineGHGIntensity')
        .populate('verifier', 'name email verifierAccreditation')
        .populate('monitoringData');

    if (!report) {
        res.status(404);
        throw new Error('Verification report not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(report.entity._id);
    const isEntityOwner = entity.user.toString() === req.user._id.toString();
    const isVerifier = report.verifier._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isEntityOwner && !isVerifier && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to view this report');
    }

    res.json({
        success: true,
        data: report
    });
});

/**
 * @desc    Create verification report (by verifier)
 * @route   POST /api/ccts/verification
 * @access  Private/Verifier
 */
const createVerificationReport = asyncHandler(async (req, res) => {
    const { monitoringDataId, ...reportData } = req.body;

    // Get monitoring data
    const monitoringData = await MonitoringData.findById(monitoringDataId)
        .populate('entity');

    if (!monitoringData) {
        res.status(404);
        throw new Error('Monitoring data not found');
    }

    // Check if monitoring data is in correct status
    if (!['submitted', 'under-review'].includes(monitoringData.verificationStatus)) {
        res.status(400);
        throw new Error('Monitoring data is not ready for verification');
    }

    // Check if report already exists
    const existingReport = await VerificationReport.findOne({ monitoringData: monitoringDataId });
    if (existingReport) {
        res.status(400);
        throw new Error('Verification report already exists for this monitoring data');
    }

    // Create report
    const report = await VerificationReport.create({
        monitoringData: monitoringDataId,
        entity: monitoringData.entity._id,
        verifier: req.user._id,
        reportingPeriod: monitoringData.reportingPeriod,
        ...reportData
    });

    // Update monitoring data status
    monitoringData.verificationStatus = 'under-review';
    monitoringData.verifier = req.user._id;
    await monitoringData.save();

    res.status(201).json({
        success: true,
        message: 'Verification report created successfully',
        data: report
    });
});

/**
 * @desc    Update verification report (by verifier)
 * @route   PUT /api/ccts/verification/:id
 * @access  Private/Verifier
 */
const updateVerificationReport = asyncHandler(async (req, res) => {
    let report = await VerificationReport.findById(req.params.id);

    if (!report) {
        res.status(404);
        throw new Error('Verification report not found');
    }

    // Check if user is the assigned verifier
    if (report.verifier.toString() !== req.user._id.toString() && req.user.role !== 'ccts-admin') {
        res.status(403);
        throw new Error('Not authorized to update this report');
    }

    // Only allow updates if status is draft or under-review
    if (!['draft', 'under-review'].includes(report.status)) {
        res.status(400);
        throw new Error('Cannot update report that has been submitted');
    }

    report = await VerificationReport.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Verification report updated successfully',
        data: report
    });
});

/**
 * @desc    Submit verification report (by verifier)
 * @route   POST /api/ccts/verification/:id/submit
 * @access  Private/Verifier
 */
const submitVerificationReport = asyncHandler(async (req, res) => {
    const report = await VerificationReport.findById(req.params.id);

    if (!report) {
        res.status(404);
        throw new Error('Verification report not found');
    }

    // Check if user is the assigned verifier
    if (report.verifier.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to submit this report');
    }

    // Check if report is complete
    if (!report.isComplete()) {
        res.status(400);
        throw new Error('Verification report is incomplete. Please fill all required fields.');
    }

    report.status = 'submitted';
    report.submittedToRegulator = true;
    report.submittedToRegulatorAt = new Date();

    await report.save();

    res.json({
        success: true,
        message: 'Verification report submitted successfully',
        data: report
    });
});

/**
 * @desc    Approve verification report and create CCC balance (Admin only)
 * @route   POST /api/ccts/verification/:id/approve
 * @access  Private/Admin
 */
const approveVerificationReport = asyncHandler(async (req, res) => {
    const { marketPrice } = req.body;

    const report = await VerificationReport.findById(req.params.id)
        .populate('entity')
        .populate('monitoringData');

    if (!report) {
        res.status(404);
        throw new Error('Verification report not found');
    }

    if (report.status !== 'submitted') {
        res.status(400);
        throw new Error('Report must be submitted before approval');
    }

    // Approve the report
    await report.approve();

    // Create or update Carbon Credit Balance
    const entity = report.entity;
    const complianceYear = report.reportingPeriod.complianceYear;

    // Check if balance already exists
    let cccBalance = await CarbonCreditBalance.findOne({
        entity: entity._id,
        complianceYear
    });

    if (cccBalance) {
        // Update existing balance
        cccBalance.verificationReport = report._id;
        cccBalance.achievedGEI = report.verifiedEmissions.ghgIntensity;
        cccBalance.totalGHGEmissions = report.verifiedEmissions.totalGHGEmissions;
        cccBalance.totalProduction = report.verifiedProduction.totalProduction;
        if (marketPrice) {
            cccBalance.estimatedCreditValue.marketPrice = marketPrice;
        }
    } else {
        // Create new balance
        const target = entity.getTargetForYear(complianceYear);

        if (!target) {
            res.status(400);
            throw new Error(`No target found for compliance year ${complianceYear}`);
        }

        cccBalance = await CarbonCreditBalance.create({
            entity: entity._id,
            complianceYear,
            monitoringData: report.monitoringData._id,
            verificationReport: report._id,
            baselineGEI: entity.baselineGHGIntensity,
            targetGEI: target.targetGEI,
            achievedGEI: report.verifiedEmissions.ghgIntensity,
            totalGHGEmissions: report.verifiedEmissions.totalGHGEmissions,
            totalProduction: report.verifiedProduction.totalProduction,
            calculatedBy: req.user._id,
            estimatedCreditValue: {
                marketPrice: marketPrice || 0
            }
        });
    }

    await cccBalance.save();

    res.json({
        success: true,
        message: 'Verification report approved and CCC balance calculated',
        data: {
            report: report.getSummary(),
            cccBalance: cccBalance.getComplianceSummary()
        }
    });
});

/**
 * @desc    Reject verification report (Admin only)
 * @route   POST /api/ccts/verification/:id/reject
 * @access  Private/Admin
 */
const rejectVerificationReport = asyncHandler(async (req, res) => {
    const { comments } = req.body;

    const report = await VerificationReport.findById(req.params.id);

    if (!report) {
        res.status(404);
        throw new Error('Verification report not found');
    }

    report.status = 'rejected';
    report.regulatorApproval = 'Rejected';
    report.regulatorComments = comments;

    await report.save();

    // Update monitoring data status
    await MonitoringData.findByIdAndUpdate(report.monitoringData, {
        verificationStatus: 'rejected'
    });

    res.json({
        success: true,
        message: 'Verification report rejected',
        data: report
    });
});

/**
 * @desc    Get verification statistics
 * @route   GET /api/ccts/verification/stats/overview
 * @access  Private/Admin
 */
const getVerificationStats = asyncHandler(async (req, res) => {
    const total = await VerificationReport.countDocuments();
    const draft = await VerificationReport.countDocuments({ status: 'draft' });
    const submitted = await VerificationReport.countDocuments({ status: 'submitted' });
    const approved = await VerificationReport.countDocuments({ status: 'approved' });
    const rejected = await VerificationReport.countDocuments({ status: 'rejected' });

    // By verifier
    const byVerifier = await VerificationReport.aggregate([
        {
            $group: {
                _id: '$verifier',
                count: { $sum: 1 },
                approved: {
                    $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'verifierInfo'
            }
        },
        {
            $unwind: '$verifierInfo'
        },
        {
            $project: {
                name: '$verifierInfo.name',
                email: '$verifierInfo.email',
                count: 1,
                approved: 1
            }
        }
    ]);

    res.json({
        success: true,
        data: {
            total,
            draft,
            submitted,
            approved,
            rejected,
            byVerifier
        }
    });
});

module.exports = {
    getVerificationReports,
    getPendingVerifications,
    getVerificationReportById,
    createVerificationReport,
    updateVerificationReport,
    submitVerificationReport,
    approveVerificationReport,
    rejectVerificationReport,
    getVerificationStats
};
