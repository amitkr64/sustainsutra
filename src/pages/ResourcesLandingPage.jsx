import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, BookOpen, FileCheck, Download, ExternalLink, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

const ResourcesLandingPage = () => {
    const resourceCategories = [
        {
            title: "Insights & Articles",
            description: "Deep dives into sustainability trends, regulatory updates, and expert analysis.",
            icon: <BookOpen size={32} />,
            link: "/insights",
            tag: "Latest Trends"
        },
        {
            title: "Downloadable Templates",
            description: "Ready-to-use templates for carbon calculation, BRSR reporting, and ESG checklists.",
            icon: <Download size={32} />,
            link: "/resources/templates",
            tag: "High Value"
        },
        {
            title: "Sustainability Glossary",
            description: "A comprehensive dictionary of key sustainability terms, acronyms, and frameworks.",
            icon: <GraduationCap size={32} />,
            link: "/resources/glossary",
            tag: "Knowledge Base"
        },
        {
            title: "Case Studies",
            description: "Real-world examples of how organizations achieved their sustainability goals.",
            icon: <FileCheck size={32} />,
            link: "/resources/case-studies",
            tag: "Success Stories"
        },
        {
            title: "Industry Reports",
            description: "In-depth reports on sectoral decarbonization pathways and market trends.",
            icon: <FileText size={32} />,
            link: "/resources/reports",
            tag: "Institutional Grade"
        },
        {
            title: "Regulatory Updates",
            description: "Stay compliant with the latest notifications from SEBI, MOEFCC, and global bodies.",
            icon: <ExternalLink size={32} />,
            link: "/resources/regulatory-updates",
            tag: "Real-time"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Knowledge Hub | SustainSutra</title>
                <meta name="description" content="Access premium sustainability resources, board-grade templates, glossaries, and institutional reports." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-12 pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8"
                    >
                        < Sparkles className="text-gold" size={16} />
                        <span className="text-gold text-xs font-black uppercase tracking-widest">Premium Resource Center</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-playfair mb-8 leading-tight"
                    >
                        Knowledge <span className="text-gold italic">Intelligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-dimmed max-w-3xl mx-auto leading-relaxed"
                    >
                        Bridge the gap between sustainability theory and execution with our curated library of tools, frameworks, and expert perspectives.
                    </motion.p>
                </div>
            </section>

            {/* Interactive Grid */}
            <section className="pb-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resourceCategories.map((resource, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * idx }}
                            >
                                <Link
                                    to={resource.link}
                                    className="group block relative h-full glassmorphism p-10 rounded-[30px] border border-white/5 hover:border-gold/30 hover:bg-white/[0.03] transition-all"
                                >
                                    <div className="absolute top-8 right-10 text-white/5 group-hover:text-gold/20 transition-colors">
                                        <ArrowRight size={40} />
                                    </div>

                                    <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center mb-8 text-gold group-hover:scale-110 transition-transform">
                                        {resource.icon}
                                    </div>

                                    <span className="text-[10px] font-black text-gold/40 uppercase tracking-[0.2em] mb-4 block">
                                        {resource.tag}
                                    </span>

                                    <h3 className="text-3xl font-playfair font-bold mb-4 group-hover:text-gold transition-colors">
                                        {resource.title}
                                    </h3>

                                    <p className="text-dimmed leading-relaxed group-hover:text-offwhite/90 transition-colors">
                                        {resource.description}
                                    </p>

                                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        Explore Section <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Featured Resource - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 relative group"
                    >
                        <div className="absolute inset-0 bg-gold/10 blur-[100px] rounded-full scale-50 opacity-50 group-hover:opacity-80 transition-opacity" />
                        <div className="relative glassmorphism rounded-[40px] p-12 md:p-24 border border-gold/20 overflow-hidden flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold text-navy rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                    Editor's Choice
                                </span>
                                <h2 className="text-4xl md:text-6xl font-playfair text-white mb-8 leading-tight">
                                    The Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">BRSR Guide</span>
                                </h2>
                                <p className="text-xl text-dimmed mb-12 max-w-2xl leading-relaxed">
                                    Our definitive 50-page manual on navigating India's latest sustainability reporting standards. Includes sectoral examples and auditor checklists.
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <button className="px-10 py-5 bg-gold text-navy font-black rounded-2xl hover:bg-white transition-all text-lg shadow-2xl shadow-gold/20 flex items-center gap-3">
                                        <Download size={22} />
                                        Access Full Guide
                                    </button>
                                    <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg">
                                        View Contents
                                    </button>
                                </div>
                            </div>
                            <div className="relative group-hover:rotate-3 transition-transform duration-500">
                                <div className="w-64 h-80 bg-gradient-to-br from-gold/40 to-navy border border-gold/30 rounded-2xl shadow-2xl relative flex items-center justify-center">
                                    <FileText size={120} className="text-white/20" />
                                    <div className="absolute bottom-6 left-6 font-playfair text-white text-xl font-bold">
                                        BRSR <br /> Strategy
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-black shadow-lg">
                                    PDF
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ResourcesLandingPage;
