import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Filter, Download, RefreshCw, ArrowRight, ChevronDown, ChevronUp, Maximize2, Minimize2, AlertTriangle, Flame, Award, Zap, Droplets, Leaf } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { MetricCard, ChartNoData, TrendArrow } from '../BRSRCharts/MetricCard';
import { SimpleAccordion } from '../BRSRCharts/SimpleAccordion';
import BRSRComparisonView from '../../BRSRShared/BRSRComparisonView';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const AnalyticsToolbar = ({ filters, onFilterChange, onRefresh, onExport, reports }) => {
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique financial years from uploaded reports
  const getAvailableYears = () => {
    if (!reports || reports.length === 0) return ['2024-25', '2023-24', '2022-23']; // Default fallback
    const years = [...new Set(reports.map(r => r.financialYear).filter(Boolean))];
    return years.sort((a, b) => b.localeCompare(a)); // Sort newest first
  };

  const filterOptions = [
    { id: 'years', label: 'Financial Years', type: 'multi-select', options: getAvailableYears() },
    { id: 'principles', label: 'Principles', type: 'multi-select', options: ['Principle 1', 'Principle 2', 'Principle 3', 'Principle 6', 'Principle 9'] },
    { id: 'metrics', label: 'Metrics', type: 'select', options: ['All Metrics', 'Energy Only', 'GHG Only', 'Social Only', 'Governance Only'] },
    { id: 'benchmark', label: 'Benchmark', type: 'select', options: ['None', 'Industry Average', 'Sector Average', 'Top Quartile'] },
  ];

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-2xl p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-white">Analytics Dashboard</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 bg-navy text-dimmed px-4 py-2 rounded-lg hover:text-white transition-colors border border-white/10">
              <Filter size={18} />
              <span className="text-sm">Filters</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button onClick={onRefresh} className="inline-flex items-center gap-2 bg-navy text-dimmed px-4 py-2 rounded-lg hover:text-white transition-colors border border-white/10">
              <RefreshCw size={18} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>
        <button onClick={onExport} className="inline-flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-lg font-bold hover:bg-gold/80 transition-all">
          <Download size={18} />
          <span className="text-sm">Export Data</span>
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-4"
          >
            <div className="pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filterOptions.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    <label className="text-sm font-semibold text-white">{filter.label}</label>
                    <select
                      className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold outline-none"
                      value={filters[filter.id] || filter.options[0]}
                      onChange={(e) => onFilterChange(filter.id, e.target.value)}
                    >
                      {filter.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TrendAnalysis = ({ data, metrics, reports }) => {
  // Build trend data from actual XBRL reports (year-over-year comparison)
  // Use standardized base unit fields: Energy=GJ, GHG=tCO2e, Water=KL
  const trendData = reports && reports.length > 0
    ? reports
        .sort((a, b) => (a.financialYear || '').localeCompare(b.financialYear || ''))
        .map(report => {
          const indicators = report.indicators || {};
          return {
            year: report.financialYear || 'N/A',
            energy: indicators.p6_energy_total_gj ||
                    indicators.p6_energy_total && indicators.p6_energy_total / 1000 ||
                    indicators.p6_e1_grand_total_fy && indicators.p6_e1_grand_total_fy / 1000 || 0,
            ghg: (indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1 || indicators.p6_scope1 || 0) +
                  (indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2 || indicators.p6_scope2 || 0) +
                  (indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3 || indicators.p6_scope3 || 0),
            water: indicators.p6_water_withdrawal || indicators.p6_e3_total_withdrawal_fy || 0,
            social: indicators.p3_total_employees || 0,
          };
        })
    : [];

  // Calculate year-over-year trends dynamically
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getTrendData = () => {
    if (trendData.length < 2) return null;
    const latest = trendData[trendData.length - 1];
    const previous = trendData[trendData.length - 2];

    return {
      energy: calculateTrend(latest.energy, previous.energy),
      ghg: calculateTrend(latest.ghg, previous.ghg),
      water: calculateTrend(latest.water, previous.water),
      social: calculateTrend(latest.social, previous.social),
    };
  };

  const trendPercentages = getTrendData();

  const metricKeys = ['energy', 'ghg', 'water', 'social'];
  const colors = {
    energy: SUSTAINSUTRA_THEME.colors.blue,
    ghg: SUSTAINSUTRA_THEME.colors.red,
    water: SUSTAINSUTRA_THEME.colors.cyan,
    social: SUSTAINSUTRA_THEME.colors.pink,
  };

  const renderTrendCard = (label, value) => {
    const isPositive = value >= 0;
    const isGoodTrend = label === 'Energy Trend' || label === 'Social Trend' ? isPositive : !isPositive;
    const colorClass = value === 0 ? 'text-gray-400' : (goodTrend ? 'text-emerald-400' : 'text-red-400');
    const Icon = value > 0 ? TrendingUp : (value < 0 ? TrendingDown : TrendingUp);

    return (
      <div className="text-center p-3 bg-navy rounded-xl border border-white/5">
        <div className="text-xs text-dimmed mb-1">{label}</div>
        <div className={`text-lg font-bold ${colorClass}`}>
          {value === 0 ? 'N/A' : `${isPositive ? '+' : ''}${value.toFixed(1)}%`}
        </div>
        {value !== 0 && <Icon size={16} className={`mx-auto ${colorClass}`} />}
      </div>
    );
  };

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6 relative">
      {trendData.length === 0 && <ChartNoData message="Upload XBRL reports to see trends" />}
      <h3 className="mb-6 font-bold text-emerald-400 text-sm uppercase tracking-wider">Year-over-Year Trend Analysis</h3>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
            <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
            <YAxis tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => value.toLocaleString('en-IN')} stroke="#64748B" strokeWidth={1.5} />
            <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value, name) => [value.toLocaleString('en-IN'), name]} />
            <Legend />
            {metricKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[key]}
                strokeWidth={2}
                dot={{ fill: colors[key], r: 5 }}
                name={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {trendPercentages ? (
          <>
            {renderTrendCard('Energy Trend', trendPercentages.energy)}
            {renderTrendCard('GHG Trend', trendPercentages.ghg)}
            {renderTrendCard('Water Trend', trendPercentages.water)}
            {renderTrendCard('Social Trend', trendPercentages.social)}
          </>
        ) : (
          <div className="col-span-4 text-center text-dimmed text-sm py-4">
            Upload at least 2 reports for different years to see trend analysis
          </div>
        )}
      </div>
    </div>
  );
};

const DrillDownPanel = ({ metric, onBack, currentReport }) => {
  // Build dynamic drill-down data from the current report's indicators
  const indicators = currentReport?.indicators || {};

  const drillDownData = {
    energy: {
      title: 'Energy Consumption Breakdown',
      breakdowns: [
        {
          name: 'Renewable - Electricity',
          value: indicators.p6_energy_renewable_electricity || indicators.p6_e1_renew_elec_fy || 0,
          unit: 'MWh'
        },
        {
          name: 'Renewable - Fuel',
          value: indicators.p6_energy_renewable_fuel || indicators.p6_e1_renew_fuel_fy || 0,
          unit: 'MWh'
        },
        {
          name: 'Renewable - Other',
          value: indicators.p6_energy_renewable_other || indicators.p6_e1_renew_other_fy || 0,
          unit: 'MWh'
        },
        {
          name: 'Non-Renewable - Electricity',
          value: indicators.p6_energy_non_renewable_electricity || indicators.p6_e1_non_renew_elec_fy || 0,
          unit: 'MWh'
        },
        {
          name: 'Non-Renewable - Fuel',
          value: indicators.p6_energy_non_renewable_fuel || indicators.p6_e1_non_renew_fuel_fy || 0,
          unit: 'MWh'
        },
        {
          name: 'Non-Renewable - Other',
          value: indicators.p6_energy_non_renewable_other || indicators.p6_e1_non_renew_other_fy || 0,
          unit: 'MWh'
        },
      ].filter(item => item.value > 0),
    },
    ghg: {
      title: 'GHG Emissions by Scope',
      breakdowns: [
        {
          name: 'Scope 1 - Direct Emissions',
          value: indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1_base || indicators.p6_scope1_base ||
                 indicators.p6_ghg_scope1 || indicators.p6_e7_scope1_fy || 0,
          unit: 'tCO2e'
        },
        {
          name: 'Scope 2 - Indirect (Energy)',
          value: indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2_base || indicators.p6_scope2_base ||
                 indicators.p6_ghg_scope2 || indicators.p6_e7_scope2_fy || 0,
          unit: 'tCO2e'
        },
        {
          name: 'Scope 3 - Other Indirect',
          value: indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3_base || indicators.p6_scope3_base ||
                 indicators.p6_ghg_scope3 || indicators.p6_l2_scope3_fy || 0,
          unit: 'tCO2e'
        },
      ].filter(item => item.value > 0),
    },
    water: {
      title: 'Water Consumption Breakdown',
      breakdowns: [
        {
          name: 'Total Withdrawal',
          value: indicators.p6_water_withdrawal || indicators.p6_e3_total_withdrawal_fy || 0,
          unit: 'KL'
        },
        {
          name: 'Total Consumption',
          value: indicators.p6_water_consumption || indicators.p6_e3_total_consumption_fy || 0,
          unit: 'KL'
        },
        {
          name: 'Water Recycled',
          value: indicators.p6_water_recycled || 0,
          unit: 'KL'
        },
        {
          name: 'Water Reused',
          value: indicators.p6_water_reused || 0,
          unit: 'KL'
        },
      ].filter(item => item.value > 0),
    },
    waste: {
      title: 'Waste Management Breakdown',
      breakdowns: [
        {
          name: 'Total Generated',
          value: indicators.p6_waste_total || indicators.p6_e9_total_generation_fy || 0,
          unit: 'Tonnes'
        },
        {
          name: 'Waste Recycled',
          value: indicators.p6_waste_recycled || indicators.p6_e9_recycled_fy || 0,
          unit: 'Tonnes'
        },
        {
          name: 'Waste Reused',
          value: indicators.p6_waste_reused || indicators.p6_e9_reused_fy || 0,
          unit: 'Tonnes'
        },
        {
          name: 'Waste Incinerated',
          value: indicators.p6_waste_incinerated || 0,
          unit: 'Tonnes'
        },
        {
          name: 'Waste Landfilled',
          value: indicators.p6_waste_landfill || 0,
          unit: 'Tonnes'
        },
      ].filter(item => item.value > 0),
    },
  };

  const data = drillDownData[metric];

  if (!data) {
    return (
      <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
        <div className="text-center text-dimmed">Select a metric to drill down</div>
      </div>
    );
  }

  const hasData = data.breakdowns && data.breakdowns.length > 0;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-dimmed hover:text-white transition-colors">
          <ArrowRight size={18} className="rotate-180" />
          <span className="text-sm">Back to Overview</span>
        </button>
        <h3 className="text-lg font-bold text-white">{data.title}</h3>
      </div>

      {!hasData ? (
        <div className="text-center text-dimmed py-8">
          No data available for {data.title.toLowerCase()}. Upload an XBRL file with this information.
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="mb-4 text-sm font-bold text-dimmed uppercase tracking-wider">Detailed Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.breakdowns.map((item, index) => (
                <div key={index} className="bg-navy p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white">{item.name}</span>
                    <span className="text-lg font-bold text-gold">{item.value.toLocaleString('en-IN')} {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary stats */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="mb-3 text-sm font-bold text-gold uppercase tracking-wider">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-navy-light/30 p-3 rounded-lg">
                <div className="text-xs text-dimmed">Total Items</div>
                <div className="text-lg font-bold text-white">{data.breakdowns.length}</div>
              </div>
              <div className="bg-navy-light/30 p-3 rounded-lg">
                <div className="text-xs text-dimmed">Total Value</div>
                <div className="text-lg font-bold text-emerald-400">
                  {data.breakdowns.reduce((sum, item) => sum + item.value, 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="bg-navy-light/30 p-3 rounded-lg">
                <div className="text-xs text-dimmed">Largest Category</div>
                <div className="text-sm font-bold text-white truncate">
                  {data.breakdowns.length > 0 ? data.breakdowns[0].name : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdvancedInsights = ({ reports }) => {
  // Calculate insights dynamically from reports
  const calculateInsights = () => {
    if (!reports || reports.length === 0) {
      return [
        {
          type: 'no-data',
          title: 'No Reports Available',
          description: 'Upload XBRL reports to see insights and analytics',
          icon: AlertTriangle,
          color: 'text-amber-400',
        },
      ];
    }

    const insights = [];

    // Find top performing company by ESG score
    const topReport = reports.reduce((top, report) =>
      (report.esgScore || 0) > (top?.esgScore || 0) ? report : top, null
    );
    if (topReport) {
      insights.push({
        type: 'performance',
        title: 'Top Performing Report',
        description: `${topReport.companyName || 'Unknown'} (ESG Score: ${topReport.esgScore?.toFixed(1) || 'N/A'})`,
        icon: Award,
        color: 'text-emerald-400',
      });
    }

    // Calculate average metrics
    const avgEnergy = reports.reduce((sum, r) => sum + (r.indicators?.p6_energy_total || 0), 0) / reports.length;
    const avgGHG = reports.reduce((sum, r) => sum + (
      (r.indicators?.p6_e7_scope1_fy_base || r.indicators?.p6_ghg_scope1 || 0) +
      (r.indicators?.p6_e7_scope2_fy_base || r.indicators?.p6_ghg_scope2 || 0)
    ), 0) / reports.length;
    const avgWater = reports.reduce((sum, r) => sum + (r.indicators?.p6_water_withdrawal || 0), 0) / reports.length;

    insights.push({
      type: 'average',
      title: 'Average Energy Consumption',
      description: `${avgEnergy.toFixed(0).toLocaleString('en-IN')} MWh across ${reports.length} report(s)`,
      icon: Zap,
      color: 'text-blue-400',
    });

    // Check for data quality issues
    const reportsWithMissingData = reports.filter(r => {
      const indicators = r.indicators || {};
      return !indicators.p6_energy_total || !indicators.p6_ghg_scope1;
    });
    if (reportsWithMissingData.length > 0) {
      insights.push({
        type: 'alert',
        title: 'Data Quality Alert',
        description: `${reportsWithMissingData.length} report(s) missing key indicators`,
        icon: AlertTriangle,
        color: 'text-amber-400',
      });
    }

    // Renewable energy analysis
    const totalRenewable = reports.reduce((sum, r) => sum + (r.indicators?.p6_energy_renewable_electricity || 0) + (r.indicators?.p6_energy_renewable_fuel || 0), 0);
    const totalEnergy = reports.reduce((sum, r) => sum + (r.indicators?.p6_energy_total || 0), 0);
    const renewablePercentage = totalEnergy > 0 ? (totalRenewable / totalEnergy) * 100 : 0;

    insights.push({
      type: 'renewable',
      title: 'Renewable Energy Share',
      description: `${renewablePercentage.toFixed(1)}% renewable energy across all reports`,
      icon: Leaf,
      color: renewablePercentage > 20 ? 'text-emerald-400' : 'text-amber-400',
    });

    return insights;
  };

  const insights = calculateInsights();

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <h3 className="mb-6 font-bold text-gold text-sm uppercase tracking-wider">Advanced Insights</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="bg-navy p-4 rounded-xl border border-white/5">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-navy ${insight.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white mb-1">{insight.title}</h4>
                  <p className="text-xs text-dimmed">{insight.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BRSRAnalytics = ({ reports, currentReport }) => {
  const [activeView, setActiveView] = useState('trends');
  const [drillDownMetric, setDrillDownMetric] = useState(null);

  const views = [
    { id: 'trends', label: 'Trend Analysis', icon: TrendingUp },
    { id: 'comparison', label: 'Compare Reports', icon: BarChart3 },
    { id: 'drilldown', label: 'Drill Down', icon: Maximize2 },
    { id: 'insights', label: 'Advanced Insights', icon: Award },
  ];

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    alert('Export functionality coming soon!');
  };

  const handleCompare = (selectedIds) => {
    setActiveView('comparison');
  };

  const handleDrillDown = (metric) => {
    setDrillDownMetric(metric);
    setActiveView('drilldown');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <AnalyticsToolbar
        filters={{ years: 'All', principles: 'All', metrics: 'All', benchmark: 'None' }}
        onFilterChange={() => {}}
        onRefresh={handleRefresh}
        onExport={handleExport}
        reports={reports}
      />

      {activeView === 'trends' && (
        <TrendAnalysis data={[]} metrics={{}} reports={reports} />
      )}

      {activeView === 'comparison' && (
        <BRSRComparisonView onBack={() => setActiveView('trends')} onCompare={() => {}} />
      )}

      {activeView === 'drilldown' && drillDownMetric ? (
        <DrillDownPanel metric={drillDownMetric} onBack={() => { setDrillDownMetric(null); setActiveView('trends'); }} currentReport={currentReport} />
      ) : (
        <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-8">
          <h3 className="mb-6 text-lg font-bold text-white text-center">Select Metric to Drill Down</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: 'energy', label: 'Energy', icon: Zap, color: 'text-blue-400' },
              { metric: 'ghg', label: 'GHG Emissions', icon: Flame, color: 'text-red-400' },
              { metric: 'water', label: 'Water', icon: Droplets, color: 'text-cyan-400' },
              { metric: 'waste', label: 'Waste', icon: Leaf, color: 'text-emerald-400' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.metric}
                  onClick={() => handleDrillDown(item.metric)}
                  className="p-4 bg-navy rounded-xl border border-white/5 hover:border-gold/30 transition-all text-center"
                >
                  <div className={'p-3 rounded-lg bg-navy ' + item.color + ' mb-2 mx-auto'}>
                    <Icon size={32} />
                  </div>
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeView === 'insights' && (
        <AdvancedInsights reports={reports} />
      )}

      <div className="bg-navy-light/20 border border-white/10 rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {views.map((view) => {
            const isActive = activeView === view.id;
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => {
                  if (view.id !== 'drilldown') setActiveView(view.id);
                }}
                disabled={view.id === 'drilldown'}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gold text-navy font-bold'
                    : 'bg-navy text-dimmed hover:text-white border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export { BRSRAnalytics };
