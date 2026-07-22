import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const CleanerProductionPage = () => {
    return (
        <ServicePageTemplate
            title="Cleaner Production & Process Optimization"
            heroImage="https://images.unsplash.com/photo-1581094794329-c8112a89af12"
            overview="Implement cleaner production methodologies to reduce environmental impact at the source, improve process efficiency, and minimize waste generation while enhancing profitability."
            keyFeatures={[
                "Process Mapping & Material Flow Analysis",
                "Waste Minimization Opportunity Assessment",
                "Good Housekeeping Practices",
                "Technology Upgrade Recommendations"
            ]}
            standards={[
                "UNIDO/UNEP Cleaner Production Methodology",
                "ISO 14001 Environmental Management",
                "Resource Efficiency Best Practices",
                "Industrial Pollution Prevention Guidelines"
            ]}
            deliverables={[
                "Cleaner Production Assessment Report",
                "Priority Intervention Matrix",
                "Implementation Roadmap with ROI Analysis",
                "Training & Capacity Building Programs"
            ]}
            methodology={[
                {
                    title: "Process Mapping",
                    description: "Detailed Input-Output analysis of materials, water, and energy for specific unit operations"
                },
                {
                    title: "Source Reduction",
                    description: "Identifying options to eliminate waste at the source through material substitution or process modification"
                },
                {
                    title: "Technology Transfer",
                    description: "Benchmarking against Best Available Technologies (BAT) and recommending modernization upgrades"
                },
                {
                    title: "Recycling & Recovery",
                    description: "Designing internal loops to recover water, solvents, and heat for on-site reuse"
                },
                {
                    title: "Good Housekeeping",
                    description: "Implementing procedural changes and 'low-hanging fruit' measures for immediate savings"
                }
            ]}
            processSteps={[
                {
                    title: "Walk-Through Audit",
                    description: "Visual inspection and team interactions"
                },
                {
                    title: "Material Balance",
                    description: "Quantifying losses and inefficiencies"
                },
                {
                    title: "Option Generation",
                    description: "Brainstorming technical solutions"
                },
                {
                    title: "Feasibility Study",
                    description: "Technical and financial viability check"
                }
            ]}
            benefits={[
                "Improved Process Efficiency & Yield",
                "Reduced Raw Material Consumption",
                "Lower Waste Treatment Costs",
                "Enhanced Occupational Health & Safety",
                "Reduced Environmental Footprint",
                "Higher Operational Profitability"
            ]}
            ctaText="Start Cleaner Production Journey"
        />
    );
};

export default CleanerProductionPage;
