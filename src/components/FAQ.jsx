import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * FAQ accordion section. Content is editable in-file — replace with real,
 * company-specific Q&As as needed.
 */
const faqs = [
    {
        q: 'What is BRSR and who needs to file it?',
        a: 'Business Responsibility and Sustainability Reporting (BRSR) is a mandatory ESG disclosure framework by SEBI for the top 1000 listed companies in India. It covers environmental, social, and governance performance across 9 National Guidelines principles.',
    },
    {
        q: 'How long does a GHG inventory and ISO 14064 verification take?',
        a: 'A typical Scope 1, 2, and 3 GHG inventory takes 4-8 weeks depending on data availability and value-chain complexity. ISO 14064-3 third-party verification adds an additional 2-4 weeks.',
    },
    {
        q: 'What is the difference between Scope 1, Scope 2, and Scope 3 emissions?',
        a: 'Scope 1 covers direct emissions from owned/controlled sources (e.g. fuel combustion). Scope 2 covers indirect emissions from purchased electricity. Scope 3 covers all other value-chain emissions (suppliers, logistics, product use, etc.).',
    },
    {
        q: 'Can you help with both BRSR reporting and ISO 14064 verification?',
        a: 'Yes. We provide end-to-end support — from GHG quantification and BRSR report preparation to independent ISO 14064-3 verification and CCTS carbon-credit registration.',
    },
    {
        q: 'What sectors do you specialize in?',
        a: 'We work across cement, steel, textile, thermal power, petroleum refinery, pulp & paper, petrochemicals, aluminium, copper, and fertilizer — the CCTS-notified sectors — as well as broader manufacturing and services.',
    },
    {
        q: 'How does the Carbon Credit Trading Scheme (CCTS) work?',
        a: 'CCTS is India\'s compliance carbon market for emission-intensity reduction. Entities in notified sectors must reduce GHG intensity against a baseline; those exceeding targets earn Carbon Credit Certificates (CCCs) tradable with those short of targets.',
    },
];

const FAQItem = ({ item, isOpen, onToggle, index }) => (
    <motion.div variants={fadeUp} className="overflow-hidden rounded-xl border border-border bg-card">
        <button
            onClick={onToggle}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary"
            aria-expanded={isOpen}
        >
            <span className="text-sm font-semibold text-foreground md:text-base">{item.q}</span>
            <ChevronDown size={18} className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

const FAQ = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="section-padding bg-background">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{t('home.faqEyebrow')}</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {t('home.faqTitle')}
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        {t('home.faqSub')}
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer(0.06)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mx-auto max-w-3xl space-y-3"
                >
                    {faqs.map((item, i) => (
                        <FAQItem key={i} item={item} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
