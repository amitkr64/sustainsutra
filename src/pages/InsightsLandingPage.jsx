import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { blogService } from '@/services/blogService';
import { Calendar, User, ArrowRight, Search, Grid, List } from 'lucide-react';

const InsightsLandingPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await blogService.getPublished();
            setBlogs(data || []);
            setFilteredBlogs(data || []);
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        let result = blogs;

        if (selectedCategory !== 'All') {
            result = result.filter(blog => blog.category === selectedCategory);
        }

        if (searchTerm) {
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBlogs(result);
    }, [selectedCategory, searchTerm, blogs]);

    const categories = ['All', ...new Set(blogs.map(b => b.category))];

    return (
        <div className="min-h-screen bg-navy text-offwhite pt-20">
            <Helmet>
                <title>Insights & Resources | SustainSutra</title>
                <meta name="description" content="Explore our latest articles, guides, and insights on ESG, Carbon Footprinting, and Sustainability Compliance." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-navy to-navy/80 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-playfair text-white mb-6"
                    >
                        SustainSutra Insights
                    </motion.h1>
                    <p className="text-xl text-dimmed max-w-2xl mx-auto">
                        Expert perspectives on engineering NetZero pathways and navigating the ESG landscape.
                    </p>
                </div>
            </section>

            {/* Controls Section */}
            <section className="sticky top-20 z-30 bg-navy/95 backdrop-blur border-b border-white/10 py-4 shadow-lg">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto hide-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                    ? 'bg-gold text-navy'
                                    : 'bg-white/5 text-offwhite hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search insights..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-gold outline-none"
                            />
                        </div>
                        <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gold text-navy' : 'text-offwhite hover:bg-white/10'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gold text-navy' : 'text-offwhite hover:bg-white/10'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blogs Grid/List */}
            <section className="py-12 px-4 container mx-auto">
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 text-offwhite/50">
                        <p className="text-xl">No insights found matching your criteria.</p>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6 max-w-4xl mx-auto'}>
                        {filteredBlogs.map((blog, idx) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'
                                    }`}
                            >
                                <div className={`overflow-hidden relative ${viewMode === 'list' ? 'w-full md:w-72 h-48 md:h-auto' : 'h-56 w-full'}`}>
                                    <img
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-gold/90 text-navy text-xs font-bold rounded-full backdrop-blur-sm">
                                            {blog.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-dimmed mb-3">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {blog.publishDate}</span>
                                        <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                                    </div>

                                    <h3 className="text-xl font-playfair text-offwhite mb-3 group-hover:text-gold transition-colors leading-tight">
                                        <Link to={`/blog/${blog.slug}`}>
                                            {blog.title}
                                        </Link>
                                    </h3>

                                    <p className="text-offwhite/70 text-sm mb-4 line-clamp-3 flex-grow">
                                        {blog.excerpt}
                                    </p>

                                    <Link
                                        to={`/blog/${blog.slug}`}
                                        className="inline-flex items-center text-gold font-medium text-sm hover:gap-2 transition-all mt-auto"
                                    >
                                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default InsightsLandingPage;