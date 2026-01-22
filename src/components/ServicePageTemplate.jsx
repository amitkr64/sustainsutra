import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, ArrowRight, BarChart3, FileText, Settings, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
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
    methodology, // Optional: array of methodology steps
    processSteps, // Optional: array of process steps
    benefits, // Optional: array of business benefits
    secondaryCtaText, // Optional: text for secondary CTA button
    secondaryCtaLink // Optional: link for secondary CTA button
}) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-navy text-offwhite font-ibm">
            <Helmet>
                <title>{title} | SustainSutra</title>
                <meta name="description" content={overview} />
            </Helmet>

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
                        style={{ backgroundImage: `url('${heroImage}?q=80&w=2070&auto=format&fit=crop')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30"></div>
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-playfair text-offwhite mb-6 drop-shadow-2xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl text-offwhite/90 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {overview}
                    </motion.p>
                </div>
            </section>

            {/* Overview & Key Features */}
            <section className="py-20 bg-navy">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left Col: Features */}
                        <div>
                            <h2 className="text-3xl font-playfair text-gold mb-8 flex items-center gap-3">
                                <Settings className="w-8 h-8" />
                                Key Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {keyFeatures.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl"
                                    >
                                        <div className="w-2 h-2 bg-gold rounded-full mb-4"></div>
                                        <h3 className="text-lg font-medium text-offwhite">{feature}</h3>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Col: Standards & Deliverables */}
                        <div className="space-y-12">

                            {/* Standards */}
                            <div className="bg-sage/10 p-8 rounded-xl border border-sage/20">
                                <h3 className="text-2xl font-playfair text-white mb-6 flex items-center gap-3">
                                    <ShieldCheck className="w-6 h-6 text-sage" />
                                    Standards & Frameworks
                                </h3>
                                <ul className="space-y-4">
                                    {standards.map((standard, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-offwhite/80">
                                            <Check className="w-5 h-5 text-gold shrink-0" />
                                            <span>{standard}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Deliverables */}
                            <div>
                                <h3 className="text-2xl font-playfair text-white mb-6 flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-gold" />
                                    Key Deliverables
                                </h3>
                                <div className="space-y-4">
                                    {deliverables.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border-l-2 border-gold">
                                            <span className="text-offwhite">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology Section (Optional) */}
            {methodology && methodology.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-navy to-sage/10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-playfair text-offwhite mb-12 text-center">Our Methodology</h2>
                        <div className="max-w-4xl mx-auto space-y-6">
                            {methodology.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glassmorphism rounded-xl p-6 flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-lg">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-offwhite mb-2">{step.title}</h3>
                                        <p className="text-dimmed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Process Steps (Optional) */}
            {processSteps && processSteps.length > 0 && (
                <section className="py-20 bg-navy/95">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-playfair text-offwhite mb-12 text-center">Our Process</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {processSteps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                                    viewport={{ once: true }}
                                    className="glassmorphism rounded-xl p-6 text-center"
                                >
                                    <div className="w-16 h-16 bg-gradient-sage-forest rounded-full flex items-center justify-center mx-auto mb-4 text-offwhite font-bold text-2xl">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-semibold text-offwhite mb-3">{step.title}</h3>
                                    <p className="text-dimmed text-sm">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Benefits Section (Optional) */}
            {benefits && benefits.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-navy/95 to-navy">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-playfair text-offwhite mb-12 text-center">Business Benefits</h2>
                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glassmorphism rounded-xl p-6 flex items-start gap-4"
                                >
                                    <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-offwhite mb-2">{benefit.title}</h3>
                                        <p className="text-dimmed text-sm">{benefit.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-navy to-sage/20 border-t border-white/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-playfair text-white mb-8">Ready to Transform Your Impact?</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            className="bg-gold hover:bg-gold/90 text-navy font-bold px-10 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                            onClick={() => {
                                const element = document.getElementById('contact-footer');
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {ctaText} <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        {secondaryCtaText && secondaryCtaLink && (
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-gold text-gold hover:bg-gold hover:text-navy font-bold px-10 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                onClick={() => navigate(secondaryCtaLink)}
                            >
                                {secondaryCtaText}
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Footer (Reusable) */}
            <footer id="contact-footer" className="bg-navy/95 border-t border-white/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center group">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-lg mb-4 group-hover:bg-gold/30 transition-colors">
                                <Mail className="text-gold" size={24} />
                            </div>
                            <h3 className="font-playfair text-lg text-offwhite mb-2">Email</h3>
                            <a href="mailto:info@sustainsutra.in" className="text-dimmed hover:text-gold transition-colors">info@sustainsutra.in</a>
                        </div>

                        <div className="text-center group">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-lg mb-4 group-hover:bg-gold/30 transition-colors">
                                <Phone className="text-gold" size={24} />
                            </div>
                            <h3 className="font-playfair text-lg text-offwhite mb-2">Phone</h3>
                            <a href="tel:+918742939191" className="text-dimmed hover:text-gold transition-colors">+91-8742939191</a>
                        </div>

                        <div className="text-center group">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-lg mb-4 group-hover:bg-gold/30 transition-colors">
                                <MapPin className="text-gold" size={24} />
                            </div>
                            <h3 className="font-playfair text-lg text-offwhite mb-2">Location</h3>
                            <p className="text-dimmed">F-853, Gaur Siddhartham, Ghaziabad, Uttar Pradesh</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center pt-8 border-t border-white/10">
                        <Button variant="link" className="text-dimmed hover:text-white" onClick={() => navigate('/')}>
                            &larr; Back to Home
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServicePageTemplate;