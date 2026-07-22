import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const TrainingCapacityPage = () => {
    return (
        <ServicePageTemplate
            title="Training & Capacity Building"
            heroImage="https://images.unsplash.com/photo-1560849144-739435323954"
            overview="Comprehensive training programs to build internal expertise in sustainability reporting, carbon management, and regulatory compliance."
            keyFeatures={[
                "ISO 14064 Certification Training",
                "GRI & BRSR Reporting Workshops",
                "ESG Strategy Masterclasses",
                "Internal Auditor Certification"
            ]}
            standards={[
                "2-Day Intensive Workshops",
                "Online Certification Courses",
                "On-site Corporate Training",
                "Customized Executive Programs"
            ]}
            deliverables={[
                "Professional Training Certificates",
                "Comprehensive Participant Materials",
                "Competency Assessment Reports",
                "Post-Training Support"
            ]}
            methodology={[
                {
                    title: "Needs Assessment",
                    description: "Identifying specific skill gaps across various organizational levels (Board, Management, Operations)"
                },
                {
                    title: "Customized Curriculum",
                    description: "Tailoring content based on sector relevance (e.g., Steel, Cement, Textile) and applicable standards"
                },
                {
                    title: "Interactive Delivery",
                    description: "Using case studies, group exercises, role-plays, and gamification to ensure high engagement"
                },
                {
                    title: "Action Leaning",
                    description: "incorporating real-world problem solving and 'bring your own data' sessions"
                },
                {
                    title: "Impact Measurement",
                    description: "Pre- and post-training assessments to measure knowledge retention and application readiness"
                }
            ]}
            processSteps={[
                {
                    title: "TNA (Needs Analysis)",
                    description: "Defining learning objectives"
                },
                {
                    title: "Content Design",
                    description: "Developing module structure"
                },
                {
                    title: "Workshop Delivery",
                    description: "Interactive training sessions"
                },
                {
                    title: "Certification",
                    description: "Assessment and feedback"
                }
            ]}
            benefits={[
                {
                    title: "Build Internal Capability",
                    description: "Develop a robust internal team capable of managing sustainability initiatives without external dependency."
                },
                {
                    title: "Ensure Compliance",
                    description: "Stay ahead of regulatory changes including BRSR and bespoke ESG reporting requirements."
                },
                {
                    title: "Risk Management",
                    description: "Equip your team to identify and mitigate environmental and social risks proactively."
                },
                {
                    title: "Employee Engagement",
                    description: "Foster a culture of sustainability that attracts and retains top talent."
                }
            ]}
            ctaText="Enroll in Training"
            secondaryCtaText="Browse Course Catalog"
            secondaryCtaLink="/courses"
        />
    );
};

export default TrainingCapacityPage;