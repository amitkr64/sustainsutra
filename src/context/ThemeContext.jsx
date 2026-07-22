import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

/**
 * Light/dark theme provider. Toggles the `.dark` class on <html>, persists the
 * choice to localStorage ('sustainsutra-theme'), and on first visit respects
 * the OS `prefers-color-scheme` setting. Default theme is light.
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'light';
        const stored = localStorage.getItem('sustainsutra-theme');
        if (stored === 'light' || stored === 'dark') return stored;
        // First visit: honor system preference, fall back to light.
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('sustainsutra-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

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
