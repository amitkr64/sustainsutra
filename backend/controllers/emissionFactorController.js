const asyncHandler = require('express-async-handler');
const EmissionFactor = require('../models/emissionFactorModel');

// @desc    Get all emission factors with pagination and filtering
// @route   GET /api/emission-factors
// @access  Public
const getEmissionFactors = asyncHandler(async (req, res) => {
    const result = await EmissionFactor.searchFactors(req.query);
    res.json(result);
});

// @desc    Search emission factors with full-text search
// @route   GET /api/emission-factors/search
// @access  Public
const searchEmissionFactors = asyncHandler(async (req, res) => {
    const { q, ...filters } = req.query;
    const result = await EmissionFactor.searchFactors({ search: q, ...filters });
    res.json(result);
});

// @desc    Get category summary
// @route   GET /api/emission-factors/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const summary = await EmissionFactor.getCategorySummary();

    // Also get subcategories for each category
    const categories = await EmissionFactor.aggregate([
        { $match: { isActive: true } },
        {
            $group: {
                _id: { category: '$category', subcategory: '$subcategory' },
                count: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: '$_id.category',
                subcategories: {
                    $push: { name: '$_id.subcategory', count: '$count' }
                },
                total: { $sum: '$count' }
            }
        },
        { $sort: { total: -1 } }
    ]);

    res.json({
        summary,
        categories
    });
});

// @desc    Get single emission factor by ID
// @route   GET /api/emission-factors/:id
// @access  Public
const getEmissionFactorById = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.findById(req.params.id);

    if (!factor) {
        res.status(404);
        throw new Error('Emission factor not found');
    }

    res.json(factor);
});

// @desc    Get emission factor by EFDB ID
// @route   GET /api/emission-factors/ef/:efId
// @access  Public
const getEmissionFactorByEfId = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.findOne({ efId: req.params.efId });

    if (!factor) {
        res.status(404);
        throw new Error('Emission factor not found');
    }

    res.json(factor);
});

// @desc    Create emission factor (Admin)
// @route   POST /api/emission-factors
// @access  Private/Admin
const createEmissionFactor = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.create(req.body);
    res.status(201).json(factor);
});

// @desc    Update emission factor (Admin)
// @route   PUT /api/emission-factors/:id
// @access  Private/Admin
const updateEmissionFactor = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!factor) {
        res.status(404);
        throw new Error('Emission factor not found');
    }

    res.json(factor);
});

// @desc    Delete emission factor (Admin)
// @route   DELETE /api/emission-factors/:id
// @access  Private/Admin
const deleteEmissionFactor = asyncHandler(async (req, res) => {
    const factor = await EmissionFactor.findByIdAndDelete(req.params.id);

    if (!factor) {
        res.status(404);
        throw new Error('Emission factor not found');
    }

    res.json({ message: 'Emission factor removed' });
});

// @desc    Get curated factors for specific use cases
// @route   GET /api/emission-factors/curated/:type
// @access  Public
const getCuratedFactors = asyncHandler(async (req, res) => {
    const { type } = req.params;

    const curatedQueries = {
        brsr: {
            category: { $in: ['fuels', 'electricity', 'transport', 'waste'] },
            region: { $in: ['India', 'Global'] }
        },
        carbon_calculator: {
            gas: { $in: ['CO2', 'CH4', 'N2O', 'CO2e'] }
        },
        transport: {
            category: 'transport'
        },
        electricity_india: {
            category: 'electricity',
            region: 'India'
        }
    };

    const query = curatedQueries[type] || {};
    const factors = await EmissionFactor.find({ isActive: true, ...query })
        .sort({ category: 1, name: 1 })
        .limit(500)
        .lean();

    res.json({ factors, count: factors.length });
});

// @desc    Get database statistics
// @route   GET /api/emission-factors/stats
// @access  Public
const getStats = asyncHandler(async (req, res) => {
    const [total, byCategory, byGas, byRegion] = await Promise.all([
        EmissionFactor.countDocuments({ isActive: true }),
        EmissionFactor.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]),
        EmissionFactor.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$gas', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]),
        EmissionFactor.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$region', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ])
    ]);

    res.json({
        total,
        byCategory,
        byGas,
        byRegion
    });
});

// @desc    Find applicable emission factor for CCTS
// @route   POST /api/ccts/emission-factors/find
// @access  Public
const findApplicableFactor = asyncHandler(async (req, res) => {
    const { category, subcategory, gas, region } = req.body;

    const query = { isActive: true };
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (gas) query.gas = gas;
    if (region) query.region = region;

    const factor = await EmissionFactor.findOne(query).sort({ updatedAt: -1 });

    if (!factor) {
        res.status(404);
        throw new Error('Applicable emission factor not found');
    }

    res.json({
        success: true,
        data: factor
    });
});

module.exports = {
    getEmissionFactors,
    searchEmissionFactors,
    getCategories,
    getEmissionFactorById,
    getEmissionFactorByEfId,
    createEmissionFactor,
    updateEmissionFactor,
    deleteEmissionFactor,
    getCuratedFactors,
    getStats,
    findApplicableFactor
};
