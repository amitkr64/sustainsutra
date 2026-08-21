const asyncHandler = require('express-async-handler');
const CarbonCreditBalance = require('../models/carbonCreditBalanceModel');
const CCTSEntity = require('../models/cctsEntityModel');

/**
 * @desc    Get CCC balances (with filtering)
 * @route   GET /api/ccts/ccc-balance
 * @access  Private
 */
const getCCCBalances = asyncHandler(async (req, res) => {
    const { complianceYear, complianceStatus } = req.query;

    let query = {};

    // Entity users only see their own balance
    if (req.user.role === 'ccts-entity') {
        const entity = await CCTSEntity.findOne({ user: req.user._id });
        if (!entity) {
            res.status(404);
            throw new Error('No entity profile found');
        }
        query.entity = entity._id;
    }

    if (complianceYear) query.complianceYear = complianceYear;
    if (complianceStatus) query.complianceStatus = complianceStatus;

    const balances = await CarbonCreditBalance.find(query)
        .populate('entity', 'entityName registrationNumber sector')
        .populate('monitoringData', 'reportingPeriod')
        .populate('verificationReport', 'verificationDate status')
        .sort({ complianceYear: -1 });

    res.json({
        success: true,
        count: balances.length,
        data: balances
    });
});

/**
 * @desc    Get CCC balance by ID
 * @route   GET /api/ccts/ccc-balance/:id
 * @access  Private
 */
const getCCCBalanceById = asyncHandler(async (req, res) => {
    const balance = await CarbonCreditBalance.findById(req.params.id)
        .populate('entity', 'entityName registrationNumber sector baselineYear baselineGHGIntensity')
        .populate('monitoringData')
        .populate('verificationReport')
        .populate('offsetsApplied.offsetProject', 'projectName projectType creditsAvailable');

    if (!balance) {
        res.status(404);
        throw new Error('CCC balance not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(balance.entity._id);
    const isOwner = entity.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to view this balance');
    }

    res.json({
        success: true,
        data: balance
    });
});

/**
 * @desc    Get my CCC balance (for entity users)
 * @route   GET /api/ccts/ccc-balance/my-balance/:complianceYear
 * @access  Private/Entity
 */
const getMyCCCBalance = asyncHandler(async (req, res) => {
    const entity = await CCTSEntity.findOne({ user: req.user._id });

    if (!entity) {
        res.status(404);
        throw new Error('No entity profile found');
    }

    const balance = await CarbonCreditBalance.findOne({
        entity: entity._id,
        complianceYear: req.params.complianceYear
    })
        .populate('offsetsApplied.offsetProject', 'projectName projectType')
        .populate('verificationReport', 'verificationDate status');

    if (!balance) {
        res.status(404);
        throw new Error(`No balance found for compliance year ${req.params.complianceYear}`);
    }

    res.json({
        success: true,
        data: balance
    });
});

/**
 * @desc    Apply offset credits to balance
 * @route   POST /api/ccts/ccc-balance/:id/apply-offset
 * @access  Private/Entity Owner or Admin
 */
const applyOffsetCredits = asyncHandler(async (req, res) => {
    const { offsetProjectId, creditsUsed, notes } = req.body;

    const balance = await CarbonCreditBalance.findById(req.params.id);

    if (!balance) {
        res.status(404);
        throw new Error('CCC balance not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(balance.entity);
    const isOwner = entity.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to modify this balance');
    }

    // Verify offset project has enough credits
    const OffsetProject = require('../models/offsetProjectModel');
    const offsetProject = await OffsetProject.findById(offsetProjectId);

    if (!offsetProject) {
        res.status(404);
        throw new Error('Offset project not found');
    }

    if (offsetProject.creditsAvailable < creditsUsed) {
        res.status(400);
        throw new Error('Insufficient credits available in offset project');
    }

    // Apply offset
    await balance.applyOffset(offsetProjectId, creditsUsed, notes);

    // Retire credits from offset project
    await offsetProject.retireCredits(creditsUsed, req.user._id, `Applied to CCC balance for ${entity.entityName}`);

    res.json({
        success: true,
        message: `${creditsUsed} offset credits applied successfully`,
        data: balance
    });
});

/**
 * @desc    Record credit purchase
 * @route   POST /api/ccts/ccc-balance/:id/purchase-credits
 * @access  Private/Entity Owner or Admin
 */
const purchaseCredits = asyncHandler(async (req, res) => {
    const { quantity, source, price, transactionId } = req.body;

    const balance = await CarbonCreditBalance.findById(req.params.id);

    if (!balance) {
        res.status(404);
        throw new Error('CCC balance not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(balance.entity);
    const isOwner = entity.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to modify this balance');
    }

    balance.creditsPurchased.push({
        quantity,
        purchaseDate: new Date(),
        source,
        price,
        transactionId
    });

    await balance.addAuditEntry('Credits Purchased', req.user._id, `Purchased ${quantity} credits from ${source}`);
    await balance.save();

    res.json({
        success: true,
        message: `${quantity} credits purchased successfully`,
        data: balance
    });
});

/**
 * @desc    Record credit sale
 * @route   POST /api/ccts/ccc-balance/:id/sell-credits
 * @access  Private/Entity Owner or Admin
 */
const sellCredits = asyncHandler(async (req, res) => {
    const { quantity, buyer, price, transactionId } = req.body;

    const balance = await CarbonCreditBalance.findById(req.params.id);

    if (!balance) {
        res.status(404);
        throw new Error('CCC balance not found');
    }

    // Check authorization
    const entity = await CCTSEntity.findById(balance.entity);
    const isOwner = entity.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to modify this balance');
    }

    // Check if entity has enough surplus credits to sell
    if (balance.netPosition < quantity) {
        res.status(400);
        throw new Error('Insufficient surplus credits to sell');
    }

    balance.creditsSold.push({
        quantity,
        saleDate: new Date(),
        buyer,
        price,
        transactionId
    });

    await balance.addAuditEntry('Credits Sold', req.user._id, `Sold ${quantity} credits to ${buyer}`);
    await balance.save();

    res.json({
        success: true,
        message: `${quantity} credits sold successfully`,
        data: balance
    });
});

/**
 * @desc    Get entity compliance history
 * @route   GET /api/ccts/ccc-balance/entity/:entityId/history
 * @access  Private
 */
const getEntityComplianceHistory = asyncHandler(async (req, res) => {
    const entity = await CCTSEntity.findById(req.params.entityId);

    if (!entity) {
        res.status(404);
        throw new Error('Entity not found');
    }

    // Check authorization
    const isOwner = entity.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to view this history');
    }

    const history = await CarbonCreditBalance.getEntityHistory(req.params.entityId);

    res.json({
        success: true,
        data: {
            entity: {
                name: entity.entityName,
                registrationNumber: entity.registrationNumber,
                sector: entity.sector,
                baseline: {
                    year: entity.baselineYear,
                    ghgIntensity: entity.baselineGHGIntensity
                }
            },
            history
        }
    });
});

/**
 * @desc    Get CCC balance statistics (Admin only)
 * @route   GET /api/ccts/ccc-balance/stats/overview
 * @access  Private/Admin
 */
const getCCCBalanceStats = asyncHandler(async (req, res) => {
    const totalBalances = await CarbonCreditBalance.countDocuments();
    const compliant = await CarbonCreditBalance.countDocuments({ complianceStatus: 'Compliant' });
    const nonCompliant = await CarbonCreditBalance.countDocuments({ complianceStatus: 'Non-Compliant' });

    // Aggregate total credits issued and surrendered
    const aggregates = await CarbonCreditBalance.aggregate([
        {
            $group: {
                _id: null,
                totalCreditsIssued: { $sum: '$creditIssuance' },
                totalSurrenderRequired: { $sum: '$surrenderRequirement' },
                totalOffsets: { $sum: '$totalOffsetsUsed' }
            }
        }
    ]);

    const stats = aggregates[0] || {
        totalCreditsIssued: 0,
        totalSurrenderRequired: 0,
        totalOffsets: 0
    };

    // By compliance year
    const byYear = await CarbonCreditBalance.aggregate([
        {
            $group: {
                _id: '$complianceYear',
                count: { $sum: 1 },
                compliant: {
                    $sum: { $cond: [{ $eq: ['$complianceStatus', 'Compliant'] }, 1, 0] }
                },
                avgTargetGEI: { $avg: '$targetGEI' },
                avgAchievedGEI: { $avg: '$achievedGEI' }
            }
        },
        {
            $sort: { _id: -1 }
        }
    ]);

    res.json({
        success: true,
        data: {
            total: totalBalances,
            compliant,
            nonCompliant,
            ...stats,
            byYear
        }
    });
});

module.exports = {
    getCCCBalances,
    getCCCBalanceById,
    getMyCCCBalance,
    applyOffsetCredits,
    purchaseCredits,
    sellCredits,
    getEntityComplianceHistory,
    getCCCBalanceStats
};
