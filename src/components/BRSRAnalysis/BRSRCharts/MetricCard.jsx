import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const MetricCard = ({
  value,
  unit = '',
  label,
  icon: Icon,
  trend,
  target,
  status,
  subtext,
  sparkline,
  size = 'md',
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const valueSizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const getStatusColor = () => {
    if (status) return status;
    if (target && target.value !== undefined) {
      if (value >= target.value) return 'success';
      if (value >= target.value * 0.8) return 'warning';
      return 'danger';
    }
    return 'info';
  };

  const statusColor = getStatusColor();
  const colorClass = {
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
    info: 'text-blue-400',
  }[statusColor];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        bg-navy-light/30 border border-white/10 rounded-2xl
        ${sizeClasses[size]} ${className}
        ${onClick ? 'cursor-pointer hover:border-gold/30' : ''}
        transition-all
      `}
    >
      {Icon && (
        <div className={`flex items-center justify-between mb-3`}>
          <Icon className={`text-${statusColor === 'success' ? 'emerald' : statusColor === 'warning' ? 'amber' : statusColor === 'danger' ? 'red' : 'blue'}-400`} size={24} />
          {trend !== undefined && <TrendArrow value={trend} />}
        </div>
      )}

      <div className="mb-2">
        <div className={`font-mono font-bold ${valueSizeClasses[size]} ${colorClass}`}>
          {value !== undefined && value !== null
            ? (typeof value === 'number' && value > 1000
              ? value.toLocaleString('en-IN', { maximumFractionDigits: 1 })
              : value)
            : '—'}
          {unit && <span className={`text-lg ml-1 ${colorClass}`}>{unit}</span>}
        </div>
      </div>

      {label && (
        <div className="text-sm text-dimmed uppercase tracking-wider mb-1">
          {label}
        </div>
      )}

      {target && target.value !== undefined && (
        <div className="flex items-center gap-2 text-xs mt-2">
          <span className="text-dimmed">Target:</span>
          <span className="font-mono text-gold">{target.value}</span>
          {target.label && <span className="text-dimmed">({target.label})</span>}
        </div>
      )}

      {subtext && (
        <div className="text-xs text-dimmed mt-2">
          {subtext}
        </div>
      )}

      {sparkline && (
        <div className="mt-3 h-16">
          {sparkline}
        </div>
      )}
    </motion.div>
  );
};

const TrendArrow = ({ value, size = 16, showLabel = false }) => {
  // Convert string sizes to pixel values
  const sizeMap = { sm: 14, md: 18, lg: 24 };
  const iconSize = typeof size === 'string' ? (sizeMap[size] || 16) : size;

  if (value === undefined || value === null || value === 0) {
    return (
      <div className="flex items-center gap-1">
        <Minus size={iconSize} className="text-dimmed" />
        {showLabel && <span className="text-xs text-dimmed">0%</span>}
      </div>
    );
  }

  const isPositive = value > 0;
  const colorClass = isPositive ? 'text-emerald-400' : 'text-red-400';
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const formattedValue = Math.abs(value).toFixed(1) + '%';

  return (
    <div className={`flex items-center gap-1 ${colorClass}`}>
      <Icon size={iconSize} />
      {showLabel && <span className="text-xs font-semibold">{formattedValue}</span>}
    </div>
  );
};


const ChartNoData = ({ message = 'No data reported for this period' }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-light/80 rounded-3xl">
    <div className="w-16 h-16 border-4 border-dashed border-white/20 rounded-full mb-3"></div>
    <div className="text-sm text-dimmed text-center px-8">{message}</div>
  </div>
);

const ScoreBreakdownBar = ({ label, score, max = 100, threshold = 80, showLabel = true }) => {
  const percentage = Math.min((score / max) * 100, 100);
  const colorClass = score >= threshold ? 'from-growth to-emerald-600' : score >= threshold * 0.6 ? 'from-amber-400 to-amber-500' : 'from-red-400 to-red-500';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        {showLabel && <span className="text-sm text-dimmed">{label}</span>}
        <span className={`text-lg font-bold ${score >= threshold ? 'text-emerald-400' : score >= threshold * 0.6 ? 'text-amber-400' : 'text-red-400'}`}>
          {score.toFixed(0)}
        </span>
      </div>
      <div className="h-3 bg-navy rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colorClass}`}
        />
      </div>
    </div>
  );
};

export { MetricCard, TrendArrow, ChartNoData, ScoreBreakdownBar };
