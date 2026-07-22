import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useReducedMotion,
} from 'framer-motion';
import { ArrowRight, Calculator, Sparkles, TrendingUp, Leaf, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeUp, scaleIn } from '@/lib/motion';

// Staggered entrance variant for the hero text block.
const item = fadeUp;

// A small metric "card" used in the floating product preview.
const MetricCard = ({ icon: Icon, label, value, accent, style }) => (
    <motion.div
        style={style}
        className="rounded-xl border border-border bg-card/90 p-3 shadow-md backdrop-blur-sm"
    >
        <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}1a`, color: accent }}>
                <Icon size={16} />
            </div>
            <div>
                <div className="text-base font-bold leading-none text-foreground">{value}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{label}</div>
            </div>
        </div>
    </motion.div>
);

const HeroSection = () => {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Scroll-driven parallax for the background layers.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const yGrid = useTransform(scrollYProgress, [0, 1], ['0px', reduceMotion ? '0px' : '120px']);
    const yGlow = useTransform(scrollYProgress, [0, 1], ['0px', reduceMotion ? '0px' : '-80px']);
    const yPreview = useTransform(scrollYProgress, [0, 1], ['0px', reduceMotion ? '0px' : '60px']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0]);

    // Mouse-reactive accent glow (subtle, spring-smoothed).
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const glowX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const glowY = useSpring(mouseY, { stiffness: 40, damping: 20 });

    const handleMouseMove = (e) => {
        if (reduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-background"
            id="hero"
            onMouseMove={handleMouseMove}
        >
            {/* --- Parallax background layers --- */}
            <motion.div style={{ y: yGrid, opacity }} className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
            </motion.div>
            <motion.div style={{ y: yGlow, opacity }} className="absolute inset-0 -z-10" aria-hidden="true">
                {/* Cursor-reactive accent glow */}
                <motion.div
                    className="absolute h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
                    style={{
                        left: useTransform(glowX, (v) => `calc(${v}% - 250px)`),
                        top: useTransform(glowY, (v) => `calc(${v}% - 250px)`),
                        background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
                    }}
                />
                {/* Static ambient glows for depth */}
                <div
                    className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full opacity-15 blur-3xl"
                    style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
                />
            </motion.div>

            <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* --- Left: text content (staggered entrance) --- */}
                    <motion.div
                        variants={staggerContainer(0.12, 0.05)}
                        initial="hidden"
                        animate="visible"
                        className="max-w-xl"
                    >
                        <motion.div variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                            <Sparkles size={14} className="text-primary" />
                            ISO 14064 &middot; BRSR &middot; CCTS Compliance Platform
                        </motion.div>

                        <motion.h1 variants={item} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            Engineering{' '}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-primary via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                                    NetZero
                                </span>
                                {/* gradient shine sweep */}
                                <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" aria-hidden="true" />
                            </span>
                            {' '}Pathways.
                        </motion.h1>

                        <motion.p variants={item} className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                            Holistic ESG strategy, GHG accounting, and regulatory compliance —
                            quantified, verified, and actionable. Built for organizations serious
                            about their sustainability roadmap.
                        </motion.p>

                        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
                            <motion.div whileHover={{ scale: reduceMotion ? 1 : 1.03 }} whileTap={{ scale: reduceMotion ? 1 : 0.97 }}>
                                <Link to="/carbon-calculator">
                                    <Button size="lg" className="gap-2">
                                        <Calculator size={18} />
                                        Launch GHG Tool
                                    </Button>
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: reduceMotion ? 1 : 1.03 }} whileTap={{ scale: reduceMotion ? 1 : 0.97 }}>
                                <Button onClick={scrollToContact} variant="outline" size="lg" className="gap-2">
                                    Get Expert Audit
                                    <ArrowRight size={18} />
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Trust pills */}
                        <motion.div variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                            {[
                                ['ISO 14064', 'Certified'],
                                ['GRI', 'Compliant'],
                                ['BRSR', 'Ready'],
                            ].map(([k, v]) => (
                                <div key={k} className="flex items-baseline gap-1.5">
                                    <ShieldCheck size={14} className="text-primary" />
                                    <span className="text-sm font-bold text-foreground">{k}</span>
                                    <span className="text-sm text-muted-foreground">{v}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* --- Right: floating product preview (parallax + idle bob) --- */}
                    {!reduceMotion && (
                        <motion.div
                            style={{ y: yPreview, opacity }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mx-auto hidden w-full max-w-md lg:block"
                        >
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative"
                            >
                                {/* Main preview card */}
                                <div className="overflow-hidden rounded-2xl border border-border bg-card/80 p-5 shadow-xl backdrop-blur-md">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                <Leaf size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-foreground">Carbon Footprint</div>
                                                <div className="text-[10px] text-muted-foreground">FY 2024-25</div>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">-18% YoY</span>
                                    </div>

                                    {/* Animated bar chart */}
                                    <div className="flex h-28 items-end gap-2">
                                        {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                                                className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary"
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
                                        <span>Scope 1</span><span>Scope 2</span><span>Scope 3</span>
                                    </div>
                                </div>

                                {/* Floating metric cards */}
                                <MetricCard
                                    icon={TrendingUp}
                                    label="tCO₂e Reduced"
                                    value="2.5M+"
                                    accent="hsl(160 84% 39%)"
                                    style={{ position: 'absolute', top: '-20px', right: '-24px' }}
                                />
                                <MetricCard
                                    icon={ShieldCheck}
                                    label="Compliance"
                                    value="98%"
                                    accent="hsl(210 80% 50%)"
                                    style={{ position: 'absolute', bottom: '-24px', left: '-20px' }}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Shimmer keyframe (defined inline so it travels with the component) */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
