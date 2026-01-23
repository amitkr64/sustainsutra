import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, FileText, Download, CheckCircle, Lock, Filter, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

import { resourceService } from '@/services/resourceService';

const DownloadableTemplatesPage = () => {
    const { user } = useAuth();
    const [templates, setTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    React.useEffect(() => {
        const fetchTemplates = async () => {
            const data = await resourceService.getTemplates();
            setTemplates(data || []);
        };
        fetchTemplates();
    }, []);

    const categories = useMemo(() => {
        const cats = ['All', ...new Set(templates.map(t => t.category))];
        return cats;
    }, [templates]);

    const filteredTemplates = useMemo(() => {
        return templates.filter(template => {
            const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [templates, searchTerm, selectedCategory]);

    const getIconComponent = (type) => {
        switch (type) {
            case 'FileSpreadsheet': return FileSpreadsheet;
            case 'CheckCircle': return CheckCircle;
            case 'FileText': return FileText;
            default: return FileText;
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Sustainability Templates | SustainSutra</title>
                <meta name="description" content="Free and premium templates for carbon accounting, ESG reporting, and sustainability strategy." />
            </Helmet>

            {/* Premium Header */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8"
                        >
                            <Download className="text-gold" size={16} />
                            <span className="text-gold text-xs font-bold uppercase tracking-widest">Resource Library</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-playfair mb-6 leading-tight"
                        >
                            Strategic <span className="text-gold italic">Asset Library</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-dimmed max-w-2xl leading-relaxed mb-12"
                        >
                            Accelerate your net-zero transition with our board-grade templates, GHG inventory spreadsheets, and disclosure frameworks.
                        </motion.p>
                    </div>

                    {/* Filter Bar */}
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
                                placeholder="Search toolkits..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent pl-12 pr-4 py-2 border-none focus:ring-0 text-offwhite placeholder:text-dimmed"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <Filter size={18} className="text-gold/50" />
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'bg-white/5 hover:bg-white/10 text-dimmed'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="pb-32">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredTemplates.map((template, idx) => (
                                <motion.div
                                    key={template.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group relative"
                                >
                                    <div className="h-full glassmorphism p-8 rounded-2xl border border-white/5 group-hover:border-gold/30 hover:bg-white/[0.03] transition-all flex flex-col">
                                        {template.premium && (
                                            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
                                                <Lock size={12} className="text-gold" />
                                                <span className="text-gold text-[10px] font-black uppercase tracking-widest">Premium</span>
                                            </div>
                                        )}

                                        <div className="mb-8">
                                            <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                {(() => {
                                                    const Icon = getIconComponent(template.iconType);
                                                    return <Icon className="text-gold" size={32} />;
                                                })()}
                                            </div>
                                            <span className="text-[10px] font-black text-gold/50 uppercase tracking-[0.2em] mb-3 block">
                                                {template.category}
                                            </span>
                                            <h3 className="text-2xl font-playfair font-bold text-offwhite mb-4 group-hover:text-gold transition-colors">
                                                {template.title}
                                            </h3>
                                            <p className="text-dimmed leading-relaxed line-clamp-3 group-hover:text-offwhite/90 transition-colors">
                                                {template.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-white/5">
                                            {template.premium && !user ? (
                                                <Link
                                                    to="/login"
                                                    className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all border border-white/5"
                                                >
                                                    <Lock size={18} className="text-gold" />
                                                    Login to Unlock
                                                </Link>
                                            ) : (
                                                <a
                                                    href={template.fileUrl || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-center gap-3 py-4 bg-gold/10 hover:bg-gold hover:text-navy text-gold rounded-xl font-bold transition-all shadow-lg hover:shadow-gold/20"
                                                >
                                                    <Download size={18} />
                                                    Download Toolkit
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-dimmed" size={32} />
                            </div>
                            <h2 className="text-2xl font-playfair text-offwhite mb-2">No toolkits found</h2>
                            <p className="text-dimmed">Try searching for different keywords or checking another category.</p>
                        </div>
                    )}
                </div>
            </section>

            {!user && (
                <section className="py-24 bg-[#0F161E]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto glassmorphism p-12 md:p-20 rounded-[40px] border border-gold/20 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent" />
                            <h2 className="text-4xl md:text-6xl font-playfair text-white mb-8">Unlock Global <span className="text-gold italic">Insights</span></h2>
                            <p className="text-xl text-dimmed mb-12 max-w-2xl mx-auto leading-relaxed">
                                Join 500+ sustainability professionals accessing our premium library of calculation tools and disclosure models.
                            </p>
                            <Link to="/login" className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-navy font-black rounded-full hover:bg-white hover:scale-105 transition-all text-lg shadow-2xl shadow-gold/30">
                                Get Full Access <Download size={20} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default DownloadableTemplatesPage;
