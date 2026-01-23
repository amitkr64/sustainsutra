const mongoose = require('mongoose');

const emissionFactorSchema = new mongoose.Schema({
    source: {
        type: String,
        required: [true, 'Emission source is required'],
        trim: true
        // e.g., "Coal - Domestic", "Natural Gas", "Grid Electricity"
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Fuel', 'Material', 'Electricity', 'Heat', 'Transport', 'Process']
    },
    subCategory: {
        type: String
        // e.g., "Stationary Combustion", "Mobile Combustion", "Industrial Process"
    },
    value: {
        type: Number,
        required: [true, 'Emission factor value is required'],
        min: [0, 'Emission factor cannot be negative']
    },
    unit: {
        type: String,
        required: [true, 'Unit is required']
        // e.g., "tCO2e/tonne", "tCO2e/GJ", "tCO2e/MWh", "tCO2e/km"
    },
    scope: {
        type: String,
        enum: ['Scope 1', 'Scope 2', 'Scope 3'],
        required: true
    },
    region: {
        type: String,
        default: 'India'
        // Can be country-specific or state-specific
    },
    state: {
        type: String
        // For state-specific factors like electricity grid
    },
    referenceDocument: {
        type: String,
        required: [true, 'Reference document is required']
        // e.g., "IPCC 2006 Guidelines", "Annexure IV CCTS 2024", "CEA CO2 Baseline Database"
    },
    referenceUrl: {
        type: String
    },
    isDefault: {
        type: Boolean,
        default: true
        // True for standard/regulatory factors, False for custom entity-specific
    },
    isApproved: {
        type: Boolean,
        default: true
        // For custom factors that need regulatory approval
    },
    applicableSectors: [{
        type: String
        // List of sectors where this factor applies
    }],
    ncv: {
        type: Number
        // Net Calorific Value if applicable (for fuels)
    },
    ncvUnit: {
        type: String
        // e.g., "GJ/tonne", "GJ/m³"
    },
    validFrom: {
        type: Date,
        required: true,
        default: Date.now
    },
    validUntil: {
        type: Date
        // For factors that have expiry/update cycles
    },
    version: {
        type: String,
        default: '1.0'
    },
    notes: {
        type: String
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // For custom factors uploaded by entities
    }
}, {
    timestamps: true
});

// Indexes for fast lookup
emissionFactorSchema.index({ source: 1, category: 1, region: 1 });
emissionFactorSchema.index({ isDefault: 1, isApproved: 1 });
emissionFactorSchema.index({ category: 1, scope: 1 });
emissionFactorSchema.index({ applicableSectors: 1 });

// Compound index for searching
emissionFactorSchema.index({
    source: 'text',
    category: 'text',
    referenceDocument: 'text'
});

// Virtual to check if factor is currently valid
emissionFactorSchema.virtual('isCurrentlyValid').get(function () {
    const now = new Date();
    const validFrom = this.validFrom;
    const validUntil = this.validUntil;

    if (validUntil) {
        return now >= validFrom && now <= validUntil;
    }
    return now >= validFrom;
});

// Static method to find appropriate emission factor
emissionFactorSchema.statics.findApplicableFactor = async function (options) {
    const { source, category, region, sector } = options;

    const query = {
        source: new RegExp(source, 'i'),
        category: category,
        isApproved: true,
        isCurrentlyValid: true
    };

    if (region) query.region = region;
    if (sector) query.applicableSectors = sector;

    // Prefer default factors
    let factor = await this.findOne({ ...query, isDefault: true }).sort({ validFrom: -1 });

    // If no default found, look for approved custom factors
    if (!factor) {
        factor = await this.findOne(query).sort({ validFrom: -1 });
    }

    return factor;
};

// Method to get factor with NCV for combustion calculations
emissionFactorSchema.methods.getFactorWithNCV = function () {
    return {
        emissionFactor: this.value,
        unit: this.unit,
        ncv: this.ncv,
        ncvUnit: this.ncvUnit,
        source: this.source
    };
};

const EmissionFactor = mongoose.model('EmissionFactor', emissionFactorSchema);

module.exports = EmissionFactor;
