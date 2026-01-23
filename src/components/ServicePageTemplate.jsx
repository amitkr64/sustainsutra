import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, ArrowRight, BarChart3, FileText, Settings, ShieldCheck, Mail, Phone, MapPin, Target, Zap, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ServicePageTemplate = ({
    title,
    heroImage,
    overview,
    keyFeatures,
    standards,
    deliverables,
    ctaText,
    methodology,
    processSteps,
    benefits,
    secondaryCtaText,
    secondaryCtaLink,
    executiveSummary // Optional: detailed summary
}) => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="min-h-screen bg-navy text-offwhite font-ibm selection:bg-gold/30">
            <Helmet>
                <title>{title} | SustainSutra</title>
                <meta name="description" content={overview} />
            </Helmet>

            {/* Premium Hero Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-12">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                        style={{ backgroundImage: `url('${heroImage}?q=80&w=2070&auto=format&fit=crop')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30"></div>
                </div>

                <div className="container relative z-10 px-4">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6 backdrop-blur-md">
                                <Award className="text-gold" size={18} />
                                <span className="text-gold font-bold tracking-widest uppercase text-xs">Expert Advisory</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-playfair text-offwhite mb-8 leading-tight drop-shadow-2xl">
                                {title}
                            </h1>
                            <p className="text-xl md:text-2xl text-offwhite/90 max-w-2xl font-light leading-relaxed mb-10 border-l-4 border-gold pl-6">
                                {overview}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gold hover:bg-white text-navy font-bold px-10 py-7 text-lg rounded-full shadow-2xl hover:scale-105 transition-all"
                                    onClick={() => {
                                        const element = document.getElementById('contact-footer');
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {ctaText} <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                {secondaryCtaText && (
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="px-10 py-7 text-lg rounded-full"
                                        onClick={() => navigate(secondaryCtaLink)}
                                    >
                                        {secondaryCtaText}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Metrics Ornament */}
                <div className="absolute right-0 bottom-20 hidden xl:block w-96 mr-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="glassmorphism p-8 rounded-3xl border-white/10"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                                <Target className="text-gold" />
                            </div>
                            <div>
                                <h4 className="text-gold font-bold uppercase text-xs tracking-widest">Global Standards</h4>
                                <p className="text-offwhite font-medium text-sm">ISO, GRI, BRSR Aligned</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "95%" }}
                                    transition={{ duration: 2, delay: 1 }}
                                    className="h-full bg-gold"
                                />
                            </div>
                            <p className="text-xs text-dimmed leading-relaxed">SustainSutra ensures your environmental disclosures meet the highest levels of accuracy and regulatory scrutiny.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Standards Ticker / Trust Bar */}
            <section className="py-12 border-y border-white/5 bg-navy/50 overflow-hidden">
                <div className="container mx-auto px-4">
                    <p className="text-center text-xs font-bold text-gold/60 uppercase tracking-[0.3em] mb-8">Aligned With Global Frameworks</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
                        {standards.map((std, i) => (
                            <span key={i} className="text-offwhite font-playfair text-lg md:text-xl border-x border-white/10 px-6">{std}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Executive Summary Section */}
            {(executiveSummary || overview) && (
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2">
                                <h2 className="text-4xl md:text-6xl font-playfair text-offwhite mb-8">
                                    Strategic <span className="text-gold">Outlook</span>
                                </h2>
                                <div className="space-y-6 text-xl text-dimmed font-light leading-relaxed">
                                    <p>{executiveSummary || overview}</p>
                                </div>
                            </div>
                            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                                {keyFeatures.slice(0, 4).map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="p-8 glassmorphism border-white/5 rounded-2xl group"
                                    >
                                        <div className="text-gold mb-4 group-hover:scale-110 transition-transform">
                                            {idx === 0 ? <Globe size={28} /> :
                                                idx === 1 ? <BarChart3 size={28} /> :
                                                    idx === 2 ? <Zap size={28} /> : <ShieldCheck size={28} />}
                                        </div>
                                        <h3 className="text-lg font-bold text-offwhite leading-tight">{feature}</h3>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Methodology / Process Section - Vertical Flow */}
            {methodology && methodology.length > 0 && (
                <section className="py-24 bg-gradient-to-b from-navy to-white/[0.02]">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-6xl font-playfair text-offwhite mb-6">Our Methodology</h2>
                            <p className="text-dimmed text-lg">A systematic, data-driven approach to engineering your sustainability transition.</p>
                        </div>

                        <div className="max-w-5xl mx-auto relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/10 to-transparent" />

                            <div className="space-y-16">
                                {methodology.map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
                                                <div className="w-16 h-16 bg-navy border-2 border-gold rounded-full flex items-center justify-center text-gold font-bold text-2xl relative z-10">
                                                    {idx + 1}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-full md:w-1/2 text-left ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                                            <h3 className="text-2xl font-bold text-offwhite mb-3">{step.title}</h3>
                                            <p className="text-dimmed leading-relaxed text-lg">{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Deliverables & Business Impact */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Deliverables */}
                        <div className="bg-white/[0.03] p-12 rounded-3xl border border-white/10 shadow-3xl">
                            <h3 className="text-3xl font-playfair text-white mb-10 flex items-center gap-4">
                                <FileText className="text-gold" size={32} />
                                Technical Deliverables
                            </h3>
                            <div className="grid gap-4">
                                {deliverables.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 p-5 bg-navy/50 rounded-xl border-l-4 border-gold group"
                                    >
                                        <Check className="text-gold" size={20} />
                                        <span className="text-offwhite font-medium group-hover:text-gold transition-colors">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div>
                            <h3 className="text-3xl font-playfair text-white mb-10 flex items-center gap-4">
                                <Zap className="text-gold" size={32} />
                                Business Advantage
                            </h3>
                            <div className="space-y-6">
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center">
                                            <Check className="text-gold" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-offwhite mb-2">
                                                {typeof benefit === 'string' ? benefit : benefit.title}
                                            </h4>
                                            {benefit.description && (
                                                <p className="text-dimmed leading-relaxed">{benefit.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/5" />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h2 className="text-5xl md:text-7xl font-playfair text-white mb-12 max-w-4xl mx-auto leading-tight">
                        Ready to Lead the <span className="text-gold italic">Transition?</span>
                    </h2>
                    <Button
                        size="lg"
                        className="bg-gold hover:bg-white text-navy font-bold px-16 py-8 text-xl rounded-full shadow-2xl hover:scale-105 transition-all"
                        onClick={() => {
                            const element = document.getElementById('contact-footer');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Initiate Consultation <ArrowRight className="ml-3 w-6 h-6" />
                    </Button>
                </div>
            </section>

            {/* Contact Footer */}
            <footer id="contact-footer" className="bg-navy border-t border-white/5 py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
                        <div className="text-center group">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-3xl mb-8 group-hover:bg-gold transition-all duration-500 group-hover:-translate-y-2">
                                <Mail className="text-gold group-hover:text-navy" size={32} />
                            </div>
                            <h3 className="font-playfair text-2xl text-offwhite mb-3">Email Enquiries</h3>
                            <p className="text-gold font-medium mb-1">Direct Response Room</p>
                            <a href="mailto:info@sustainsutra.in" className="text-dimmed hover:text-white transition-colors">info@sustainsutra.in</a>
                        </div>

                        <div className="text-center group">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-3xl mb-8 group-hover:bg-gold transition-all duration-500 group-hover:-translate-y-2">
                                <Phone className="text-gold group-hover:text-navy" size={32} />
                            </div>
                            <h3 className="font-playfair text-2xl text-offwhite mb-3">Priority Line</h3>
                            <p className="text-gold font-medium mb-1">Business Hours: 9 AM - 6 PM</p>
                            <a href="tel:+918742939191" className="text-dimmed hover:text-white transition-colors">+91-8742939191</a>
                        </div>

                        <div className="text-center group">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-3xl mb-8 group-hover:bg-gold transition-all duration-500 group-hover:-translate-y-2">
                                <MapPin className="text-gold group-hover:text-navy" size={32} />
                            </div>
                            <h3 className="font-playfair text-2xl text-offwhite mb-3">Corporate Office</h3>
                            <p className="text-gold font-medium mb-1">National Capital Region</p>
                            <p className="text-dimmed leading-relaxed">F-853, Gaur Siddhartham, Ghaziabad, Uttar Pradesh</p>
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <Button
                            variant="link"
                            className="text-dimmed hover:text-gold flex items-center mx-auto gap-2"
                            onClick={() => navigate('/services')}
                        >
                            <ArrowRight className="rotate-180 w-4 h-4" /> Explore All Services
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServicePageTemplate;