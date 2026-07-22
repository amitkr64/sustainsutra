const mongoose = require('mongoose');

const nicCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    sectionDescription: {
        type: String
    },
    division: {
        type: String
    },
    divisionDescription: {
        type: String
    },
    group: {
        type: String
    },
    groupDescription: {
        type: String
    },
    class: {
        type: String
    },
    classDescription: {
        type: String
    },
    subClass: {
        type: String,
        required: true
    },
    subClassDescription: {
        type: String
    }
}, {
    timestamps: true
});

// Compound indexes for common queries (only one text index allowed)
nicCodeSchema.index({ section: 1 });
nicCodeSchema.index({ division: 1 });
nicCodeSchema.index({ group: 1 });
nicCodeSchema.index({ class: 1 });
nicCodeSchema.index({ subClass: 1 });

// Static method to get NIC code by code
nicCodeSchema.statics.findByCode = function(code) {
    return this.findOne({ code });
};

module.exports = mongoose.model('NICCode', nicCodeSchema);
