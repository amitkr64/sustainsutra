import React from 'react';
import { Quote } from 'lucide-react';

// Client testimonials section.
//
// IMPORTANT: The testimonials below are PLACEHOLDERS. Replace each entry with a
// real, attributable client quote + name/role/company before publishing.
// Fabricated testimonials on an ESG-advisory site are a credibility and legal
// risk (greenwashing). Mark a quote as anonymized only if the client requires it.
const PLACEHOLDER_TESTIMONIALS = [
    {
        quote: 'TODO: Replace with a real, attributable client quote describing the measurable impact of the engagement (e.g. emission reduction, BRSR turnaround time).',
        name: '[Client Name]',
        role: '[Designation]',
        company: '[Company]'
    },
    {
        quote: 'TODO: Replace with a second real testimonial.',
        name: '[Client Name]',
        role: '[Designation]',
        company: '[Company]'
    },
    {
        quote: 'TODO: Replace with a third real testimonial.',
        name: '[Client Name]',
        role: '[Designation]',
        company: '[Company]'
    }
];

const Testimonials = () => {
    const isPlaceholder = PLACEHOLDER_TESTIMONIALS.some(t => t.name.includes('['));

    return (
        <section className="section-padding">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-playfair text-gold mb-3">Trusted by Sustainability Leaders</h2>
                    <p className="text-dimmed max-w-2xl mx-auto">
                        Hear from organizations we&apos;ve partnered with on their NetZero journey.
                    </p>
                </div>

                {isPlaceholder && (
                    <p className="text-center text-xs text-amber-400/70 mb-8 max-w-xl mx-auto">
                        Note: testimonial content is placeholder pending client approval. Do not publish until replaced with real, attributable quotes.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
                        <figure key={i} className="glassmorphism rounded-2xl p-8 flex flex-col">
                            <Quote className="text-gold/40 mb-4" size={32} aria-hidden="true" />
                            <blockquote className="text-offwhite/90 leading-relaxed flex-grow">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>
                            <figcaption className="mt-6 pt-4 border-t border-white/10">
                                <p className="font-bold text-gold">{t.name}</p>
                                <p className="text-sm text-dimmed">{t.role}, {t.company}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
