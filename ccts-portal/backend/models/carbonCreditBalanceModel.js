const mongoose = require('mongoose');

const carbonCreditBalanceSchema = new mongoose.Schema({
    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CCTSEntity',
        required: [true, 'Entity reference is required']
    },
    complianceYear: {
        type: String,
        required: [true, 'Compliance year is required']
        // Format: "2025-26"
    },
    monitoringData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MonitoringData'
        // Link to verified monitoring data
    },
    verificationReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VerificationReport'
    },

    // ==================== BASELINE & TARGET ====================

    baselineGEI: {
        type: Number,
        required: true
        // From entity profile (tCO2e/tonne)
    },

    targetGEI: {
        type: Number,
        required: true
        // Specific target for this compliance year (tCO2e/tonne)
    },

    targetReductionPercentage: {
        type: Number
        // % reduction from baseline
    },

    // ==================== ACHIEVED PERFORMANCE ====================

    achievedGEI: {
        type: Number,
        required: true
        // Actual verified GHG intensity (tCO2e/tonne)
    },

    totalGHGEmissions: {
        type: Number,
        required: true
        // Total verified emissions (tCO2e)
    },

    totalProduction: {
        type: Number,
        required: true
        // Total production for the year (tonnes)
    },

    // ==================== CCC CALCULATION ====================

    intensityDifference: {
        type: Number,
        default: 0
        // targetGEI - achievedGEI (positive = outperformance)
    },

    creditIssuance: {
        type: Number,
        default: 0,
        min: 0
        // If achievedGEI < targetGEI: (targetGEI - achievedGEI) * production
    },

    surrenderRequirement: {
        type: Number,
        default: 0,
        min: 0
        // If achievedGEI > targetGEI: (achievedGEI - targetGEI) * production
    },

    // ==================== OFFSETS & ADJUSTMENTS ====================

    offsetsApplied: [{
        offsetProject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OffsetProject'
        },
        creditsUsed: {
            type: Number,
            min: 0
        },
        appliedDate: {
            type: Date,
            default: Date.now
        },
        notes: String
    }],

    totalOffsetsUsed: {
        type: Number,
        default: 0
    },

    creditsPurchased: [{
        quantity: Number,
        purchaseDate: Date,
        source: String,
        price: Number,
        transactionId: String
    }],

    totalCreditsPurchased: {
        type: Number,
        default: 0
    },

    creditsSold: [{
        quantity: Number,
        saleDate: Date,
        buyer: String,
        price: Number,
        transactionId: String
    }],

    totalCreditsSold: {
        type: Number,
        default: 0
    },

    // ==================== NET POSITION ====================

    netPosition: {
        type: Number,
        default: 0
        // Positive = Surplus credits, Negative = Deficit
        // = creditIssuance + creditsPurchased + offsets - surrenderRequirement - creditsSold
    },

    complianceStatus: {
        type: String,
        enum: ['Compliant', 'Non-Compliant', 'Pending', 'Under Review'],
        default: 'Pending'
    },

    complianceGap: {
        type: Number,
        default: 0
        // If non-compliant: how many more credits needed
    },

    // ==================== FINANCIAL IMPLICATIONS ====================

    estimatedCreditValue: {
        marketPrice: {
            type: Number,
            default: 0
            // Price per CCC in INR
        },
        totalValue: {
            type: Number,
            default: 0
            // netPosition * marketPrice
        },
        currency: {
            type: String,
            default: 'INR'
        }
    },

    // ==================== CARRY OVER ====================

    carryOverFromPreviousYear: {
        type: Number,
        default: 0
        // Unused credits from previous compliance year
    },

    carryOverToNextYear: {
        type: Number,
        default: 0
        // Surplus credits carried forward (if regulation permits)
    },

    // ==================== REGULATORY ====================

    regulatorApproval: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected', 'Under Review'],
            default: 'Pending'
        },
        approvalDate: Date,
        approvalNumber: String,
        comments: String
    },

    certificateIssued: {
        type: Boolean,
        default: false
    },

    certificateNumber: String,

    certificateIssuedDate: Date,

    certificateDocument: String,

    // ==================== METADATA ====================

    calculatedAt: {
        type: Date,
        default: Date.now
    },

    calculatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    lastUpdatedAt: Date,

    notes: String,

    auditTrail: [{
        action: String,
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        performedAt: {
            type: Date,
            default: Date.now
        },
        details: String
    }]

}, {
    timestamps: true
});

// Indexes
carbonCreditBalanceSchema.index({ entity: 1, complianceYear: 1 }, { unique: true });
carbonCreditBalanceSchema.index({ complianceStatus: 1 });
carbonCreditBalanceSchema.index({ 'regulatorApproval.status': 1 });
carbonCreditBalanceSchema.index({ calculatedAt: -1 });

// Pre-save hook to perform calculations
carbonCreditBalanceSchema.pre('save', function (next) {
    // Calculate intensity difference
    this.intensityDifference = parseFloat((this.targetGEI - this.achievedGEI).toFixed(4));

    // Calculate credit issuance or surrender requirement
    if (this.achievedGEI < this.targetGEI) {
        // Outperformed - gets credits
        this.creditIssuance = parseFloat(((this.targetGEI - this.achievedGEI) * this.totalProduction).toFixed(2));
        this.surrenderRequirement = 0;
    } else {
        // Underperformed - must surrender
        this.surrenderRequirement = parseFloat(((this.achievedGEI - this.targetGEI) * this.totalProduction).toFixed(2));
        this.creditIssuance = 0;
    }

    // Calculate totals
    this.totalOffsetsUsed = this.offsetsApplied.reduce((sum, offset) => sum + offset.creditsUsed, 0);
    this.totalCreditsPurchased = this.creditsPurchased.reduce((sum, purchase) => sum + purchase.quantity, 0);
    this.totalCreditsSold = this.creditsSold.reduce((sum, sale) => sum + sale.quantity, 0);

    // Calculate net position
    this.netPosition = parseFloat((
        this.creditIssuance +
        this.totalCreditsPurchased +
        this.totalOffsetsUsed +
        this.carryOverFromPreviousYear -
        this.surrenderRequirement -
        this.totalCreditsSold
    ).toFixed(2));

    // Determine compliance status
    if (this.netPosition >= 0) {
        this.complianceStatus = 'Compliant';
        this.complianceGap = 0;
        this.carryOverToNextYear = this.netPosition;
    } else {
        this.complianceStatus = 'Non-Compliant';
        this.complianceGap = Math.abs(this.netPosition);
        this.carryOverToNextYear = 0;
    }

    // Calculate financial value
    if (this.estimatedCreditValue.marketPrice > 0) {
        this.estimatedCreditValue.totalValue = parseFloat((this.netPosition * this.estimatedCreditValue.marketPrice).toFixed(2));
    }

    this.lastUpdatedAt = new Date();

    next();
});

// Method to add audit entry
carbonCreditBalanceSchema.methods.addAuditEntry = function (action, user, details) {
    this.auditTrail.push({
        action,
        performedBy: user,
        details
    });
    return this.save();
};

// Method to apply offset credits
carbonCreditBalanceSchema.methods.applyOffset = async function (offsetProjectId, creditsUsed, notes) {
    this.offsetsApplied.push({
        offsetProject: offsetProjectId,
        creditsUsed,
        notes
    });

    await this.addAuditEntry('Offset Applied', null, `Applied ${creditsUsed} credits from offset project`);

    return this.save();
};

// Method to get compliance summary
carbonCreditBalanceSchema.methods.getComplianceSummary = function () {
    return {
        entity: this.entity,
        complianceYear: this.complianceYear,
        targetGEI: this.targetGEI,
        achievedGEI: this.achievedGEI,
        performance: this.achievedGEI < this.targetGEI ? 'Outperformed' : 'Underperformed',
        intensityDifference: this.intensityDifference,
        creditIssuance: this.creditIssuance,
        surrenderRequirement: this.surrenderRequirement,
        netPosition: this.netPosition,
        complianceStatus: this.complianceStatus,
        complianceGap: this.complianceGap,
        estimatedValue: this.estimatedCreditValue.totalValue
    };
};

// Static method to get entity compliance history
carbonCreditBalanceSchema.statics.getEntityHistory = async function (entityId) {
    return this.find({ entity: entityId })
        .sort({ complianceYear: 1 })
        .select('complianceYear targetGEI achievedGEI netPosition complianceStatus');
};

const CarbonCreditBalance = mongoose.model('CarbonCreditBalance', carbonCreditBalanceSchema);

module.exports = CarbonCreditBalance;
