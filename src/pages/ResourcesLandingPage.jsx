import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, BookOpen, FileCheck, Download, ExternalLink, GraduationCap } from 'lucide-react';

const ResourcesLandingPage = () => {
    const resourceCategories = [
        {
            title: "Insights & Articles",
            description: "Deep dives into sustainability trends, regulatory updates, and expert analysis.",
            icon: <BookOpen size={32} className="text-gold" />,
            link: "/insights",
            color: "bg-blue-500/10"
        },
        {
            title: "Downloadable Templates",
            description: "Ready-to-use templates for carbon calculation, BRSR reporting, and ESG checklists.",
            icon: <Download size={32} className="text-gold" />,
            link: "/resources/templates",
            color: "bg-green-500/10"
        },
        {
            title: "Sustainability Glossary",
            description: "A comprehensive dictionary of key sustainability terms, acronyms, and frameworks.",
            icon: <GraduationCap size={32} className="text-gold" />,
            link: "/resources/glossary",
            color: "bg-purple-500/10"
        },
        {
            title: "Case Studies",
            description: "Real-world examples of how organizations achieved their sustainability goals.",
            icon: <FileCheck size={32} className="text-gold" />,
            link: "/resources/case-studies",
            color: "bg-orange-500/10"
        },
        {
            title: "Industry Reports",
            description: "In-depth reports on sectoral decarbonization pathways and market trends.",
            icon: <FileText size={32} className="text-gold" />,
            link: "/resources/reports",
            color: "bg-teal-500/10"
        },
        {
            title: "Regulatory Updates",
            description: "Stay compliant with the latest notifications from SEBI, MOEFCC, and global bodies.",
            icon: <ExternalLink size={32} className="text-gold" />,
            link: "/resources/regulatory-updates",
            color: "bg-red-500/10"
        }
    ];

    return (
        <>
            <Helmet>
                <title>Resources | SustainSutra</title>
                <meta name="description" content="Access free sustainability resources, templates, glossaries, and reports to support your ESG journey." />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite font-ibm pt-32 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-playfair mb-6"
                        >
                            Knowledge Hub
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-dimmed leading-relaxed"
                        >
                            Equip yourself with the tools, knowledge, and insights needed to navigate the complex landscape of corporate sustainability.
                        </motion.p>
                    </div>

                    {/* Resource Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resourceCategories.map((resource, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <Link
                                    to={resource.link}
                                    className="block h-full glassmorphism p-8 rounded-xl hover:bg-white/5 transition-all group border border-white/5 hover:border-gold/30"
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${resource.color}`}>
                                        {resource.icon}
                                    </div>
                                    <h3 className="text-2xl font-playfair mb-3 group-hover:text-gold transition-colors">
                                        {resource.title}
                                    </h3>
                                    <p className="text-dimmed leading-relaxed">
                                        {resource.description}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Featured Download */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 glassmorphism-strong rounded-2xl p-8 md:p-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent pointer-events-none" />
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <span className="text-gold font-bold tracking-wider text-sm uppercase mb-2 block">Featured Resource</span>
                                <h2 className="text-3xl md:text-4xl font-playfair mb-4">The Ultimate Guide to BRSR</h2>
                                <p className="text-dimmed mb-8 text-lg">
                                    A 50-page comprehensive guide decoding every principle of the SEBI BRSR framework with reporting examples and kpi definitions.
                                </p>
                                <button className="px-8 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold/90 transition-smooth flex items-center gap-2">
                                    <Download size={20} />
                                    Download Free Guide
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <FileText size={180} className="text-white/10" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ResourcesLandingPage;
