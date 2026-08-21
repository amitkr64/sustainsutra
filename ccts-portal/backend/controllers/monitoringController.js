const asyncHandler = require('express-async-handler');
const MonitoringData = require('../models/monitoringDataModel');
const CCTSEntity = require('../models/cctsEntityModel');
const cctsCalculations = require('../services/cctsCalculations');

/**
 * @desc    Get all monitoring data for an entity
 * @route   GET /api/ccts/monitoring
 * @access  Private/Entity
 */
const getMonitoringData = asyncHandler(async (req, res) => {
    const { complianceYear, verificationStatus } = req.query;


    // Get entity for logged-in user
    let entity;
    if (req.user.role === 'ccts-entity') {
        entity = await CCTSEntity.findOne({ user: req.user._id });
        if (!entity) {
            res.status(404);
            throw new Error('No entity profile found');
        }
    }

    let query = {};

    // Entity users can only see their own data
    if (req.user.role === 'ccts-entity') {
        query.entity = entity._id;
    }

    // Verifiers see data assigned to them
    if (req.user.role === 'ccts-verifier') {
        query.verifier = req.user._id;
    }

    if (complianceYear) {
        query['reportingPeriod.complianceYear'] = complianceYear;
    }

    if (verificationStatus) {
        query.verificationStatus = verificationStatus;
    }

    const monitoringData = await MonitoringData.find(query)
        .populate('entity', 'entityName registrationNumber sector')
        .populate('submittedBy', 'name email')
        .populate('verifier', 'name email')
        .sort({ 'reportingPeriod.endDate': -1 });

    res.json({
        success: true,
        count: monitoringData.length,
        data: monitoringData
    });
});

/**
 * @desc    Get monitoring data by ID
 * @route   GET /api/ccts/monitoring/:id
 * @access  Private
 */
const getMonitoringDataById = asyncHandler(async (req, res) => {
    const monitoringData = await MonitoringData.findById(req.params.id)
        .populate('entity', 'entityName registrationNumber sector subSector baselineYear baselineGHGIntensity targets')
        .populate('submittedBy', 'name email')
        .populate('verifier', 'name email');

    if (!monitoringData) {
        res.status(404);
        throw new Error('Monitoring data not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(monitoringData.entity._id);
    const isOwner = entity.user.toString() === req.user._id.toString();
    const isVerifier = monitoringData.verifier && monitoringData.verifier._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isVerifier && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to view this data');
    }

    res.json({
        success: true,
        data: monitoringData
    });
});

/**
 * @desc    Create new monitoring data entry
 * @route   POST /api/ccts/monitoring
 * @access  Private/Entity
 */
const createMonitoringData = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        const monitoringData = {
            _id: 'mock-mon-' + Date.now(),
            ...req.body,
            verificationStatus: 'draft',
            createdAt: new Date().toISOString()
        };
        global.mockMonitoringData.push(monitoringData);
        return res.status(201).json({
            success: true,
            message: 'Monitoring data created successfully (Demo Mode)',
            data: monitoringData
        });
    }
    // Get entity for logged-in user
    const entity = await CCTSEntity.findOne({ user: req.user._id });

    if (!entity) {
        res.status(404);
        throw new Error('No entity profile found. Please register your entity first.');
    }

    if (entity.status !== 'active') {
        res.status(403);
        throw new Error('Entity is not active. Cannot submit monitoring data.');
    }

    const monitoringData = await MonitoringData.create({
        ...req.body,
        entity: entity._id,
        submittedBy: req.user._id,
        verificationStatus: 'draft'
    });

    res.status(201).json({
        success: true,
        message: 'Monitoring data created successfully',
        data: monitoringData
    });
});

/**
 * @desc    Update monitoring data (only if draft)
 * @route   PUT /api/ccts/monitoring/:id
 * @access  Private/Entity Owner
 */
const updateMonitoringData = asyncHandler(async (req, res) => {
    let monitoringData = await MonitoringData.findById(req.params.id);

    if (!monitoringData) {
        res.status(404);
        throw new Error('Monitoring data not found');
    }

    // Check if user owns this data
    const entity = await CCTSEntity.findById(monitoringData.entity);
    if (entity.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this data');
    }

    // Only allow updates if status is draft
    if (monitoringData.verificationStatus !== 'draft') {
        res.status(400);
        throw new Error('Cannot update data that has been submitted for verification');
    }

    monitoringData = await MonitoringData.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Monitoring data updated successfully',
        data: monitoringData
    });
});

/**
 * @desc    Calculate emissions for monitoring data
 * @route   POST /api/ccts/monitoring/:id/calculate
 * @access  Private/Entity Owner
 */
const calculateEmissions = asyncHandler(async (req, res) => {
    const monitoringData = await MonitoringData.findById(req.params.id);

    if (!monitoringData) {
        res.status(404);
        throw new Error('Monitoring data not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(monitoringData.entity);
    if (entity.user.toString() !== req.user._id.toString() && req.user.role !== 'ccts-admin') {
        res.status(403);
        throw new Error('Not authorized to perform calculations on this data');
    }

    // Validate data before calculation
    const validation = cctsCalculations.validateMonitoringData(monitoringData);

    if (!validation.isValid) {
        res.status(400);
        throw new Error(`Validation errors: ${validation.errors.join(', ')}`);
    }

    // Perform calculations
    const result = await cctsCalculations.performCompleteCalculation(monitoringData, entity);

    if (!result.success) {
        res.status(500);
        throw new Error(`Calculation error: ${result.error}`);
    }

    // Save updated monitoring data
    await monitoringData.save();

    res.json({
        success: true,
        message: 'Emissions calculated successfully',
        data: {
            totalGHGEmissions: result.emissions.netTotal,
            ghgEmissionIntensity: result.gei,
            totalProduction: result.totalProduction,
            emissionsBreakdown: result.emissions,
            ccc: result.ccc
        }
    });
});

/**
 * @desc    Submit monitoring data for verification
 * @route   POST /api/ccts/monitoring/:id/submit
 * @access  Private/Entity Owner
 */
const submitForVerification = asyncHandler(async (req, res) => {
    const monitoringData = await MonitoringData.findById(req.params.id);

    if (!monitoringData) {
        res.status(404);
        throw new Error('Monitoring data not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(monitoringData.entity);
    if (entity.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to submit this data');
    }

    // Check if calculations have been performed
    if (!monitoringData.totalGHGEmissions || monitoringData.totalGHGEmissions === 0) {
        res.status(400);
        throw new Error('Please calculate emissions before submitting for verification');
    }

    // Check if data is ready for submission
    if (!monitoringData.isReadyForSubmission()) {
        res.status(400);
        throw new Error('Data is incomplete or not ready for submission');
    }

    // Submit for verification
    await monitoringData.submitForVerification();

    res.json({
        success: true,
        message: 'Monitoring data submitted for verification successfully',
        data: monitoringData
    });
});

/**
 * @desc    Assign verifier to monitoring data (Admin only)
 * @route   PATCH /api/ccts/monitoring/:id/assign-verifier
 * @access  Private/Admin
 */
const assignVerifier = asyncHandler(async (req, res) => {
    const { verifierId } = req.body;

    // Check if verifier exists and has correct role
    const User = require('../models/userModel');
    const verifier = await User.findById(verifierId);

    if (!verifier || verifier.role !== 'ccts-verifier') {
        res.status(400);
        throw new Error('Invalid verifier');
    }

    const monitoringData = await MonitoringData.findByIdAndUpdate(
        req.params.id,
        {
            verifier: verifierId,
            verificationStatus: 'under-review'
        },
        { new: true }
    ).populate('verifier', 'name email');

    if (!monitoringData) {
        res.status(404);
        throw new Error('Monitoring data not found');
    }

    res.json({
        success: true,
        message: 'Verifier assigned successfully',
        data: monitoringData
    });
});

/**
 * @desc    Delete monitoring data (only if draft)
 * @route   DELETE /api/ccts/monitoring/:id
 * @access  Private/Entity Owner or Admin
 */
const deleteMonitoringData = asyncHandler(async (req, res) => {
    const monitoringData = await MonitoringData.findById(req.params.id);

    if (!monitoringData) {
        res.status(404);
        throw new Error('Monitoring data not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(monitoringData.entity);
    const isOwner = entity.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this data');
    }

    // Only allow deletion if status is draft
    if (monitoringData.verificationStatus !== 'draft' && !isAdmin) {
        res.status(400);
        throw new Error('Cannot delete data that has been submitted for verification');
    }

    await monitoringData.deleteOne();

    res.json({
        success: true,
        message: 'Monitoring data deleted successfully'
    });
});

/**
 * @desc    Get monitoring data statistics
 * @route   GET /api/ccts/monitoring/stats/overview
 * @access  Private/Admin
 */
const getMonitoringStats = asyncHandler(async (req, res) => {
    const totalRecords = await MonitoringData.countDocuments();
    const draftRecords = await MonitoringData.countDocuments({ verificationStatus: 'draft' });
    const submittedRecords = await MonitoringData.countDocuments({ verificationStatus: 'submitted' });
    const underReviewRecords = await MonitoringData.countDocuments({ verificationStatus: 'under-review' });
    const verifiedRecords = await MonitoringData.countDocuments({ verificationStatus: 'verified' });
    const rejectedRecords = await MonitoringData.countDocuments({ verificationStatus: 'rejected' });

    // Group by compliance year
    const byYear = await MonitoringData.aggregate([
        {
            $group: {
                _id: '$reportingPeriod.complianceYear',
                count: { $sum: 1 },
                totalEmissions: { $sum: '$totalGHGEmissions' }
            }
        },
        {
            $sort: { _id: -1 }
        }
    ]);

    res.json({
        success: true,
        data: {
            total: totalRecords,
            draft: draftRecords,
            submitted: submittedRecords,
            underReview: underReviewRecords,
            verified: verifiedRecords,
            rejected: rejectedRecords,
            byYear
        }
    });
});

module.exports = {
    getMonitoringData,
    getMonitoringDataById,
    createMonitoringData,
    updateMonitoringData,
    calculateEmissions,
    submitForVerification,
    assignVerifier,
    deleteMonitoringData,
    getMonitoringStats
};
