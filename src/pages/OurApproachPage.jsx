import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Settings, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurApproachPage = () => {
    const steps = [
        {
            id: 1,
            title: "Discover",
            icon: <Search className="w-8 h-8 text-gold" />,
            description: "We begin by understanding your organization's unique context, boundaries, and baseline performance. This involves data gathering, stakeholder interviews, and gap analysis.",
            activities: ["Baseline Assessment", "Stakeholder Mapping", "Gap Analysis"]
        },
        {
            id: 2,
            title: "Design",
            icon: <Lightbulb className="w-8 h-8 text-gold" />,
            description: "Based on the discovery phase, we co-create a tailored sustainability strategy. We define targets, identify levers for improvement, and design the roadmap.",
            activities: ["Strategy Formulation", "Target Setting", "Roadmap Development"]
        },
        {
            id: 3,
            title: "Deliver",
            icon: <Settings className="w-8 h-8 text-gold" />,
            description: "We support the implementation of the strategy through technical assistance, capacity building, and process optimization.",
            activities: ["Implementation Support", "Training & Workshops", "Process Optimization"]
        },
        {
            id: 4,
            title: "Disclose",
            icon: <CheckCircle2 className="w-8 h-8 text-gold" />,
            description: "Finally, we ensure transparent communication of performance through compliant reporting and assurance.",
            activities: ["Sustainability Reporting", "Assurance/Verification", "Impact Communication"]
        }
    ];

    return (
        <>
            <Helmet>
                <title>Our Approach | SustainSutra</title>
                <meta name="description" content="Discover SustainSutra's 4D methodology for driving sustainable transformation: Discover, Design, Deliver, and Disclose." />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite pt-20">
                {/* Hero */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gold font-bold tracking-wider uppercase mb-4 block"
                        >
                            Methodology
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-playfair mb-6"
                        >
                            The 4D Framework
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-dimmed max-w-3xl mx-auto leading-relaxed"
                        >
                            Our proprietary approach ensures a holistic and structured path to sustainability leadership, moving from assessment to tangible impact.
                        </motion.p>
                    </div>
                </section>

                {/* Steps */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="hidden md:flex absolute top-0 w-12 h-12 bg-navy border-4 border-gold rounded-full items-center justify-center z-10"
                                        style={{ [index % 2 === 0 ? 'right' : 'left']: '-24px' }}>
                                        <span className="font-bold text-gold">{step.id}</span>
                                    </div>

                                    <div className="glassmorphism p-8 rounded-xl relative hover:border-gold/30 transition-all group">
                                        {/* Mobile Step Number */}
                                        <div className="md:hidden absolute -top-4 -left-4 w-10 h-10 bg-gold text-navy font-bold rounded-lg flex items-center justify-center shadow-lg">
                                            {step.id}
                                        </div>

                                        <div className={`mb-6 inline-flex p-3 rounded-lg bg-white/5 text-gold ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-playfair mb-3">{step.title}</h3>
                                        <p className="text-dimmed leading-relaxed mb-6">
                                            {step.description}
                                        </p>
                                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                            {step.activities.map((activity, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gold border border-gold/20">
                                                    {activity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-sage-forest text-center px-4">
                    <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-playfair mb-6">Built on Science, Driven by Strategy</h2>
                        <Link to="/book-appointment" className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold/90 transition-smooth">
                            Apply This Framework <ArrowRight size={20} />
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default OurApproachPage;
