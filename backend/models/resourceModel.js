const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
    title: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['report', 'template', 'update', 'casestudy', 'project', 'training', 'activity']
    },
    fileUrl: { type: String },
    description: { type: String },
    // Fields specific to Case Studies
    client: { type: String },
    challenge: { type: String },
    solution: { type: String },
    impact: { type: String },
    image: { type: String },
    date: { type: String }
}, {
    timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
