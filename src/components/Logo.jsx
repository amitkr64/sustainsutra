import React from 'react';

/**
 * SustainSutra logo: the official brand mark — a stylized green "S" merged
 * with a leaf, symbolizing the fusion of technology and nature. The PNG has
 * a transparent background so it sits cleanly on any surface color.
 *
 * Props:
 *   size         — mark height in px (default 36)
 *   showWordmark — whether to render the "SustainSutra" text beside the mark
 *   className    — extra classes on the wrapping element
 */
const Logo = ({ size = 36, showWordmark = true, className = '' }) => (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
            src="/sustainsutra-logo.png"
            alt="SustainSutra"
            width={size}
            height={size}
            className="flex-shrink-0 object-contain"
            style={{ height: size }}
        />
        {showWordmark && (
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
                Sustain<span className="text-gold">Sutra</span>
            </span>
        )}
    </span>
);

export default Logo;
