import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, ShieldCheck, Filter, Search, ArrowRight, Zap } from 'lucide-react';

import { resourceService } from '@/services/resourceService';

const RegulatoryUpdatesPage = () => {
    const [updates, setUpdates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSource, setSelectedSource] = useState('All');

    React.useEffect(() => {
        const fetchUpdates = async () => {
            const data = await resourceService.getRegulatoryUpdates();
            setUpdates(data || []);
        };
        fetchUpdates();
    }, []);

    const sources = useMemo(() => {
        const srcList = ['All', ...new Set(updates.map(u => u.source))];
        return srcList;
    }, [updates]);

    const filteredUpdates = useMemo(() => {
        return updates.filter(update => {
            const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                update.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSource = selectedSource === 'All' || update.source === selectedSource;
            return matchesSearch && matchesSource;
        });
    }, [updates, searchTerm, selectedSource]);

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Regulatory Hub | SustainSutra</title>
                <meta name="description" content="Real-time tracking of ESG regulations, SEBI BRSR circulars, and global climate policy updates." />
            </Helmet>

            {/* Premium Header */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full mb-8"
                    >
                        <Zap size={16} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest">Live Compliance Tracker</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-playfair mb-6 leading-tight"
                    >
                        Regulatory <span className="text-gold italic">Intelligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-dimmed max-w-2xl mx-auto mb-12"
                    >
                        Critical alerts and deep-dives into policy shifts from SEBI, MoEFCC, and European climate bodies.
                    </motion.p>

                    {/* Filter Bar */}
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
                                placeholder="Search regulations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent pl-12 pr-4 py-2 border-none focus:ring-0 text-offwhite placeholder:text-dimmed"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                            <span className="text-xs font-bold text-dimmed border-r border-white/10 pr-4 hidden md:block">SOURCE</span>
                            <div className="flex gap-2">
                                {sources.map(src => (
                                    <button
                                        key={src}
                                        onClick={() => setSelectedSource(src)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${selectedSource === src ? 'bg-gold text-navy' : 'bg-white/5 hover:bg-white/10 text-dimmed'}`}
                                    >
                                        {src}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Feed */}
            <section className="pb-32 relative">
                {/* Vertical Timeline Track */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/10 to-transparent hidden md:block" />

                <div className="container mx-auto px-4 max-w-5xl relative">
                    <div className="space-y-12">
                        <AnimatePresence mode="popLayout">
                            {filteredUpdates.map((update, idx) => (
                                <motion.div
                                    key={update.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`relative flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-1/2 top-10 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A0F14] border-4 border-gold z-20 hidden md:block" />

                                    {/* Date Column */}
                                    <div className={`md:w-1/2 flex ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        <div className="flex items-center gap-3 text-gold">
                                            <Calendar size={18} />
                                            <span className="font-mono text-sm font-black tracking-widest">{update.date}</span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="md:w-1/2 w-full">
                                        <div className="glassmorphism p-8 rounded-[30px] border border-white/5 hover:border-gold/30 hover:bg-white/[0.03] transition-all group overflow-hidden relative">
                                            {/* Source Badge */}
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gold uppercase tracking-[0.2em]">
                                                    {update.source}
                                                </span>
                                                <a
                                                    href={update.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-dimmed group-hover:bg-gold group-hover:text-navy transition-all"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                            </div>

                                            <h3 className="text-2xl font-playfair font-bold text-offwhite mb-4 group-hover:text-gold transition-colors leading-tight">
                                                {update.title}
                                            </h3>

                                            <p className="text-dimmed leading-relaxed group-hover:text-offwhite/90 transition-colors mb-6">
                                                {update.description}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs font-bold text-gold/60 uppercase tracking-widest border-t border-white/5 pt-6">
                                                <Zap size={14} className="text-gold" />
                                                Compliance Critical
                                            </div>

                                            {/* Decorative Background Glow */}
                                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredUpdates.length === 0 && (
                        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-dimmed" size={32} />
                            </div>
                            <h2 className="text-2xl font-playfair text-offwhite mb-2">No updates found</h2>
                            <p className="text-dimmed">Try searching for different keywords or checking another source.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="py-24 bg-gradient-to-b from-transparent to-gold/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="glassmorphism p-12 rounded-[40px] border border-gold/20 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-gold/10 rounded-[25px] flex items-center justify-center mb-8 rotate-12 transition-transform hover:rotate-0">
                            <ShieldCheck size={40} className="text-gold" />
                        </div>
                        <h2 className="text-4xl font-playfair text-white mb-6">Never Miss a <span className="text-gold italic">Policy Shift</span></h2>
                        <p className="text-xl text-dimmed mb-10 leading-relaxed max-w-xl">
                            Get board-level summaries of new ESG regulations delivered directly to your inbox. Stay ahead of the compliance curve.
                        </p>

                        <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter corporate email"
                                className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-gold transition-colors text-offwhite"
                            />
                            <button className="px-8 py-4 bg-gold hover:bg-white text-navy font-black rounded-2xl transition-all shadow-xl hover:shadow-gold/20 flex items-center justify-center gap-2">
                                Subscribe Alerts <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegulatoryUpdatesPage;
