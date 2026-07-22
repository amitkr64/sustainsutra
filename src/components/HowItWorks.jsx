import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, FileCheck, TrendingUp, Award, Check } from 'lucide-react';

/**
 * Interactive "How it works" stepper. Click a step number to see the detail
 * panel update with a description + checklist. More engaging than a static
 * timeline, and gives visitors a clear sense of the process.
 */
const steps = [
    {
        id: 1,
        title: 'Measure',
        icon: BarChart3,
        heading: 'Quantify your footprint',
        description: 'We calculate your Scope 1, 2, and 3 emissions using ISO 14064-1 methodology, with activity-data collection across your value chain.',
        points: ['GHG inventory across all scopes', 'Activity-data templates', 'India-specific emission factors'],
    },
    {
        id: 2,
        title: 'Comply',
        icon: FileCheck,
        heading: 'Achieve regulatory compliance',
        description: 'Generate SEBI BRSR reports and align with GRI framework requirements through our guided 1000+ indicator wizard.',
        points: ['BRSR master report wizard', 'GRI framework mapping', 'Automated XBRL output'],
    },
    {
        id: 3,
        title: 'Strategize',
        icon: TrendingUp,
        heading: 'Build your decarbonization roadmap',
        description: 'From materiality assessments to SBTi-aligned targets and renewable energy transition planning — a clear path to NetZero.',
        points: ['Science-based targets (SBTi)', 'Renewable energy transition', 'NetZero roadmap'],
    },
    {
        id: 4,
        title: 'Verify',
        icon: Award,
        heading: 'Third-party verification & assurance',
        description: 'ISO 14064-3 verification and CCTS carbon-credit registration — so your disclosures are credible and audit-ready.',
        points: ['ISO 14064-3 verification', 'CCTS registry integration', 'Audit-ready documentation'],
    },
];

const HowItWorks = () => {
    const [active, setActive] = useState(0);
    const step = steps[active];

    return (
        <section className="section-padding bg-background">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Process</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        How it works
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        A clear, four-step path from measurement to verified disclosure.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    {/* Step selector tabs */}
                    <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {steps.map((s, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setActive(i)}
                                    className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                                        isActive
                                            ? 'border-primary bg-primary/5 shadow-sm'
                                            : 'border-border bg-card hover:border-primary/40 hover:bg-secondary'
                                    }`}
                                >
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                                        isActive ? 'bg-brand text-primary-foreground' : 'bg-secondary text-muted-foreground'
                                    }`}>
                                        <s.icon size={18} />
                                    </div>
                                    <span className={`text-sm font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {s.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Detail panel (animated on step change) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-primary-foreground">
                                    {String(step.id).padStart(2, '0')}
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{step.heading}</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-5">
                                {step.description}
                            </p>
                            <div className="grid gap-2 sm:grid-cols-3">
                                {step.points.map((point) => (
                                    <div key={point} className="flex items-center gap-2 text-sm text-foreground">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                            <Check size={12} className="text-primary" />
                                        </div>
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
