import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const BRSRReportingPage = () => {
    return (
        <ServicePageTemplate
            title="BRSR Compliance"
            heroImage="https://images.unsplash.com/photo-1618044733300-9472054094ee"
            overview="End-to-end SEBI Business Responsibility and Sustainability Reporting (BRSR) implementation for top-tier Indian listed entities."
            executiveSummary="As SEBI transitions from voluntary disclosures to the mandatory BRSR and BRSR Core framework, organizational transparency is no longer optional—it is a regulatory prerequisite. Our compliance advisory specializes in the rigorous compilation, validation, and narrative development required to meet the Nine Principles of the National Guidelines on Responsible Business Conduct (NGRBC). We ensure your disclosures are not only compliant but also optimized for ESG rating agencies and stakeholder scrutiny."
            keyFeatures={[
                "BRSR Core Framework Alignment",
                "Principle-wise Quantitative Data Validation",
                "Supply Chain ESG Assurance",
                "Materiality-linked Disclosure Logic",
                "Internal Control for Sustainability (ICSR)",
                "BRSR to Global Standards Mapping"
            ]}
            standards={[
                "SEBI BRSR Guidelines (May 2021)",
                "BRSR Core (July 2023)",
                "NGRBC Framework",
                "Companies Act 2013 §135",
                "GRI / SASB Interoperability"
            ]}
            deliverables={[
                "Submission-Ready BRSR Report (XML & PDF)",
                "Principle-wise Compliance Gap Report",
                "Assurance-Ready Data Evidence Room",
                "Board & Stakeholder Briefing Executive Summary",
                "NGRBC Principle Alignment Map"
            ]}
            methodology={[
                {
                    title: "Diagnostic Readiness Audit",
                    description: "Benchmarking current disclosures against BRSR Core requirements and identifying quantitative data gaps."
                },
                {
                    title: "Systematic Data Extraction",
                    description: "Collaborating with HR, Finance, Operations, and Supply Chain teams to extract principle-wise metrics."
                },
                {
                    title: "Rigor & Validation",
                    description: "Applying proprietary validation checks to ensure data accuracy and audit-traceability for reasonable assurance."
                },
                {
                    title: "Narrative & Disclosure Design",
                    description: "Developing high-impact qualitative disclosures that articulate your organization's sustainability governance."
                },
                {
                    title: "Final Review & Filing",
                    description: "Conducting board-level previews and preparing final submission-ready files for stock exchange filing."
                }
            ]}
            processSteps={[
                {
                    title: "Phase I: Scoping",
                    description: "Identify reporting boundaries and materiality."
                },
                {
                    title: "Phase II: Collection",
                    description: "Multi-departmental data gathering and validation."
                },
                {
                    title: "Phase III: Drafting",
                    description: "Drafting the 9-principle report and core metrics."
                },
                {
                    title: "Phase IV: Assurance",
                    description: "Pre-assurance and final regulatory submission."
                }
            ]}
            benefits={[
                {
                    title: "Regulatory Zero-Risk",
                    description: "Ensure 100% compliance with SEBI mandates to avoid penalties and disclosure delays."
                },
                {
                    title: "Investor Transparency",
                    description: "Satisfy the growing demand for verified ESG data from institutional and foreign investors."
                },
                {
                    title: "Benchmarking Leadership",
                    description: "Position your organization as a transparency leader within the top 1000 listed entities."
                },
                {
                    title: "Internal Data Quality",
                    description: "Build robust internal systems for tracking environmental and social performance consistently."
                }
            ]}
            ctaText="Initiate BRSR Readiness"
        />
    );
};

export default BRSRReportingPage;
