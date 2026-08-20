import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { useTranslation } from 'react-i18next';

const WaterWastewaterPage = () => {
    const { t } = useTranslation();
    return (
        <ServicePageTemplate
            title={t('services.waterWastewaterTitle', 'Water, Wastewater & Water Stewardship')}
            heroImage="https://images.unsplash.com/photo-1582967788606-a171f1080cae"
            overview="Comprehensive water advisory spanning water audits, wastewater management, and catchment-level water stewardship — helping industry reduce freshwater withdrawal, comply with discharge norms, and build water-positive operations."
            keyFeatures={[
                "Water Audit & Balance (Water Gains/Losses Mapping)",
                "Wastewater Characterization & Treatment Advisory",
                "Effluent Treatment Plant (ETP/STP) Optimization",
                "Water Stewardship & AWS Standard Alignment",
                "Zero Liquid Discharge (ZLD) Feasibility Assessment",
                "Water Footprinting (ISO 14046) & Disclosure Support"
            ]}
            standards={[
                "ISO 46001 Water Efficiency Management Systems",
                "ISO 14046 Water Footprint Principles",
                "Alliance for Water Stewardship (AWS) Standard",
                "Central Pollution Control Board (CPCB) Discharge Norms",
                "Environment (Protection) Rules — Effluent Standards",
                "BRSR Core — Water Disclosures"
            ]}
            deliverables={[
                "Detailed Water Audit Report with Balance Diagram",
                "Wastewater Management & Treatment Roadmap",
                "Water Reduction & Reuse Implementation Plan",
                "Regulatory Compliance Assessment (Consent Conditions)",
                "Water Stewardship Strategy & Disclosure Pack"
            ]}
            methodology={[
                {
                    title: "Water Balance Study",
                    description: "Quantifying every inflow, consumption, and discharge stream to build a complete water balance for the facility"
                },
                {
                    title: "Effluent Characterization",
                    description: "Sampling and analysis of wastewater streams against prescribed discharge standards to identify treatment gaps"
                },
                {
                    title: "Treatment Optimization",
                    description: "Retrofit and operational advisory for ETP/STP performance improvement, including reuse and recycling pathways"
                },
                {
                    title: "Stewardship Planning",
                    description: "Catchment-level risk assessment and water-positive strategies aligned with AWS and CDP Water Security"
                }
            ]}
            processSteps={[
                {
                    title: "Baseline Water Audit",
                    description: "Metering, measurement, and water balance development"
                },
                {
                    title: "Compliance Check",
                    description: "Review of consents, discharge norms, and ground/rainwater rules"
                },
                {
                    title: "Solution Design",
                    description: "Reuse, recycling, and treatment optimization roadmap"
                },
                {
                    title: "Implementation Support",
                    description: "Vendor coordination, monitoring protocols, and team training"
                }
            ]}
            benefits={[
                "Reduce Freshwater Withdrawal and Water Costs",
                "Ensure Full Compliance with Discharge Standards",
                "Unlock Water Reuse and Recycling Value",
                "Strengthen BRSR/CDP Water Disclosures",
                "Mitigate Water-Related Business and Community Risk",
                "Progress Toward Water-Positive Operations"
            ]}
            ctaText="Request Water Audit"
        />
    );
};

export default WaterWastewaterPage;
