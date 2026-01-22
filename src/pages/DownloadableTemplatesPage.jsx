import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileSpreadsheet, FileText, Download, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

import { resourceService } from '@/services/resourceService';

const DownloadableTemplatesPage = () => {
    const { user } = useAuth();
    const [templates, setTemplates] = React.useState([]);

    React.useEffect(() => {
        const fetchTemplates = async () => {
            const data = await resourceService.getTemplates();
            setTemplates(data || []);
        };
        fetchTemplates();
    }, []);

    const getIconComponent = (type) => {
        switch (type) {
            case 'FileSpreadsheet': return FileSpreadsheet;
            case 'CheckCircle': return CheckCircle;
            case 'FileText': return FileText;
            default: return FileText;
        }
    };

    return (
        <>
            <Helmet>
                <title>Downloadable Templates | SustainSutra</title>
                <meta name="description" content="Free and premium templates for carbon accounting, ESG reporting, and sustainability strategy." />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite font-ibm pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-playfair mb-6">Sustainability Templates</h1>
                        <p className="text-xl text-dimmed leading-relaxed">
                            Jumpstart your sustainability journey with our ready-to-use templates and tools.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template, idx) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="glassmorphism p-6 rounded-xl relative group overflow-hidden"
                            >
                                {template.premium && (
                                    <div className="absolute top-4 right-4 bg-gold/20 text-gold text-xs font-bold px-2 py-1 rounded border border-gold/30">
                                        PREMIUM
                                    </div>
                                )}

                                <div className="mb-4">
                                    <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                                        {(() => {
                                            const Icon = getIconComponent(template.iconType);
                                            return <Icon className={template.iconColor} size={32} />;
                                        })()}
                                    </div>
                                    <span className="text-xs font-mono text-dimmed uppercase tracking-wider">{template.category}</span>
                                    <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-gold transition-colors">{template.title}</h3>
                                    <p className="text-sm text-dimmed leading-relaxed mb-6">
                                        {template.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5">
                                    {template.premium && !user ? (
                                        <Link to="/login" className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                                            <Lock size={16} />
                                            Login to Download
                                        </Link>
                                    ) : (
                                        <a
                                            href={template.fileUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-2 bg-gold/10 hover:bg-gold hover:text-navy text-gold rounded-lg text-sm font-medium transition-all"
                                        >
                                            <Download size={16} />
                                            Download Now
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {!user && (
                        <div className="mt-16 text-center bg-gradient-sage-forest rounded-xl p-8 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold mb-4">Unlock Premium Resources</h3>
                            <p className="mb-6 opacity-90">Create a free account to access our complete library of premium templates and tools.</p>
                            <Link to="/signup" className="px-8 py-3 bg-white text-forest font-bold rounded-lg hover:bg-offwhite transition-colors">
                                Sign Up for Free
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DownloadableTemplatesPage;
