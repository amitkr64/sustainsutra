import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, BarChart3, Globe, Layers, FileSpreadsheet,
    ShieldCheck, GraduationCap, Zap, Trash2, RefreshCw,
    Package, Leaf, Droplet, Target, Award, Shield
} from 'lucide-react';

const ServicesLandingPage = () => {
    const services = [
        {
            id: 'carbon-footprinting',
            title: 'Carbon Footprinting',
            description: 'Engineering high-precision GHG inventories across Scope 1, 2, and 3 to establish science-based decarbonization baselines.',
            icon: <BarChart3 className="w-8 h-8" />,
            link: '/services/carbon-footprinting',
            category: 'Advisory'
        },
        {
            id: 'ghg-mapping',
            title: 'GHG Mapping',
            description: 'Strategic source identification and boundary setting to ensure complete transparency in organizational emissions accounting.',
            icon: <Globe className="w-8 h-8" />,
            link: '/services/ghg-mapping',
            category: 'Accounting'
        },
        {
            id: 'esg-strategy',
            title: 'ESG Strategy',
            description: 'Transforming sustainability into institutional value through double materiality and board-level strategic alignment.',
            icon: <Layers className="w-8 h-8" />,
            link: '/services/esg-strategy',
            category: 'Strategic'
        },
        {
            id: 'brsr-reporting',
            title: 'BRSR Reporting',
            description: 'End-to-end SEBI compliance support for top-listed entities, ensuring robust and audit-ready sustainability disclosures.',
            icon: <FileSpreadsheet className="w-8 h-8" />,
            link: '/services/brsr-reporting',
            category: 'Compliance'
        },
        {
            id: 'iso-verification',
            title: 'ISO Verification',
            description: 'Independent third-party assurance of carbon data according to ISO 14064, enhancing stakeholder trust and credibility.',
            icon: <ShieldCheck className="w-8 h-8" />,
            link: '/services/iso-verification',
            category: 'Assurance'
        },
        {
            id: 'training',
            title: 'Academy & Training',
            description: 'Upskilling executive and operational teams on global standards like GRI, SASB, and Net-Zero methodologies.',
            icon: <GraduationCap className="w-8 h-8" />,
            link: '/services/training-capacity',
            category: 'Capacity Building'
        },
        {
            id: 'energy-audits',
            title: 'Energy Audits',
            description: 'Technical assessments to identify efficiency gaps and implement cost-saving decarbonization measures.',
            icon: <Zap className="w-8 h-8" />,
            link: '/services/energy-audits',
            category: 'Technical'
        },
        {
            id: 'circular-economy',
            title: 'Circular Economy',
            description: 'Redesigning linear value chains into restorative systems that maximize resource utility and minimize waste.',
            icon: <RefreshCw className="w-8 h-8" />,
            link: '/services/circular-economy',
            category: 'Innovation'
        },
        {
            id: 'resource-efficiency',
            title: 'Resource Efficiency',
            description: 'Optimizing water, energy, and material throughput to build operational resilience in a resource-constrained world.',
            icon: <Droplet className="w-8 h-8" />,
            link: '/services/resource-efficiency',
            category: 'Operations'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-navy text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Expert Advisory Services | SustainSutra</title>
                <meta name="description" content="Explore SustainSutra's elite range of ESG advisory, GHG accounting, and sustainability strategy services." />
            </Helmet>

            {/* Elite Hero Section */}
            <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="Global ESG"
                        className="w-full h-full object-cover opacity-20 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy/80" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-8">
                            <Target className="text-gold" size={16} />
                            <span className="text-gold font-bold tracking-widest uppercase text-xs">Net-Zero Pathways</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-playfair text-white mb-8 leading-[1.1]">
                            Elite <span className="text-gold italic">Advisory</span> <br />
                            Solutions
                        </h1>
                        <p className="text-xl md:text-2xl text-offwhite/80 max-w-2xl font-light leading-relaxed">
                            Engineering environmental resilience through high-precision carbon accounting, strategic foresight, and regulatory mastery.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Pillars Summary */}
            <section className="py-16 bg-navy/50 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex items-start gap-6">
                            <div className="text-gold flex-shrink-0"><Award size={40} /></div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Technical Rigor</h4>
                                <p className="text-sm text-dimmed leading-relaxed">Our methodologies are anchored in ISO 14064, GHG Protocol, and GRI standards for audit-ready precision.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="text-gold flex-shrink-0"><Shield size={40} /></div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Regulatory Mastery</h4>
                                <p className="text-sm text-dimmed leading-relaxed">In-depth expertise in SEBI BRSR, CBAM, and CSRD ensures your organization remains ahead of global mandates.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="text-gold flex-shrink-0"><Globe size={40} /></div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Global Vision</h4>
                                <p className="text-sm text-dimmed leading-relaxed">Tailored strategies that align local operational data with global decarbonization trends and investor expectations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Showcase Grid */}
            <section className="py-32 px-4">
                <div className="container mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={cardVariants}
                                className="group relative"
                            >
                                <Link to={service.link} className="block h-full">
                                    <div className="glassmorphism h-full p-10 rounded-3xl border-white/5 hover:border-gold/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 shadow-2xl overflow-hidden group">
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/20 transition-all" />

                                        <div className="mb-8 inline-flex items-center justify-center w-16 h-16 bg-navy border border-white/10 rounded-2xl text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                                            {service.icon}
                                        </div>

                                        <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-4 opacity-70">
                                            {service.category}
                                        </div>

                                        <h3 className="text-3xl font-playfair text-white mb-6 leading-tight group-hover:text-gold transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-dimmed leading-relaxed mb-10 text-lg line-clamp-3">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center gap-3 text-gold font-bold border-t border-white/5 pt-8 group-hover:gap-5 transition-all">
                                            View Methodology <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Consultation CTA */}
            <section className="py-24 bg-gradient-sage-forest section-padding text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-6xl font-playfair text-white mb-10 max-w-3xl mx-auto">
                        Connect with our <span className="text-gold">Principal Advisors</span>
                    </h2>
                    <Link
                        to="/book-appointment"
                        className="inline-flex items-center gap-3 bg-white text-navy px-12 py-6 rounded-full font-bold text-xl hover:bg-gold hover:scale-105 transition-all shadow-2xl"
                    >
                        Initiate Strategic Dialogue <ArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ServicesLandingPage;