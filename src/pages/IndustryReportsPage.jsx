import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight, TrendingUp, Filter } from 'lucide-react';

import { resourceService } from '@/services/resourceService';

const IndustryReportsPage = () => {
    const [reports, setReports] = React.useState([]);

    React.useEffect(() => {
        const data = resourceService.getReports();
        setReports(data);
    }, []);

    return (
        <>
            <Helmet>
                <title>Industry Reports | SustainSutra</title>
                <meta name="description" content="Download in-depth reports and analysis on sustainability trends across various industries." />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite pt-32 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl font-playfair mb-4"
                            >
                                Industry Reports
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-dimmed max-w-2xl"
                            >
                                Deep dives into sectoral decarbonization pathways, market trends, and policy impact analysis.
                            </motion.p>
                        </div>

                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-white/5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
                                <Filter size={16} className="text-gold" /> Filter by Sector
                            </button>
                            <button className="px-4 py-2 bg-white/5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
                                <TrendingUp size={16} className="text-gold" /> Most Popular
                            </button>
                        </div>
                    </div>

                    {/* Reports Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {reports.map((report, idx) => (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glassmorphism rounded-xl overflow-hidden group hover:border-gold/30 transition-all"
                            >
                                <div className="grid md:grid-cols-2 h-full">
                                    <div className="h-48 md:h-full relative overflow-hidden">
                                        <img
                                            src={report.image}
                                            alt={report.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-navy/80 backdrop-blur text-gold text-xs font-bold rounded-lg uppercase tracking-wider">
                                                {report.sector}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs text-dimmed mb-3">
                                                <FileText size={14} />
                                                <span>{report.date}</span>
                                                <span>•</span>
                                                <span>{report.size}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold font-playfair mb-3 leading-tight group-hover:text-gold transition-colors">
                                                {report.title}
                                            </h3>
                                            <p className="text-dimmed text-sm mb-6 line-clamp-3">
                                                {report.description}
                                            </p>
                                        </div>
                                        <div>
                                            <a
                                                href={report.fileUrl || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-2 border border-white/20 rounded-lg text-sm font-medium hover:bg-gold hover:border-gold hover:text-navy transition-all flex items-center justify-center gap-2 group-hover:bg-white/5 group-hover:text-offwhite group-hover:border-white/20"
                                            >
                                                <Download size={16} />
                                                Download Report
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <p className="text-dimmed mb-4">Looking for customized research?</p>
                        <a href="/book-appointment" className="inline-flex items-center gap-2 text-gold hover:underline font-medium">
                            Request a Custom Analysis <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default IndustryReportsPage;
