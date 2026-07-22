import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const CircularEconomyPage = () => {
    return (
        <ServicePageTemplate
            title="Circular Economy Transition"
            heroImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
            overview="Transform your business model from linear 'take-make-dispose' to circular economy principles that regenerate resources, extend product lifecycles, and create new value streams."
            keyFeatures={[
                "Circular Business Model Design",
                "Product Life Extension Strategies",
                "Industrial Symbiosis Opportunities",
                "Reverse Logistics & Take-Back Programs"
            ]}
            standards={[
                "BS 8001 Circular Economy Framework",
                "Ellen MacArthur Foundation Principles",
                "ISO 59000 Series (Draft)",
                "EU Circular Economy Action Plan Alignment"
            ]}
            deliverables={[
                "Circular Economy Opportunity Assessment",
                "Business Model Transformation Roadmap",
                "Material Flow Analysis",
                "Stakeholder Engagement Strategy"
            ]}
            methodology={[
                {
                    title: "Circularity Baseline",
                    description: "Measuring current performance using tools like Material Circularity Indicator (MCI) and Circulytics"
                },
                {
                    title: "Design for Circularity",
                    description: "Advising on product design for durability, accurate disassembly, repairability, and recyclability"
                },
                {
                    title: "Business Model Innovation",
                    description: "Transitioning to Product-as-a-Service (PaaS), Sharing Platforms, or Resource Recovery models"
                },
                {
                    title: "Closed-Loop Supply Chain",
                    description: "Designing reverse logistics networks for effectively closing the loop on products and materials"
                },
                {
                    title: "Industrial Symbiosis",
                    description: "Identifying opportunities where waste from one process becomes feedstock for another"
                }
            ]}
            processSteps={[
                {
                    title: "Assessment",
                    description: "Material flow analysis and hotspot identification"
                },
                {
                    title: "Ideation",
                    description: "Co-creation of circular strategies and pilots"
                },
                {
                    title: "Pilot Launch",
                    description: "Testing new models on a small scale"
                },
                {
                    title: "Scale & Optimize",
                    description: "Full implementation and ecosystem integration"
                }
            ]}
            benefits={[
                "Decouple Growth from Resource Constraints",
                "Unlock New Revenue Streams (Services/Secondary)",
                "Enhance Supply Chain Resilience",
                "Reduce Volatility in Material Costs",
                "Strengthen Customer Loyalty",
                "Future-Proof Against Regulations"
            ]}
            ctaText="Explore Circular Opportunities"
        />
    );
};

export default CircularEconomyPage;
