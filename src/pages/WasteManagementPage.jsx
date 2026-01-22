import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const WasteManagementPage = () => {
    return (
        <ServicePageTemplate
            title="Waste Management & Zero Waste Strategy"
            heroImage="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
            overview="Strategic waste management consulting to minimize waste generation, maximize resource recovery, and establish circular economy practices across operations."
            keyFeatures={[
                "Waste Characterization & Auditing",
                "Zero Waste Strategy Development",
                "Recycling & Recovery Program Design",
                "Waste-to-Value Opportunity Assessment"
            ]}
            standards={[
                "ISO 14001 Environmental Management",
                "Solid Waste Management Rules, 2016",
                "E-Waste Management Rules, 2022",
                "Plastic Waste Management Rules"
            ]}
            deliverables={[
                "Comprehensive Waste Audit Report",
                "Zero Waste Roadmap",
                "Waste Segregation & Management Protocols",
                "Vendor Selection & Partnership Guidance"
            ]}
            methodology={[
                {
                    title: "Waste Characterization",
                    description: "Detailed quantification and qualitative analysis of waste streams by type, origin, and hazard potential"
                },
                {
                    title: "Lifecycle Mapping",
                    description: "Tracing the journey of materials from procurement to disposal to identify leakage points"
                },
                {
                    title: "Hierarchy Application",
                    description: "Prioritizing interventions based on the waste hierarchy: Prevention > Redesign > Reuse > Recycling > Recovery"
                },
                {
                    title: "Vendor Ecosystem",
                    description: " vetting and onboarding authorized recyclers, PROs, and waste handling partners"
                },
                {
                    title: "Digital Tracking",
                    description: "Implementing traceability systems for waste manifests and diversion reporting"
                }
            ]}
            processSteps={[
                {
                    title: "Baseline Audit",
                    description: "Physical inspection and waste quantification"
                },
                {
                    title: "Gap Analysis",
                    description: "Regulatory compliance check and benchmarking"
                },
                {
                    title: "Strategy Design",
                    description: "Zero-waste roadmap formulation"
                },
                {
                    title: "Implementation",
                    description: "Training, bin infrastructure, and vendor tie-ups"
                }
            ]}
            benefits={[
                "Achieve Zero Waste to Landfill Status",
                "Generate Revenue from Material Recovery",
                "Full Compliance with Waste Management Rules",
                "Reduce Hazardous Waste Liability",
                "Improve ESG Scores and Ratings",
                "Operational Efficiency Improvement"
            ]}
            ctaText="Start Waste Audit"
        />
    );
};

export default WasteManagementPage;
