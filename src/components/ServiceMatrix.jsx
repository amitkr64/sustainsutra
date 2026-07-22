import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileCheck, TrendingUp, Factory } from 'lucide-react';

const ServiceMatrix = () => {
    const services = [
        {
            id: 'a',
            title: "GHG & Footprinting",
            description: "Precise quantification of Carbon Footprints across Value Chains (Scope 1, 2, 3) aligned with ISO 14064.",
            icon: BarChart3,
            span: "md:col-span-7",
            gradient: "from-sage/80 to-forest/80"
        },
        {
            id: 'b',
            title: "Compliance - BRSR/GRI",
            description: "SEBI BRSR Reporting & GRI Framework Integration. Ensuring regulatory compliance and stakeholder transparency.",
            icon: FileCheck,
            span: "md:col-span-5",
            gradient: "from-forest/80 to-sage/80"
        },
        {
            id: 'c',
            title: "Strategy - ESG",
            description: "Comprehensive ESG Strategy Consulting. From Materiality Assessments to Green Financing readiness.",
            icon: TrendingUp,
            span: "md:col-span-5",
            gradient: "from-sage/70 to-forest/70"
        },
        {
            id: 'd',
            title: "Sector Specific",
            description: "Textile Decarbonization. Thermal efficiency, PAT Schemes, and circular economy audits.",
            icon: Factory,
            span: "md:col-span-7",
            gradient: "from-forest/70 to-sage/70"
        }
    ];

    return (
        <section className="section-padding bg-gradient-to-b from-navy to-navy/95" id="services">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-playfair text-offwhite mb-4">
                        Technical Service Matrix
                    </h2>
                    <p className="text-lg text-dimmed max-w-2xl mx-auto">
                        Comprehensive solutions across the ESG spectrum
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${service.span} group`}
                        >
                            <div className={`h-full rounded-xl shadow-lg hover:shadow-2xl transition-smooth p-8 bg-gradient-to-br ${service.gradient} hover:scale-[1.02] cursor-pointer border border-white/10`}>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-gold/20 rounded-lg group-hover:bg-gold/30 transition-smooth">
                                        <service.icon className="text-gold" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-playfair text-offwhite flex-1">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-offwhite/90 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceMatrix;