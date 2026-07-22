// Verifier: hashes the BRSR constant exports so we can confirm the split is
// behavior-preserving. Prints a hash of the JSON-serialized exports.
// Run before and after the split; hashes must match.
const crypto = require('crypto');

(async () => {
    const ui = await import('file://' + require('path').join(__dirname, '..', 'src', 'constants', 'brsrUIMetadata.js'));
    const fields = await import('file://' + require('path').join(__dirname, '..', 'src', 'constants', 'brsrFields.js'));

    const uiJson = JSON.stringify(ui.BRSR_UI_METADATA);
    const fieldsJson = JSON.stringify(fields.BRSR_FIELDS);

    const uiHash = crypto.createHash('sha256').update(uiJson).digest('hex').slice(0, 16);
    const fieldsHash = crypto.createHash('sha256').update(fieldsJson).digest('hex').slice(0, 16);

    console.log('BRSR_UI_METADATA  sha256:', uiHash, '| keys:', Object.keys(ui.BRSR_UI_METADATA).length, '| items:', Object.values(ui.BRSR_UI_METADATA).reduce((n, a) => n + a.length, 0));
    console.log('BRSR_FIELDS       sha256:', fieldsHash, '| items:', fields.BRSR_FIELDS.length, '| sections:', new Set(fields.BRSR_FIELDS.map(f => f.section)).size);
})().catch(e => { console.error('VERIFY ERR:', e.message); process.exit(1); });
