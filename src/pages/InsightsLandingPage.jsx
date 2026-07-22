import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Grid, List, Zap, Sparkles, Filter } from 'lucide-react';

import { blogService } from '@/services/blogService';
import { BlogCardSkeleton } from '@/components/LoadingSkeletons';

const InsightsLandingPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true);
            const data = await blogService.getPublished();
            setBlogs(data || []);
            setIsLoading(false);
        };
        fetchBlogs();
    }, []);

    const categories = useMemo(() => {
        return ['All', ...new Set(blogs.map(b => b.category))];
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
            const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [blogs, selectedCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>Insights & Intelligence | SustainSutra</title>
                <meta name="description" content="Board-level insights and engineering perspectives on the future of corporate sustainability and Net-Zero strategy." />
            </Helmet>

            {/* Premium Hero */}
            <section className="relative pt-12 pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8 shadow-2xl"
                    >
                        <Zap className="text-gold animate-pulse" size={16} />
                        <span className="text-gold text-[10px] font-black uppercase tracking-[0.2em]">Live Intelligence Stream</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-playfair mb-8 leading-tight"
                    >
                        Strategic <span className="text-gold italic">Perspectives</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-dimmed max-w-3xl mx-auto leading-relaxed"
                    >
                        Bridging institutional finance, engineering excellence, and climate policy into board-level strategy.
                    </motion.p>
                </div>
            </section>

            {/* Controls Bar */}
            <section className="sticky top-20 z-40 bg-[#0A0F14]/80 backdrop-blur-2xl border-y border-white/5 py-6">
                <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
                    {/* Category Scroll */}
                    <div className="flex items-center gap-6 w-full lg:w-auto overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 text-gold/40 font-bold text-[10px] uppercase tracking-widest border-r border-white/5 pr-6 whitespace-nowrap">
                            <Filter size={14} /> Category
                        </div>
                        <div className="flex gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-gold text-navy shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 hover:bg-white/10 text-dimmed'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search & View Toggle */}
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative group flex-1 lg:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search insights..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-offwhite focus:border-gold/50 transition-all outline-none"
                            />
                        </div>

                        <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-gold text-navy shadow-lg' : 'text-dimmed hover:text-offwhite'}`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-gold text-navy shadow-lg' : 'text-dimmed hover:text-offwhite'}`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Feed */}
            <section className="py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-10' : 'space-y-8 max-w-5xl mx-auto'}>
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <BlogCardSkeleton key={n} />
                                ))}
                            </div>
                        ) : filteredBlogs.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-32 border border-dashed border-white/10 rounded-[40px]"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="text-dimmed" size={32} />
                                </div>
                                <h2 className="text-3xl font-playfair mb-2">No matching intelligence found</h2>
                                <p className="text-dimmed">Try adjusting your filters or search keywords.</p>
                            </motion.div>
                        ) : (
                            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-10' : 'space-y-10 max-w-5xl mx-auto'}>
                                {filteredBlogs.map((blog, idx) => (
                                    <motion.article
                                        key={blog.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                                        className={`group relative glassmorphism rounded-[32px] overflow-hidden border border-white/5 hover:border-gold/30 hover:bg-white/[0.03] transition-all flex shadow-2xl ${viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}
                                    >
                                        <Link to={`/blog/${blog.slug}`} className={`overflow-hidden relative ${viewMode === 'list' ? 'w-full md:w-[400px] h-64 md:h-auto' : 'h-64 w-full'}`}>
                                            <img
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-1.5 bg-gold text-navy text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex items-center gap-6 text-[10px] font-bold text-dimmed uppercase tracking-[0.2em] mb-4">
                                                <span className="flex items-center gap-2"><Calendar size={14} className="text-gold" /> {blog.publishDate}</span>
                                                <span className="flex items-center gap-2"><User size={14} className="text-gold" /> {blog.author}</span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-offwhite mb-6 group-hover:text-gold transition-colors leading-tight line-clamp-2">
                                                <Link to={`/blog/${blog.slug}`}>
                                                    {blog.title}
                                                </Link>
                                            </h3>

                                            <p className="text-dimmed leading-relaxed mb-8 line-clamp-3 group-hover:text-offwhite/90 transition-colors">
                                                {blog.excerpt}
                                            </p>

                                            <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                                <Link
                                                    to={`/blog/${blog.slug}`}
                                                    className="inline-flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-[0.3em] hover:gap-4 transition-all"
                                                >
                                                    Full Analysis <ArrowRight size={16} />
                                                </Link>
                                                <div className="text-white/5 group-hover:text-gold/20 transition-colors">
                                                    <Sparkles size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Newsletter Overlay */}
            <section className="py-24 bg-gradient-to-b from-transparent to-gold/5 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="relative glassmorphism p-12 md:p-20 rounded-[40px] border border-gold/20 flex flex-col items-center text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold to-transparent" />
                        <h2 className="text-4xl md:text-6xl font-playfair text-white mb-8">Intelligence in your inbox</h2>
                        <p className="text-xl text-dimmed mb-12 max-w-xl leading-relaxed">
                            A weekly summary of climate policy, sectoral decarbonization, and ESG risk management.
                        </p>

                        <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="name@corporate.com"
                                className="flex-1 bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:outline-none focus:border-gold transition-colors text-offwhite font-medium"
                            />
                            <button className="px-10 py-5 bg-gold hover:bg-white text-navy font-black rounded-2xl transition-all shadow-2xl shadow-gold/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InsightsLandingPage;