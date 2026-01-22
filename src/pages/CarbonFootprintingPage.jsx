import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const CarbonFootprintingPage = () => {
    return (
        <ServicePageTemplate
            title="Carbon Footprinting Services"
            heroImage="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d"
            overview="Comprehensive quantification of organizational carbon footprints across Scope 1, 2, 3 and product-level emissions, enabling data-driven decarbonization strategies."
            keyFeatures={[
                "Scope 1, 2, 3 Quantification",
                "Product Carbon Footprint (PCF)",
                "Supply Chain Analysis",
                "Baseline Establishment",
                "Hotspot Identification",
                "Reduction Pathway Modeling"
            ]}
            standards={[
                "ISO 14040/14044 LCA Standards",
                "GHG Protocol Corporate Standard",
                "PAS 2050",
                "ISO 14067"
            ]}
            deliverables={[
                "Comprehensive Carbon Footprint Report",
                "Detailed Emissions Inventory",
                "Hotspot Analysis & Mitigation Recommendations",
                "Compliance Readiness Assessment"
            ]}
            methodology={[
                {
                    title: "Data Collection & Scoping",
                    description: "Define organizational boundaries, identify emission sources, and establish data collection protocols aligned with GHG Protocol requirements."
                },
                {
                    title: "Activity Data Gathering",
                    description: "Collect consumption data for energy, fuels, refrigerants, business travel, waste, and supply chain activities across all operational sites."
                },
                {
                    title: "Emission Factor Application",
                    description: "Apply region-specific and activity-specific emission factors from authoritative sources (DEFRA, EPA, IPCC) to convert activity data into CO₂e."
                },
                {
                    title: "Calculation & Verification",
                    description: "Calculate total emissions by scope and category, perform quality checks, and validate results against industry benchmarks."
                },
                {
                    title: "Reporting & Recommendations",
                    description: "Prepare comprehensive reports with visualizations, hotspot analysis, and actionable reduction strategies aligned with science-based targets."
                }
            ]}
            processSteps={[
                {
                    title: "Kickoff & Planning",
                    description: "Define scope, boundaries, and data requirements. Establish project timeline and stakeholder engagement plan."
                },
                {
                    title: "Data Collection",
                    description: "Gather activity data from all sources using standardized templates and validation protocols."
                },
                {
                    title: "Analysis & Calculation",
                    description: "Apply emission factors, calculate footprint, identify hotspots, and model reduction scenarios."
                },
                {
                    title: "Reporting & Strategy",
                    description: "Deliver comprehensive reports with reduction roadmap and implementation support."
                }
            ]}
            benefits={[
                {
                    title: "Regulatory Compliance",
                    description: "Meet mandatory disclosure requirements (BRSR, TCFD, CDP) and prepare for emerging carbon pricing mechanisms."
                },
                {
                    title: "Cost Reduction",
                    description: "Identify energy efficiency opportunities and operational improvements that reduce both emissions and costs."
                },
                {
                    title: "Investor Confidence",
                    description: "Demonstrate ESG leadership to attract sustainable investment and improve credit ratings."
                },
                {
                    title: "Supply Chain Resilience",
                    description: "Understand value chain dependencies and build resilience against climate-related disruptions."
                },
                {
                    title: "Competitive Advantage",
                    description: "Differentiate your brand, win green tenders, and meet customer sustainability requirements."
                },
                {
                    title: "Science-Based Targets",
                    description: "Establish credible baseline for setting and tracking progress toward net-zero commitments."
                }
            ]}
            ctaText="Request Carbon Audit"
        />
    );
};

export default CarbonFootprintingPage;
