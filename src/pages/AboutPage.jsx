import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, Globe, Heart, Linkedin, Mail } from 'lucide-react';
import { teamService } from '../services/teamService';

const AboutPage = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        setTeam(teamService.getAll());
    }, []);

    return (
        <>
            <Helmet>
                <title>About Us | SustainSutra</title>
                <meta name="description" content="Learn about SustainSutra's mission to drive sustainable transformation across industries through expert consulting and training." />
            </Helmet>

            <div className="min-h-screen bg-navy">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-navy to-sage/10">
                    <div className="container mx-auto max-w-4xl text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-6xl font-playfair text-offwhite mb-6"
                        >
                            Driving Sustainable Transformation
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-dimmed leading-relaxed"
                        >
                            SustainSutra is a leading sustainability consulting firm dedicated to helping organizations navigate the complex landscape of ESG, carbon management, and regulatory compliance.
                        </motion.p>
                    </div>
                </section>

                {/* Mission, Vision, Values */}
                <section className="section-padding bg-navy/95">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glassmorphism rounded-xl p-8 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-sage-forest rounded-full mb-6">
                                    <Target className="text-offwhite" size={32} />
                                </div>
                                <h3 className="text-2xl font-playfair text-offwhite mb-4">Our Mission</h3>
                                <p className="text-dimmed leading-relaxed">
                                    To empower organizations with the knowledge, tools, and strategies needed to achieve meaningful sustainability outcomes while driving business value.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="glassmorphism rounded-xl p-8 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-sage-forest rounded-full mb-6">
                                    <Globe className="text-offwhite" size={32} />
                                </div>
                                <h3 className="text-2xl font-playfair text-offwhite mb-4">Our Vision</h3>
                                <p className="text-dimmed leading-relaxed">
                                    A world where every business operates as a force for good, balancing profitability with environmental stewardship and social responsibility.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="glassmorphism rounded-xl p-8 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-sage-forest rounded-full mb-6">
                                    <Heart className="text-offwhite" size={32} />
                                </div>
                                <h3 className="text-2xl font-playfair text-offwhite mb-4">Our Values</h3>
                                <p className="text-dimmed leading-relaxed">
                                    Integrity, Excellence, Innovation, and Impact. We believe in science-based solutions and transparent, measurable results.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="section-padding bg-gradient-to-b from-navy/95 to-navy">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-playfair text-offwhite mb-8 text-center">Our Story</h2>
                            <div className="glassmorphism rounded-xl p-8 space-y-6 text-dimmed leading-relaxed">
                                <p>
                                    Founded in 2018, SustainSutra emerged from a simple observation: while businesses increasingly recognized the importance of sustainability, many struggled to translate commitment into action. The gap between aspiration and implementation was wide, and the need for expert guidance was clear.
                                </p>
                                <p>
                                    Our founders, veterans of the environmental consulting and corporate sustainability sectors, came together with a shared vision: to create a firm that would bridge this gap through a unique combination of technical expertise, practical experience, and deep understanding of business realities.
                                </p>
                                <p>
                                    Today, SustainSutra serves over 500 organizations across 15 industry sectors, from manufacturing and energy to IT and financial services. We've helped our clients reduce over 2.5 million tonnes of CO₂e, achieve ISO certifications, navigate complex regulatory frameworks, and build sustainability into their core business strategies.
                                </p>
                                <p>
                                    But numbers tell only part of the story. What drives us is the transformation we witness—companies moving from compliance-driven checkbox exercises to genuine sustainability leadership, creating value for shareholders while contributing to a healthier planet and more equitable society.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* What Sets Us Apart */}
                <section className="section-padding bg-navy/95">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-playfair text-offwhite mb-12 text-center">What Sets Us Apart</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glassmorphism rounded-xl p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                                        <Award className="text-gold" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-offwhite mb-2">Deep Technical Expertise</h3>
                                        <p className="text-dimmed">
                                            Our team includes certified GHG auditors, ISO lead assessors, LCA practitioners, and ESG specialists with decades of combined experience.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glassmorphism rounded-xl p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                                        <Users className="text-gold" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-offwhite mb-2">Industry-Specific Solutions</h3>
                                        <p className="text-dimmed">
                                            We understand that sustainability challenges vary by sector. Our solutions are tailored to your industry's unique context and constraints.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="glassmorphism rounded-xl p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="text-gold" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-offwhite mb-2">Results-Driven Approach</h3>
                                        <p className="text-dimmed">
                                            We focus on measurable outcomes, not just reports. Every engagement is designed to deliver tangible environmental and business value.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="glassmorphism rounded-xl p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                                        <Globe className="text-gold" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-offwhite mb-2">Global Standards, Local Context</h3>
                                        <p className="text-dimmed">
                                            We bring international best practices while understanding Indian regulatory requirements and business realities.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Leadership Team - NEW */}
                <section className="section-padding bg-gradient-to-b from-navy to-navy/95">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-playfair text-offwhite mb-12 text-center">Our Leadership</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {team.map((member, idx) => (
                                <motion.div
                                    key={member.id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glassmorphism rounded-xl overflow-hidden group"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60"></div>

                                        {/* Social Links Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-navy/40 backdrop-blur-sm">
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-gold hover:text-navy text-white rounded-full transition-colors">
                                                    <Linkedin size={20} />
                                                </a>
                                            )}
                                            {member.email && (
                                                <a href={`mailto:${member.email}`} className="p-3 bg-white/10 hover:bg-gold hover:text-navy text-white rounded-full transition-colors">
                                                    <Mail size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6 relative">
                                        <h3 className="text-2xl font-playfair text-offwhite mb-1">{member.name}</h3>
                                        <p className="text-gold font-medium text-sm mb-4">{member.role}</p>
                                        <p className="text-dimmed text-sm leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-gradient-sage-forest">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-playfair text-offwhite mb-6">
                                Ready to Start Your Sustainability Journey?
                            </h2>
                            <p className="text-dimmed text-lg mb-8">
                                Let's discuss how we can help your organization achieve its sustainability goals.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/book-appointment"
                                    className="px-8 py-4 bg-gold text-navy rounded-lg font-semibold hover:bg-gold/90 transition-all"
                                >
                                    Schedule a Consultation
                                </a>
                                <a
                                    href="/services"
                                    className="px-8 py-4 bg-white/10 text-offwhite rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                                >
                                    Explore Our Services
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutPage;
