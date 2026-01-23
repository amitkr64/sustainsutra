import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleAnimation from '@/components/ParticleAnimation';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[85vh] flex items-start pt-12 overflow-hidden" id="hero">
            {/* Background Layer with Parallax-like fixed positioning */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1697869162556-ab57db502c09?q=80&w=2070&auto=format&fit=crop')`,
                        transform: 'scale(1.1)' // Slight zoom to allow for smooth edges if needed
                    }}
                />
                {/* Deep Gradient Overlays for Text Readability & Mood */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30"></div>
            </div>

            {/* Minimized/Subtle Particles Layer */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
                <ParticleAnimation />
            </div>

            {/* Main Content */}
            <div className="container relative z-10 px-4">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-offwhite leading-tight drop-shadow-2xl">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">NetZero</span> Pathways.
                        </h1>

                        <p className="text-xl md:text-2xl text-offwhite/90 leading-relaxed font-light border-l-4 border-gold pl-6 backdrop-blur-sm bg-navy/10 py-2 rounded-r-lg max-w-2xl">
                            Holistic ESG Strategy, ISO 14064 Compliance, CCTS Strategic Integration
                        </p>

                        <div className="flex flex-wrap gap-4 pt-6">
                            <Link to="/carbon-calculator">
                                <Button className="px-8 py-6 text-lg rounded-lg shadow-xl shadow-gold/20 flex items-center gap-2">
                                    <Calculator size={20} />
                                    Launch GHG Tool
                                </Button>
                            </Link>

                            <Button
                                onClick={scrollToContact}
                                variant="outline"
                                className="px-8 py-6 text-lg rounded-lg border-white/20 hover:border-gold"
                            >
                                Get Expert Audit
                                <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </div>

                        {/* Enhanced Trust Indicators */}
                        <div className="grid grid-cols-3 gap-4 md:gap-6 pt-12 max-w-xl">
                            <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-playfair text-gold mb-1">ISO</div>
                                <div className="text-xs md:text-sm text-offwhite/80 font-ibm">14064 Certified</div>
                            </div>
                            <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-playfair text-gold mb-1">GRI</div>
                                <div className="text-xs md:text-sm text-offwhite/80 font-ibm">Compliant</div>
                            </div>
                            <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-playfair text-gold mb-1">BRSR</div>
                                <div className="text-xs md:text-sm text-offwhite/80 font-ibm">Ready</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;