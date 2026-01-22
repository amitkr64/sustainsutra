import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ESGStrategyPage = () => {
    return (
        <ServicePageTemplate
            title="ESG Strategy & Consulting"
            heroImage="https://images.unsplash.com/photo-1691109972364-0f3b7ce93527"
            overview="Holistic ESG strategy development aligned with business objectives and stakeholder expectations to drive long-term sustainable value."
            keyFeatures={[
                "Materiality Assessment",
                "ESG Risk Mapping",
                "Strategy Roadmap Development",
                "Stakeholder Engagement Workshops",
                "Rating Agency Alignment (MSCI, DJSI)",
                "Policy Formulation"
            ]}
            standards={[
                "GRI Standards",
                "SASB (Sustainability Accounting Standards Board)",
                "TCFD (Task Force on Climate-related Financial Disclosures)",
                "UN SDGs Alignment",
                "IFRS S1 & S2"
            ]}
            deliverables={[
                "Comprehensive ESG Strategy Document",
                "Double Materiality Matrix",
                "Implementation Roadmap & KPIs",
                "Executive Presentation Deck",
                "ESG Policy Framework"
            ]}
            methodology={[
                {
                    title: "Baseline Assessment",
                    description: "Evaluate current ESG performance, data availability, and peer benchmarking to understand starting position."
                },
                {
                    title: "Double Materiality",
                    description: "Identify issues that impact the business (financial materiality) and how the business impacts the world (impact materiality)."
                },
                {
                    title: "Goal Setting",
                    description: "Define ambition levels and set SMART goals for material topics aligned with global frameworks (e.g., Net Zero, SDGs)."
                },
                {
                    title: "Strategic Roadmap",
                    description: "Develop a phased action plan with clear ownership, timelines, and resource requirements."
                },
                {
                    title: "Integration & Governance",
                    description: " embed ESG into core business strategy, risk management, and board oversight structures."
                }
            ]}
            processSteps={[
                {
                    title: "Discovery",
                    description: "Leadership interviews and document review to understand business context."
                },
                {
                    title: "Stakeholder Engagement",
                    description: "Surveys and workshops with employees, investors, customers, and suppliers."
                },
                {
                    title: "Strategy Formulation",
                    description: "Iterative development of strategic pillars, commitments, and targets."
                },
                {
                    title: "Validation",
                    description: "Stress-testing strategy with executive leadership and refining implementation plans."
                }
            ]}
            benefits={[
                {
                    title: "Risk Mitigation",
                    description: "Proactively identify and manage emerging non-financial risks like climate change and supply chain disruptions."
                },
                {
                    title: "Capital Access",
                    description: "Attract impact investors and secure lower cost of capital through strong ESG performance."
                },
                {
                    title: "Talent Attraction",
                    description: "Appeal to purpose-driven talent and increase employee engagement and retention."
                },
                {
                    title: "Brand Value",
                    description: "Enhance corporate reputation and build trust with conscious consumers and partners."
                },
                {
                    title: "Innovation Driver",
                    description: "Stimulate product and process innovation through sustainability constraints and opportunities."
                },
                {
                    title: "Regulatory Future-Proofing",
                    description: "Stay ahead of evolving global regulations and disclosure mandates."
                }
            ]}
            ctaText="Develop ESG Strategy"
        />
    );
};

export default ESGStrategyPage;
