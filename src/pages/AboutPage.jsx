import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, Globe, Shield, Linkedin, Mail, CheckCircle, ArrowRight, Zap, Microscope } from 'lucide-react';
import { teamService } from '@/services/teamService';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const [team, setTeam] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeam = async () => {
            const data = await teamService.getAll();
            setTeam(data || []);
        };
        fetchTeam();
    }, []);

    const stats = [
        { label: "CO₂e Managed", value: "2.5M+", unit: "Tonnes" },
        { label: "Global Clients", value: "500+", unit: "Entities" },
        { label: "Industry Sectors", value: "15+", unit: "Expertise" },
        { label: "Project Success", value: "100%", unit: "Delivery" }
    ];

    return (
        <div className="min-h-screen bg-navy text-offwhite font-ibm selection:bg-gold/30">
            <Helmet>
                <title>Institutional Profile | SustainSutra</title>
                <meta name="description" content="SustainSutra is an elite ESG consulting firm engineering NetZero pathways through technical rigor and strategic foresight." />
            </Helmet>

            {/* Elite Hero Section */}
            <section className="relative min-h-[85vh] flex items-center pt-12 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                        alt="Corporate"
                        className="w-full h-full object-cover opacity-15 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy to-navy/40" />
                </div>

                <div className="container relative z-10 px-4">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-3/5"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-8">
                                <Shield className="text-gold" size={16} />
                                <span className="text-gold font-bold tracking-widest uppercase text-xs">Institutional Profile</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-playfair text-white mb-8 leading-[1.05]">
                                Engineering a <br />
                                <span className="text-gold italic">Resilient</span> Future
                            </h1>
                            <p className="text-xl md:text-3xl text-offwhite/80 max-w-2xl font-light leading-relaxed border-l-4 border-gold pl-8">
                                SustainSutra is an elite advisory firm dedicated to bridging the gap between corporate ambition and climate reality through rigorous science and strategic clarity.
                            </p>
                            <div className="mt-12 flex gap-6">
                                <Button
                                    className="px-10 py-7 text-lg rounded-full"
                                    onClick={() => navigate('/services')}
                                >
                                    Our Expertise
                                </Button>
                                <Button
                                    variant="outline"
                                    className="px-10 py-7 text-lg rounded-full"
                                    onClick={() => {
                                        const el = document.getElementById('our-story');
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Genesis
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="lg:w-2/5 grid grid-cols-2 gap-4"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="glassmorphism p-8 rounded-3xl border-white/5 text-center group hover:border-gold/30 transition-all">
                                    <div className="text-4xl font-playfair text-gold mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                                    <div className="text-xs font-bold text-white uppercase tracking-widest">{stat.label}</div>
                                    <div className="text-[10px] text-dimmed mt-1">{stat.unit}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Strategic Intent (Mission/Vision) */}
            <section className="py-32 bg-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full translate-x-1/2" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Target size={32} />,
                                title: "Strategic Intent",
                                desc: "To weaponize data and science to transform sustainability from a cost center into a core pillar of institutional value."
                            },
                            {
                                icon: <Globe size={32} />,
                                title: "Global Mandate",
                                desc: "Standardizing NetZero transitions for diverse sectors, ensuring global compliance meets local operational excellence."
                            },
                            {
                                icon: <Microscope size={32} />,
                                title: "Technical Rigor",
                                desc: "Our approach is anchored in high-fidelity accounting, ensuring every tonne of CO₂e is traced with audit-ready precision."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="mb-8 w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-3xl font-playfair text-white mb-6 tracking-wide">{item.title}</h3>
                                <p className="text-dimmed leading-relaxed text-lg">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Genesis (Our Story) */}
            <section id="our-story" className="py-32 bg-navy/50 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                                    alt="SustainSutra Office"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy transition-opacity" />
                                <div className="absolute bottom-10 left-10 right-10 p-8 glassmorphism rounded-2xl border-white/10">
                                    <div className="text-gold font-playfair text-3xl mb-2">Since 2018</div>
                                    <p className="text-white font-medium">Redefining the DNA of sustainability consulting in Asia.</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-6xl font-playfair text-white mb-10 leading-tight">
                                From Observation <br />
                                to <span className="text-gold">Impact</span>
                            </h2>
                            <div className="space-y-8 text-xl font-light text-dimmed leading-relaxed">
                                <p>
                                    Founded in 2018, SustainSutra emerged from a singular insight: while corporations understood the 'Why' of sustainability, they were fundamentally paralyzed by the 'How'.
                                </p>
                                <p>
                                    We realized that generic advice wasn't enough. The market needed <span className="text-white font-medium">engineering rigor</span>—a firm that could translate complex greenhouse gas protocols into actionable operational blueprints.
                                </p>
                                <p>
                                    Today, we operate as a high-fidelity advisory node for over 500 organizations. We don't just write reports; we build the technical infrastructure that allows companies to survive and lead in a world of carbon taxes and ESG disclosure mandates.
                                </p>
                            </div>
                            <div className="mt-12 flex items-center gap-4 text-gold font-bold">
                                <CheckCircle size={24} />
                                <span>ISO 14064-1 & ISO 14064-2 Global Accreditation Alignment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Advantage */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20 max-w-4xl mx-auto">
                        <h2 className="text-5xl font-playfair text-white mb-6">The Sutra Advantage</h2>
                        <p className="text-xl text-dimmed font-light">What differentiates our approach in a crowded advisory market.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Technical Sovereignty", icon: <Zap /> },
                            { title: "Vertical Specialization", icon: <TrendingUp /> },
                            { title: "Regulatory Foresight", icon: <Globe /> },
                            { title: "Audit Verification", icon: <Award /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glassmorphism p-10 rounded-4xl border-white/5 flex flex-col items-center text-center"
                            >
                                <div className="text-gold mb-6 scale-150">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                                <p className="text-sm text-dimmed leading-relaxed">System-wide integration of ESG metrics into core business workflows.</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-32 bg-gradient-to-b from-navy to-navy/95">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <div className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-4">Board of Directors</div>
                            <h2 className="text-5xl md:text-7xl font-playfair text-white leading-none">The Leadership</h2>
                        </div>
                        <p className="hidden md:block text-dimmed max-w-sm text-right font-light italic">
                            A synergy of environmental scientists, strategic consultants, and regulatory experts.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                        {team.map((member, idx) => (
                            <motion.div
                                key={member.id || idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative rounded-3xl overflow-hidden mb-8 aspect-[4/5] shadow-2xl">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />

                                    {/* Link Overlay */}
                                    <div className="absolute bottom-6 right-6 flex flex-col gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                            <Linkedin size={20} />
                                        </a>
                                        <a href={`mailto:${member.email}`} className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                                            <Mail size={20} />
                                        </a>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-playfair text-white mb-2">{member.name}</h3>
                                <div className="text-gold font-bold uppercase tracking-widest text-xs mb-4">{member.role}</div>
                                <p className="text-dimmed leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-40 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-gold/5" />
                <div className="container relative z-10 px-4">
                    <h2 className="text-5xl md:text-8xl font-playfair text-white mb-12 leading-tight">
                        Engineer Your <br />
                        <span className="text-gold underline underline-offset-8">Compliance</span> Evolution
                    </h2>
                    <Button
                        size="lg"
                        className="px-16 py-10 text-2xl rounded-full shadow-3xl hover:scale-105"
                        onClick={() => navigate('/book-appointment')}
                    >
                        Consult Our Principal Advisor <ArrowRight className="ml-4" />
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
