// Hash the brsrMasterReportModel's schema field set for before/after comparison.
// We can't fully instantiate without Mongo, but we can require the model and
// inspect its schema paths (keys + types), which captures the document shape.
const crypto = require('crypto');

const BRSRMasterReport = require('../backend/models/brsrMasterReportModel');

const paths = BRSRMasterReport.schema.paths;
const shape = {};
for (const [key, path] of Object.entries(paths)) {
    shape[key] = String(path.instance || 'Mixed');
}
const hash = crypto.createHash('sha256').update(JSON.stringify(shape)).digest('hex').slice(0, 16);
const keys = Object.keys(shape);
console.log('brsrMasterReportModel sha256:', hash);
console.log('  path count:', keys.length);
console.log('  sample paths:', keys.slice(0, 3).join(', '), '...', keys.slice(-3).join(', '));
