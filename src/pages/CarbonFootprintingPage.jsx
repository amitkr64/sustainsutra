import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const CarbonFootprintingPage = () => {
    return (
        <ServicePageTemplate
            title="Carbon Footprinting"
            heroImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"
            overview="Systematic quantification of organizational GHG emissions to establish baseline credibility and drive science-based decarbonization."
            executiveSummary="In an era of increasing environmental scrutiny, Carbon Footprinting is the foundational step for any organization committed to sustainability. Our advisory service provides an exhaustive inventory of Greenhouse Gas (GHG) emissions across your entire value chain, from direct operational fuel combustion to subtle upstream supply chain activities. By translating complex consumption data into actionable CO2e metrics, we empower your leadership to make data-driven decisions that reduce both environmental impact and operational costs."
            keyFeatures={[
                "Scope 1, 2, 3 Inventory Management",
                "Product Life Cycle Carbon Assessment",
                "Supply Chain Emission Mapping",
                "Science-Based Target (SBTi) Baseline",
                "High-Resolution Hotspot Analysis",
                "Decarbonization Pathway Modeling"
            ]}
            standards={[
                "GHG Protocol Corporate Standard",
                "ISO 14064-1:2018",
                "PAS 2050 / ISO 14067 (Product)",
                "BRSR / SEBI Compliance",
                "TCFD Disclosures"
            ]}
            deliverables={[
                "Comprehensive Carbon Inventory Report",
                "Stakeholder Accuracy Statement",
                "Emission Source & Factor Register",
                "Reduction Strategy Roadmap",
                "Compliance Readiness Audit"
            ]}
            methodology={[
                {
                    title: "Diagnostic & Scoping",
                    description: "Defining organizational boundaries and identifying all direct and indirect emission sources relevant to your sector."
                },
                {
                    title: "High-Fidelity Data Harvesting",
                    description: "Rigorous collection of energy, fuel, and resource consumption data using our proprietary validation frameworks."
                },
                {
                    title: "Quantitative Modeling",
                    description: "Applying globally recognized emission factors (IPCC, DEFRA, IEA) to calculate high-precision CO2e metrics."
                },
                {
                    title: "Analytical Interpretation",
                    description: "Identifying carbon 'hotspots' and benchmarking performance against industry leaders to reveal optimization gaps."
                },
                {
                    title: "Reporting & Verification Prep",
                    description: "Compiling disclosures that meet international standards and preparing your team for external third-party limited or reasonable assurance."
                }
            ]}
            processSteps={[
                {
                    title: "Phase I: Setup",
                    description: "Boundary definition and stakeholder alignment."
                },
                {
                    title: "Phase II: Audit",
                    description: "Detailed data collection and verification."
                },
                {
                    title: "Phase III: Analysis",
                    description: "Footprint calculation and hotspot identification."
                },
                {
                    title: "Phase IV: Strategy",
                    description: "Final report and reduction pathway design."
                }
            ]}
            benefits={[
                {
                    title: "Regulatory Immunity",
                    description: "Stay ahead of BRSR, CBAM, and global carbon tax mechanisms through proactive compliance."
                },
                {
                    title: "Operational Efficiency",
                    description: "Identify energy leaks and resource waste that directly correlate to bottom-line savings."
                },
                {
                    title: "Market Transition Ready",
                    description: "Gain preferred supplier status by transparently disclosing product-level carbon footprints."
                },
                {
                    title: "Investor Attraction",
                    description: "Improve ESG ratings (MSCI, Sustainalytics) to access lower cost of capital and green financing."
                }
            ]}
            ctaText="Schedule a Carbon Audit"
        />
    );
};

export default CarbonFootprintingPage;
