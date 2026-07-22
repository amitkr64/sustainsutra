import React, { useEffect, useRef, useState } from 'react';
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useReducedMotion,
} from 'framer-motion';

/**
 * Animates a number from 0 to `value` when it scrolls into view.
 *
 * Props:
 *   value   — the target number (e.g. 500, 2.5, 98)
 *   suffix  — appended after the number (e.g. '+', '%', 'M+')
 *   prefix  — prepended before the number
 *   decimals — number of decimal places (default 0)
 *   duration — seconds for the count (default 1.8)
 *
 * Respects prefers-reduced-motion: renders the final value immediately.
 */
const CountUp = ({ value, suffix = '', prefix = '', decimals = 0, duration = 1.8 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduceMotion = useReducedMotion();

    const count = useMotionValue(0);
    const spring = useSpring(count, { stiffness: 50, damping: 18, duration: duration * 1000 });
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        if (inView && !reduceMotion) {
            count.set(value);
        } else if (reduceMotion) {
            setDisplay(value.toFixed(decimals));
        }
    }, [inView, value, decimals, reduceMotion, count]);

    useEffect(() => {
        if (reduceMotion) return;
        const unsub = spring.on('change', (v) => {
            setDisplay(v.toFixed(decimals));
        });
        return () => unsub();
    }, [spring, decimals, reduceMotion]);

    return (
        <span ref={ref}>
            {prefix}{display}{suffix}
        </span>
    );
};

export default CountUp;
