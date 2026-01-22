import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, CheckCircle, Target, TrendingUp } from 'lucide-react';

import { resourceService } from '@/services/resourceService';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const CaseStudyDetailPage = () => {
    const { id } = useParams();
    const [study, setStudy] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulate loading for effect
        setTimeout(() => {
            const data = resourceService.getCaseStudyById(id);
            setStudy(data);
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) return <LoadingSpinner fullScreen />;

    if (!study) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-playfair mb-4">Case Study Not Found</h2>
                    <Link to="/resources/case-studies" className="text-gold hover:underline">Return to Case Studies</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{study.title} | SustainSutra Case Study</title>
                <meta name="description" content={`Read how SustainSutra helped a ${study.clientIndustry} client achieve sustainability goals.`} />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite pt-24 pb-16">
                {/* Hero Section */}
                <div className="h-[50vh] relative">
                    <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4">
                            <Link to="/resources/case-studies" className="inline-flex items-center gap-2 text-offwhite/60 hover:text-white mb-6 transition-colors">
                                <ArrowLeft size={20} /> Back to Case Studies
                            </Link>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <span className="inline-block px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-sm font-medium mb-4">
                                    {study.clientIndustry}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-playfair max-w-4xl leading-tight mb-4">
                                    {study.title}
                                </h1>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-20 relative z-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Challenge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glassmorphism p-8 rounded-xl border-l-4 border-l-red-400"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-red-400/10 rounded-lg text-red-400">
                                        <Target size={24} />
                                    </div>
                                    <h2 className="text-2xl font-playfair mt-1">The Challenge</h2>
                                </div>
                                <p className="text-lg text-dimmed leading-relaxed">
                                    {study.challenge}
                                </p>
                            </motion.div>

                            {/* Solution */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glassmorphism p-8 rounded-xl border-l-4 border-l-blue-400"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-blue-400/10 rounded-lg text-blue-400">
                                        <TrendingUp size={24} />
                                    </div>
                                    <h2 className="text-2xl font-playfair mt-1">Our Solution</h2>
                                </div>
                                <p className="text-lg text-dimmed leading-relaxed">
                                    {study.solution}
                                </p>
                            </motion.div>

                            {/* Results */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glassmorphism p-8 rounded-xl border-l-4 border-l-green-400"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-green-400/10 rounded-lg text-green-400">
                                        <CheckCircle size={24} />
                                    </div>
                                    <h2 className="text-2xl font-playfair mt-1">Key Results</h2>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {study.results && study.results.map((result, idx) => (
                                        <div key={idx} className="flex gap-3 items-start p-4 bg-white/5 rounded-lg">
                                            <div className="mt-1 min-w-4 w-4 h-4 rounded-full bg-green-400/20 text-green-400 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-current" />
                                            </div>
                                            <span className="text-offwhite/90">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="sticky top-32"
                            >
                                <div className="glassmorphism p-6 rounded-xl mb-6">
                                    <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Client Profile</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-sm text-dimmed block mb-1">Industry</span>
                                            <div className="flex items-center gap-2 text-white font-medium">
                                                <Building2 size={16} className="text-gold" />
                                                {study.clientIndustry}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm text-dimmed block mb-1">Project Date</span>
                                            <div className="text-white font-medium">
                                                {study.date}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-sage-forest p-6 rounded-xl text-center">
                                    <h3 className="text-xl font-bold mb-3">Facing Similar Challenges?</h3>
                                    <p className="text-sm opacity-90 mb-6">Let's discuss how we can help your organization achieve similar results.</p>
                                    <Link to="/book-appointment" className="block w-full py-3 bg-white text-forest font-bold rounded-lg hover:bg-offwhite transition-colors">
                                        Book a Consultation
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CaseStudyDetailPage;
