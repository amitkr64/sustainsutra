const mongoose = require('mongoose');

const verificationReportSchema = new mongoose.Schema({
    monitoringData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MonitoringData',
        required: [true, 'Monitoring data reference is required']
    },
    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CCTSEntity',
        required: true
    },
    verifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Verifier is required']
    },
    verificationDate: {
        type: Date,
        default: Date.now
    },
    reportingPeriod: {
        startDate: Date,
        endDate: Date,
        complianceYear: String
    },

    // ==================== VERIFICATION PARAMETERS ====================

    materialityThreshold: {
        type: Number,
        default: 2,
        min: 0,
        max: 100
        // Percentage (typically 2% as per CCTS guidelines)
    },

    verificationLevel: {
        type: String,
        enum: ['Limited', 'Reasonable'],
        default: 'Reasonable'
    },

    // ==================== ASSESSMENT (Form A) ====================

    assessment: {
        dataAccuracy: {
            type: String,
            enum: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'],
            required: true
        },
        dataCompleteness: {
            type: String,
            enum: ['Complete', 'Mostly Complete', 'Incomplete'],
            required: true
        },
        methodologyCompliance: {
            type: String,
            enum: ['Fully Compliant', 'Mostly Compliant', 'Non-Compliant'],
            required: true
        },
        complianceStatus: {
            type: String,
            enum: ['Compliant', 'Non-Compliant', 'Conditional'],
            required: true
        },
        gaps: [{
            description: String,
            severity: {
                type: String,
                enum: ['Critical', 'Major', 'Minor']
            },
            recommendation: String
        }],
        recommendations: [String],
        overallRating: {
            type: String,
            enum: ['Approved', 'Approved with Conditions', 'Rejected']
        }
    },

    // ==================== VERIFIED DATA ====================

    verifiedEmissions: {
        totalGHGEmissions: {
            type: Number,
            required: true
        },
        ghgIntensity: {
            type: Number,
            required: true
        },
        adjustments: [{
            category: String,
            originalValue: Number,
            adjustedValue: Number,
            reason: String
        }],
        uncertaintyPercentage: {
            type: Number,
            min: 0,
            max: 100
        }
    },

    verifiedProduction: {
        totalProduction: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            default: 'tonnes'
        },
        adjustments: [{
            productType: String,
            originalQuantity: Number,
            adjustedQuantity: Number,
            reason: String
        }]
    },

    // ==================== MATERIALITY ASSESSMENT ====================

    materialityAssessment: {
        totalMisstatement: {
            type: Number,
            default: 0
            // tCO2e
        },
        misstatementPercentage: {
            type: Number,
            default: 0
            // Percentage of total emissions
        },
        isMaterial: {
            type: Boolean,
            default: false
        },
        details: String
    },

    // ==================== SITE VISIT & INTERVIEWS ====================

    siteVisit: {
        conducted: {
            type: Boolean,
            default: false
        },
        visitDate: Date,
        visitDuration: String,
        facilitiesInspected: [String],
        recordsReviewed: [String],
        personnelInterviewed: [{
            name: String,
            designation: String,
            department: String
        }]
    },

    // ==================== DOCUMENTS ====================

    documents: {
        formADocument: {
            type: String
            // URL to Performance Assessment Report (Form A)
        },
        formBDocument: {
            type: String,
            required: true
            // URL to Verification Certificate (Form B)
        },
        supportingDocs: [{
            name: String,
            url: String,
            uploadedAt: Date
        }]
    },

    // ==================== VERIFICATION STATEMENT ====================

    verificationStatement: {
        type: String,
        required: true
        // Formal statement by verifier
    },

    verifierSignature: {
        name: String,
        designation: String,
        accreditationNumber: String,
        date: Date
    },

    // ==================== STATUS & WORKFLOW ====================

    status: {
        type: String,
        enum: ['draft', 'submitted', 'under-review', 'approved', 'rejected'],
        default: 'draft'
    },

    submittedToRegulator: {
        type: Boolean,
        default: false
    },

    submittedToRegulatorAt: Date,

    regulatorComments: String,

    regulatorApproval: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Clarification Required']
    },

    regulatorApprovalDate: Date,

    // ==================== METADATA ====================

    internalNotes: String,

    revisionHistory: [{
        version: Number,
        revisedAt: Date,
        revisedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        changes: String
    }]

}, {
    timestamps: true
});

// Indexes
verificationReportSchema.index({ monitoringData: 1 }, { unique: true });
verificationReportSchema.index({ entity: 1, 'reportingPeriod.complianceYear': 1 });
verificationReportSchema.index({ verifier: 1, status: 1 });
verificationReportSchema.index({ status: 1 });
verificationReportSchema.index({ verificationDate: -1 });

// Pre-save hook to calculate materiality
verificationReportSchema.pre('save', function (next) {
    if (this.verifiedEmissions.totalGHGEmissions && this.materialityAssessment.totalMisstatement) {
        const misstatementPct = (this.materialityAssessment.totalMisstatement / this.verifiedEmissions.totalGHGEmissions) * 100;
        this.materialityAssessment.misstatementPercentage = parseFloat(misstatementPct.toFixed(2));
        this.materialityAssessment.isMaterial = misstatementPct > this.materialityThreshold;
    }
    next();
});

// Method to determine if verification is complete
verificationReportSchema.methods.isComplete = function () {
    return (
        this.assessment.overallRating &&
        this.verifiedEmissions.totalGHGEmissions > 0 &&
        this.verifiedProduction.totalProduction > 0 &&
        this.documents.formBDocument &&
        this.verificationStatement &&
        this.status === 'submitted'
    );
};

// Method to approve verification
verificationReportSchema.methods.approve = async function () {
    this.status = 'approved';
    this.regulatorApproval = 'Approved';
    this.regulatorApprovalDate = new Date();

    // Update linked monitoring data status
    const MonitoringData = mongoose.model('MonitoringData');
    await MonitoringData.findByIdAndUpdate(this.monitoringData, {
        verificationStatus: 'verified',
        verificationDate: this.verificationDate,
        verifier: this.verifier
    });

    return this.save();
};

// Method to generate verification summary
verificationReportSchema.methods.getSummary = function () {
    return {
        entity: this.entity,
        verifier: this.verifier,
        verificationDate: this.verificationDate,
        complianceYear: this.reportingPeriod.complianceYear,
        verifiedGHG: this.verifiedEmissions.totalGHGEmissions,
        verifiedGEI: this.verifiedEmissions.ghgIntensity,
        complianceStatus: this.assessment.complianceStatus,
        overallRating: this.assessment.overallRating,
        isMaterial: this.materialityAssessment.isMaterial,
        status: this.status
    };
};

const VerificationReport = mongoose.model('VerificationReport', verificationReportSchema);

module.exports = VerificationReport;
