import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getEmissionFactors } from '@/services/cctsEmissionFactorService';
import { Search, Info, Database, Filter, ArrowUpRight, Zap, Sparkles, Binary, ShieldCheck, Settings, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EmissionFactorManager from '@/components/EmissionFactorManager';

const EmissionFactorLibrary = () => {
    const { user } = useAuth();
    const [factors, setFactors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [isAdminMode, setIsAdminMode] = useState(false);

    const isAuthorized = user?.role === 'admin' || user?.role === 'verifier';

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await getEmissionFactors();
            setFactors(res.data || []);
        } catch (error) {
            console.error('Error loading factors', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = useMemo(() => {
        return ['All', ...new Set(factors.map(f => f.category))];
    }, [factors]);

    const filteredFactors = useMemo(() => {
        return factors.filter(f => {
            const matchesCategory = categoryFilter === 'All' || f.category === categoryFilter;
            const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                f.source.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [factors, categoryFilter, search]);

    return (
        <div className="min-h-screen bg-navy text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Emission Intelligence | {isAdminMode ? 'Management' : 'Reference'} | SustainSutra</title>
                <meta name="description" content="Institutional grade emission factor database. Verified IPCC 2006 and Annexure IV reference models." />
            </Helmet>

            {/* Technical Hero */}
            <section className="relative pt-12 pb-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold/20 via-transparent to-transparent opacity-20" />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8"
                    >
                        <ShieldCheck className="text-gold" size={16} />
                        <span className="text-gold text-[10px] font-black uppercase tracking-[0.2em]">Institutional Tier Data</span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-7xl font-playfair leading-tight text-white m-0"
                        >
                            Emission <span className="text-gold italic">Intelligence</span>
                        </motion.h1>

                        {isAuthorized && (
                            <Button
                                onClick={() => setIsAdminMode(!isAdminMode)}
                                className={`mt-4 md:mt-0 px-6 py-6 rounded-2xl border-2 transition-all gap-2 ${isAdminMode
                                        ? 'bg-gold text-navy border-gold'
                                        : 'bg-navy/50 text-gold border-gold/30 hover:border-gold'
                                    }`}
                            >
                                {isAdminMode ? <Eye size={18} /> : <Settings size={18} />}
                                <span className="font-bold uppercase tracking-widest text-xs">
                                    {isAdminMode ? 'View Library' : 'Manage Factors'}
                                </span>
                            </Button>
                        )}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-dimmed max-w-3xl mx-auto leading-relaxed"
                    >
                        {isAdminMode
                            ? "Advanced registry management tools for maintaining the institutional emission factor database."
                            : "Standardized benchmarks for CCTS compliance based on IPCC 2006 Guidelines and Annexure IV methodologies."
                        }
                    </motion.p>
                </div>
            </section>

            {isAdminMode ? (
                <div className="container mx-auto px-4 lg:px-8 pb-24">
                    <div className="glassmorphism rounded-[40px] p-8 lg:p-12 border border-white/10 shadow-4xl shadow-gold/5">
                        <EmissionFactorManager onDataChange={loadData} />
                    </div>
                </div>
            ) : (
                <>
                    {/* Control Center */}
                    <section className="sticky top-20 z-40 bg-navy/80 backdrop-blur-2xl border-y border-white/5 py-8">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                                <div className="relative group w-full lg:max-w-xl">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search inventory indexes (Coal, ISO, GHG)..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-[20px] pl-14 pr-6 py-5 text-sm text-offwhite focus:border-gold/50 transition-all outline-none placeholder:text-offwhite/20"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mr-2">
                                        <Filter size={14} /> Filter Intelligence
                                    </div>
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                                        {categories.slice(0, 5).map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setCategoryFilter(cat)}
                                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-gold text-navy shadow-2xl' : 'bg-white/5 text-dimmed hover:bg-white/10'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Ledger */}
                    <section className="py-24">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="glassmorphism rounded-[40px] overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                {loading ? (
                                    <div className="p-32 text-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="w-16 h-16 border-t-2 border-gold rounded-full mx-auto mb-8"
                                        />
                                        <h3 className="text-xl font-playfair animate-pulse">Synchronizing Emission Models...</h3>
                                    </div>
                                ) : filteredFactors.length === 0 ? (
                                    <div className="p-32 text-center">
                                        <Database className="w-20 h-20 text-white/5 mx-auto mb-8" />
                                        <h3 className="text-3xl font-playfair mb-4">Index mismatch</h3>
                                        <p className="text-dimmed">No factors found matching the current search parameters.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-white/[0.02] border-b border-white/10">
                                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">Inventory Index</th>
                                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">Core Domain</th>
                                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">Intensity Factor</th>
                                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">Inventory Unit</th>
                                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">GHG Protocol Scope</th>
                                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">Authority Source</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                <AnimatePresence mode="popLayout">
                                                    {filteredFactors.map((factor, idx) => (
                                                        <motion.tr
                                                            key={factor._id || idx}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: idx * 0.02 }}
                                                            className="hover:bg-gold/5 transition-all group cursor-default"
                                                        >
                                                            <td className="px-10 py-8">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors" />
                                                                    <span className="text-lg font-playfair font-bold text-white group-hover:text-gold transition-colors">
                                                                        {factor.name}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-10 py-8">
                                                                <span className="text-[10px] font-bold text-dimmed uppercase tracking-widest">{factor.category}</span>
                                                            </td>
                                                            <td className="px-10 py-8">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-2xl font-black text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                                                                        {factor.factor.toFixed(6)}
                                                                    </span>
                                                                    <div className="h-1 lg:w-16 bg-white/5 rounded-full overflow-hidden hidden lg:block">
                                                                        <div
                                                                            className="h-full bg-gold"
                                                                            style={{ width: `${Math.min(100, factor.factor * 20)}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-10 py-8 text-dimmed font-medium">{factor.unit}</td>
                                                            <td className="px-10 py-8">
                                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${(factor.scope === 'Scope 1' || factor.scope === 1) ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                                                        (factor.scope === 'Scope 2' || factor.scope === 2) ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                                                            'bg-green-500/10 text-green-500 border border-green-500/20'
                                                                    }`}>
                                                                    <Zap size={10} /> {typeof factor.scope === 'number' ? `Scope ${factor.scope}` : factor.scope}
                                                                </div>
                                                            </td>
                                                            <td className="px-10 py-8">
                                                                <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors italic text-xs">
                                                                    <Info size={14} /> {factor.source}
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </AnimatePresence>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="p-8 bg-white/5 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                                        Synchronized Metadata: {filteredFactors.length} Reference Nodes
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Binary size={14} className="text-gold/30" />
                                        <span className="text-[10px] font-black text-gold/60 uppercase tracking-widest">Database Version 2026.4.1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Technical Disclaimer */}
                    <section className="py-24 bg-gradient-to-b from-transparent to-white/5">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="p-12 glassmorphism rounded-[32px] border border-white/10 flex flex-col md:flex-row items-center gap-10">
                                <div className="w-20 h-20 rounded-[20px] bg-gold/10 flex items-center justify-center text-gold shrink-0">
                                    <Sparkles size={32} />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-playfair text-white mb-4 m-0">Precision Engineering Requirements</h3>
                                    <p className="text-dimmed leading-relaxed">
                                        Our emission models are audited monthly for regulatory variance. For highly specific industrial processes or non-standard fuel matrices, please contact our technical advisory board for custom emission factor development.
                                    </p>
                                    <Link to="/book-appointment" className="inline-flex items-center gap-2 text-gold font-bold text-sm mt-6 hover:gap-4 transition-all uppercase tracking-widest">
                                        Request Custom Factor Analysis <ArrowUpRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default EmissionFactorLibrary;
