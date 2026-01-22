import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const EnergyAuditsPage = () => {
    return (
        <ServicePageTemplate
            title="Energy Audits & Optimization"
            heroImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"
            overview="Comprehensive energy auditing services to identify inefficiencies, reduce consumption, and optimize operational costs while supporting decarbonization goals."
            keyFeatures={[
                "Detailed Energy Consumption Analysis",
                "Process & Equipment Efficiency Assessment",
                "Renewable Energy Feasibility Studies",
                "Energy Management System (EnMS) Support"
            ]}
            standards={[
                "ISO 50001 Energy Management",
                "BEE Star Rating Programs",
                "ECBC (Energy Conservation Building Code)",
                "PAT (Perform, Achieve, Trade) Compliance"
            ]}
            deliverables={[
                "Comprehensive Energy Audit Report",
                "Cost-Benefit Analysis of Interventions",
                "Energy Reduction Roadmap",
                "Implementation Support Documentation"
            ]}
            methodology={[
                {
                    title: "Utility Analysis",
                    description: "In-depth review of historical energy consumption, tariff structures, and power quality data to establish baselines"
                },
                {
                    title: "On-Site Assessment",
                    description: "Detailed walkthrough and inspection of HVAC, lighting, compressed air, boilers, and process machinery"
                },
                {
                    title: "Field Measurements",
                    description: " deploying portable instruments (thermal cameras, power analyzers, flow meters) to capture real-time performance data"
                },
                {
                    title: "Efficiency Analysis",
                    description: "Evaluating equipment performance against design standards and best available technologies (BAT)"
                },
                {
                    title: "Techno-Commercial Proposal",
                    description: "Developing cost-benefit analysis (ROI, Payback Period) for recommended energy conservation measures"
                }
            ]}
            processSteps={[
                {
                    title: "Pre-Audit Planning",
                    description: "Data request and site visit scheduling"
                },
                {
                    title: "Field Study",
                    description: "On-site measurements and observations"
                },
                {
                    title: "Analysis & Reporting",
                    description: "Data crunching and solution development"
                },
                {
                    title: "Post-Audit Review",
                    description: "Presentation to management and implementation planning"
                }
            ]}
            benefits={[
                "Significant Operational Cost Reduction",
                "Extended Equipment Lifespan",
                "Improved Production Efficiency",
                "Carbon Footprint Reduction",
                "Regulatory Compliance (PAT Scheme)",
                "Enhanced Energy Security"
            ]}
            ctaText="Request Energy Audit"
        />
    );
};

export default EnergyAuditsPage;
