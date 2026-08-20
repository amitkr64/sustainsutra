import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { useTranslation } from 'react-i18next';

const CarbonMarketsPage = () => {
    const { t } = useTranslation();
    return (
        <ServicePageTemplate
            title={t('services.carbonMarketsTitle', 'Carbon Markets, Credits & Climate Finance')}
            heroImage="https://images.unsplash.com/photo-1466611653911-950846379373"
            overview="End-to-end carbon markets advisory — from project development and credit issuance under compliance and voluntary schemes to monetization strategy and climate finance structuring. We help you navigate India's Carbon Credit Trading Scheme (CCTS), voluntary market standards, and global climate funds with technical rigor."
            keyFeatures={[
                "Carbon Credit Project Development & Registration",
                "CCTS Compliance Strategy (India ETS & Offset Mechanism)",
                "Voluntary Carbon Market (VCM) Standards Advisory — Gold Standard, Verra",
                "Article 6 (Paris Agreement) ITMO/MOER Advisory",
                "Carbon Credit Origination, Valuation & Monetization",
                "Climate Finance, Green Bonds & Blended Finance Structuring"
            ]}
            standards={[
                "Carbon Credit Trading Scheme (CCTS), 2023 — India",
                "Energy Conservation (Amendment) Act, 2022",
                "Paris Agreement Article 6 Mechanisms",
                "Gold Standard & Verra (VCS) Requirements",
                "ISO 14064-2 Project-Level GHG Quantification",
                "SEBI Green Bond Framework & CISD"
            ]}
            deliverables={[
                "Carbon Credit Feasibility & Issuance Potential Assessment",
                "Project Design Document (PDD) Development Support",
                "CCTS Registration & Compliance Roadmap",
                "Credit Monetization & Offtake Strategy",
                "Climate Finance Readiness & Funding Pipeline Report"
            ]}
            methodology={[
                {
                    title: "Opportunity Screening",
                    description: "Identifying credit-generating potential across your assets — energy efficiency, renewables, waste, and process interventions"
                },
                {
                    title: "Quantification",
                    description: "ISO 14064-2 aligned baseline setting, additionality demonstration, and GHG reduction accounting"
                },
                {
                    title: "Registration Support",
                    description: "Documentation, validation coordination, and registry navigation across CCTS and voluntary standards"
                },
                {
                    title: "Monetization",
                    description: "Credit valuation, buyer matching, offtake structuring, and climate finance linkage"
                }
            ]}
            processSteps={[
                {
                    title: "Feasibility Assessment",
                    description: "Credit potential, eligibility, and scheme mapping"
                },
                {
                    title: "Project Development",
                    description: "PDD, monitoring plans, and validation"
                },
                {
                    title: "Registration & Issuance",
                    description: "Registry processes and credit issuance"
                },
                {
                    title: "Monetization",
                    description: "Valuation, sales structuring, and finance linkage"
                }
            ]}
            benefits={[
                "Monetize Decarbonization as a New Revenue Stream",
                "Compliance-Ready for India's CCTS Regime",
                "Access Global Voluntary and Article 6 Markets",
                "Unlock Climate Finance and Green Capital",
                "Strengthen Credibility with Issued, Auditable Credits",
                "Turn Net-Zero Commitments into Bankable Projects"
            ]}
            ctaText="Explore Carbon Markets"
        />
    );
};

export default CarbonMarketsPage;
