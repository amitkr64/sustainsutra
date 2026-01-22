import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import TheSutraProcess from '@/components/TheSutraProcess';
import ServiceMatrix from '@/components/ServiceMatrix';
import ESGScoreChart from '@/components/ESGScoreChart';
import CarbonAbatementChart from '@/components/CarbonAbatementChart';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { blogService } from '@/services/blogService';
import { Mail, Phone, MapPin, ArrowRight, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        const fetchRecentBlogs = async () => {
            const data = await blogService.getPublished();
            setRecentBlogs(data ? data.slice(0, 3) : []);
        };
        fetchRecentBlogs();
    }, []);

    return (
        <>
            <HeroSection />
            <TheSutraProcess />
            <ServiceMatrix />

            {/* Statistics Section */}
            <section className="section-padding bg-gradient-sage-forest">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-offwhite mb-2">500+</div>
                            <div className="text-dimmed">Organizations Served</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-offwhite mb-2">2.5M+</div>
                            <div className="text-dimmed">Tonnes CO₂e Reduced</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-offwhite mb-2">15+</div>
                            <div className="text-dimmed">Industry Sectors</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-offwhite mb-2">98%</div>
                            <div className="text-dimmed">Client Satisfaction</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-navy/95">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-playfair text-offwhite mb-4">
                            What Our Clients Say
                        </h2>
                        <p className="text-lg text-dimmed max-w-2xl mx-auto">
                            Trusted by leading organizations across industries
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="glassmorphism rounded-xl p-6"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-gold text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-offwhite/90 mb-6 italic">
                                "SustainSutra helped us achieve our net-zero targets 3 years ahead of schedule. Their expertise in GHG accounting and carbon reduction strategies is unmatched."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-sage-forest rounded-full flex items-center justify-center text-offwhite font-semibold">
                                    RS
                                </div>
                                <div>
                                    <div className="text-offwhite font-semibold">Rajesh Sharma</div>
                                    <div className="text-dimmed text-sm">Head of Sustainability, TechCorp India</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="glassmorphism rounded-xl p-6"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-gold text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-offwhite/90 mb-6 italic">
                                "The BRSR reporting service was comprehensive and delivered on time. Their team's knowledge of regulatory requirements saved us countless hours."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-sage-forest rounded-full flex items-center justify-center text-offwhite font-semibold">
                                    PM
                                </div>
                                <div>
                                    <div className="text-offwhite font-semibold">Priya Mehta</div>
                                    <div className="text-dimmed text-sm">CFO, Manufacturing Solutions Ltd</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="glassmorphism rounded-xl p-6"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-gold text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-offwhite/90 mb-6 italic">
                                "Excellent training programs! Our team is now equipped with practical skills in ESG strategy and carbon accounting. Highly recommended."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-sage-forest rounded-full flex items-center justify-center text-offwhite font-semibold">
                                    AK
                                </div>
                                <div>
                                    <div className="text-offwhite font-semibold">Amit Kumar</div>
                                    <div className="text-dimmed text-sm">Director, Green Energy Corp</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Data Visualization Section */}
            <section className="section-padding bg-navy/90">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-playfair text-offwhite mb-12 text-center">
                        Impact Analytics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <ESGScoreChart />
                        <CarbonAbatementChart />
                    </div>
                </div>
            </section>

            {/* Dynamic Insights Section */}
            <section className="section-padding bg-gradient-to-b from-navy/95 to-navy" id="insights">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-playfair text-offwhite mb-4">
                                Latest Insights
                            </h2>
                            <p className="text-lg text-dimmed max-w-2xl">
                                Expert perspectives on ESG, compliance, and sustainability strategies.
                            </p>
                        </div>
                        <Link to="/insights" className="hidden md:flex items-center text-gold font-medium hover:gap-2 transition-all">
                            View All Insights <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {recentBlogs.map((blog, index) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="glassmorphism rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-smooth hover:scale-[1.03] h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={blog.featuredImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-gold text-navy text-xs font-medium rounded-full">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-dimmed text-xs mb-3">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {blog.publishDate}</span>
                                            <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                                        </div>

                                        <h3 className="text-xl font-playfair text-offwhite mb-3 group-hover:text-gold transition-smooth leading-tight">
                                            <Link to={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </h3>

                                        <p className="text-offwhite/80 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                                            {blog.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${blog.slug}`}
                                            className="flex items-center gap-2 text-gold font-medium text-sm hover:gap-3 transition-smooth mt-auto"
                                        >
                                            Read More
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/insights" className="inline-flex items-center text-gold font-medium border border-gold/30 px-6 py-3 rounded-lg hover:bg-gold/10 transition-all">
                            View All Insights <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding bg-gradient-to-b from-navy to-sage/20" id="contact">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-playfair text-offwhite mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-dimmed max-w-2xl mx-auto">
                            Ready to start your ESG transformation journey? Let's discuss how we can help.
                        </p>
                    </div>

                    <LeadCaptureForm />

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-lg mb-4">
                                <Mail className="text-gold" size={24} />
                            </div>
                            <h3 className="font-playfair text-lg text-offwhite mb-2">Email</h3>
                            <p className="text-dimmed">info@sustainsutra.in</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-lg mb-4">
                                <Phone className="text-gold" size={24} />
                            </div>
                            <h3 className="font-playfair text-lg text-offwhite mb-2">Phone</h3>
                            <p className="text-dimmed">+91-8742939191</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-lg mb-4">
                                <MapPin className="text-gold" size={24} />
                            </div>
                            <h3 className="font-playfair text-lg text-offwhite mb-2">Location</h3>
                            <p className="text-dimmed">F-853, Gaur Siddhartham, Ghaziabad, Uttar Pradesh</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;