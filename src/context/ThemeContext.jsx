import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

/**
 * Theme provider. The app's DEFAULT (and identity) look is the original dark
 * navy + gold. The toggle switches to a `.light` variant. We store the theme
 * in localStorage ('sustainsutra-theme'). On first visit we default to dark.
 *
 * Implementation: the `.dark` class is always present (it mirrors :root); the
 * `.light` class is toggled to switch to the light variant.
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        const stored = localStorage.getItem('sustainsutra-theme');
        if (stored === 'light' || stored === 'dark') return stored;
        return 'dark'; // default to the original navy + gold look
    });

    useEffect(() => {
        const root = document.documentElement;
        // Always keep .dark on (it mirrors :root). Toggle .light for the alt.
        root.classList.add('dark');
        if (theme === 'light') {
            root.classList.add('light');
        } else {
            root.classList.remove('light');
        }
        localStorage.setItem('sustainsutra-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};
