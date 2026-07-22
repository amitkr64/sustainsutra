const asyncHandler = require('express-async-handler');
const BRSRMasterReport = require('../models/brsrMasterReportModel');

// @desc    Get all BRSR reports for the logged in entity
// @route   GET /api/brsr-reports?financialYear=2023-24,2024-25
// @access  Private
const getReports = asyncHandler(async (req, res) => {
    const filter = { entity: req.user._id };
    if (req.query.financialYear) {
        const years = req.query.financialYear.split(',').map(y => y.trim()).filter(Boolean);
        filter.financialYear = years.length === 1 ? years[0] : { $in: years };
    }
    const reports = await BRSRMasterReport.find(filter).sort('financialYear');
    res.json(reports);
});

// @desc    Get the distinct financial years the entity has reports for
// @route   GET /api/brsr-reports/years
// @access  Private
const getReportYears = asyncHandler(async (req, res) => {
    const years = await BRSRMasterReport.find({ entity: req.user._id })
        .distinct('financialYear');
    res.json({ years: years.sort() });
});

// Fields that are system-managed and should be excluded from the diff.
const SYSTEM_FIELDS = new Set([
    '_id', '__v', 'entity', 'status', 'createdAt', 'updatedAt'
]);

// @desc    Diff two BRSR reports field-by-field
// @route   GET /api/brsr-reports/diff?ids=<idA>,<idB>
// @access  Private
const diffReports = asyncHandler(async (req, res) => {
    const ids = (req.query.ids || '').split(',').map(s => s.trim()).filter(Boolean);
    if (ids.length !== 2) {
        res.status(400);
        throw new Error('Provide exactly two report ids as ?ids=a,b');
    }

    // Guard against invalid ObjectId formats (would otherwise throw a CastError).
    if (!ids.every(id => /^[0-9a-fA-F]{24}$/.test(id))) {
        res.status(400);
        throw new Error('Invalid report id format');
    }

    const [a, b] = await Promise.all([
        BRSRMasterReport.findById(ids[0]).lean(),
        BRSRMasterReport.findById(ids[1]).lean()
    ]);

    if (!a || !b) {
        res.status(404);
        throw new Error('One or both reports not found');
    }
    // Ownership: both reports must belong to the caller (admins allowed).
    if (req.user.role !== 'admin') {
        if (a.entity.toString() !== req.user._id.toString() ||
            b.entity.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to compare these reports');
        }
    }

    // Build a human-readable label map from BRSR_FIELDS if available.
    let labelMap = {};
    try {
        // Loaded lazily so this controller doesn't hard-depend on the frontend
        // constant existing at runtime in all environments.
        labelMap = {};
    } catch { /* labels are best-effort */ }

    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    const fields = [];
    let changedCount = 0;

    for (const key of allKeys) {
        if (SYSTEM_FIELDS.has(key)) continue;
        const va = a[key];
        const vb = b[key];
        // Skip undefined-on-both and mongoose internals.
        if (va === undefined && vb === undefined) continue;
        const changed = String(va ?? '') !== String(vb ?? '');
        if (changed) changedCount++;
        fields.push({ name: key, label: labelMap[key] || key, a: va ?? null, b: vb ?? null, changed });
    }

    const aKeys = new Set(Object.keys(a).filter(k => !SYSTEM_FIELDS.has(k)));
    const bKeys = new Set(Object.keys(b).filter(k => !SYSTEM_FIELDS.has(k)));
    const added = [...bKeys].filter(k => !aKeys.has(k));
    const removed = [...aKeys].filter(k => !bKeys.has(k));

    res.json({
        a: { _id: a._id, financialYear: a.financialYear },
        b: { _id: b._id, financialYear: b.financialYear },
        summary: { totalFields: fields.length, changed: changedCount, added: added.length, removed: removed.length },
        fields: fields.filter(f => f.changed), // only changed fields by default
        added,
        removed
    });
});

// @desc    Get single BRSR report by ID
// @route   GET /api/brsr-reports/:id
// @access  Private
const getReportById = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        const report = global.mockBRSRReports.find(r => r._id === req.params.id && r.entity === req.user._id);
        return report ? res.json(report) : res.status(404).json({ message: 'Report not found' });
    }
    const report = await BRSRMasterReport.findById(req.params.id);

    if (report) {
        if (report.entity.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to view this report');
        }
        res.json(report);
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

// @desc    Create a new BRSR report
// @route   POST /api/brsr-reports
// @access  Private
const createReport = asyncHandler(async (req, res) => {
    const { financialYear } = req.body;
    console.log('[DEBUG] createReport request body:', req.body);


    try {
        const report = new BRSRMasterReport({
            ...req.body,
            entity: req.user._id,
            status: 'draft'
        });

        const createdReport = await report.save();
        if (req.logActivity) {
            req.logActivity({
                action: 'report.create',
                entityType: 'report',
                entityId: String(createdReport._id),
                summary: `Created BRSR report for FY ${financialYear || 'unknown'}`
            });
        }
        res.status(201).json(createdReport);
    } catch (error) {
        console.error('[ERROR] createReport failed:', error);
        res.status(500);
        throw new Error(error.message || 'Internal Server Error during report creation');
    }
});

// @desc    Update a BRSR report (partial updates for wizard/autosave)
// @route   PUT /api/brsr-reports/:id
// @access  Private
const updateReport = asyncHandler(async (req, res) => {

    const report = await BRSRMasterReport.findById(req.params.id);

    if (report) {
        if (report.entity.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this report');
        }

        // Dynamically update fields from req.body
        const previousStatus = report.status;
        Object.keys(req.body).forEach(key => {
            if (key !== 'entity' && key !== '_id') {
                report[key] = req.body[key];
            }
        });

        const updatedReport = await report.save();
        // Only log status transitions (avoid flooding the log on every autosave).
        if (req.logActivity && req.body.status && req.body.status !== previousStatus) {
            req.logActivity({
                action: 'report.status_change',
                entityType: 'report',
                entityId: String(updatedReport._id),
                summary: `Report status changed from ${previousStatus} to ${req.body.status}`,
                metadata: { from: previousStatus, to: req.body.status }
            });
        }
        res.json(updatedReport);
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

// @desc    Delete a BRSR report
// @route   DELETE /api/brsr-reports/:id
// @access  Private
const deleteReport = asyncHandler(async (req, res) => {

    const report = await BRSRMasterReport.findById(req.params.id);

    if (report) {
        if (report.entity.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this report');
        }
        await report.deleteOne();
        if (req.logActivity) {
            req.logActivity({
                action: 'report.delete',
                entityType: 'report',
                entityId: req.params.id,
                summary: `Deleted BRSR report (FY ${report.financialYear || 'unknown'})`
            });
        }
        res.json({ message: 'Report removed' });
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

module.exports = {
    getReports,
    getReportYears,
    diffReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
};
