import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Globe, Layers, FileSpreadsheet, ShieldCheck, GraduationCap, Zap, Trash2, RefreshCw, Package, Leaf, Droplet } from 'lucide-react';

const ServicesLandingPage = () => {
    const services = [
        {
            id: 'carbon-footprinting',
            title: 'Carbon Footprinting',
            description: 'Comprehensive quantification of organizational carbon footprints across Scope 1, 2, 3 and product-level emissions.',
            icon: <BarChart3 className="w-10 h-10 text-gold" />,
            link: '/services/carbon-footprinting',
            delay: 0.1
        },
        {
            id: 'ghg-mapping',
            title: 'GHG Mapping',
            description: 'Systematic mapping and accounting of greenhouse gas emissions across organizational boundaries.',
            icon: <Globe className="w-10 h-10 text-gold" />,
            link: '/services/ghg-mapping',
            delay: 0.15
        },
        {
            id: 'esg-strategy',
            title: 'ESG Strategy',
            description: 'Holistic ESG strategy development aligned with business objectives and stakeholder expectations.',
            icon: <Layers className="w-10 h-10 text-gold" />,
            link: '/services/esg-strategy',
            delay: 0.2
        },
        {
            id: 'brsr-reporting',
            title: 'BRSR Reporting',
            description: 'SEBI Business Responsibility and Sustainability Reporting framework implementation and reporting.',
            icon: <FileSpreadsheet className="w-10 h-10 text-gold" />,
            link: '/services/brsr-reporting',
            delay: 0.25
        },
        {
            id: 'iso-verification',
            title: 'ISO Verification',
            description: 'Third-party verification and assurance of greenhouse gas emissions data and reports.',
            icon: <ShieldCheck className="w-10 h-10 text-gold" />,
            link: '/services/iso-verification',
            delay: 0.3
        },
        {
            id: 'training',
            title: 'Training & Capacity',
            description: 'Comprehensive training programs to build internal expertise in sustainability reporting.',
            icon: <GraduationCap className="w-10 h-10 text-gold" />,
            link: '/services/training-capacity',
            delay: 0.35
        },
        {
            id: 'energy-audits',
            title: 'Energy Audits',
            description: 'Comprehensive energy auditing to identify inefficiencies and optimize operational costs.',
            icon: <Zap className="w-10 h-10 text-gold" />,
            link: '/services/energy-audits',
            delay: 0.4
        },
        {
            id: 'waste-management',
            title: 'Waste Management',
            description: 'Strategic waste management consulting to minimize generation and establish circular practices.',
            icon: <Trash2 className="w-10 h-10 text-gold" />,
            link: '/services/waste-management',
            delay: 0.45
        },
        {
            id: 'circular-economy',
            title: 'Circular Economy',
            description: 'Transform from linear to circular business models that regenerate resources and create value.',
            icon: <RefreshCw className="w-10 h-10 text-gold" />,
            link: '/services/circular-economy',
            delay: 0.5
        },
        {
            id: 'epr',
            title: 'Extended Producer Responsibility',
            description: 'Navigate EPR regulations with expert compliance support for plastics, e-waste, batteries, and tires.',
            icon: <Package className="w-10 h-10 text-gold" />,
            link: '/services/epr',
            delay: 0.55
        },
        {
            id: 'cleaner-production',
            title: 'Cleaner Production',
            description: 'Implement cleaner production methodologies to reduce environmental impact at the source.',
            icon: <Leaf className="w-10 h-10 text-gold" />,
            link: '/services/cleaner-production',
            delay: 0.6
        },
        {
            id: 'resource-efficiency',
            title: 'Resource Efficiency',
            description: 'Optimize water, energy, and material consumption to reduce costs and environmental footprint.',
            icon: <Droplet className="w-10 h-10 text-gold" />,
            link: '/services/resource-efficiency',
            delay: 0.65
        }
    ];

    return (
        <div className="min-h-screen bg-navy text-offwhite pt-20">
            <Helmet>
                <title>Our Services | SustainSutra</title>
                <meta name="description" content="Explore SustainSutra's comprehensive ESG services including Carbon Footprinting, GHG Mapping, Strategy, Reporting, and Training." />
            </Helmet>

            {/* Hero */}
            <section className="relative py-24 bg-navy overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="container relative z-10 px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-playfair text-white mb-6"
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-offwhite/80 max-w-2xl mx-auto"
                    >
                        Engineering sustainable pathways with precision, compliance, and strategic foresight.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: service.delay }}
                                className="group relative bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {service.icon}
                                </div>

                                <div className="mb-6 inline-block p-3 bg-navy rounded-lg border border-gold/30 group-hover:border-gold transition-colors">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-playfair text-offwhite mb-4 group-hover:text-gold transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-offwhite/70 mb-8 line-clamp-3">
                                    {service.description}
                                </p>

                                <Link
                                    to={service.link}
                                    className="inline-flex items-center text-gold font-medium hover:text-white transition-colors group-hover:translate-x-2 duration-300"
                                >
                                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesLandingPage;