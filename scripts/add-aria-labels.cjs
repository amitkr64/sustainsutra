/**
 * A11y sweep: adds aria-label to icon-only <button> elements that lack one.
 *
 * For each .jsx file in src/, finds <button> tags where:
 *   1. No aria-label is present
 *   2. The button content is (or includes) a lucide-react icon component
 * It infers a label from the icon name (e.g. <Trash2> → "Delete", <X> → "Close")
 * and inserts aria-label="..." into the opening <button> tag.
 *
 * Run: node scripts/add-aria-labels.cjs
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

// Icon name → human label mapping
const ICON_LABELS = {
    X: 'Close',
    Plus: 'Add',
    Trash: 'Delete',
    Trash2: 'Delete',
    Edit: 'Edit',
    Edit2: 'Edit',
    Edit3: 'Edit',
    Save: 'Save',
    Search: 'Search',
    Check: 'Confirm',
    CheckCircle: 'Confirm',
    ChevronDown: 'Expand',
    ChevronRight: 'Next',
    ChevronLeft: 'Previous',
    ArrowRight: 'Next',
    ArrowLeft: 'Back',
    ArrowUpRight: 'Open',
    Calendar: 'Date',
    Download: 'Download',
    Upload: 'Upload',
    FileText: 'View document',
    Eye: 'View',
    Settings: 'Settings',
    Filter: 'Filter',
    MoreVertical: 'More options',
    MoreHorizontal: 'More options',
    RefreshCw: 'Refresh',
    Copy: 'Copy',
    Clipboard: 'Copy',
    Send: 'Send',
    Calculator: 'Calculate',
    Info: 'Information',
    HelpCircle: 'Help',
    Maximize2: 'Expand',
    Minimize2: 'Minimize',
    ZoomIn: 'Zoom in',
    ZoomOut: 'Zoom out',
    RotateCw: 'Rotate',
    RotateCcw: 'Rotate',
    Sun: 'Light mode',
    Moon: 'Dark mode',
    Globe: 'Language',
    Menu: 'Toggle menu',
    LayoutDashboard: 'Dashboard',
};

function getIconLabel(iconName) {
    if (ICON_LABELS[iconName]) return ICON_LABELS[iconName];
    // Fallback: strip common suffixes, title-case
    return iconName.replace(/([A-Z])/g, ' $1').trim();
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Match <button ...> AND <motion.button ...> tags that DON'T have aria-label
    const buttonRegex = /<(motion\.)?button([^>]*?)(?<!aria-label="[^"]*")>/g;
    let match;
    const replacements = [];

    while ((match = buttonRegex.exec(content)) !== null) {
        const attrs = match[2] || match[1] || ''; // group 2 for motion.button, group 1 for plain
        // Skip if already has aria-label
        if (attrs.includes('aria-label')) continue;

        // Find the closing </button> to check content
        const closeTag = match[0].includes('motion') ? '</motion.button>' : '</button>';
        const closeIdx = content.indexOf(closeTag, match.index);
        if (closeIdx === -1) continue;

        const buttonContent = content.slice(match.index + match[0].length, closeIdx);

        // Check if content is primarily an icon (no visible text, or very short text like "×")
        const textOnly = buttonContent.replace(/<[^>]+>/g, '').trim();
        const hasText = textOnly.length > 3; // allow short symbols like "×", "→"
        if (hasText) continue;

        // Find the first icon component name
        const iconMatch = buttonContent.match(/<([A-Z][a-zA-Z0-9]+)/);
        if (!iconMatch) continue;

        const iconName = iconMatch[1];
        const label = getIconLabel(iconName);

        // Build replacement with aria-label inserted
        const newAttrs = `${attrs} aria-label="${label}"`;
        const newTag = `<button${newAttrs}>`;
        replacements.push({ start: match.index, end: match.index + match[0].length, replacement: newTag });
    }

    // Apply replacements in reverse order to not shift indices
    replacements.reverse().forEach(({ start, end, replacement }) => {
        content = content.slice(0, start) + replacement + content.slice(end);
        modified = true;
    });

    if (modified) {
        fs.writeFileSync(filePath, content);
        return replacements.length;
    }
    return 0;
}

function walkDir(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...walkDir(fullPath));
        } else if (entry.name.endsWith('.jsx')) {
            results.push(fullPath);
        }
    }
    return results;
}

const files = walkDir(SRC_DIR);
let totalLabels = 0;
let filesModified = 0;

for (const file of files) {
    const count = processFile(file);
    if (count > 0) {
        totalLabels += count;
        filesModified++;
        const rel = path.relative(path.join(__dirname, '..'), file);
        console.log(`  ${rel}: +${count} aria-labels`);
    }
}

console.log(`\nDone. Added ${totalLabels} aria-labels across ${filesModified} files.`);
