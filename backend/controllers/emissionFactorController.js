const asyncHandler = require('express-async-handler');
const EmissionFactor = require('../models/emissionFactorModel');

/**
 * @desc    Get all emission factors (with filtering)
 * @route   GET /api/ccts/emission-factors
 * @access  Public
 */
const getEmissionFactors = asyncHandler(async (req, res) => {
    const { category, scope, region, search, isDefault } = req.query;

    let query = { isApproved: true };

    if (category) query.category = category;
    if (scope) query.scope = scope;
    if (region) query.region = region;
    if (isDefault !== undefined) query.isDefault = isDefault === 'true';

    if (search) {
        query.$text = { $search: search };
    }

    const factors = await EmissionFactor.find(query)
        .sort({ isDefault: -1, source: 1 });

    res.json({
        success: true,
        count: factors.length,
        data: factors
    });
});

/**
 * @desc    Get emission factor by ID
 * @route   GET /api/ccts/emission-factors/:id
 * @access  Public
 */
const getEmissionFactorById = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.findById(req.params.id);

    if (!factor) {
        res.status(404);
        throw new Error('Emission factor not found');
    }

    res.json({
        success: true,
        data: factor
    });
});

/**
 * @desc    Create custom emission factor
 * @route   POST /api/ccts/emission-factors
 * @access  Private/Entity or Admin
 */
const createEmissionFactor = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.create({
        ...req.body,
        uploadedBy: req.user._id,
        isDefault: false,
        isApproved: req.user.role === 'ccts-admin' // Auto-approve for admins
    });

    res.status(201).json({
        success: true,
        message: 'Emission factor created successfully',
        data: factor
    });
});

/**
 * @desc    Update emission factor (Admin only for defaults, owner for custom)
 * @route   PUT /api/ccts/emission-factors/:id
 * @access  Private
 */
const updateEmissionFactor = asyncHandler(async (req, res) => {
    let factor = await EmissionFactor.findById(req.params.id);

    if (!factor) {
        res.status(404);
        throw new Error('Emission factor not found');
    }

    // Check authorization
    const isAdmin = req.user.role === 'ccts-admin';
    const isOwner = factor.uploadedBy && factor.uploadedBy.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
        res.status(403);
        throw new Error('Not authorized to update this emission factor');
    }

    if (factor.isDefault && !isAdmin) {
        res.status(403);
        throw new Error('Only admins can update default emission factors');
    }

    factor = await EmissionFactor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Emission factor updated successfully',
        data: factor
    });
});

/**
 * @desc    Delete emission factor (Admin only)
 * @route   DELETE /api/ccts/emission-factors/:id
 * @access  Private/Admin
 */
const deleteEmissionFactor = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.findById(req.params.id);

    if (!factor) {
        res.status(404);
        throw new Error('Emission factor not found');
    }

    if (factor.isDefault) {
        res.status(400);
        throw new Error('Cannot delete default emission factors');
    }

    await factor.deleteOne();

    res.json({
        success: true,
        message: 'Emission factor deleted successfully'
    });
});

/**
 * @desc    Find applicable emission factor
 * @route   POST /api/ccts/emission-factors/find
 * @access  Public
 */
const findApplicableFactor = asyncHandler(async (req, res) => {
    const { source, category, region, sector } = req.body;

    const factor = await EmissionFactor.findApplicableFactor({
        source,
        category,
        region,
        sector
    });

    if (!factor) {
        res.status(404);
        throw new Error('No applicable emission factor found');
    }

    res.json({
        success: true,
        data: factor
    });
});

module.exports = {
    getEmissionFactors,
    getEmissionFactorById,
    createEmissionFactor,
    updateEmissionFactor,
    deleteEmissionFactor,
    findApplicableFactor
};
