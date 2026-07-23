import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Award, FileBarChart, Scale, ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Resources preview section on the homepage. Surfaces the resources hub
 * (which existed but had no inbound links from the landing page) as clickable
 * cards linking to the existing detail pages.
 */
const resources = [
    { title: 'Downloadable Templates', desc: 'Ready-to-use BRSR & GHG calculation templates.', icon: FileText, href: '/resources/templates' },
    { title: 'Sustainability Glossary', desc: '300+ ESG, carbon, and compliance terms explained.', icon: BookOpen, href: '/resources/glossary' },
    { title: 'Case Studies', desc: 'Real-world decarbonization and compliance journeys.', icon: Award, href: '/resources/case-studies' },
    { title: 'Industry Reports', desc: 'Sector-specific sustainability benchmarks and insights.', icon: FileBarChart, href: '/resources/reports' },
    { title: 'Regulatory Updates', desc: 'Stay current on SEBI, BRSR, and CCTS changes.', icon: Scale, href: '/resources/regulatory-updates' },
];

const ResourcesPreview = () => {
    return (
        <section className="section-padding bg-secondary/30" id="resources-preview">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Resources</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Free tools &amp; knowledge base
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Templates, glossaries, and regulatory guidance — all in one place.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer(0.07)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {resources.map((res) => (
                        <motion.div key={res.title} variants={fadeUp} whileHover={{ y: -4 }}>
                            <Link
                                to={res.href}
                                className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <res.icon size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-foreground">{res.title}</h3>
                                        <ArrowUpRight size={14} className="flex-shrink-0 text-muted-foreground transition-all group-hover:text-primary" />
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{res.desc}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ResourcesPreview;
