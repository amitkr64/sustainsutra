import { useState, useEffect, useRef } from 'react';

/**
 * Mirrors the Header.jsx hide-on-scroll-down behaviour so sticky sub-bars
 * can tuck under the header when it is visible and rise to top-0 when it
 * hides. Returns true while the header should be visible.
 */
const useHeaderVisible = () => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollYRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            lastScrollYRef.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isHeaderVisible;
};

export default useHeaderVisible;
