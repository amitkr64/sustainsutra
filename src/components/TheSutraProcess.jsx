import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TheSutraProcess = () => {
    const [visibleNodes, setVisibleNodes] = useState([]);
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    const processNodes = [
        {
            id: 1,
            title: "Carbon Footprinting",
            description: "Quantification of Scope 1, 2, 3 & Product Footprints"
        },
        {
            id: 2,
            title: "ESG Materiality",
            description: "ESG Risk Assessment, Gap Analysis, BRSR Readiness"
        },
        {
            id: 3,
            title: "Decarbonization",
            description: "SBTi Alignment, Renewable Energy transition, NetZero Roadmaps"
        },
        {
            id: 4,
            title: "Assurance & Reporting",
            description: "Third-party Verification (ISO 14064-3), GRI Reporting, CCTS Registry"
        }
    ];

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const nodeId = parseInt(entry.target.dataset.nodeId);
                    setVisibleNodes((prev) => {
                        if (!prev.includes(nodeId)) {
                            return [...prev, nodeId].sort();
                        }
                        return prev;
                    });
                }
            });
        }, observerOptions);

        const nodeElements = sectionRef.current?.querySelectorAll('[data-node-id]');
        nodeElements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section-padding bg-secondary/30" id="process">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-16 max-w-2xl text-center"
                >
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Process</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        The Sutra
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Our systematic approach to sustainable transformation
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto" ref={sectionRef}>
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border">
                            <motion.div
                                ref={lineRef}
                                className="w-full bg-primary origin-top"
                                style={{
                                    height: `${(visibleNodes.length / processNodes.length) * 100}%`,
                                    transition: 'height 0.6s ease-out'
                                }}
                            />
                        </div>

                        {/* Process Nodes */}
                        <div className="space-y-16">
                            {processNodes.map((node, index) => (
                                <motion.div
                                    key={node.id}
                                    data-node-id={node.id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-col gap-8`}
                                >
                                    {/* Node Indicator */}
                                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={visibleNodes.includes(node.id) ? { scale: 1 } : { scale: 0 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            className="w-8 h-8 rounded-full bg-primary shadow-md flex items-center justify-center"
                                        >
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground"></div>
                                        </motion.div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} pl-16 md:pl-0`}>
                                        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                                {node.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {node.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TheSutraProcess;