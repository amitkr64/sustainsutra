import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Calendar, Filter, Search, Award, ChevronRight } from 'lucide-react';

import { resourceService } from '@/services/resourceService';

const CaseStudiesPage = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('All');

    React.useEffect(() => {
        const fetchStudies = async () => {
            const data = await resourceService.getCaseStudies();
            setCaseStudies(data || []);
        };
        fetchStudies();
    }, []);

    const industries = useMemo(() => {
        const indList = ['All', ...new Set(caseStudies.map(s => s.clientIndustry))];
        return indList;
    }, [caseStudies]);

    const filteredStudies = useMemo(() => {
        return caseStudies.filter(study => {
            const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                study.challenge.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesIndustry = selectedIndustry === 'All' || study.clientIndustry === selectedIndustry;
            return matchesSearch && matchesIndustry;
        });
    }, [caseStudies, searchTerm, selectedIndustry]);

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Success Stories & Impact | SustainSutra</title>
                <meta name="description" content="Explore institutional-grade case studies detailing how leading global organizations achieved net-zero with SustainSutra." />
            </Helmet>

            {/* Premium Header */}
            <section className="relative pt-16 pb-20 overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8"
                    >
                        <Award className="text-gold" size={16} />
                        <span className="text-gold text-xs font-black uppercase tracking-widest">Global Impact Gallery</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-playfair mb-8 leading-tight"
                    >
                        Success <span className="text-gold italic">Blueprints</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-dimmed max-w-3xl mx-auto leading-relaxed mb-12"
                    >
                        Deep-dives into how we solve complex ESG challenges for the world's most ambitious organizations.
                    </motion.p>

                    {/* Filter & Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl"
                    >
                        <div className="relative flex-1 group w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by challenge or solution..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent pl-12 pr-4 py-2 border-none focus:ring-0 text-offwhite placeholder:text-dimmed"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                            <Filter size={18} className="text-gold/50" />
                            <div className="flex gap-2">
                                {industries.map(industry => (
                                    <button
                                        key={industry}
                                        onClick={() => setSelectedIndustry(industry)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${selectedIndustry === industry ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'bg-white/5 hover:bg-white/10 text-dimmed'}`}
                                    >
                                        {industry}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="pb-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredStudies.map((study, idx) => (
                                <motion.div
                                    key={study.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group relative flex flex-col h-full"
                                >
                                    <div className="flex-1 glassmorphism rounded-[32px] overflow-hidden border border-white/5 group-hover:border-gold/30 group-hover:bg-white/[0.03] transition-all flex flex-col shadow-2xl">
                                        {/* Image Section */}
                                        <div className="h-64 relative overflow-hidden">
                                            <img
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/10 transition-colors" />

                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 text-gold text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-2">
                                                    <Building2 size={12} />
                                                    {study.clientIndustry}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-dimmed uppercase tracking-[0.2em] mb-4">
                                                <Calendar size={14} className="text-gold" />
                                                <span>{study.date}</span>
                                            </div>

                                            <h3 className="text-2xl font-playfair font-bold text-offwhite mb-4 group-hover:text-gold transition-colors leading-tight">
                                                {study.title}
                                            </h3>

                                            <p className="text-dimmed leading-relaxed line-clamp-3 group-hover:text-offwhite/90 transition-colors mb-8">
                                                {study.challenge}
                                            </p>

                                            <div className="mt-auto pt-8 border-t border-white/5">
                                                <Link
                                                    to={`/resources/case-studies/${study.id}`}
                                                    className="w-full py-4 bg-gold/10 text-gold border border-gold/20 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/20 transition-all"
                                                >
                                                    View Case Study
                                                    <ArrowRight size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredStudies.length === 0 && (
                        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[40px]">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-dimmed" size={32} />
                            </div>
                            <h2 className="text-2xl font-playfair text-offwhite mb-2">No success stories found</h2>
                            <p className="text-dimmed">Try searching for other sectors or challenges.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Premium CTA Section */}
            <section className="py-24 bg-[#0F161E] border-t border-white/5 overflow-hidden relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-playfair text-white mb-8"
                    >
                        Engineer Your <br /><span className="text-gold italic">Net-Zero Future</span>
                    </motion.h2>
                    <p className="text-xl text-dimmed mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join the ranks of sustainable leaders. Let's build a bespoke roadmap for your company's green transition.
                    </p>
                    <Link
                        to="/book-appointment"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-gold text-navy font-black rounded-full hover:bg-white hover:scale-105 transition-all text-xl shadow-2xl shadow-gold/30"
                    >
                        Schedule Strategic Session <ChevronRight size={24} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CaseStudiesPage;
