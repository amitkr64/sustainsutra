import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ISOVerificationPage = () => {
    return (
        <ServicePageTemplate
            title="ISO 14064 Verification & Assurance"
            heroImage="https://images.unsplash.com/photo-1699854427600-842027e87f1b"
            overview="Third-party verification and assurance of greenhouse gas emissions data and reports to enhance credibility and meet regulatory requirements."
            keyFeatures={[
                "Independent Data Verification",
                "Compliance Audit Procedures",
                "Assurance Statement Issuance",
                "Quality Control Review",
                "Limited & Reasonable Assurance",
                "Pre-assurance Readiness Checks"
            ]}
            standards={[
                "ISO 14064-3:2019",
                "ISO 14065:2013",
                "ISAE 3000 / ISAE 3410",
                "AA1000 Assurance Standard",
                "Carbon Disclosure Project (CDP)"
            ]}
            deliverables={[
                "Independent Verification Report",
                "Assurance Statement",
                "Audit Findings & Recommendations",
                "Corrective Action Plan",
                "Management Letter"
            ]}
            methodology={[
                {
                    title: "Strategic Analysis",
                    description: "Understand the organization's GHG inventory, data management systems, and controls environment."
                },
                {
                    title: "Risk Assessment",
                    description: "Identify areas of high risk for material misstatements in reported data."
                },
                {
                    title: "Verification Planning",
                    description: "Develop a verification plan including sampling methodology, site visits, and data testing procedures."
                },
                {
                    title: "Process Verification",
                    description: "Verify data collection processes, emission factors, and calculations against applied criteria."
                },
                {
                    title: "Substantive Testing",
                    description: "Detailed testing of data samples to ensure accuracy, completeness, and reliability."
                }
            ]}
            processSteps={[
                {
                    title: "Agreement",
                    description: "Define scope, level of assurance (limited/reasonable), and applicable criteria."
                },
                {
                    title: "Stage 1 Audit",
                    description: "Desktop review of documentation and systems readiness assessment."
                },
                {
                    title: "Stage 2 Audit",
                    description: "On-site or remote verification, interviews, and detailed data testing."
                },
                {
                    title: "Reporting",
                    description: "Issue findings, review corrective actions, and provide final assurance statement."
                }
            ]}
            benefits={[
                {
                    title: "Enhanced Credibility",
                    description: "Provide stakeholders with confidence in the accuracy and reliability of your ESG disclosures."
                },
                {
                    title: "Improved Data Quality",
                    description: "Identify weaknesses in data management systems and processes for continuous improvement."
                },
                {
                    title: "Regulatory Compliance",
                    description: "Meet requirements for verified emissions reports under various local and international schemes."
                },
                {
                    title: "Score Improvement",
                    description: "Achieve higher scores in ratings like CDP, DJSI, and EcoVadis which reward independent verification."
                },
                {
                    title: "Greenwashing Defense",
                    description: "Substantiate environmental claims with third-party validated data to mitigate reputational risk."
                },
                {
                    title: "Market Differentiation",
                    description: "Demonstrate commitment to transparency and best practices in carbon accounting."
                }
            ]}
            ctaText="Request ISO Verification"
        />
    );
};

export default ISOVerificationPage;
