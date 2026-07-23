import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Pricing/plans section. Three engagement tiers with feature lists and
 * "Request a Quote" CTAs. The "Professional" tier is highlighted as popular.
 *
 * NOTE: Prices and features are PLACEHOLDERS. Advisory engagement costs are
 * typically custom-quoted. Replace these with your real engagement models
 * and pricing before relying on this section publicly.
 */
const plans = [
    {
        name: 'Starter',
        description: 'For organizations beginning their sustainability journey.',
        price: 'Custom',
        features: [
            'Basic GHG footprint (Scope 1 & 2)',
            'Initial BRSR readiness assessment',
            'Gap analysis report',
            'Email support',
        ],
        popular: false,
    },
    {
        name: 'Professional',
        description: 'Full-spectrum compliance and strategy for growing enterprises.',
        price: 'Custom',
        features: [
            'Complete Scope 1, 2 & 3 inventory',
            'Full BRSR report preparation',
            'ISO 14064 verification support',
            'ESG materiality assessment',
            'Decarbonization roadmap',
            'Priority support + advisory calls',
        ],
        popular: true,
    },
    {
        name: 'Enterprise',
        description: 'Dedicated, end-to-end ESG transformation for large organizations.',
        price: 'Custom',
        features: [
            'Everything in Professional',
            'CCTS compliance & carbon credits',
            'Dedicated sustainability advisor',
            'Custom tool development',
            'Quarterly board-level reporting',
            'On-site verification audits',
        ],
        popular: false,
    },
];

const PricingSection = () => {
    return (
        <section className="section-padding bg-secondary/30" id="pricing">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Engagement Models</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Plans built for every stage
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        From initial assessment to full compliance — choose the level of support that fits.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeUp}
                            whileHover={{ y: -6 }}
                            className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg ${
                                plan.popular ? 'border-primary shadow-md' : 'border-border'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
                                        <Sparkles size={12} /> Most Popular
                                    </span>
                                </div>
                            )}
                            <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                            <div className="mt-4 mb-5">
                                <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                                <span className="text-sm text-muted-foreground ml-1">quote</span>
                            </div>
                            <ul className="mb-6 space-y-2.5 flex-grow">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                                        <Check size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/book-appointment" className="block">
                                <Button variant={plan.popular ? 'default' : 'outline'} className="w-full">
                                    Request a Quote
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;
