const mongoose = require('mongoose');

/**
 * Append-only audit log of significant actions (report edits, role changes,
 * payments, EF changes, etc.). Entries are written fire-and-forget by
 * `utils/logActivity` and must never throw into the primary request path.
 */
const activityLogSchema = new mongoose.Schema({
    actor: {
        // Optional: system events have no actor.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    actorEmail: {
        // Denormalized so the log is readable even if the user is later deleted.
        type: String
    },
    actorRole: {
        type: String
    },
    action: {
        type: String,
        required: true,
        // e.g. 'report.update', 'user.role.change', 'payment.verify'
        index: true
    },
    entityType: {
        type: String,
        // e.g. 'report', 'user', 'purchase', 'emission_factor'
        index: true
    },
    entityId: {
        type: String,
        index: true
    },
    summary: {
        type: String,
        required: true
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ip: {
        type: String
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

activityLogSchema.index({ entityType: 1, entityId: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
