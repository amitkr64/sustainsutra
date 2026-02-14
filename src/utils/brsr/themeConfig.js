export const SUSTAINSUTRA_THEME = {
  colors: {
    navy: '#0B0F0B',
    navyLight: '#121820',
    sage: '#1B4332',
    forest: '#161B16',
    gold: '#D4AF37',
    offwhite: '#F8FAFC',
    growth: '#74C69D',
    dimmed: '#A0AAB5',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    blue: '#3B82F6',
    pink: '#EC4899',
    purple: '#8B5CF6',
    cyan: '#06B6D4',
    emerald: '#10B981',
    orange: '#F97316',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #1B4332 0%, #161B16 100%)',
    gold: 'linear-gradient(135deg, #D4AF37 0%, #B8953C 100%)',
    success: 'linear-gradient(135deg, #74C69D 0%, #10B981 100%)',
    warning: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
    danger: 'linear-gradient(135deg, #F87171 0%, #EF4444 100%)',
  },
  shadows: {
    gold: '0 10px 30px -10px rgba(212, 175, 55, 0.2)',
    card: '0 4px 20px rgba(0, 0, 0, 0.1)',
    glow: '0 0 40px 10px rgba(212, 175, 55, 0.3)',
    cardGlow: '0 0 60px 15px rgba(116, 198, 157, 0.1)',
  },
  animations: {
    fadeIn: 'fadeIn 0.5s ease-out',
    slideUp: 'slideUp 0.3s ease-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1)',
    shimmer: 'shimmer 2s infinite linear',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },
  fontFamily: {
    sans: 'system-ui, -apple-system, sans-serif',
    serif: 'Georgia, serif',
    mono: 'ui-monospace, SFMono-Regular, monospace',
  },
};

export const themeClasses = {
  card: 'bg-navy-light/30 border border-white/10 rounded-3xl p-6',
  cardSm: 'bg-navy-light/30 border border-white/5 rounded-xl p-4',
  cardGlow: 'bg-navy-light/30 border border-white/10 rounded-3xl p-6 shadow-glow',
  primary: 'bg-gradient-to-br from-sage to-forest text-offwhite',
  gold: 'bg-gradient-to-br from-gold to-[#B8953C] text-navy',
  success: 'bg-gradient-to-br from-growth to-emerald-600 text-offwhite',
  warning: 'bg-gradient-to-br from-amber-400 to-amber-500 text-navy',
  danger: 'bg-gradient-to-br from-red-400 to-red-500 text-offwhite',
  text: 'text-offwhite',
  textDimmed: 'text-dimmed',
  textGold: 'text-gold',
  textGrowth: 'text-growth',
  textDanger: 'text-danger',
  textWarning: 'text-warning',
  textInfo: 'text-info',
};

export const getStatusColor = (status) => {
  const colors = {
    success: SUSTAINSUTRA_THEME.colors.success,
    warning: SUSTAINSUTRA_THEME.colors.warning,
    danger: SUSTAINSUTRA_THEME.colors.danger,
    info: SUSTAINSUTRA_THEME.colors.info,
  };
  return colors[status] || colors.info;
};

export const getSeverityColor = (severity) => {
  const colors = {
    critical: SUSTAINSUTRA_THEME.colors.danger,
    high: SUSTAINSUTRA_THEME.colors.warning,
    medium: SUSTAINSUTRA_THEME.colors.info,
    low: SUSTAINSUTRA_THEME.colors.growth,
  };
  return colors[severity] || colors.info;
};

export const getScoreColor = (score) => {
  if (score >= 80) return SUSTAINSUTRA_THEME.colors.success;
  if (score >= 60) return SUSTAINSUTRA_THEME.colors.warning;
  return SUSTAINSUTRA_THEME.colors.danger;
};
