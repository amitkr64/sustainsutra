const asyncHandler = require('express-async-handler');
const NICCode = require('../models/nicCodeModel');

// GET /api/nic/search?q=<term>&limit=<n>
// Full-text-style search across code and description. Returns flattened rows.
exports.searchNIC = asyncHandler(async (req, res) => {
    const q = (req.query.q || '').trim();
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);

    if (!q) {
        return res.status(200).json({ data: [] });
    }

    // Safe, anchored regex (escape user input). Case-insensitive.
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');

    const results = await NICCode.find({
        $or: [{ code: regex }, { description: regex }]
    })
        .limit(limit)
        .lean();

    res.status(200).json({ data: results });
});

// GET /api/nic/:code
exports.getNICByCode = asyncHandler(async (req, res) => {
    const code = (req.params.code || '').trim();
    const doc = await NICCode.findOne({ code }).lean();
    if (!doc) {
        res.status(404);
        throw new Error('NIC code not found');
    }
    res.status(200).json({ data: doc });
});

// GET /api/nic/tree
// Returns the nested hierarchy for the browse UI (sections → divisions →
// groups → classes → subclasses), reconstructed from the flattened rows.
// This keeps the frontend NICSelector's "Browse by Section" mode working
// without shipping the 651KB JSON to the client.
exports.getNICTree = asyncHandler(async (req, res) => {
    const all = await NICCode.find({})
        .sort({ section: 1, division: 1, group: 1, class: 1, code: 1 })
        .lean();

    const sectionsMap = new Map();

    for (const r of all) {
        if (!sectionsMap.has(r.section)) {
            sectionsMap.set(r.section, {
                id: r.section,
                description: r.sectionDescription || '',
                divisions: new Map()
            });
        }
        const section = sectionsMap.get(r.section);

        if (!section.divisions.has(r.division)) {
            section.divisions.set(r.division, {
                id: r.division,
                description: r.divisionDescription || '',
                groups: new Map()
            });
        }
        const division = section.divisions.get(r.division);

        if (!division.groups.has(r.group)) {
            division.groups.set(r.group, {
                id: r.group,
                description: r.groupDescription || '',
                classes: new Map()
            });
        }
        const group = division.groups.get(r.group);

        if (!group.classes.has(r.class)) {
            group.classes.set(r.class, {
                id: r.class,
                description: r.classDescription || '',
                subclasses: []
            });
        }
        const cls = group.classes.get(r.class);

        cls.subclasses.push({
            id: r.code,
            description: r.description
        });
    }

    // Convert maps to arrays for the response.
    const sections = Array.from(sectionsMap.values()).map(section => ({
        id: section.id,
        description: section.description,
        divisions: Array.from(section.divisions.values()).map(division => ({
            id: division.id,
            description: division.description,
            groups: Array.from(division.groups.values()).map(group => ({
                id: group.id,
                description: group.description,
                classes: Array.from(group.classes.values()).map(cls => ({
                    id: cls.id,
                    description: cls.description,
                    subclasses: cls.subclasses
                }))
            }))
        }))
    }));

    res.status(200).json({ data: { sections } });
});

// GET /api/nic/stats — counts (useful for the footer "N total codes")
exports.getNICStats = asyncHandler(async (req, res) => {
    const total = await NICCode.countDocuments();
    res.status(200).json({ data: { total } });
});
