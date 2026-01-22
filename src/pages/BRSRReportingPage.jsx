import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const BRSRReportingPage = () => {
    return (
        <ServicePageTemplate
            title="BRSR Reporting & Compliance"
            heroImage="https://images.unsplash.com/photo-1618044733300-9472054094ee"
            overview="SEBI Business Responsibility and Sustainability Reporting (BRSR) framework implementation and reporting for top listed Indian entities."
            keyFeatures={[
                "BRSR Framework Guidance",
                "Data Compilation & Validation",
                "Report Preparation & Design",
                "Regulatory Compliance Check",
                "Materiality Assessment",
                "Stakeholder Engagement"
            ]}
            standards={[
                "SEBI BRSR Guidelines",
                "National Action Plan on Climate Change (NAPCC)",
                "National Guidelines on Responsible Business Conduct (NGRBC)"
            ]}
            deliverables={[
                "Submission-Ready BRSR Report",
                "Compliance Checklist & Gap Analysis",
                "Stakeholder Communication Plan",
                "Leadership Summary"
            ]}
            methodology={[
                {
                    title: "Gap Analysis & Planning",
                    description: "Assess current ESG data availability against BRSR requirements, identify gaps, and develop data collection roadmap."
                },
                {
                    title: "Materiality Assessment",
                    description: "Conduct stakeholder consultations to identify material ESG topics specific to your industry and operations."
                },
                {
                    title: "Data Collection & Validation",
                    description: "Gather quantitative and qualitative data across all 9 NGRBC principles with robust validation protocols."
                },
                {
                    title: "Report Preparation",
                    description: "Compile data into BRSR format, ensure accuracy, and prepare narrative disclosures with supporting evidence."
                },
                {
                    title: "Review & Submission",
                    description: "Conduct internal review, obtain leadership approval, and prepare for regulatory submission and public disclosure."
                }
            ]}
            processSteps={[
                {
                    title: "Scoping Workshop",
                    description: "Understand business model, identify reporting boundaries, and establish governance structure."
                },
                {
                    title: "Data Management",
                    description: "Set up data collection systems, train internal teams, and validate all metrics."
                },
                {
                    title: "Report Development",
                    description: "Draft BRSR report with quantitative metrics and qualitative disclosures."
                },
                {
                    title: "Assurance & Filing",
                    description: "Optional third-party assurance and timely submission to stock exchanges."
                }
            ]}
            benefits={[
                {
                    title: "Regulatory Compliance",
                    description: "Meet SEBI mandates for top 1000 listed entities and avoid penalties for non-compliance."
                },
                {
                    title: "Investor Relations",
                    description: "Enhance transparency for ESG-focused investors and improve access to sustainable finance."
                },
                {
                    title: "Stakeholder Trust",
                    description: "Build credibility with customers, employees, and communities through transparent disclosure."
                },
                {
                    title: "Operational Insights",
                    description: "Identify efficiency opportunities and risk areas through systematic ESG data collection."
                },
                {
                    title: "Competitive Positioning",
                    description: "Benchmark against peers and demonstrate leadership in responsible business practices."
                },
                {
                    title: "Strategic Alignment",
                    description: "Align business strategy with national sustainability goals and global frameworks."
                }
            ]}
            ctaText="Start BRSR Reporting"
        />
    );
};

export default BRSRReportingPage;
