const mongoose = require('mongoose');

const emissionFactorSchema = new mongoose.Schema({
    efId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        enum: ['fuels', 'electricity', 'transport', 'industrial', 'waste', 'agriculture', 'refrigerants', 'other'],
        index: true
    },
    subcategory: {
        type: String,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    gas: {
        type: String,
        required: true,
        enum: ['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3', 'CO2e', 'NOx', 'CO', 'NMVOC', 'OTHER'],
        index: true
    },
    value: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    source: {
        type: String,
        default: 'IPCC EFDB'
    },
    ipccCategory: {
        type: String,
        description: 'IPCC 1996 or 2006 source/sink category'
    },
    region: {
        type: String,
        default: 'Global',
        index: true
    },
    year: {
        type: Number
    },
    gwp: {
        type: Number,
        description: 'Global Warming Potential for direct CO2e conversion'
    },
    tags: [{
        type: String
    }],
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Text index for full-text search
emissionFactorSchema.index({
    name: 'text',
    description: 'text',
    subcategory: 'text',
    tags: 'text'
});

// Compound index for common queries
emissionFactorSchema.index({ category: 1, gas: 1 });
emissionFactorSchema.index({ category: 1, subcategory: 1 });

// Static method to get category summary
emissionFactorSchema.statics.getCategorySummary = async function () {
    return this.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);
};

// Static method for searching with filters
emissionFactorSchema.statics.searchFactors = async function (query = {}) {
    const {
        search,
        category,
        subcategory,
        gas,
        region,
        page = 1,
        limit = 50
    } = query;

    const filter = { isActive: true };

    if (search) {
        filter.$text = { $search: search };
    }
    if (category) {
        filter.category = category;
    }
    if (subcategory) {
        filter.subcategory = subcategory;
    }
    if (gas) {
        filter.gas = gas;
    }
    if (region) {
        filter.region = region;
    }

    const skip = (page - 1) * limit;

    const [factors, total] = await Promise.all([
        this.find(filter)
            .sort(search ? { score: { $meta: 'textScore' } } : { category: 1, name: 1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        this.countDocuments(filter)
    ]);

    return {
        factors,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
};

const EmissionFactor = mongoose.model('EmissionFactor', emissionFactorSchema);

module.exports = EmissionFactor;
