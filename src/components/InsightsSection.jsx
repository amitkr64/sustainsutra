import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const InsightsSection = () => {
    const insights = [
        {
            id: 1,
            title: "BRSR Consultant India: Navigating SEBI's ESG Mandate",
            excerpt: "Essential guidance for companies preparing BRSR reports. Learn about materiality assessments, stakeholder engagement, and compliance strategies for SEBI's Business Responsibility and Sustainability Reporting framework.",
            date: "Jan 15, 2026",
            category: "Compliance",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            keywords: "BRSR Consultant India, SEBI ESG Mandate, Business Responsibility Reporting"
        },
        {
            id: 2,
            title: "Carbon Footprint Analysis: ISO 14064 Implementation Guide",
            excerpt: "Complete roadmap for GHG quantification across Scope 1, 2, and 3 emissions. Our ISO 14064 Verifier-approved methodology ensures accuracy in Carbon Footprint Analysis for diverse industries.",
            date: "Jan 10, 2026",
            category: "Carbon Management",
            image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
            keywords: "Carbon Footprint Analysis, ISO 14064 Verifier, GHG Quantification"
        },
        {
            id: 3,
            title: "NetZero Strategy Consultant: SBTi-Aligned Decarbonization",
            excerpt: "Discover how our NetZero Strategy Consultant services help organizations achieve Science Based Targets initiative alignment. From renewable energy transition to GRI Reporting Services integration.",
            date: "Jan 5, 2026",
            category: "Strategy",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
            keywords: "NetZero Strategy Consultant, ESG Advisory, GRI Reporting Services"
        }
    ];

    return (
        <section className="section-padding bg-gradient-to-b from-navy/95 to-navy" id="insights">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-playfair text-offwhite mb-4">
                        Insights & Expertise
                    </h2>
                    <p className="text-lg text-dimmed max-w-2xl mx-auto">
                        Latest perspectives on ESG Advisory, Carbon Footprint Analysis, and sustainable business practices
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {insights.map((insight, index) => (
                        <motion.article
                            key={insight.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="glassmorphism rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-smooth hover:scale-[1.03] cursor-pointer h-full flex flex-col">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={insight.image}
                                        alt={insight.title}
                                        className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-gold text-navy text-xs font-medium rounded-full">
                                            {insight.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-dimmed text-sm mb-3">
                                        <Calendar size={14} />
                                        <span>{insight.date}</span>
                                    </div>

                                    <h3 className="text-xl font-playfair text-offwhite mb-3 group-hover:text-gold transition-smooth">
                                        {insight.title}
                                    </h3>

                                    <p className="text-offwhite/80 text-sm leading-relaxed mb-4 flex-1">
                                        {insight.excerpt}
                                    </p>

                                    {/* Read More Link */}
                                    <button className="flex items-center gap-2 text-gold font-medium text-sm hover:gap-3 transition-smooth">
                                        Read More
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* SEO Keywords Context */}
                <div className="mt-12 text-center">
                    <p className="text-dimmed text-sm max-w-4xl mx-auto leading-relaxed">
                        Explore expert insights from leading <strong className="text-offwhite">BRSR Consultant India</strong> professionals, comprehensive <strong className="text-offwhite">Carbon Footprint Analysis</strong> methodologies, and strategic <strong className="text-offwhite">ESG Advisory</strong> guidance. Our <strong className="text-offwhite">ISO 14064 Verifier</strong> certified team provides <strong className="text-offwhite">GRI Reporting Services</strong> and <strong className="text-offwhite">NetZero Strategy Consultant</strong> solutions for sustainable business transformation.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default InsightsSection;