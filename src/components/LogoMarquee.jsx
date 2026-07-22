import React from 'react';
import { Building2, Factory, Leaf, Zap, Recycle, Globe2 } from 'lucide-react';

/**
 * Auto-scrolling "trusted by" logo strip. Adds credibility + motion.
 *
 * NOTE: these are GENERIC industry icons as placeholders. Replace the `logos`
 * array with real client/partner names + logos before this is public-facing.
 * Fabricated client logos would be a credibility risk.
 */
const logos = [
    { name: 'Textile Corp', icon: Factory },
    { name: 'GreenEnergy', icon: Zap },
    { name: 'EcoMaterials', icon: Leaf },
    { name: 'RecyclePro', icon: Recycle },
    { name: 'GlobalInfra', icon: Building2 },
    { name: 'EarthSync', icon: Globe2 },
];

const LogoMarquee = () => {
    return (
        <section className="border-y border-border bg-secondary/30 py-10">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Trusted by organizations across industries
            </p>
            <div className="relative overflow-hidden">
                {/* fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
                <div className="flex w-max animate-[marquee_25s_linear_infinite]">
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <div
                            key={i}
                            className="mx-8 flex items-center gap-2.5 text-muted-foreground/70"
                        >
                            <logo.icon size={22} className="flex-shrink-0" />
                            <span className="whitespace-nowrap text-lg font-bold tracking-tight">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
            `}</style>
        </section>
    );
};

export default LogoMarquee;
