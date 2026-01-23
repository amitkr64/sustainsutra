const mongoose = require('mongoose');

const monitoringDataSchema = new mongoose.Schema({
    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CCTSEntity',
        required: [true, 'Entity reference is required']
    },
    reportingPeriod: {
        startDate: {
            type: Date,
            required: [true, 'Start date is required']
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required']
        },
        complianceYear: {
            type: String,
            required: true
            // e.g., "2025-26"
        }
    },

    // ==================== INPUT DATA ====================

    // Raw Materials
    rawMaterials: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        unit: {
            type: String,
            required: true,
            enum: ['tonnes', 'kg', 'm³', 'litres']
        },
        ncv: {
            type: Number,
            // Net Calorific Value (GJ/unit)
            min: 0
        },
        emissionFactor: {
            type: Number,
            required: true,
            min: 0
            // tCO2e per unit
        },
        emissionFactorType: {
            type: String,
            enum: ['Type I - Default', 'Type II - Site-Specific'],
            default: 'Type I - Default'
        },
        emissionFactorSource: {
            type: String
            // Reference: IPCC, Annexure IV, Lab Report
        },
        labCertificate: {
            type: String
            // URL/path to uploaded certificate
        },
        isBiomass: {
            type: Boolean,
            default: false
        }
    }],

    // Fuels Consumed
    fuels: [{
        fuelType: {
            type: String,
            required: true,
            enum: [
                'Coal',
                'Natural Gas',
                'Diesel',
                'Fuel Oil',
                'Petcoke',
                'LPG',
                'Biomass',
                'Other'
            ]
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        unit: {
            type: String,
            required: true,
            enum: ['tonnes', 'kg', 'm³', 'litres', 'GJ']
        },
        ncv: {
            type: Number,
            required: true,
            min: 0
            // Net Calorific Value (GJ/unit)
        },
        emissionFactor: {
            type: Number,
            required: true,
            min: 0
            // tCO2e/GJ or tCO2e/unit
        },
        emissionFactorType: {
            type: String,
            enum: ['Type I - Default', 'Type II - Site-Specific'],
            default: 'Type I - Default'
        },
        emissionFactorSource: String,
        labCertificate: String,
        isBiomass: {
            type: Boolean,
            default: false
        },
        totalEmissions: {
            type: Number,
            default: 0
        }
    }],

    // Purchased Electricity
    purchasedElectricity: {
        grid: {
            type: Number,
            default: 0,
            min: 0
            // MWh
        },
        openAccess: {
            type: Number,
            default: 0,
            min: 0
            // MWh from renewable/other sources
        },
        renewable: {
            type: Number,
            default: 0,
            min: 0
            // MWh from certified renewable sources (zero emission)
        },
        emissionFactor: {
            type: Number,
            required: true,
            default: 0.82
            // tCO2e/MWh (CEA baseline)
        },
        totalEmissions: {
            type: Number,
            default: 0
        }
    },

    // Purchased Heat/Steam
    purchasedHeat: {
        quantity: {
            type: Number,
            default: 0,
            min: 0
            // GJ
        },
        emissionFactor: {
            type: Number,
            default: 0.05
            // tCO2e/GJ
        },
        totalEmissions: {
            type: Number,
            default: 0
        }
    },

    // ==================== OUTPUT DATA ====================

    // Production Data
    production: [{
        productType: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        unit: {
            type: String,
            default: 'tonnes'
        },
        equivalentFactor: {
            type: Number,
            default: 1
            // For converting multiple products to a single equivalent
        }
    }],

    // Energy Exported (Deduction)
    exportedEnergy: {
        electricity: {
            type: Number,
            default: 0,
            min: 0
            // MWh
        },
        heat: {
            type: Number,
            default: 0,
            min: 0
            // GJ
        },
        emissionFactorElectricity: {
            type: Number,
            default: 0.82
        },
        emissionFactorHeat: {
            type: Number,
            default: 0.05
        },
        totalDeduction: {
            type: Number,
            default: 0
        }
    },

    // CO2 Captured (CCUS)
    capturedCO2: {
        quantity: {
            type: Number,
            default: 0,
            min: 0
            // tCO2
        },
        method: {
            type: String,
            enum: ['Capture & Storage', 'Capture & Utilization', 'None'],
            default: 'None'
        },
        verificationCertificate: String
    },

    // ==================== CALCULATED RESULTS ====================

    calculatedEmissions: {
        directCombustion: {
            type: Number,
            default: 0
        },
        directProcess: {
            type: Number,
            default: 0
        },
        indirectElectricity: {
            type: Number,
            default: 0
        },
        indirectHeat: {
            type: Number,
            default: 0
        },
        totalDirect: {
            type: Number,
            default: 0
        },
        totalIndirect: {
            type: Number,
            default: 0
        },
        deductions: {
            type: Number,
            default: 0
        },
        netTotal: {
            type: Number,
            default: 0
        }
    },

    totalGHGEmissions: {
        type: Number,
        default: 0
        // tCO2e
    },

    ghgEmissionIntensity: {
        type: Number,
        default: 0
        // tCO2e per tonne of product
    },

    totalEquivalentProduction: {
        type: Number,
        default: 0
        // tonnes
    },

    // ==================== VERIFICATION & STATUS ====================

    verificationStatus: {
        type: String,
        enum: ['draft', 'submitted', 'under-review', 'verified', 'rejected'],
        default: 'draft'
    },

    verifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    verificationDate: Date,

    verificationComments: String,

    verificationReport: {
        type: String
        // URL to uploaded report
    },

    formE2Document: {
        type: String
        // Auto-generated Form E2 PDF
    },

    // ==================== METADATA ====================

    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    submittedAt: Date,

    lastCalculatedAt: Date,

    notes: String

}, {
    timestamps: true
});

// Indexes
monitoringDataSchema.index({ entity: 1, 'reportingPeriod.complianceYear': 1 });
monitoringDataSchema.index({ verificationStatus: 1 });
monitoringDataSchema.index({ verifier: 1, verificationStatus: 1 });

// Pre-save hook to calculate total equivalent production
monitoringDataSchema.pre('save', function (next) {
    if (this.production && this.production.length > 0) {
        this.totalEquivalentProduction = this.production.reduce((sum, p) => {
            return sum + (p.quantity * (p.equivalentFactor || 1));
        }, 0);
    }
    next();
});

// Method to check if data is complete for submission
monitoringDataSchema.methods.isReadyForSubmission = function () {
    return (
        this.production.length > 0 &&
        this.totalGHGEmissions > 0 &&
        this.ghgEmissionIntensity > 0 &&
        this.verificationStatus === 'draft'
    );
};

// Method to submit for verification
monitoringDataSchema.methods.submitForVerification = function () {
    if (!this.isReadyForSubmission()) {
        throw new Error('Data is incomplete or already submitted');
    }
    this.verificationStatus = 'submitted';
    this.submittedAt = new Date();
    return this.save();
};

const MonitoringData = mongoose.model('MonitoringData', monitoringDataSchema);

module.exports = MonitoringData;
