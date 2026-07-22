import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/i18n';
import { Globe } from 'lucide-react';

// Compact EN/हिं language toggle. Choice persists via i18next-browser-languagedetector
// (localStorage key 'i18nLang'). Rendered in the Header.
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const current = i18n.language?.startsWith('hi') ? 'hi' : 'en';

    const cycle = () => {
        const next = current === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(next);
    };

    return (
        <button
            onClick={cycle}
            className="inline-flex items-center gap-1.5 text-sm text-dimmed hover:text-gold transition-smooth px-2 py-1 rounded"
            aria-label={`Switch language to ${current === 'en' ? 'Hindi' : 'English'}`}
            title={current === 'en' ? 'हिन्दी में देखें' : 'View in English'}
        >
            <Globe size={16} />
            <span className="font-medium">{LANGUAGES.find(l => l.code === current)?.label}</span>
        </button>
    );
};

export default LanguageSwitcher;
