// BRSR wizard navigation hierarchy. Extracted from BRSRReportWizard so the
// config (sections → steps → substeps) is editable independently of the
// component. WIZARD_STEPS is the flattened form used for prev/next navigation.

export const HIERARCHY = [
    {
        id: 'section_a',
        title: 'Section A: General Disclosures',
        steps: [
            { id: 'a1', label: 'General Disclosures', key: 'Section A: General Disclosures' }
        ]
    },
    {
        id: 'section_b',
        title: 'Section B: Management and Process Disclosures',
        steps: [
            { id: 'b1', label: 'Management and Process', key: 'Section B: Management and Process Disclosures' }
        ]
    },
    {
        id: 'section_c',
        title: 'Section C: Principle-wise Performance',
        steps: [
            {
                id: 'p1',
                label: 'Principle 1',
                substeps: [
                    { id: 'p1_essential', label: 'Essential Indicators', key: 'Section C: Principle 1 Essential Indicators' },
                    { id: 'p1_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 1 Leadership Indicators' }
                ]
            },
            {
                id: 'p2',
                label: 'Principle 2',
                substeps: [
                    { id: 'p2_essential', label: 'Essential Indicators', key: 'Section C: Principle 2 Essential Indicators' },
                    { id: 'p2_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 2 Leadership Indicators' }
                ]
            },
            {
                id: 'p3',
                label: 'Principle 3',
                substeps: [
                    { id: 'p3_essential', label: 'Essential Indicators', key: 'Section C: Principle 3 Essential Indicators' },
                    { id: 'p3_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 3 Leadership Indicators' }
                ]
            },
            {
                id: 'p4',
                label: 'Principle 4',
                substeps: [
                    { id: 'p4_essential', label: 'Essential Indicators', key: 'Section C: Principle 4 Essential Indicators' },
                    { id: 'p4_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 4 Leadership Indicators' }
                ]
            },
            {
                id: 'p5', label: 'Principle 5', substeps: [
                    { id: 'p5_essential', label: 'Essential Indicators', key: 'Section C: Principle 5 Essential Indicators' },
                    { id: 'p5_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 5 Leadership Indicators' }
                ]
            },
            {
                id: 'p6', label: 'Principle 6', substeps: [
                    { id: 'p6_essential', label: 'Essential Indicators', key: 'Section C: Principle 6 Essential Indicators' },
                    { id: 'p6_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 6 Leadership Indicators' }
                ]
            },
            {
                id: 'p7', label: 'Principle 7', substeps: [
                    { id: 'p7_essential', label: 'Essential Indicators', key: 'Section C: Principle 7 Essential Indicators' },
                    { id: 'p7_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 7 Leadership Indicators' }
                ]
            },
            {
                id: 'p8', label: 'Principle 8', substeps: [
                    { id: 'p8_essential', label: 'Essential Indicators', key: 'Section C: Principle 8 Essential Indicators' },
                    { id: 'p8_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 8 Leadership Indicators' }
                ]
            },
            {
                id: 'p9', label: 'Principle 9', substeps: [
                    { id: 'p9_essential', label: 'Essential Indicators', key: 'Section C: Principle 9 Essential Indicators' },
                    { id: 'p9_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 9 Leadership Indicators' }
                ]
            }
        ]
    }
];

// Flatten hierarchy for easier navigation/mapping
export const WIZARD_STEPS = [];
HIERARCHY.forEach(section => {
    section.steps.forEach(step => {
        if (step.substeps) {
            step.substeps.forEach(sub => {
                WIZARD_STEPS.push({ ...sub, parentId: section.id, subParentId: step.id });
            });
        } else {
            WIZARD_STEPS.push({ ...step, parentId: section.id });
        }
    });
});
