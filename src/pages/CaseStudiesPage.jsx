import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Calendar } from 'lucide-react';

import { resourceService } from '@/services/resourceService';

const CaseStudiesPage = () => {
    const [caseStudies, setCaseStudies] = React.useState([]);

    React.useEffect(() => {
        const data = resourceService.getCaseStudies();
        setCaseStudies(data);
    }, []);

    return (
        <>
            <Helmet>
                <title>Success Stories & Case Studies | SustainSutra</title>
                <meta name="description" content="Explore real-world examples of how businesses have transformed their sustainability performance with SustainSutra." />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite pt-32 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-playfair mb-6"
                        >
                            Impact Stories
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-dimmed leading-relaxed"
                        >
                            See how we help organizations across industries turn sustainability challenges into competitive advantages.
                        </motion.p>
                    </div>

                    {/* Case Studies Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((study, idx) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glassmorphism rounded-xl overflow-hidden group flex flex-col h-full"
                            >
                                <div className="h-56 relative overflow-hidden">
                                    <img
                                        src={study.image}
                                        alt={study.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-navy/80 backdrop-blur text-gold text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1">
                                            <Building2 size={12} /> {study.clientIndustry}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-dimmed mb-3">
                                        <Calendar size={12} />
                                        <span>{study.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold font-playfair mb-3 group-hover:text-gold transition-colors">
                                        {study.title}
                                    </h3>
                                    <p className="text-dimmed text-sm mb-6 line-clamp-3">
                                        {study.challenge}
                                    </p>
                                    <div className="mt-auto">
                                        <Link
                                            to={`/resources/case-studies/${study.id}`}
                                            className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
                                        >
                                            Read Full Story <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-navy to-sage/20 border-t border-white/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-playfair text-white mb-6">Ready to Write Your Success Story?</h2>
                    <p className="text-xl text-dimmed mb-8 max-w-2xl mx-auto">
                        Partner with SustainSutra to transform your sustainability challenges into competitive advantages.
                    </p>
                    <Link
                        to="/book-appointment"
                        className="inline-block bg-gold hover:bg-gold/90 text-navy font-bold px-10 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        Schedule a Consultation <ArrowRight className="inline-block ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </>
    );
};

export default CaseStudiesPage;
