import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const GHGMappingPage = () => {
    return (
        <ServicePageTemplate
            title="GHG Mapping & Accounting"
            heroImage="https://images.unsplash.com/photo-1580120656760-c652daad203c"
            overview="Systematic mapping and accounting of greenhouse gas emissions across organizational boundaries to ensure transparency and regulatory compliance."
            keyFeatures={[
                "Emissions Source Identification",
                "Data Collection & Verification",
                "Scope Classification (Direct vs Indirect)",
                "Precise Emissions Calculation"
            ]}
            standards={[
                "ISO 14064-1:2018",
                "GHG Protocol",
                "IPCC Methodologies",
                "Science Based Targets initiative (SBTi)"
            ]}
            deliverables={[
                "GHG Inventory Report",
                "Emissions Source Register",
                "Verification-Ready Documentation",
                "Gap Analysis Report"
            ]}
            methodology={[
                {
                    title: "Boundary Definition",
                    description: "Establishing organizational and operational control boundaries to ensure accurate reporting scope"
                },
                {
                    title: "Source Identification",
                    description: "Comprehensive mapping of Scope 1 (Direct), Scope 2 (Energy Indirect), and Scope 3 (Value Chain) emission sources"
                },
                {
                    title: "Data Collection & Validation",
                    description: "Rigorous gathering and verification of activity data from utility bills, fuel logs, and supply chain records"
                },
                {
                    title: "Calculation & Analysis",
                    description: "Applying globally recognized emission factors (IPCC, DEFRA, CEA) to quantify carbon equivalent emissions"
                },
                {
                    title: "Reporting & Strategy",
                    description: "Developing a compliant GHG inventory report and identifying hotspots for reduction strategies"
                }
            ]}
            processSteps={[
                {
                    title: "Kick-off & Scoping",
                    description: "Define reporting period, boundaries, and standards"
                },
                {
                    title: "Data Gathering",
                    description: "Collection of raw activity data"
                },
                {
                    title: "Calculation",
                    description: "Conversion to CO2e using standard factors"
                },
                {
                    title: "Final Report",
                    description: "Presentation of findings and opportunities"
                }
            ]}
            benefits={[
                "Global Compliance (CBAM, BRSR, CSRD)",
                "Identify Cost Saving Opportunities",
                "Enhance Investor & Stakeholder Confidence",
                "Supply Chain Risk Management",
                "Prepare for Net-Zero Transition",
                "Competitive Market Advantage"
            ]}
            ctaText="Start GHG Mapping"
        />
    );
};

export default GHGMappingPage;