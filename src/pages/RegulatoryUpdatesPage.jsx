import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Bell, ShieldCheck } from 'lucide-react';

import { resourceService } from '@/services/resourceService';

const RegulatoryUpdatesPage = () => {
    const [updates, setUpdates] = React.useState([]);

    React.useEffect(() => {
        const data = resourceService.getUpdates();
        setUpdates(data);
    }, []);

    return (
        <>
            <Helmet>
                <title>Regulatory Updates | SustainSutra</title>
                <meta name="description" content="Stay informed with the latest sustainability regulations, circulars, and notifications from SEBI, MOEFCC, and global bodies." />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite pt-32 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-medium mb-4"
                        >
                            <Bell size={16} />
                            <span>Stay Compliant</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-playfair mb-6"
                        >
                            Regulatory Updates
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-dimmed max-w-2xl mx-auto"
                        >
                            Latest notifications, circulars, and policy updates shaping the sustainability landscape in India and globally.
                        </motion.p>
                    </div>

                    {/* Updates Feed */}
                    <div className="space-y-6">
                        {updates.map((update, idx) => (
                            <motion.div
                                key={update.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glassmorphism p-6 rounded-xl border-l-4 border-gold hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-1 bg-white/10 text-xs font-bold rounded uppercase tracking-wider text-offwhite">
                                                {update.source}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-dimmed">
                                                <Calendar size={12} />
                                                {update.date}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-offwhite group-hover:text-gold transition-colors">
                                            {update.title}
                                        </h3>
                                    </div>
                                    <a
                                        href={update.link}
                                        className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all"
                                        title="Read Official Notification"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                                <p className="text-dimmed leading-relaxed text-sm">
                                    {update.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Subscription CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 glassmorphism-strong rounded-2xl p-8 text-center"
                    >
                        <ShieldCheck size={48} className="text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-playfair mb-4">Never Miss a Compliance Update</h2>
                        <p className="text-dimmed mb-6 max-w-xl mx-auto">
                            Get immediate alerts on new ESG regulations relevant to your industry delivered directly to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="px-4 py-3 bg-navy border border-white/20 rounded-lg focus:border-gold focus:outline-none flex-grow"
                            />
                            <button className="px-6 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold/90 transition-smooth whitespace-nowrap">
                                Subscribe Alerts
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default RegulatoryUpdatesPage;
