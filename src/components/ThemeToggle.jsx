import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// Sun/Moon theme toggle. Rendered in the Header next to the language switcher.
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme !== 'light';

    return (
        <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

export default ThemeToggle;
