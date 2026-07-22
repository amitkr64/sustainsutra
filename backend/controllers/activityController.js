const asyncHandler = require('express-async-handler');
const ActivityLog = require('../models/activityLogModel');

// @desc    List activity entries. Admins see all; others see only their own.
// @route   GET /api/activity?entityType=&entityId=&action=&limit=&page=
// @access  Private
const listActivity = asyncHandler(async (req, res) => {
    const { entityType, entityId, action } = req.query;
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const skip = (page - 1) * limit;

    const filter = {};
    if (entityType) filter.entityType = entityType;
    if (entityId) filter.entityId = String(entityId);
    if (action) filter.action = action;

    // Non-admins can only see their own activity.
    if (!req.user || req.user.role !== 'admin') {
        filter.actor = req.user._id;
    }

    const [items, total] = await Promise.all([
        ActivityLog.find(filter)
            .sort('-createdAt')
            .skip(skip)
            .limit(limit)
            .populate('actor', 'name email role')
            .lean(),
        ActivityLog.countDocuments(filter)
    ]);

    res.status(200).json({
        data: items,
        total,
        page,
        pages: Math.ceil(total / limit)
    });
});

// @desc    Get the activity history for a specific entity
// @route   GET /api/activity/:entityType/:entityId
// @access  Private
const getEntityActivity = asyncHandler(async (req, res) => {
    const { entityType, entityId } = req.params;
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);

    const filter = { entityType, entityId: String(entityId) };

    const items = await ActivityLog.find(filter)
        .sort('-createdAt')
        .limit(limit)
        .populate('actor', 'name email role')
        .lean();

    res.status(200).json({ data: items });
});

module.exports = {
    listActivity,
    getEntityActivity
};
