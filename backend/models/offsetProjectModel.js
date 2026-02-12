const mongoose = require('mongoose');

const offsetProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    projectId: {
        type: String,
        unique: true,
        sparse: true
        // Unique identifier for registered projects
    },
    projectType: {
        type: String,
        required: [true, 'Project type is required'],
        enum: [
            'Green Hydrogen',
            'Green Ammonia',
            'Carbon Capture and Storage (CCS)',
            'Carbon Capture and Utilization (CCU)',
            'Biochar Production',
            'Agroforestry',
            'Sustainable Aviation Fuel (SAF)',
            'Renewable Energy',
            'Energy Efficiency',
            'Methane Capture',
            'Waste Management',
            'Other'
        ]
    },
    projectDescription: {
        type: String,
        required: true
    },

    // ==================== PROJECT OWNERSHIP ====================

    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CCTSEntity'
        // If owned by an obligated entity, null if external
    },

    ownerType: {
        type: String,
        enum: ['Obligated Entity', 'Non-Obligated Entity', 'Third Party', 'Government'],
        required: true
    },

    ownerDetails: {
        name: String,
        registrationNumber: String,
        contactEmail: String,
        contactPhone: String
    },

    // ==================== PROJECT LOCATION ====================

    location: {
        address: String,
        city: String,
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: 'India'
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },

    // ==================== CARBON CREDITS ====================

    creditsGenerated: {
        type: Number,
        default: 0,
        min: 0
        // Total credits generated (tCO2e)
    },

    creditsVerified: {
        type: Number,
        default: 0,
        min: 0
        // Credits verified by accredited agency
    },

    creditsIssued: {
        type: Number,
        default: 0,
        min: 0
        // Credits officially issued by regulator
    },

    creditsRetired: {
        type: Number,
        default: 0,
        min: 0
        // Credits used/retired
    },

    creditsAvailable: {
        type: Number,
        default: 0,
        min: 0
        // creditsIssued - creditsRetired
    },

    // ==================== PROJECT TIMELINE ====================

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date
    },

    creditingPeriod: {
        start: Date,
        end: Date
        // Period for which credits can be generated
    },

    vintageYear: {
        type: String
        // Year of credit generation (e.g., "2025")
    },

    // ==================== REGISTRATION & VERIFICATION ====================

    registrationStatus: {
        type: String,
        enum: ['Draft', 'Submitted', 'Under Review', 'Registered', 'Rejected', 'Suspended'],
        default: 'Draft'
    },

    registrationDate: Date,

    registrationAuthority: {
        type: String,
        default: 'Bureau of Energy Efficiency (BEE)'
    },

    verificationStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Verified', 'Rejected'],
        default: 'Pending'
    },

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // Accredited verification agency
    },

    verificationDate: Date,

    verificationReport: {
        type: String
        // URL to verification document
    },

    // ==================== METHODOLOGY ====================

    methodology: {
        name: String,
        version: String,
        referenceDocument: String,
        baselineScenario: String,
        projectScenario: String
    },

    emissionReductions: [{
        year: String,
        baselineEmissions: Number,
        projectEmissions: Number,
        reductions: Number,
        // reductions = baselineEmissions - projectEmissions
        verificationStatus: {
            type: String,
            enum: ['Pending', 'Verified']
        }
    }],

    // ==================== MONITORING & REPORTING ====================

    monitoringReports: [{
        reportingPeriod: {
            start: Date,
            end: Date
        },
        creditsGenerated: Number,
        reportDocument: String,
        submittedDate: Date,
        status: {
            type: String,
            enum: ['Draft', 'Submitted', 'Verified']
        }
    }],

    // ==================== COMPLIANCE & ELIGIBILITY ====================

    isEligibleForCCTS: {
        type: Boolean,
        default: false
    },

    eligibilityCriteria: {
        meetsAdditionality: Boolean,
        meetsBaselineRequirements: Boolean,
        hasProperMonitoring: Boolean,
        hasThirdPartyVerification: Boolean
    },

    applicableSectors: [{
        type: String
        // Sectors where these credits can be used
    }],

    // ==================== DOCUMENTS ====================

    documents: {
        projectDesignDocument: String,
        registrationCertificate: String,
        verificationCertificates: [String],
        monitoringPlans: [String],
        otherDocuments: [{
            name: String,
            url: String,
            uploadedAt: Date
        }]
    },

    // ==================== FINANCIAL ====================

    projectCost: {
        amount: Number,
        currency: {
            type: String,
            default: 'INR'
        }
    },

    creditPrice: {
        amount: Number,
        currency: {
            type: String,
            default: 'INR'
        },
        lastUpdated: Date
    },

    // ==================== STATUS & METADATA ====================

    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Completed', 'Suspended', 'Cancelled'],
        default: 'Active'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

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
offsetProjectSchema.index({ entity: 1 });
offsetProjectSchema.index({ projectType: 1 });
offsetProjectSchema.index({ registrationStatus: 1 });
offsetProjectSchema.index({ verificationStatus: 1 });
offsetProjectSchema.index({ status: 1 });
offsetProjectSchema.index({ 'location.state': 1 });

// Text index for search
offsetProjectSchema.index({
    projectName: 'text',
    projectDescription: 'text',
    projectType: 'text'
});

// Pre-save hook to calculate available credits
offsetProjectSchema.pre('save', function (next) {
    this.creditsAvailable = Math.max(0, this.creditsIssued - this.creditsRetired);
    next();
});

// Method to retire credits
offsetProjectSchema.methods.retireCredits = async function (quantity, retiredBy, purpose) {
    if (quantity > this.creditsAvailable) {
        throw new Error('Insufficient credits available');
    }

    this.creditsRetired += quantity;

    this.auditTrail.push({
        action: 'Credits Retired',
        performedBy: retiredBy,
        details: `Retired ${quantity} credits for: ${purpose}`
    });

    return this.save();
};

// Method to verify and issue credits
offsetProjectSchema.methods.issueCredits = async function (quantity, issuedBy) {
    if (quantity > this.creditsVerified) {
        throw new Error('Cannot issue more credits than verified');
    }

    this.creditsIssued += quantity;

    this.auditTrail.push({
        action: 'Credits Issued',
        performedBy: issuedBy,
        details: `Issued ${quantity} credits`
    });

    return this.save();
};

// Method to add monitoring report
offsetProjectSchema.methods.addMonitoringReport = function (reportData) {
    this.monitoringReports.push(reportData);
    this.creditsGenerated += reportData.creditsGenerated || 0;

    return this.save();
};

// Method to get project summary
offsetProjectSchema.methods.getSummary = function () {
    return {
        projectName: this.projectName,
        projectId: this.projectId,
        projectType: this.projectType,
        owner: this.ownerDetails.name,
        location: `${this.location.city}, ${this.location.state}`,
        creditsGenerated: this.creditsGenerated,
        creditsIssued: this.creditsIssued,
        creditsAvailable: this.creditsAvailable,
        registrationStatus: this.registrationStatus,
        verificationStatus: this.verificationStatus,
        status: this.status
    };
};

// Static method to find available credits by type
offsetProjectSchema.statics.findAvailableByType = async function (projectType, minCredits = 0) {
    return this.find({
        projectType,
        status: 'Active',
        registrationStatus: 'Registered',
        verificationStatus: 'Verified',
        creditsAvailable: { $gte: minCredits }
    }).select('projectName projectId creditsAvailable creditPrice location');
};

const OffsetProject = mongoose.model('OffsetProject', offsetProjectSchema);

module.exports = OffsetProject;
