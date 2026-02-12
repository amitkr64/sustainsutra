const asyncHandler = require('express-async-handler');
const CCTSEntity = require('../models/cctsEntityModel');
const User = require('../models/userModel');

/**
 * @desc    Get all CCTS entities (Admin only)
 * @route   GET /api/ccts/entities
 * @access  Private/Admin
 */
const getAllEntities = asyncHandler(async (req, res) => {
    const { status, sector, search } = req.query;

    let query = {};

    if (status) {
        query.status = status;
    }

    if (sector) {
        query.sector = sector;
    }

    if (search) {
        query.$or = [
            { entityName: { $regex: search, $options: 'i' } },
            { registrationNumber: { $regex: search, $options: 'i' } }
        ];
    }

    const entities = await CCTSEntity.find(query)
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: entities.length,
        data: entities
    });
});

/**
 * @desc    Get my entity (for logged-in entity user)
 * @route   GET /api/ccts/entities/my-entity
 * @access  Private/Entity
 */
const getMyEntity = asyncHandler(async (req, res) => {
    const entity = await CCTSEntity.findOne({ user: req.user._id });

    if (!entity) {
        res.status(404);
        throw new Error('No entity profile found for this user');
    }

    res.json({
        success: true,
        data: entity
    });
});

/**
 * @desc    Get entity by ID
 * @route   GET /api/ccts/entities/:id
 * @access  Private
 */
const getEntityById = asyncHandler(async (req, res) => {
    const entity = await CCTSEntity.findById(req.params.id)
        .populate('user', 'name email phone');

    if (!entity) {
        res.status(404);
        throw new Error('Entity not found');
    }

    // Check authorization: user must be the entity owner or admin
    if (req.user.role !== 'ccts-admin' && req.user.role !== 'admin' && entity.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to view this entity');
    }

    res.json({
        success: true,
        data: entity
    });
});

/**
 * @desc    Create/Register new CCTS entity
 * @route   POST /api/ccts/entities
 * @access  Private/Admin
 */
const createEntity = asyncHandler(async (req, res) => {
    const {
        entityName,
        plantAddress,
        registrationNumber,
        sector,
        subSector,
        baselineYear,
        baselineProduction,
        baselineProductionUnit,
        baselineGHGIntensity,
        targets,
        userId,
        complianceOfficer,
        contactDetails
    } = req.body;

    // Check if registration number already exists
    const existingEntity = await CCTSEntity.findOne({ registrationNumber });

    if (existingEntity) {
        res.status(400);
        throw new Error('An entity with this registration number already exists');
    }

    // Verify user exists and doesn't have an entity already
    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.cctsEntity) {
        res.status(400);
        throw new Error('This user is already associated with another entity');
    }

    // Create entity
    const entity = await CCTSEntity.create({
        entityName,
        plantAddress,
        registrationNumber,
        sector,
        subSector,
        baselineYear,
        baselineProduction,
        baselineProductionUnit,
        baselineGHGIntensity,
        targets,
        user: userId,
        complianceOfficer,
        contactDetails
    });

    // Update user with entity reference and role
    user.cctsEntity = entity._id;
    if (user.role === 'user') {
        user.role = 'ccts-entity';
    }
    await user.save();

    res.status(201).json({
        success: true,
        message: 'Entity registered successfully',
        data: entity
    });
});

/**
 * @desc    Update entity profile
 * @route   PUT /api/ccts/entities/:id
 * @access  Private/Entity Owner or Admin
 */
const updateEntity = asyncHandler(async (req, res) => {
    const {
        entityName,
        plantAddress,
        registrationNumber,
        sector,
        subSector,
        baselineYear,
        baselineProduction,
        baselineProductionUnit,
        baselineGHGIntensity,
        targets,
        complianceOfficer,
        contactDetails
    } = req.body;

    let entity = await CCTSEntity.findById(req.params.id);

    if (!entity) {
        res.status(404);
        throw new Error('Entity not found');
    }

    // Check authorization
    if (req.user.role !== 'ccts-admin' && req.user.role !== 'admin' && entity.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this entity');
    }

    // Don't allow changing registration number or user
    const { regNumber, userId } = req.body;

    entity = await CCTSEntity.findByIdAndUpdate(
        req.params.id,
        {
            entityName,
            plantAddress,
            sector,
            subSector,
            baselineYear,
            baselineProduction,
            baselineProductionUnit,
            baselineGHGIntensity,
            targets,
            complianceOfficer,
            contactDetails
        },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Entity updated successfully',
        data: entity
    });
});

/**
 * @desc    Update entity status (Admin only)
 * @route   PATCH /api/ccts/entities/:id/status
 * @access  Private/Admin
 */
const updateEntityStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!['active', 'suspended', 'pending-approval'].includes(status)) {
        res.status(400);
        throw new Error('Invalid status value');
    }

    const entity = await CCTSEntity.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: `Entity status updated to ${status}`,
        data: entity
    });
});

/**
 * @desc    Delete entity (Admin only)
 * @route   DELETE /api/ccts/entities/:id
 * @access  Private/Admin
 */
const deleteEntity = asyncHandler(async (req, res) => {
    const entity = await CCTSEntity.findById(req.params.id);

    if (!entity) {
        res.status(404);
        throw new Error('Entity not found');
    }

    // Remove entity reference from user
    await User.findByIdAndUpdate(entity.user, {
        $unset: { cctsEntity: 1 },
        role: 'user'
    });

    await entity.deleteOne();

    res.json({
        success: true,
        message: 'Entity deleted successfully'
    });
});

/**
 * @desc    Get entity dashboard summary
 * @route   GET /api/ccts/entities/:id/dashboard
 * @access  Private/Entity Owner or Admin
 */
const getEntityDashboard = asyncHandler(async (req, res) => {
    const MonitoringData = require('../models/monitoringDataModel');
    const CarbonCreditBalance = require('../models/carbonCreditBalanceModel');

    let entity;
    entity = await CCTSEntity.findById(req.params.id);

    if (!entity) {
        res.status(404);
        throw new Error('Entity not found');
    }

    // Check authorization
    if (req.user.role !== 'ccts-admin' && req.user.role !== 'admin' && entity.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to view this dashboard');
    }

    // Get monitoring data count
    const totalReports = await MonitoringData.countDocuments({ entity: entity._id });
    const verifiedReports = await MonitoringData.countDocuments({
        entity: entity._id,
        verificationStatus: 'verified'
    });
    const pendingReports = await MonitoringData.countDocuments({
        entity: entity._id,
        verificationStatus: { $in: ['submitted', 'under-review'] }
    });

    // Get latest CCC balance
    const latestBalance = await CarbonCreditBalance.findOne({ entity: entity._id })
        .sort({ complianceYear: -1 });

    // Get reduction trajectory
    const trajectory = entity.getReductionTrajectory();

    res.json({
        success: true,
        data: {
            entity: {
                name: entity.entityName,
                registrationNumber: entity.registrationNumber,
                sector: entity.sector,
                subSector: entity.subSector,
                status: entity.status
            },
            baseline: {
                year: entity.baselineYear,
                production: entity.baselineProduction,
                ghgIntensity: entity.baselineGHGIntensity
            },
            reports: {
                total: totalReports,
                verified: verifiedReports,
                pending: pendingReports,
                draft: totalReports - verifiedReports - pendingReports
            },
            compliance: latestBalance ? {
                complianceYear: latestBalance.complianceYear,
                targetGEI: latestBalance.targetGEI,
                achievedGEI: latestBalance.achievedGEI,
                netPosition: latestBalance.netPosition,
                status: latestBalance.complianceStatus,
                creditIssuance: latestBalance.creditIssuance,
                surrenderRequirement: latestBalance.surrenderRequirement
            } : null,
            trajectory
        }
    });
});

/**
 * @desc    Get entity statistics (Admin only)
 * @route   GET /api/ccts/entities/stats/overview
 * @access  Private/Admin
 */
const getEntityStats = asyncHandler(async (req, res) => {
    const totalEntities = await CCTSEntity.countDocuments();
    const activeEntities = await CCTSEntity.countDocuments({ status: 'active' });
    const suspendedEntities = await CCTSEntity.countDocuments({ status: 'suspended' });
    const pendingEntities = await CCTSEntity.countDocuments({ status: 'pending-approval' });

    // Group by sector
    const bySector = await CCTSEntity.aggregate([
        {
            $group: {
                _id: '$sector',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);

    res.json({
        success: true,
        data: {
            total: totalEntities,
            active: activeEntities,
            suspended: suspendedEntities,
            pending: pendingEntities,
            bySector
        }
    });
});

module.exports = {
    getAllEntities,
    getMyEntity,
    getEntityById,
    createEntity,
    updateEntity,
    updateEntityStatus,
    deleteEntity,
    getEntityDashboard,
    getEntityStats
};
