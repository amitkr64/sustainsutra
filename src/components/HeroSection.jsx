import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Modern, clean hero. No heavy stock photo — a confident branded background
// with a subtle dotted grid, tight Inter headline, emerald accent gradient,
// and clear primary/secondary CTAs.
const HeroSection = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative overflow-hidden bg-background" id="hero">
            {/* Branded background: soft accent radial + dotted grid */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
                <div
                    className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
                    aria-hidden="true"
                />
                <div
                    className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
                    aria-hidden="true"
                />
            </div>

            <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-4xl"
                >
                    {/* Eyebrow */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                        <Sparkles size={14} className="text-primary" />
                        ISO 14064 &middot; BRSR &middot; CCTS Compliance Platform
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        Engineering{' '}
                        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            NetZero
                        </span>{' '}
                        Pathways.
                    </h1>

                    {/* Subhead */}
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        Holistic ESG strategy, GHG accounting, and regulatory compliance —
                        quantified, verified, and actionable. Built for organizations serious
                        about their sustainability roadmap.
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link to="/carbon-calculator">
                            <Button size="lg" className="h-12 gap-2">
                                <Calculator size={18} />
                                Launch GHG Tool
                            </Button>
                        </Link>
                        <Button onClick={scrollToContact} variant="outline" size="lg" className="h-12 gap-2">
                            Get Expert Audit
                            <ArrowRight size={18} />
                        </Button>
                    </div>

                    {/* Trust pills */}
                    <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
                        {[
                            ['ISO 14064', 'Certified'],
                            ['GRI', 'Compliant'],
                            ['BRSR', 'Ready'],
                        ].map(([k, v]) => (
                            <div key={k} className="flex items-baseline gap-2">
                                <span className="text-sm font-bold text-foreground">{k}</span>
                                <span className="text-sm text-muted-foreground">{v}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
