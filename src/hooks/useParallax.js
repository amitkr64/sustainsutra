import { useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Scroll-driven parallax hook.
 *
 * Tracks the scroll progress of `ref` (defaults to the page) and returns a
 * spring-smoothed MotionValue for the `y` offset. Pass `speed` to control how
 * fast the element moves (negative moves up, positive moves down; typical range
 * -1..1). Pass a target ref to scope the progress to that element's viewport
 * position (recommended for section-scoped parallax).
 *
 * Respects prefers-reduced-motion: returns a static MotionValue of 0.
 *
 * Usage:
 *   const ref = useRef(null);
 *   const y = useParallax(ref, -0.3);
 *   <motion.div ref={ref} style={{ y }} />
 */
export const useParallax = (ref, speed = 0.3) => {
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Map scroll progress [0..1] to a pixel range scaled by speed.
    // 1000px gives a generous range; speed multiplies it.
    const raw = useTransform(scrollYProgress, [0, 1], ['0px', `${speed * 1000}px`]);
    const y = useSpring(raw, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return reduceMotion ? raw : y;
};

export default useParallax;
