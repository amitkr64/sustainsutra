import React from 'react';

/**
 * SustainSutra logo: a stylized "S" that doubles as a leaf, rendered in a
 * deep-green → growth-green gradient with subtle cyan circuit nodes that merge
 * nature with technology. Paired with the "SustainSutra" wordmark.
 *
 * Props:
 *   size         — mark size in px (default 32)
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
                <linearGradient id="leafSGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2D5016" />
                    <stop offset="60%" stopColor="#3B7A27" />
                    <stop offset="100%" stopColor="#4CAF50" />
                </linearGradient>
            </defs>

            {/* Circuit lines radiating from center (subtle tech motif) */}
            <g stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.35">
                <path d="M 50 15 L 50 8" />
                <path d="M 50 85 L 50 92" />
                <path d="M 15 50 L 8 50" />
                <path d="M 85 50 L 92 50" />
                <path d="M 25 25 L 18 18" />
                <path d="M 75 75 L 82 82" />
                <path d="M 75 25 L 82 18" />
                <path d="M 25 75 L 18 82" />
            </g>

            {/* Cyan circuit nodes */}
            <g fill="#00BCD4">
                <circle cx="50" cy="6" r="2" />
                <circle cx="50" cy="94" r="2" />
                <circle cx="6" cy="50" r="2" />
                <circle cx="94" cy="50" r="2" />
                <circle cx="16" cy="16" r="1.5" />
                <circle cx="84" cy="84" r="1.5" />
                <circle cx="84" cy="16" r="1.5" />
                <circle cx="16" cy="84" r="1.5" />
            </g>

            {/* Stylized S / Leaf hybrid (the brand mark) */}
            <path
                d="M 68 25
                   C 58 18, 42 22, 35 32
                   C 30 40, 35 48, 45 50
                   C 55 52, 68 55, 65 68
                   C 62 78, 50 82, 38 78
                   C 32 75, 28 70, 30 64"
                fill="none"
                stroke="url(#leafSGrad)"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            {/* Leaf center vein */}
            <path
                d="M 48 28 L 48 72"
                stroke="#4CAF50"
                stroke-width="1.5"
                opacity="0.6"
            />
        </svg>
        {showWordmark && (
            <span className="text-xl font-extrabold tracking-tight text-foreground">
                Sustain<span className="text-gradient">Sutra</span>
            </span>
        )}
    </span>
);

export default Logo;
