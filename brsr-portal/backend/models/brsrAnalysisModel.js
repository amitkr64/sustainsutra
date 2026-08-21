const mongoose = require('mongoose');

const brsrAnalysisSchema = mongoose.Schema({
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    financialYear: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        default: 'General'
    },
    industry: {
        type: String
    },
    nicCodeInfo: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
        description: 'Full NIC code information from NIC database including code, description, section, division, group, class'
    },
    // The actual quantitative and qualitative data extracted from XBRL
    // Storing as a Mixed type for maximum flexibility across reporting years
    indicators: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    // Comparison metrics (pre-calculated or indexed for performance)
    // Comparison metrics (pre-calculated or indexed for performance)
    metrics: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    esgScore: {
        type: Number,
        default: 0
    },
    originalFileName: String,
    status: {
        type: String,
        enum: ['processed', 'error'],
        default: 'processed'
    }
}, {
    timestamps: true
});

// Index for faster comparison searches
brsrAnalysisSchema.index({ cin: 1, financialYear: 1 });
brsrAnalysisSchema.index({ companyName: 'text' });

const BRSRAnalysis = mongoose.model('BRSRAnalysis', brsrAnalysisSchema);
module.exports = BRSRAnalysis;
