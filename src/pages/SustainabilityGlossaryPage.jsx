import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, ArrowUpRight, BookOpen } from 'lucide-react';
import { GLOSSARY_TERMS } from '@/constants/glossaryTerms';
import useHeaderVisible from '@/hooks/useHeaderVisible';

const SustainabilityGlossaryPage = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('ALL');
    const isHeaderVisible = useHeaderVisible();

    const glossaryTerms = GLOSSARY_TERMS;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const filteredTerms = useMemo(() => {
        return glossaryTerms
            .filter(item => {
                const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.definition.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesLetter = selectedLetter === 'ALL' || item.term.startsWith(selectedLetter);
                return matchesSearch && matchesLetter;
            })
            .sort((a, b) => a.term.localeCompare(b.term));
    }, [searchTerm, selectedLetter]);

    return (
        <div className="min-h-screen bg-navy text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Sustainability Glossary | SustainSutra</title>
                <meta name="description" content="Detailed definitions of key sustainability terms, carbon accounting acronyms, and global ESG frameworks." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8"
                    >
                        <BookOpen className="text-gold" size={16} />
                        <span className="text-gold text-xs font-bold uppercase tracking-widest">Knowledge Base</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-playfair mb-6"
                    >
                        {t('resources.glossaryTitleLead', 'Sustainability')} <span className="text-gold italic">{t('resources.glossaryTitleHighlight', 'Glossary')}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-dimmed max-w-2xl mx-auto mb-6"
                    >
                        Master the language of the green transition — from carbon markets and GHG accounting to India's environmental regulations, water stewardship, and circular economy.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="text-gold font-bold text-sm uppercase tracking-widest mb-12"
                    >
                        {glossaryTerms.length} expert-defined terms
                    </motion.p>

                    {/* Interactive Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative max-w-2xl mx-auto"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gold/20 blur-xl group-focus-within:bg-gold/30 transition-all opacity-50" />
                            <input
                                type="text"
                                placeholder="Search by term or definition..."
                                aria-label="Search glossary terms"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="relative w-full py-5 pl-14 pr-6 bg-navy/80 border border-white/10 rounded-2xl text-offwhite placeholder:text-dimmed focus:outline-none focus:border-gold/50 backdrop-blur-xl transition-all text-lg"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold group-focus-within:scale-110 transition-transform" size={24} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Alphabet Filter */}
            <section className={`sticky z-40 py-4 bg-navy/80 backdrop-blur-md border-y border-white/5 transition-[top] duration-300 ${isHeaderVisible ? 'top-[80px]' : 'top-0'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedLetter('ALL')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedLetter === 'ALL' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'hover:bg-white/5 text-dimmed'}`}
                        >
                            ALL
                        </button>
                        {alphabet.map(letter => (
                            <button
                                key={letter}
                                onClick={() => setSelectedLetter(letter)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${selectedLetter === letter ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'hover:bg-white/5 text-dimmed'}`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredTerms.map((item, idx) => (
                                <motion.div
                                    key={item.term}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.02 }}
                                    className="group relative"
                                >
                                    <div className="h-full glassmorphism p-8 rounded-2xl border border-white/5 group-hover:border-gold/30 group-hover:bg-white/[0.03] transition-all overflow-hidden">
                                        {/* Decorative Icon */}
                                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/5 blur-2xl group-hover:bg-gold/10 transition-all rounded-full" />

                                        <div className="relative z-10 flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-playfair font-bold text-offwhite group-hover:text-gold transition-colors">{item.term}</h3>
                                            <ArrowUpRight className="text-white/10 group-hover:text-gold transition-colors" size={24} />
                                        </div>

                                        <p className="relative z-10 text-dimmed leading-relaxed group-hover:text-offwhite/90 transition-colors">
                                            {item.definition}
                                        </p>

                                        <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-gold/60 text-xs font-bold uppercase tracking-widest">
                                            <Info size={14} />
                                            Key ESG Terminology
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredTerms.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32"
                        >
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-dimmed" size={32} />
                            </div>
                            <h2 className="text-2xl font-playfair text-offwhite mb-2">No matching terms found</h2>
                            <p className="text-dimmed mb-8">Try adjusting your search or filters.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedLetter('ALL'); }}
                                className="text-gold font-bold underline underline-offset-4 hover:text-white transition-colors"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Quick Navigation Footer */}
            <section className="py-20 bg-gradient-to-t from-gold/5 to-transparent">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-dimmed mb-8">Looking for more detailed guidance?</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="/insights" className="flex items-center gap-2 text-offwhite font-bold hover:text-gold transition-colors">
                            Technical Articles <ArrowUpRight size={18} />
                        </a>
                        <a href="/regulatory-updates" className="flex items-center gap-2 text-offwhite font-bold hover:text-gold transition-colors">
                            Policy Trackers <ArrowUpRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SustainabilityGlossaryPage;
