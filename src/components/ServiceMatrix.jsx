import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3, Globe, Layers, FileSpreadsheet, ShieldCheck,
    GraduationCap, Zap, RefreshCw, Droplet, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '@/constants/services';
import { staggerContainer, fadeUp, hoverLift, viewportOnce } from '@/lib/motion';

// Map icon string names to components.
const ICONS = { BarChart3, Globe, Layers, FileSpreadsheet, ShieldCheck, GraduationCap, Zap, RefreshCw, Droplet };

const ServiceMatrix = () => {
    return (
        <section className="section-padding bg-background" id="services">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-14 max-w-2xl text-center"
                >
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Services</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        A complete ESG toolkit
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Comprehensive solutions across the sustainability spectrum.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer(0.06)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
                >
                    {SERVICES.map((service) => {
                        const Icon = ICONS[service.icon] || BarChart3;
                        return (
                            <motion.div key={service.id} variants={fadeUp} whileHover={hoverLift}>
                                <Link
                                    to={service.href}
                                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg"
                                >
                                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon size={22} />
                                    </div>
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                                        <ArrowUpRight size={18} className="mt-1 flex-shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
                                    <span className="mt-3 inline-block w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{service.category}</span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceMatrix;
