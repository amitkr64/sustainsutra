const ActivityLog = require('../models/activityLogModel');
const logger = require('./logger');

/**
 * Fire-and-forget activity logger. Never throws — a logging failure must NOT
 * break the primary operation that triggered it. All errors are logged and
 * swallowed.
 *
 * Usage in a controller after a successful mutation:
 *   await req.logActivity({ action: 'report.update', entityType: 'report',
 *                           entityId: String(r._id), summary: 'Updated BRSR report',
 *                           metadata: { fields: ['a','b'] } });
 */
const logActivity = async ({ actor, action, entityType, entityId, summary, metadata, req }) => {
    try {
        // Demo mode: there's no DB to write to; skip silently.
        if (global.isDemoMode) return;

        const doc = {
            action,
            entityType,
            entityId,
            summary
        };
        if (actor) {
            doc.actor = actor._id;
            doc.actorEmail = actor.email;
            doc.actorRole = actor.role;
        }
        if (metadata !== undefined) doc.metadata = metadata;
        if (req && req.ip) doc.ip = req.ip;

        await ActivityLog.create(doc);
    } catch (err) {
        // Never let logging break the request.
        logger.warn(`Activity log write failed (action=${action}): ${err.message}`);
    }
};

module.exports = logActivity;
