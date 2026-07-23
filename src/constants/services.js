/**
 * Single source of truth for all SustainSutra services. Both the homepage
 * ServiceMatrix and the ServicesLandingPage import from here to avoid
 * divergent hardcoded arrays.
 *
 * `icon` is a lucide-react icon component name (string) — the consumer maps
 * it to the actual component. This keeps the constant framework-agnostic.
 */
export const SERVICES = [
    {
        id: 'carbon-footprinting',
        title: 'Carbon Footprinting',
        short: 'Precise Scope 1, 2 & 3 GHG inventories aligned with ISO 14064.',
        description: 'Engineering high-precision GHG inventories across Scope 1, 2, and 3 to establish science-based decarbonization baselines.',
        icon: 'BarChart3',
        href: '/services/carbon-footprinting',
        category: 'Advisory',
    },
    {
        id: 'ghg-mapping',
        title: 'GHG Mapping',
        short: 'Strategic source identification and boundary setting.',
        description: 'Strategic source identification and boundary setting to ensure complete transparency in organizational emissions accounting.',
        icon: 'Globe',
        href: '/services/ghg-mapping',
        category: 'Accounting',
    },
    {
        id: 'esg-strategy',
        title: 'ESG Strategy',
        short: 'Double materiality and board-level strategic alignment.',
        description: 'Transforming sustainability into institutional value through double materiality and board-level strategic alignment.',
        icon: 'Layers',
        href: '/services/esg-strategy',
        category: 'Strategic',
    },
    {
        id: 'brsr-reporting',
        title: 'BRSR Reporting',
        short: 'End-to-end SEBI compliance and audit-ready disclosures.',
        description: 'End-to-end SEBI compliance support for top-listed entities, ensuring robust and audit-ready sustainability disclosures.',
        icon: 'FileSpreadsheet',
        href: '/services/brsr-reporting',
        category: 'Compliance',
    },
    {
        id: 'iso-verification',
        title: 'ISO Verification',
        short: 'Independent ISO 14064 third-party assurance.',
        description: 'Independent third-party assurance of carbon data according to ISO 14064, enhancing stakeholder trust and credibility.',
        icon: 'ShieldCheck',
        href: '/services/iso-verification',
        category: 'Assurance',
    },
    {
        id: 'training',
        title: 'Academy & Training',
        short: 'Upskilling teams on GRI, SASB, and Net-Zero methodologies.',
        description: 'Upskilling executive and operational teams on global standards like GRI, SASB, and Net-Zero methodologies.',
        icon: 'GraduationCap',
        href: '/services/training-capacity',
        category: 'Capacity Building',
    },
    {
        id: 'energy-audits',
        title: 'Energy Audits',
        short: 'Efficiency assessments and cost-saving decarbonization.',
        description: 'Technical assessments to identify efficiency gaps and implement cost-saving decarbonization measures.',
        icon: 'Zap',
        href: '/services/energy-audits',
        category: 'Technical',
    },
    {
        id: 'circular-economy',
        title: 'Circular Economy',
        short: 'Redesigning value chains into restorative systems.',
        description: 'Redesigning linear value chains into restorative systems that maximize resource utility and minimize waste.',
        icon: 'RefreshCw',
        href: '/services/circular-economy',
        category: 'Innovation',
    },
    {
        id: 'resource-efficiency',
        title: 'Resource Efficiency',
        short: 'Optimizing water, energy, and material throughput.',
        description: 'Optimizing water, energy, and material throughput to build operational resilience in a resource-constrained world.',
        icon: 'Droplet',
        href: '/services/resource-efficiency',
        category: 'Operations',
    },
];
