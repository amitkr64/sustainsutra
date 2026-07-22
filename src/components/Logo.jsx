import React from 'react';

/**
 * SustainSutra logo: an abstract leaf-mark (two arcs forming a leaf + a growth
 * vein) in the teal→emerald brand gradient, paired with the wordmark.
 *
 * Props:
 *   size        — mark size in px (default 32)
 *   showWordmark — whether to render the "SustainSutra" text beside the mark
 *   className    — extra classes on the wrapping element
 */
const Logo = ({ size = 32, showWordmark = true, className = '' }) => (
    <span className={`inline-flex items-center gap-2 ${className}`}>
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="flex-shrink-0"
        >
            <defs>
                <linearGradient id="logoLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8941F" />
                </linearGradient>
            </defs>
            <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#logoLeafGrad)" />
            {/* Leaf body */}
            <path d="M 30 70 Q 30 35, 65 30 Q 70 65, 30 70 Z" fill="white" fillOpacity="0.95" />
            {/* Growth vein */}
            <path d="M 32 68 Q 45 55, 63 32" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {showWordmark && (
            <span className="text-xl font-extrabold tracking-tight text-foreground">
                Sustain<span className="text-gradient">Sutra</span>
            </span>
        )}
    </span>
);

export default Logo;
