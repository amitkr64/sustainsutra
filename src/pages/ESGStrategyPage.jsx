import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ESGStrategyPage = () => {
    return (
        <ServicePageTemplate
            title="ESG Strategy"
            heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
            overview="Engineering holistic ESG strategies that transform sustainability from a compliance mandate into a competitive advantage."
            executiveSummary="Environmental, Social, and Governance (ESG) performance is no longer a peripheral concern—it is a core driver of institutional value and long-term resilience. Our strategy team works with executive leadership to identify material risks and opportunities, establishing a robust framework for ethical growth. We move beyond generic checklists to build a purpose-driven strategy that aligns with your unique business model, stakeholder expectations, and global sustainability frameworks, ensuring your organization is built to thrive in a low-carbon economy."
            keyFeatures={[
                "Double Materiality Assessment",
                "ESG Risk & Opportunity Mapping",
                "Net-Zero Transition Planning",
                "Stakeholder Engagement Systems",
                "Rating Agency (MSCI/DJSI) Optimization",
                "Sustainable Finance Alignment"
            ]}
            standards={[
                "GRI & SASB Standards",
                "TCFD & TNFD Frameworks",
                "IFRS S1 & S2 Disclosures",
                "UN SDGs Integration",
                "Science Based Targets (SBTi)"
            ]}
            deliverables={[
                "Comprehensive ESG Strategy Document",
                "Double Materiality Matrix",
                "PHased Implementation Roadmap",
                "Executive Governance Framework",
                "ESG Policy & Code of Conduct"
            ]}
            methodology={[
                {
                    title: "Status Quo Analysis",
                    description: "Benchmarking current performance against peers and identifying compliance gaps in existing disclosures."
                },
                {
                    title: "Materiality Determination",
                    description: "Conducting multi-stakeholder workshops to identify issues with significant financial and social impact."
                },
                {
                    title: "Pillar Development",
                    description: "Synthesizing material topics into strategic pillars with defined ambition levels and SMART targets."
                },
                {
                    title: "Governance Integration",
                    description: "Establishing board-level oversight and internal management structures for tracking ESG performance."
                },
                {
                    title: "Disclosure Strategy",
                    description: "Mapping performance data to global reporting standards to ensure transparency and high ESG ratings."
                }
            ]}
            processSteps={[
                {
                    title: "Phase I: Discovery",
                    description: "Strategic interviews and document review."
                },
                {
                    title: "Phase II: Materiality",
                    description: "Double materiality mapping and matrix design."
                },
                {
                    title: "Phase III: Formulation",
                    description: "Target setting and roadmap development."
                },
                {
                    title: "Phase IV: Launch",
                    description: "Policy rollout and reporting framework setup."
                }
            ]}
            benefits={[
                {
                    title: "Capital Access",
                    description: "Attract institutional investors and secure favorable lending terms through superior ESG credentials."
                },
                {
                    title: "Operational Resilience",
                    description: "Proactively manage physical and transition risks related to climate and social changes."
                },
                {
                    title: "Brand Loyalty",
                    description: "Align with the values of conscious consumers and purpose-driven talent to increase market share."
                },
                {
                    title: "Regulatory Agility",
                    description: "Effortlessly adapt to emerging global mandates like CSRD and national requirements like BRSR."
                }
            ]}
            ctaText="Request Strategy Consultation"
        />
    );
};

export default ESGStrategyPage;
