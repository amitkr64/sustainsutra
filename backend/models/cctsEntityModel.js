const mongoose = require('mongoose');

const cctsEntitySchema = new mongoose.Schema({
    entityName: {
        type: String,
        required: [true, 'Entity name is required'],
        trim: true
    },
    plantAddress: {
        addressLine1: { type: String, required: true },
        addressLine2: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: 'India' }
    },
    registrationNumber: {
        type: String,
        required: [true, 'Registration number is required'],
        unique: true,
        uppercase: true,
        trim: true,
        // Format: ALMOE014MH, REFOE001MP
        match: [/^[A-Z]{3}OE\d{3}[A-Z]{2}$/, 'Invalid registration number format']
    },
    sector: {
        type: String,
        required: [true, 'Sector is required'],
        enum: [
            'Aluminium',
            'Cement',
            'Copper',
            'Fertilizer',
            'Iron & Steel',
            'Petroleum Refinery',
            'Pulp & Paper',
            'Textile',
            'Thermal Power Plant',
            'Petrochemical'
        ]
    },
    subSector: {
        type: String,
        required: [true, 'Sub-sector is required']
        // Examples: Secondary Aluminium, Integrated Steel Plant, Spinning, etc.
    },
    baselineYear: {
        type: String,
        required: [true, 'Baseline year is required'],
        default: '2023-24'
    },
    baselineProduction: {
        type: Number,
        required: [true, 'Baseline production is required'],
        min: [0, 'Production cannot be negative']
    },
    baselineProductionUnit: {
        type: String,
        default: 'tonnes'
    },
    baselineGHGIntensity: {
        type: Number,
        required: [true, 'Baseline GHG intensity is required'],
        min: [0, 'GHG intensity cannot be negative']
        // Unit: tCO2e per tonne of product
    },
    targets: [{
        complianceYear: {
            type: String,
            required: true
            // Format: 2025-26, 2026-27
        },
        targetGEI: {
            type: Number,
            required: true,
            min: 0
            // Target GHG Emission Intensity (tCO2e/tonne)
        },
        reductionPercentage: {
            type: Number
            // Optional: % reduction from baseline
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User association is required']
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending-approval'],
        default: 'pending-approval'
    },
    complianceOfficer: {
        name: String,
        email: String,
        phone: String,
        designation: String
    },
    contactDetails: {
        email: String,
        phone: String,
        website: String
    }
}, {
    timestamps: true
});

// Indexes for faster queries
cctsEntitySchema.index({ registrationNumber: 1 }, { unique: true });
cctsEntitySchema.index({ user: 1 });
cctsEntitySchema.index({ sector: 1, subSector: 1 });
cctsEntitySchema.index({ status: 1 });

// Virtual for getting current compliance year
cctsEntitySchema.virtual('currentComplianceYear').get(function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Financial year: April to March
    if (month >= 3) { // April onwards
        return `${year}-${String(year + 1).slice(-2)}`;
    } else {
        return `${year - 1}-${String(year).slice(-2)}`;
    }
});

// Method to get target for specific year
cctsEntitySchema.methods.getTargetForYear = function (complianceYear) {
    return this.targets.find(t => t.complianceYear === complianceYear);
};

// Method to calculate reduction trajectory
cctsEntitySchema.methods.getReductionTrajectory = function () {
    const trajectory = [{
        year: this.baselineYear,
        gei: this.baselineGHGIntensity,
        type: 'baseline'
    }];

    this.targets.forEach(target => {
        trajectory.push({
            year: target.complianceYear,
            gei: target.targetGEI,
            type: 'target',
            reduction: ((this.baselineGHGIntensity - target.targetGEI) / this.baselineGHGIntensity * 100).toFixed(2)
        });
    });

    return trajectory;
};

const CCTSEntity = mongoose.model('CCTSEntity', cctsEntitySchema);

module.exports = CCTSEntity;
