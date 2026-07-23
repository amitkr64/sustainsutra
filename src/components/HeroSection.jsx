import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useReducedMotion,
} from 'framer-motion';
import { ArrowRight, Calculator, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeUp } from '@/lib/motion';
import HeroCalculatorWidget from '@/components/HeroCalculatorWidget';

// Staggered entrance variant for the hero text block.
const item = fadeUp;

const HeroSection = () => {
    const { t } = useTranslation();
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
                            {t('home.heroEyebrow')}
                        </motion.div>

                        <motion.h1 variants={item} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            Engineering{' '}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-primary via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                                    NetZero
                                </span>
                                <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" aria-hidden="true" />
                            </span>
                            {' '}Pathways.
                        </motion.h1>

                        <motion.p variants={item} className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                            {t('home.heroSubtitle')}
                        </motion.p>

                        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
                            <motion.div whileHover={{ scale: reduceMotion ? 1 : 1.03 }} whileTap={{ scale: reduceMotion ? 1 : 0.97 }}>
                                <Link to="/carbon-calculator">
                                    <Button size="lg" className="gap-2">
                                        <Calculator size={18} />
                                        {t('home.launchTool')}
                                    </Button>
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: reduceMotion ? 1 : 1.03 }} whileTap={{ scale: reduceMotion ? 1 : 0.97 }}>
                                <Button onClick={scrollToContact} variant="outline" size="lg" className="gap-2">
                                    {t('home.getAudit')}
                                    <ArrowRight size={18} />
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Trust pills */}
                        <motion.div variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                            {[
                                ['ISO 14064', t('home.isoCertified')],
                                ['GRI', t('home.griCompliant')],
                                ['BRSR', t('home.brsrReady')],
                            ].map(([k, v]) => (
                                <div key={k} className="flex items-baseline gap-1.5">
                                    <ShieldCheck size={14} className="text-primary" />
                                    <span className="text-sm font-bold text-foreground">{k}</span>
                                    <span className="text-sm text-muted-foreground">{v}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* --- Right: interactive live calculator widget --- */}
                    <div className="hidden lg:block">
                        <HeroCalculatorWidget style={{ y: yPreview, opacity }} />
                    </div>
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
