import { useReducedMotion } from 'framer-motion';

/**
 * Shared framer-motion variants + helpers. Keep all motion consistent and DRY.
 * Every entrance/interaction variant lives here so the app has one motion
 * language. All are transform/opacity-only (GPU-accelerated, no layout thrash).
 */

// Entrance variants ---------------------------------------------------------

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Container that staggers its children's entrance.
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
    hidden: {},
    visible: {
        transition: { staggerChildren: stagger, delayChildren },
    },
});

// Micro-interactions --------------------------------------------------------

// Subtle lift + shadow on hover for cards. Use as `whileHover`.
export const hoverLift = {
    y: -6,
    transition: { duration: 0.2, ease: 'easeOut' },
};

export const tapScale = {
    scale: 0.97,
    transition: { duration: 0.1 },
};

// The standard viewport config for whileInView reveals (trigger once).
export const viewportOnce = { once: true, margin: '-80px' };

/**
 * Hook: returns whether the user prefers reduced motion. Use to short-circuit
 * parallax/entrance animations into static renders.
 */
export const usePrefersReducedMotion = () => useReducedMotion();
