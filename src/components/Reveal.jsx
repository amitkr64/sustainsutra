import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Wraps children and reveals them (fade + rise) when they scroll into view.
 * The one consistent entrance pattern across the app. Respects
 * prefers-reduced-motion (renders immediately, no transform).
 *
 * Props:
 *   as       — element tag to render (default 'div')
 *   variant  — a framer-motion variant for the entrance (default fadeUp)
 *   delay    — seconds to delay the entrance
 *   className — passed through
 */
const Reveal = ({
    as: Tag = 'div',
    variant = fadeUp,
    delay = 0,
    className,
    children,
    ...rest
}) => {
    const reduceMotion = useReducedMotion();
    const MotionTag = motion[Tag] || motion.div;

    if (reduceMotion) {
        return <Tag className={className} {...rest}>{children}</Tag>;
    }

    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
                hidden: variant.hidden,
                visible: { ...variant.visible, transition: { ...variant.visible.transition, delay } },
            }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

export default Reveal;
