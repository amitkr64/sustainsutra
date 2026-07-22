import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ArrowRight, TrendingUp, Filter, Search, Globe, ChevronRight } from 'lucide-react';

import { resourceService } from '@/services/resourceService';

const IndustryReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState('All');

    React.useEffect(() => {
        const fetchReports = async () => {
            const data = await resourceService.getIndustryReports();
            setReports(data || []);
        };
        fetchReports();
    }, []);

    const sectors = useMemo(() => {
        const sectorList = ['All', ...new Set(reports.map(r => r.sector))];
        return sectorList;
    }, [reports]);

    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || report.sector === selectedSector;
            return matchesSearch && matchesSector;
        });
    }, [reports, searchTerm, selectedSector]);

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Institutional Reports | SustainSutra</title>
                <meta name="description" content="Download institutional-grade reports and deep-dive analysis on sustainability trends across global sectors." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
                        >
                            <Globe className="text-blue-400" size={16} />
                            <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Market Intelligence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-playfair mb-6 leading-tight"
                        >
                            Industry <span className="text-gold italic">Insights</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-dimmed max-w-2xl leading-relaxed mb-12"
                        >
                            Institutional grade analysis on sectoral decarbonization pathways, risk assessments, and investment trends.
                        </motion.p>
                    </div>

                    {/* Filter & Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl"
                    >
                        <div className="relative flex-1 group w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by report name or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent pl-12 pr-4 py-2 border-none focus:ring-0 text-offwhite placeholder:text-dimmed"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                            <Filter size={18} className="text-gold/50" />
                            <div className="flex gap-2">
                                {sectors.map(sector => (
                                    <button
                                        key={sector}
                                        onClick={() => setSelectedSector(sector)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${selectedSector === sector ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'bg-white/5 hover:bg-white/10 text-dimmed'}`}
                                    >
                                        {sector}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Reports Grid */}
            <section className="pb-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredReports.map((report, idx) => (
                                <motion.div
                                    key={report.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    className="group relative"
                                >
                                    <div className="h-full glassmorphism rounded-[32px] overflow-hidden border border-white/5 group-hover:border-gold/30 group-hover:bg-white/[0.03] transition-all flex flex-col md:flex-row shadow-2xl">
                                        {/* Image Section */}
                                        <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                                            <img
                                                src={report.image}
                                                alt={report.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy/90 via-navy/20 to-transparent" />

                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-1.5 bg-gold text-navy text-[10px] font-black rounded-full uppercase tracking-widest">
                                                    {report.sector}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="md:w-3/5 p-8 flex flex-col">
                                            <div className="mb-6">
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-gold/60 uppercase tracking-widest mb-4">
                                                    <FileText size={14} className="text-gold" />
                                                    <span>{report.date}</span>
                                                    <span className="w-1 h-1 bg-gold/40 rounded-full" />
                                                    <span>{report.size}</span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-playfair font-bold text-offwhite mb-4 group-hover:text-gold transition-colors leading-tight">
                                                    {report.title}
                                                </h3>
                                                <p className="text-dimmed leading-relaxed line-clamp-3 group-hover:text-offwhite/90 transition-colors">
                                                    {report.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto space-y-4">
                                                <a
                                                    href={report.fileUrl || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-gold font-bold text-sm group/btn"
                                                >
                                                    Access Intelligence Report
                                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </a>

                                                <a
                                                    href={report.fileUrl || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-offwhite font-bold text-sm hover:bg-gold hover:text-navy hover:border-gold transition-all flex items-center justify-center gap-3 group-hover:shadow-lg group-hover:shadow-gold/10"
                                                >
                                                    <Download size={18} />
                                                    Download PDF
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredReports.length === 0 && (
                        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[40px]">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-dimmed" size={32} />
                            </div>
                            <h2 className="text-2xl font-playfair text-offwhite mb-2">No reports found</h2>
                            <p className="text-dimmed">Try searching for different segments or clearing filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-24 bg-gradient-to-t from-gold/5 to-transparent border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <TrendingUp size={48} className="text-gold mx-auto mb-8" />
                        <h2 className="text-4xl font-playfair text-white mb-6">Request Customized Research</h2>
                        <p className="text-xl text-dimmed mb-10 max-w-xl mx-auto leading-relaxed">
                            Need a deep-dive into a specific niche or competitor analysis? Our data team can prepare bespoke sustainability intelligence for your board.
                        </p>
                        <a href="/book-appointment" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gold text-navy font-black rounded-full hover:bg-white hover:scale-105 transition-all text-lg shadow-2xl shadow-gold/30">
                            Speak with an Analyst <ChevronRight size={22} />
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default IndustryReportsPage;
