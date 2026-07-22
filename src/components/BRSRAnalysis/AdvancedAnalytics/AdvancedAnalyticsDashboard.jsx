import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, Database, Target, AlertTriangle, Info, ChevronDown, ChevronUp, RefreshCw, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';
import { useBRSRMetrics } from '../../../hooks/useBRSRAnalysis';
import { formatNumber, formatPercent } from '../../../utils/brsr/numberFormat';

const KPICard = ({ 
  title, 
  value, 
  target, 
  unit = '', 
  trend, 
  status = 'good',
  description,
  sparklineData,
  showSparkline = true 
}) => {
  const statusConfig = {
    good: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    warning: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    danger: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    info: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  };

  const config = statusConfig[status] || statusConfig.info;

  const getTrendIcon = () => {
    if (!trend || trend === 0) return null;
    if (trend > 0) return <TrendingUp size={16} className="text-emerald-400" />;
    return <TrendingDown size={16} className="text-red-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`${config.bg} border ${config.border} p-6 rounded-2xl`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="text-sm text-dimmed mb-1 uppercase tracking-wider">{title}</div>
          <div className="text-3xl font-bold text-white">{value.toLocaleString('en-IN')}</div>
          {unit && <span className="text-lg ml-1 text-white/80">{unit}</span>}
        </div>
        <div className="flex items-center gap-4">
          {target && (
            <div className="text-right">
              <div className="text-xs text-dimmed mb-1">Target</div>
              <div className="text-lg font-bold text-white">{target.toLocaleString('en-IN')}</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            {showSparkline && sparklineData && (
              <div className="w-24 h-12">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <path
                    d={sparklineData}
                    stroke={config.color}
                    fill="none"
                    strokeWidth={2}
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      {description && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-blue-400" />
            <p className="text-sm text-dimmed">{description}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ForecastChart = ({ data, title, unit = '', type = 'line' }) => {
  const [timeRange, setTimeRange] = useState('12m');
  const ranges = [
    { id: '3m', label: '3 Months' },
    { id: '6m', label: '6 Months' },
    { id: '12m', label: '1 Year' },
    { id: '2y', label: '2 Years' },
    ];

  const filteredData = useMemo(() => {
    const months = parseInt(timeRange);
    return data.slice(-months);
  }, [data, timeRange]);

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 bg-navy border border-white/10 rounded-lg p-1">
            {ranges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range.id 
                    ? 'bg-gold text-navy font-bold'
                    : 'text-dimmed hover:text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <RefreshCw size={18} className="text-dimmed" />
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
              stroke="#64748B"
              strokeWidth={1.5}
            />
            <YAxis
              tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => value.toLocaleString('en-IN')}
              stroke="#64748B"
              strokeWidth={1.5}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0A192F', border: 'none', borderRadius: '8px' }}
              formatter={(value, name, props) => {
                if (props && props.payload) {
                  const { metric } = props.payload;
                  return [metric ? `${metric.toLocaleString('en-IN')} ${unit}` : value.toLocaleString('en-IN'), name];
                }
                return [value.toLocaleString('en-IN'), name];
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke={SUSTAINSUTRA_THEME.colors.emerald}
              strokeWidth={2}
              dot={{ fill: SUSTAINSUTRA_THEME.colors.emerald, strokeWidth: 2, r: 4 }}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke={SUSTAINSUTRA_THEME.colors.gold}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: SUSTAINSUTRA_THEME.colors.gold, strokeWidth: 2, r: 4 }}
              name="Forecast"
            />
            {type === 'area' && (
              <Area
                type="monotone"
                dataKey="confidence_upper"
                stroke="none"
                fill={SUSTAINSUTRA_THEME.colors.cyan}
                fillOpacity={0.1}
                name="Upper Confidence"
              />
            )}
            {type === 'area' && (
              <Area
                type="monotone"
                dataKey="confidence_lower"
                stroke="none"
                fill={SUSTAINSUTRA_THEME.colors.cyan}
                fillOpacity={0.1}
                name="Lower Confidence"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const PredictiveModel = ({ 
  title, 
  modelType, 
  accuracy, 
  lastTrained, 
  nextRetrain,
  metrics,
  predictions,
  onRetrain 
}) => {
  const [expanded, setExpanded] = useState(false);

  const modelTypeIcons = {
    'linear': Database,
    'tree': Zap,
    'neural': Target,
    'ensemble': AlertTriangle,
  };

  const Icon = modelTypeIcons[modelType] || Database;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-navy-light/30 border border-white/10 rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-${modelType === 'neural' ? 'purple' : modelType === 'ensemble' ? 'amber' : 'emerald'}-500/20`}>
            <Icon size={20} className={modelType === 'neural' ? 'text-purple-400' : modelType === 'ensemble' ? 'text-amber-400' : 'text-emerald-400'} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <div className="text-xs text-dimmed">{modelType} Model</div>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            accuracy >= 90 ? 'bg-emerald-500/20 text-emerald-400' :
            accuracy >= 75 ? 'bg-amber-500/20 text-amber-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {accuracy}% Accurate
          </span>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-2 text-sm text-dimmed">
          <span>Last trained: {lastTrained}</span>
          <span className="text-emerald-400">•</span>
          <span>Next retrain: {nextRetrain}</span>
        </div>
        {expanded ? <ChevronUp size={18} className="text-dimmed" /> : <ChevronDown size={18} className="text-dimmed" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="p-4 bg-navy border border-white/10 rounded-xl">
                  <div className="text-sm text-dimmed mb-1">{metric.label}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{metric.value.toLocaleString('en-IN')}</span>
                    <span className={`text-sm font-medium ${
                      metric.trend > 0 ? 'text-emerald-400' : 
                      metric.trend < 0 ? 'text-red-400' : 'text-dimmed'
                    }`}>
                      {metric.trend > 0 ? '+' : ''}{Math.abs(metric.trend)}%
                    </span>
                  </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-navy border border-white/10 rounded-xl">
              <h4 className="text-sm font-semibold text-white mb-3">Predictions</h4>
              <div className="space-y-2">
                {predictions.map((pred, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-navy-light/30 rounded-lg">
                    <span className="text-sm text-white">{pred.period}</span>
                    <span className="text-xl font-bold text-gold">{pred.value.toLocaleString('en-IN')}</span>
                    <span className={`text-sm font-medium ${
                      pred.confidence >= 80 ? 'text-emerald-400' :
                      pred.confidence >= 60 ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {pred.confidence}% confidence
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onRetrain}
              className="w-full flex items-center justify-center gap-2 bg-gold text-navy px-6 py-3 rounded-xl font-bold hover:bg-gold/80 transition-all"
            >
              <Zap size={20} />
              Retrain Model
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AdvancedAnalyticsDashboard = ({ report }) => {
  const [activeView, setActiveView] = useState('kpis');
  const metrics = useBRSRMetrics(report);
  const indicators = report?.indicators || {};
  const prevIndicators = indicators.prev_year || {};

  const views = [
    { id: 'kpis', label: 'KPIs', icon: Database },
    { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
  ];

  // Calculate dynamic KPI data based on actual report data
  const kpiData = useMemo(() => {
    const esgScore = report?.esgScore || report?.metrics?.p2_score || 0;
    const energyTotal = metrics?.energy?.total || 0;
    const energyIntensity = metrics?.energy?.intensity || 0;
    const energyTrend = metrics?.energy?.trend || 0;
    const ghgTotal = metrics?.ghg?.total || 0;
    const ghgTrend = metrics?.ghg?.trend || 0;
    const genderDiversity = metrics?.social?.genderDiversity || 0;
    const renewableShare = metrics?.energy?.renewableShare || 0;
    const wasteRecyclingRate = metrics?.waste?.recyclingRate || 0;
    const dataQualityScore = report?.dataQuality?.score || 0;

    // Calculate compliance rate from regulatory scores
    const p2Score = report?.metrics?.p2_score || 0;
    const p4Score = report?.metrics?.p4_score || 0;
    const p5Score = report?.metrics?.p5_score || 0;
    const p7Score = report?.metrics?.p7_score || 0;
    const complianceRate = (p2Score + p4Score + p5Score + p7Score) / 4;

    // Helper function to determine status based on value vs target
    const getStatus = (value, target, inverse = false) => {
      if (!target) return 'info';
      const ratio = value / target;
      if (inverse) {
        return ratio <= 1 ? 'good' : ratio <= 1.2 ? 'warning' : 'danger';
      }
      return ratio >= 1 ? 'good' : ratio >= 0.8 ? 'warning' : 'danger';
    };

    return [
      {
        title: 'ESG Score',
        value: esgScore,
        target: 75,
        unit: '',
        trend: 0,
        status: getStatus(esgScore, 75),
        description: `Overall ESG performance score`,
        sparklineData: undefined
      },
      {
        title: 'Energy Intensity',
        value: energyIntensity,
        target: 0.5,
        unit: 'GJ/₹ Cr',
        trend: energyTrend,
        status: getStatus(energyIntensity, 0.5, true),
        description: energyIntensity > 0.5 ? 'Above industry benchmark' : 'Within efficient range',
      },
      {
        title: 'GHG Emissions',
        value: ghgTotal,
        target: 10000,
        unit: 'tCO2e',
        trend: ghgTrend,
        status: getStatus(ghgTotal, 10000, true),
        description: ghgTrend < 0 ? 'Emissions trending downward' : 'Emissions trending upward',
      },
      {
        title: 'Renewable Energy',
        value: renewableShare,
        target: 50,
        unit: '%',
        trend: 0,
        status: getStatus(renewableShare, 50),
        description: renewableShare >= 50 ? 'On track for renewable goals' : 'Increasing renewable capacity',
      },
      {
        title: 'Waste Recycling',
        value: wasteRecyclingRate,
        target: 75,
        unit: '%',
        trend: 0,
        status: getStatus(wasteRecyclingRate, 75),
        description: wasteRecyclingRate >= 75 ? 'Excellent waste management' : 'Improving recycling rate',
      },
      {
        title: 'Gender Diversity',
        value: genderDiversity,
        target: 25,
        unit: '%',
        trend: 0,
        status: getStatus(genderDiversity, 25),
        description: genderDiversity >= 25 ? 'Above regulatory minimum' : 'Working towards diversity goals',
      },
      {
        title: 'Compliance Rate',
        value: complianceRate,
        target: 100,
        unit: '%',
        trend: 0,
        status: getStatus(complianceRate, 100),
        description: `Regulatory compliance across all principles`,
      },
      {
        title: 'Data Quality',
        value: dataQualityScore,
        target: 90,
        unit: '',
        trend: 0,
        status: getStatus(dataQualityScore, 90),
        description: dataQualityScore >= 90 ? 'High quality data' : 'Data completeness improving',
      },
    ].filter(kpi => kpi.value > 0 || kpi.title === 'ESG Score'); // Filter out completely empty KPIs
  }, [report, metrics]);

  // Dynamic forecast data based on historical trends (placeholder for now - would need historical data)
  const forecastData = useMemo(() => {
    const currentGHG = metrics?.ghg?.total || 0;
    const trend = metrics?.ghg?.trend || 0;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Generate simple forecast based on current trend
    return months.map((month, index) => ({
      month,
      actual: index === 0 ? currentGHG : null,
      forecast: currentGHG * (1 + (trend / 100) * (index + 1)),
      confidence_upper: currentGHG * (1 + (trend / 100 + 0.1) * (index + 1)),
      confidence_lower: currentGHG * (1 + (trend / 100 - 0.1) * (index + 1)),
    }));
  }, [metrics]);

  // Dynamic AI Insights based on actual data
  const aiInsights = useMemo(() => {
    const insights = [];
    const energyTrend = metrics?.energy?.trend || 0;
    const ghgTrend = metrics?.ghg?.trend || 0;
    const renewableShare = metrics?.energy?.renewableShare || 0;
    const dataQualityScore = report?.dataQuality?.score || 0;

    if (energyTrend > 5) {
      insights.push({
        icon: AlertTriangle,
        color: 'text-amber-400',
        title: 'Energy Alert',
        description: `Energy consumption increased by ${energyTrend.toFixed(1)}% compared to previous period. Consider efficiency initiatives.`,
      });
    }

    if (ghgTrend < 0) {
      insights.push({
        icon: Target,
        color: 'text-emerald-400',
        title: 'Emission Reduction',
        description: `GHG emissions decreased by ${Math.abs(ghgTrend).toFixed(1)}%. On track for reduction targets.`,
      });
    }

    if (renewableShare >= 50) {
      insights.push({
        icon: Zap,
        color: 'text-emerald-400',
        title: 'Clean Energy Milestone',
        description: `${renewableShare.toFixed(1)}% of energy from renewable sources. Exceeding industry benchmarks.`,
      });
    }

    if (dataQualityScore >= 80) {
      insights.push({
        icon: Database,
        color: 'text-blue-400',
        title: 'Data Quality',
        description: `Data completeness score: ${dataQualityScore}/100. High quality ESG disclosures.`,
      });
    }

    // Add default insights if none generated
    if (insights.length === 0) {
      insights.push({
        icon: Info,
        color: 'text-blue-400',
        title: 'Data Analysis',
        description: 'Upload more reports to enable trend analysis and AI-powered insights.',
      });
    }

    return insights.slice(0, 3);
  }, [metrics, report]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex gap-4 mb-6">
        {views.map(view => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeView === view.id
                  ? 'bg-gold text-navy'
                  : 'bg-navy-light/30 text-dimmed hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span>{view.label}</span>
            </button>
          );
        })}
      </div>
      <button className="ml-auto px-4 py-2 bg-navy-light/30 text-dimmed hover:bg-white/10 rounded-lg border border-white/10 transition-colors">
        <Download size={18} />
        Export Analytics
      </button>

      {activeView === 'kpis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>
      )}

      {activeView === 'forecasting' && kpiData.length > 0 && (
        <ForecastChart
          data={forecastData}
          title={`${kpiData.find(k => k.title.includes('GHG'))?.title || 'GHG Emissions'} Forecast`}
          unit="tCO2e"
          type="line"
        />
      )}

      <div className="bg-navy-light/20 border border-white/10 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-4 bg-navy border border-white/10 rounded-xl">
                <Icon size={24} className={insight.color + ' mb-2'} />
                <div className="text-sm text-white font-semibold mb-1">{insight.title}</div>
                <p className="text-sm text-dimmed">{insight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export { AdvancedAnalyticsDashboard };
