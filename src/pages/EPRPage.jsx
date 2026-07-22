import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const EPRPage = () => {
    return (
        <ServicePageTemplate
            title="Extended Producer Responsibility (EPR)"
            heroImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d"
            overview="Navigate India's EPR regulations with expert compliance support for plastic packaging, e-waste, batteries, and tires. Ensure regulatory adherence while building sustainable product stewardship programs."
            keyFeatures={[
                "EPR Registration & Authorization Support",
                "Target Achievement Planning",
                "PRO (Producer Responsibility Organization) Selection",
                "Recycling Partner Network Development"
            ]}
            standards={[
                "Plastic Waste Management Rules, 2022",
                "E-Waste Management Rules, 2022",
                "Battery Waste Management Rules, 2022",
                "Tyre Waste Management Rules"
            ]}
            deliverables={[
                "EPR Compliance Gap Analysis",
                "Annual Return & Documentation Support",
                "Collection & Recycling Target Plans",
                "CPCB Portal Management Assistance"
            ]}
            methodology={[
                {
                    title: "Liability Assessment",
                    description: "Accurate quantification of EPR targets based on production, import, and end-of-life volumes"
                },
                {
                    title: "Portal Management",
                    description: "End-to-end assistance with CPCB portal registration, credit exchange, and target filing"
                },
                {
                    title: "PRO Selection & Management",
                    description: "Due diligence, selection, and performance monitoring of Producer Responsibility Organizations (PROs)"
                },
                {
                    title: "Credit Procurement",
                    description: "Facilitating the seamless purchase and retirement of recycling/waste processing credits"
                },
                {
                    title: "Documentation & Audit",
                    description: "Maintaining granular records (invoices, weighing slips) to ensure audit-readiness"
                }
            ]}
            processSteps={[
                {
                    title: "Registration",
                    description: "Onboarding on CPCB / SPCB portals"
                },
                {
                    title: "Target Calculation",
                    description: "Determining annual liability"
                },
                {
                    title: "Plan Execution",
                    description: "Collection & recycling via PROs"
                },
                {
                    title: "Filing Returns",
                    description: "Submitting annual returns and credits"
                }
            ]}
            benefits={[
                "Avoidance of Strict Penalties & Fines",
                "Streamlined Regulatory Compliance",
                "Verified Cost-Effective Recycling Credits",
                "Protect Brand Reputation",
                "Operational Continuity",
                "Contribution to Circular Economy"
            ]}
            ctaText="Get EPR Compliance Support"
        />
    );
};

export default EPRPage;
