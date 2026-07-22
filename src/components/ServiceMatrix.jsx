import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileCheck, TrendingUp, Factory, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
        id: 'a',
        title: 'GHG & Footprinting',
        description: 'Precise quantification of Carbon Footprints across Value Chains (Scope 1, 2, 3) aligned with ISO 14064.',
        icon: BarChart3,
        href: '/services/carbon-footprinting',
    },
    {
        id: 'b',
        title: 'Compliance — BRSR/GRI',
        description: 'SEBI BRSR Reporting & GRI Framework Integration. Ensuring regulatory compliance and stakeholder transparency.',
        icon: FileCheck,
        href: '/services/brsr-reporting',
    },
    {
        id: 'c',
        title: 'Strategy — ESG',
        description: 'Comprehensive ESG Strategy Consulting. From Materiality Assessments to Green Financing readiness.',
        icon: TrendingUp,
        href: '/services/esg-strategy',
    },
    {
        id: 'd',
        title: 'Sector Specific',
        description: 'Textile Decarbonization. Thermal efficiency, PAT Schemes, and circular economy audits.',
        icon: Factory,
        href: '/services/cleaner-production',
    },
];

const ServiceMatrix = () => {
    return (
        <section className="section-padding bg-background" id="services">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-14 max-w-2xl text-center"
                >
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Services</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        A complete ESG toolkit
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Comprehensive solutions across the sustainability spectrum.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                to={service.href}
                                className="group block h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                            >
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <service.icon size={22} />
                                </div>
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {service.title}
                                    </h3>
                                    <ArrowUpRight size={18} className="mt-1 flex-shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {service.description}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceMatrix;
