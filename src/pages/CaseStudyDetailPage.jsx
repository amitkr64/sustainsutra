import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, CheckCircle, Target, TrendingUp, Sparkles, ChevronRight, Zap, Award } from 'lucide-react';

import { resourceService } from '@/services/resourceService';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const CaseStudyDetailPage = () => {
    const { id } = useParams();
    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudy = async () => {
            const data = await resourceService.getCaseStudyById(id);
            setStudy(data);
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchStudy();
    }, [id]);

    if (loading) return <LoadingSpinner fullScreen />;

    if (!study) {
        return (
            <div className="min-h-screen bg-[#0A0F14] flex items-center justify-center text-white">
                <div className="text-center p-12 glassmorphism rounded-3xl border border-white/10">
                    <Target size={64} className="text-gold mx-auto mb-6 opacity-20" />
                    <h2 className="text-3xl font-playfair mb-4">Perspective Not Found</h2>
                    <p className="text-dimmed mb-8">The requested intelligence brief is unavailable or has been archived.</p>
                    <Link to="/resources/case-studies" className="inline-flex items-center gap-2 text-gold font-bold hover:gap-3 transition-all">
                        <ArrowLeft size={18} /> Return to Impact Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>{study.title} | SustainSutra</title>
                <meta name="description" content={`Institutional deep-dive: How we engineered ${study.clientIndustry} performance for board-level impact.`} />
            </Helmet>

            {/* Immersive Header */}
            <header className="relative w-full h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/80 to-[#0A0F14]" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end pb-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-5xl"
                        >
                            <Link to="/resources/case-studies" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold mb-8 transition-colors font-black text-[10px] uppercase tracking-widest">
                                <ArrowLeft size={16} /> Impact Gallery
                            </Link>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-5 py-2 bg-gold text-navy text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
                                    {study.clientIndustry}
                                </span>
                                <div className="w-12 h-px bg-white/20" />
                                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{study.date}</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-playfair text-white leading-[1.1] mb-8 drop-shadow-2xl">
                                {study.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Strategic Layout */}
            <main className="container mx-auto px-4 lg:px-8 -mt-16 relative z-10 pb-32">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Main Intelligence */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* The Challenge */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glassmorphism p-10 md:p-16 rounded-[40px] border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Target size={180} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                                        <Target size={24} />
                                    </div>
                                    <h2 className="text-3xl font-playfair text-white">Institutional Challenge</h2>
                                </div>
                                <p className="text-xl text-dimmed leading-relaxed first-letter:text-5xl first-letter:font-playfair first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                                    {study.challenge}
                                </p>
                            </div>
                        </motion.section>

                        {/* Engineering Strategy */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glassmorphism p-10 md:p-16 rounded-[40px] border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <TrendingUp size={180} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Zap size={24} />
                                    </div>
                                    <h2 className="text-3xl font-playfair text-white">Engineering Strategy</h2>
                                </div>
                                <p className="text-xl text-dimmed leading-relaxed">
                                    {study.solution}
                                </p>
                            </div>
                        </motion.section>

                        {/* Impact Matrix */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 md:p-16 bg-gold rounded-[40px] relative overflow-hidden shadow-2xl shadow-gold/20"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Award size={180} className="text-navy" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10 text-navy">
                                    <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                                        <CheckCircle size={24} />
                                    </div>
                                    <h2 className="text-3xl font-playfair">Verified Business Impact</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {study.results && study.results.map((result, idx) => (
                                        <div key={idx} className="flex gap-4 items-start p-6 bg-navy/5 rounded-[24px] border border-navy/10 group hover:bg-navy/10 transition-all">
                                            <div className="mt-1.5 w-5 h-5 rounded-full border-2 border-navy flex items-center justify-center shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-navy animate-pulse" />
                                            </div>
                                            <span className="text-navy font-bold text-lg leading-tight">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar Intelligence */}
                    <div className="lg:col-span-4">
                        <aside className="sticky top-32 space-y-12">
                            {/* Client Summary */}
                            <div className="glassmorphism p-10 rounded-[40px] border border-white/5">
                                <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-10 border-b border-white/5 pb-4">Client Portfolio</h3>
                                <div className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Industry Vertical</span>
                                        <div className="flex items-center gap-3 text-xl font-playfair text-white">
                                            <Building2 size={20} className="text-gold" />
                                            {study.clientIndustry}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Strategic Duration</span>
                                        <div className="text-xl font-playfair text-white">
                                            Completed {study.date}
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full w-fit">
                                            <Sparkles size={14} className="text-gold" />
                                            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Institutional Grade</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="relative p-12 bg-navy rounded-[40px] border border-white/10 overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                                    <TrendingUp size={160} className="text-gold" />
                                </div>
                                <h3 className="text-3xl font-playfair text-white mb-6 relative z-10">Replicate this Performance</h3>
                                <p className="text-dimmed mb-10 relative z-10 leading-relaxed font-medium">
                                    Let our data-engineering team design a custom NetZero roadmap for your board.
                                </p>
                                <Link to="/book-appointment" className="w-full py-6 bg-gold text-navy font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-gold/10 relative z-10 uppercase text-xs tracking-widest">
                                    Book Strategic Briefing <ChevronRight size={18} />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CaseStudyDetailPage;
