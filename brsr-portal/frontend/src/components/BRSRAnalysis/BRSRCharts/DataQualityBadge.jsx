import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, XCircle } from 'lucide-react';
import { SUSTAINSUTRA_THEME, getScoreColor } from '../../../utils/brsr/themeConfig';

const DataQualityBadge = ({ score, size = 'md', showLabel = false, className = '' }) => {
  const getScoreInfo = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle2 };
    if (score >= 75) return { label: 'Good', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: Info };
    if (score >= 60) return { label: 'Fair', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: AlertTriangle };
    if (score >= 40) return { label: 'Poor', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: AlertCircle };
    return { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: XCircle };
  };

  const sizeClasses = {
    sm: { icon: 16, text: 'text-xs', padding: 'px-2 py-1' },
    md: { icon: 20, text: 'text-sm', padding: 'px-3 py-1.5' },
    lg: { icon: 24, text: 'text-base', padding: 'px-4 py-2' },
  };

  const scoreInfo = getScoreInfo(score);
  const sizeConfig = sizeClasses[size];
  const Icon = scoreInfo.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center gap-2
        ${scoreInfo.bg} ${scoreInfo.border} border rounded-full
        ${sizeConfig.padding} ${className}
        transition-all
      `}
    >
      <Icon size={sizeConfig.icon} className={scoreInfo.color} />
      <span className={`font-bold ${sizeConfig.text} ${scoreInfo.color}`}>
        {score.toFixed(0)}
      </span>
      {showLabel && (
        <span className={`text-xs ${scoreInfo.color} opacity-80`}>
          {scoreInfo.label}
        </span>
      )}
    </motion.div>
  );
};

const QualityGauge = ({ score, size = 200, showLabels = true, className = '' }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return { color: '#10B981', label: 'Excellent' };
    if (score >= 75) return { color: '#3B82F6', label: 'Good' };
    if (score >= 60) return { color: '#F59E0B', label: 'Fair' };
    if (score >= 40) return { color: '#F97316', label: 'Poor' };
    return { color: '#EF4444', label: 'Critical' };
  };

  const scoreInfo = getScoreColor(score);
  const circumference = 2 * Math.PI * 85;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#1B4332"
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={scoreInfo.color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-white">{score.toFixed(0)}</div>
        {showLabels && (
          <>
            <div className="text-xs text-dimmed uppercase tracking-wider mt-1">Quality Score</div>
            <div className="text-sm font-semibold mt-1" style={{ color: scoreInfo.color }}>
              {scoreInfo.label}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const IssueBadge = ({ severity, count, onClick }) => {
  const severityConfig = {
    critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: XCircle },
    high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: AlertCircle },
    medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: AlertTriangle },
    low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: Info },
  };

  const config = severityConfig[severity] || severityConfig.low;
  const Icon = config.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg border
        ${config.bg} ${config.border} ${config.color}
        transition-all cursor-pointer hover:border-opacity-50
      `}
    >
      <Icon size={18} />
      <span className="text-sm font-semibold">{severity.charAt(0).toUpperCase() + severity.slice(1)}</span>
      <span className="text-xs bg-navy/50 px-2 py-0.5 rounded-full">{count}</span>
    </motion.button>
  );
};

export { DataQualityBadge, QualityGauge, IssueBadge };
