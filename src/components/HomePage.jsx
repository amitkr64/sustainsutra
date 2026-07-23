import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import TheSutraProcess from '@/components/TheSutraProcess';
import ServiceMatrix from '@/components/ServiceMatrix';
import ESGScoreChart from '@/components/ESGScoreChart';
import CarbonAbatementChart from '@/components/CarbonAbatementChart';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import FAQ from '@/components/FAQ';
import PricingSection from '@/components/PricingSection';
import TeamSection from '@/components/TeamSection';
import ResourcesPreview from '@/components/ResourcesPreview';
import { blogService } from '@/services/blogService';
import { Mail, Phone, MapPin, ArrowRight, Calendar, User, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeUp, scaleIn, hoverLift, viewportOnce } from '@/lib/motion';

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
            <section className="border-y border-border bg-secondary/40">
                <div className="container mx-auto px-4 py-16">
                    <motion.div
                        variants={staggerContainer(0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
                    >
                        {[
                            { value: 500, suffix: '+', label: 'Organizations Served' },
                            { value: 2.5, suffix: 'M+', label: 'Tonnes CO₂e Reduced', decimals: 1 },
                            { value: 15, suffix: '+', label: 'Industry Sectors' },
                            { value: 98, suffix: '%', label: 'Client Satisfaction' },
                        ].map((stat) => (
                            <motion.div key={stat.label} variants={fadeUp} className="text-center">
                                <div className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                    <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                                </div>
                                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-background">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            Trusted by sustainability leaders
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Hear from organizations on their NetZero journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[[
                            '"SustainSutra helped us achieve our net-zero targets 3 years ahead of schedule. Their expertise in GHG accounting and carbon reduction strategies is unmatched."',
                            'Rajesh Sharma', 'Head of Sustainability, TechCorp India', 'RS'
                        ], [
                            '"The BRSR reporting service was comprehensive and delivered on time. Their team\'s knowledge of regulatory requirements saved us countless hours."',
                            'Priya Mehta', 'CFO, Manufacturing Solutions Ltd', 'PM'
                        ], [
                            '"Excellent training programs! Our team is now equipped with practical skills in ESG strategy and carbon accounting. Highly recommended."',
                            'Amit Kumar', 'Director, Green Energy Corp', 'AK'
                        ]].map(([quote, name, role, initials], i) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                viewport={{ once: true }}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                            >
                                <div className="mb-3 flex gap-0.5 text-primary">
                                    {[...Array(5)].map((_, j) => <span key={j} className="text-sm">★</span>)}
                                </div>
                                <p className="mb-5 leading-relaxed text-foreground/90">{quote}</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                        {initials}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">{name}</div>
                                        <div className="text-xs text-muted-foreground">{role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Visualization Section */}
            <section className="section-padding bg-secondary/40">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Analytics</p>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            Impact Analytics
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        <ESGScoreChart />
                        <CarbonAbatementChart />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <PricingSection />

            {/* Team Section */}
            <TeamSection />

            {/* GHG Tool CTA Section */}
            <section className="section-padding bg-background">
                <div className="container mx-auto px-4">
                    <Reveal variant={scaleIn}>
                    <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-14 shadow-lg max-w-5xl mx-auto">
                        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
                        <div className="relative flex flex-col items-center gap-8 md:flex-row">
                            <motion.div whileHover={hoverLift} className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                                <Calculator size={32} />
                            </motion.div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                                    Proprietary Technology
                                </div>
                                <h2 className="text-2xl font-bold text-white md:text-4xl">
                                    Professional GHG Audit Engine
                                </h2>
                                <p className="mt-3 max-w-2xl leading-relaxed text-white/85">
                                    Quantify your Scope 1, 2, and 3 emissions with ISO 14064-1 compliant methodology. Institutional-grade analytics for your net-zero roadmap.
                                </p>
                            </div>
                            <div className="flex flex-shrink-0 flex-col gap-3">
                                <Link to="/carbon-calculator">
                                    <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                                        Launch Calculator <ArrowRight size={18} />
                                    </Button>
                                </Link>
                                <Link to="/services/carbon-footprinting">
                                    <Button size="lg" variant="ghost" className="text-white hover:bg-white/15">
                                        Learn Methodology
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    </Reveal>
                </div>
            </section>

            {/* Dynamic Insights Section */}
            <section className="section-padding bg-background" id="insights">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Insights</p>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                Latest Insights
                            </h2>
                            <p className="mt-3 text-muted-foreground max-w-2xl">
                                Expert perspectives on ESG, compliance, and sustainability strategies.
                            </p>
                        </div>
                        <Link to="/insights" className="hidden md:flex items-center text-primary font-medium hover:gap-2 transition-all">
                            View All <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {recentBlogs.map((blog, index) => (
                            <motion.article
                                key={blog._id || blog.id || index}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={blog.featuredImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-muted-foreground text-xs mb-2">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {blog.publishDate}</span>
                                            <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                                            <Link to={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </h3>

                                        <p className="text-sm leading-relaxed text-muted-foreground mb-4 flex-1 line-clamp-3">
                                            {blog.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${blog.slug}`}
                                            className="flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-2.5 transition-all mt-auto"
                                        >
                                            Read More
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="mt-10 text-center md:hidden">
                        <Link to="/insights" className="inline-flex items-center text-primary font-medium border border-border px-5 py-2.5 rounded-lg hover:bg-secondary transition-all">
                            View All <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Resources Preview */}
            <ResourcesPreview />

            {/* FAQ Section */}
            <FAQ />

            {/* Contact Section */}
            <section className="section-padding bg-gradient-to-b from-navy to-sage/20" id="contact">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-playfair text-offwhite mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-dimmed max-w-2xl mx-auto">
                            Ready to start your ESG transformation journey? Let&apos;s discuss how we can help.
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