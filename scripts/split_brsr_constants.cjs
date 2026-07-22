/**
 * One-shot refactor helper: splits src/constants/brsrUIMetadata.js and
 * src/constants/brsrFields.js into per-section modules and regenerates the
 * original files as barrel/index re-exports.
 *
 * Behavior-preserving: the public exports (BRSR_UI_METADATA, BRSR_FIELDS)
 * are byte-identical in shape and ordering after the split.
 *
 * Run from the repo root: node scripts/split_brsr_constants.js
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src', 'constants');

function splitUIMetadata() {
    const file = path.join(SRC, 'brsrUIMetadata.js');
    const raw = fs.readFileSync(file, 'utf8');

    // The file is `export const BRSR_UI_METADATA = { <section>: [...], ... };`
    // Extract the object literal and evaluate it to get the section keys.
    const start = raw.indexOf('{');
    const objBody = raw.slice(start, raw.lastIndexOf('}') + 1);
    // eslint-disable-next-line no-new-func
    const metadata = new Function(`return (${objBody})`)();
    const keys = Object.keys(metadata);

    const dir = path.join(SRC, 'brsrUIMetadata');
    fs.mkdirSync(dir, { recursive: true });

    for (const key of keys) {
        const safe = key.replace(/[^a-zA-Z0-9]+/g, '_');
        const arr = metadata[key];
        const content = `// Section: ${key}\n// Auto-extracted from brsrUIMetadata — do not edit by hand; run\n// scripts/split_brsr_constants.js to regenerate.\nexport const ${safe} = ${JSON.stringify(arr, null, 2)};\n`;
        fs.writeFileSync(path.join(dir, `${safe}.js`), content);
    }

    // Build the barrel index.
    const importLines = keys.map(k => {
        const safe = k.replace(/[^a-zA-Z0-9]+/g, '_');
        return `import { ${safe} } from './brsrUIMetadata/${safe}.js';`;
    });
    const mapLines = keys.map(k => {
        const safe = k.replace(/[^a-zA-Z0-9]+/g, '_');
        return `    ${JSON.stringify(k)}: ${safe},`;
    });

    const barrel = [
        '// Barrel file for BRSR UI metadata. Re-exports per-section modules so',
        '// the original BRSR_UI_METADATA object stays available without bundling',
        '// every section into one 5000-line file. Regenerate via',
        '// scripts/split_brsr_constants.js.',
        importLines.join('\n'),
        '',
        'export const BRSR_UI_METADATA = {',
        mapLines.join('\n'),
        '};',
        ''
    ].join('\n');

    fs.writeFileSync(file, barrel);
    console.log(`brsrUIMetadata: split into ${keys.length} section modules.`);
}

function splitFields() {
    const file = path.join(SRC, 'brsrFields.js');
    const raw = fs.readFileSync(file, 'utf8');

    // `export const BRSR_FIELDS = [ {...}, ... ];`
    const start = raw.indexOf('[');
    const arrBody = raw.slice(start, raw.lastIndexOf(']') + 1);
    // eslint-disable-next-line no-new-func
    const fields = new Function(`return (${arrBody})`)();

    // Partition by `section` value. Each field keeps its original index so the
    // barrel can restore the exact original ordering (fields are interleaved
    // across sections in the source, so naive concatenation would reorder).
    const bySection = new Map();
    fields.forEach((f, originalIndex) => {
        const section = f.section || '_uncategorized';
        if (!bySection.has(section)) bySection.set(section, []);
        bySection.get(section).push({ ...f, originalIndex });
    });
    const sections = Array.from(bySection.keys());

    const dir = path.join(SRC, 'brsrFields');
    fs.mkdirSync(dir, { recursive: true });

    for (const section of sections) {
        const safe = section.replace(/[^a-zA-Z0-9]+/g, '_');
        const arr = bySection.get(section);
        const content = `// Section: ${section}\n// Auto-extracted from brsrFields — do not edit by hand; run\n// scripts/split_brsr_constants.cjs to regenerate.\nexport const ${safe}Fields = ${JSON.stringify(arr, null, 2)};\n`;
        fs.writeFileSync(path.join(dir, `${safe}.js`), content);
    }

    // Barrel: concatenate every section then sort by originalIndex, then strip
    // the helper. This guarantees BRSR_FIELDS is byte-identical to the original.
    const importLines = sections.map(s => {
        const safe = s.replace(/[^a-zA-Z0-9]+/g, '_');
        return `import { ${safe}Fields } from './brsrFields/${safe}.js';`;
    });
    const concat = sections.map(s => `${s.replace(/[^a-zA-Z0-9]+/g, '_')}Fields`).join(', ');

    const barrel = [
        '// Barrel file for BRSR field definitions. Re-exports per-section modules.',
        '// Each field carries its originalIndex; we sort by it to guarantee the',
        '// reconstructed array is byte-identical to the pre-split file.',
        '// Regenerate via scripts/split_brsr_constants.cjs.',
        importLines.join('\n'),
        '',
        `const _all = [${concat}];`,
        'export const BRSR_FIELDS = _all',
        '    .sort((a, b) => a.originalIndex - b.originalIndex)',
        '    .map(({ originalIndex, ...rest }) => rest);',
        ''
    ].join('\n');

    fs.writeFileSync(file, barrel);
    console.log(`brsrFields: split into ${sections.length} section modules.`);
}

splitUIMetadata();
splitFields();
console.log('Done.');
