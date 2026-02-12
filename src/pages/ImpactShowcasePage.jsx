import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { resourceService } from '@/services/resourceService';
import { ExternalLink, Calendar, Award, GraduationCap, Zap, ArrowRight, Building2 } from 'lucide-react';

const ImpactShowcasePage = () => {
    const [projects, setProjects] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShowcaseData = async () => {
            try {
                const [projData, trainData, actData] = await Promise.all([
                    resourceService.getProjects(),
                    resourceService.getTrainings(),
                    resourceService.getActivities()
                ]);
                setProjects(projData || []);
                setTrainings(trainData || []);
                setActivities(actData || []);
            } catch (error) {
                console.error("Error fetching showcase data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShowcaseData();
    }, []);

    const SectionHeader = ({ title, subtitle, icon: Icon }) => (
        <div className="mb-12 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6"
            >
                <Icon className="text-gold" size={16} />
                <span className="text-gold text-[10px] font-black uppercase tracking-widest">{title}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6 leading-tight">{subtitle}</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy text-offwhite overflow-hidden pb-32">
            <Helmet>
                <title>Impact Showcase | SustainSutra</title>
                <meta name="description" content="Explore our portfolio of sustainability projects, professional trainings, and community activities." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-playfair mb-8 leading-tight"
                    >
                        Our <span className="text-gold italic">Impact</span> Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-dimmed max-w-3xl mx-auto leading-relaxed"
                    >
                        Witness how SustainSutra is driving tangible change through innovative projects, specialized training, and active community engagement.
                    </motion.p>
                </div>
            </section>

            {/* Projects Showcase */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="Sustainable Portfolios"
                        subtitle="Implementation Success Stories"
                        icon={Building2}
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.id || idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-gold/30 hover:bg-white/[0.08] transition-all flex flex-col"
                            >
                                <div className="h-56 relative overflow-hidden">
                                    <img
                                        src={project.image || "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                                    <div className="absolute bottom-4 left-6">
                                        <span className="text-gold text-xs font-bold uppercase tracking-wider">{project.client}</span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-[10px] text-dimmed font-bold uppercase tracking-widest mb-4">
                                        <Calendar size={14} className="text-gold" />
                                        <span>{project.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-playfair text-white mb-4 group-hover:text-gold transition-colors">{project.title}</h3>
                                    <p className="text-offwhite/60 line-clamp-3 mb-6 flex-1">{project.description}</p>
                                    <div className="pt-6 border-t border-white/10 mt-auto">
                                        <div className="flex items-center gap-2 text-gold font-bold text-sm">
                                            <Award size={18} />
                                            <span>{project.impact}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {projects.length === 0 && !loading && (
                        <p className="text-center text-dimmed italic">Coming soon: Our recent project portfolios.</p>
                    )}
                </div>
            </section>

            {/* Training Showcase */}
            <section className="py-24 bg-white/[0.02]">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="Capability Building"
                        subtitle="Professional Training Programs"
                        icon={GraduationCap}
                    />

                    <div className="grid md:grid-cols-2 gap-10">
                        {trainings.map((training, idx) => (
                            <motion.div
                                key={training.id || idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-gold/30 transition-all"
                            >
                                <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                                    <img
                                        src={training.image || "https://images.unsplash.com/photo-1524178232363-1fb28f74b573"}
                                        alt={training.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8 md:w-3/5">
                                    <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-black rounded-full uppercase tracking-widest mb-4 inline-block">
                                        {training.category || training.client}
                                    </span>
                                    <h3 className="text-2xl font-playfair text-white mb-4">{training.title}</h3>
                                    <p className="text-offwhite/60 text-sm mb-6">{training.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-dimmed flex items-center gap-2">
                                            <Calendar size={14} /> {training.date}
                                        </span>
                                        <button className="text-gold hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                            Learn More <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {trainings.length === 0 && !loading && (
                        <p className="text-center text-dimmed italic">Coming soon: Our specialized training sessions.</p>
                    )}
                </div>
            </section>

            {/* Activities Showcase */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="Operational Excellence"
                        subtitle="Ongoing Activities & Events"
                        icon={Zap}
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activities.map((activity, idx) => (
                            <motion.div
                                key={activity.id || idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative rounded-3xl overflow-hidden aspect-square"
                            >
                                <img
                                    src={activity.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"}
                                    alt={activity.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="text-[10px] text-gold font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {activity.date}
                                    </div>
                                    <h3 className="text-xl font-playfair text-white group-hover:mb-2 transition-all">{activity.title}</h3>
                                    <p className="text-xs text-offwhite/60 h-0 group-hover:h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden line-clamp-2">
                                        {activity.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {activities.length === 0 && !loading && (
                        <p className="text-center text-dimmed italic">Coming soon: Our operational activities.</p>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="bg-gradient-to-r from-navy to-[#1a2533] border border-white/10 rounded-[40px] p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
                    <h2 className="text-4xl md:text-6xl font-playfair text-white mb-8">Ready to create <br /><span className="text-gold italic">Your Success Story?</span></h2>
                    <p className="text-xl text-dimmed mb-12 max-w-2xl mx-auto">
                        Partner with SustainSutra for comprehensive ESG solutions and joining our growing list of impact stories.
                    </p>
                    <a href="/book-appointment" className="inline-flex items-center gap-3 px-12 py-5 bg-gold text-navy font-black rounded-full hover:bg-white hover:scale-105 transition-all text-lg shadow-xl shadow-gold/20">
                        Book a Consultation <ArrowRight size={20} />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ImpactShowcasePage;
