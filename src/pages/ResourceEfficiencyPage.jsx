import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ResourceEfficiencyPage = () => {
    return (
        <ServicePageTemplate
            title="Resource Efficiency & Sustainable Operations"
            heroImage="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9"
            overview="Optimize resource consumption across water, energy, and materials to reduce operational costs, minimize environmental footprint, and build resilience in resource-constrained scenarios."
            keyFeatures={[
                "Multi-Resource Consumption Analysis",
                "Water Stewardship & Conservation",
                "Material Intensity Reduction",
                "Operational Excellence Integration"
            ]}
            standards={[
                "ISO 14046 Water Footprint",
                "Alliance for Water Stewardship (AWS)",
                "ISO 50001 Energy Management",
                "Material Flow Cost Accounting (ISO 14051)"
            ]}
            deliverables={[
                "Resource Efficiency Baseline Assessment",
                "Water-Energy-Material Nexus Analysis",
                "Cost Savings Opportunity Report",
                "Continuous Improvement Framework"
            ]}
            methodology={[
                {
                    title: "Baseline Assessment",
                    description: "Establishing specific consumption indices (e.g., kL water/ton product) using historical data"
                },
                {
                    title: "Benchmarking",
                    description: "Comparing performance against national and global best-in-class peers to identify gaps"
                },
                {
                    title: "Water Stewardship",
                    description: "Implementing 3R (Reduce, Reuse, Recycle) principles, Rainwater Harvesting, and ZLD strategies"
                },
                {
                    title: "Material Optimization",
                    description: "Strategies for light-weighting, yield improvement, and scrap reduction"
                },
                {
                    title: "Monitoring Framework",
                    description: "deploying IoT dashboards for continuous tracking of resource intensity KPIs"
                }
            ]}
            processSteps={[
                {
                    title: "Data Mining",
                    description: "Analysis of consumption trends"
                },
                {
                    title: "Benchmarking",
                    description: "Gap analysis vs industry leaders"
                },
                {
                    title: "Strategy Formulation",
                    description: "Intervention roadmap design"
                },
                {
                    title: "Implementation",
                    description: "Project execution and monitoring"
                }
            ]}
            benefits={[
                "Resilience to Resource Scarcity",
                "Cost Leadership in Production",
                "Green Brand Positioning",
                "Regulatory Pre-compliance",
                "Operational Excellence",
                "Reduced Carbon Intensity"
            ]}
            ctaText="Optimize Resource Use"
        />
    );
};

export default ResourceEfficiencyPage;
