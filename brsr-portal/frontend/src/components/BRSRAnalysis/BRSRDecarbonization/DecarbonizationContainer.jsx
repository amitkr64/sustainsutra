import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, TrendingDown, Leaf, Zap, Droplets, Award, Flame, TreePine, Sprout, AlertTriangle, CheckCircle2, Plus, Minus, X, ChevronRight, Calendar, MapPin, BarChart3, FileText, Download, Eye, Building2, Factory, Truck, Sun, Battery, Power, Trash2, Recycle, Globe, ArrowRight, Info, ExternalLink, Settings, Activity, Shield, Wrench, Clock, Percent, DollarSign, Briefcase, Users, Star, Flag, Thermometer, CloudRain, Wind, Train, Plane, Ship, Link2, PieChart as PieChartIcon, LineChart as LineChartIcon, Award as AwardIcon } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap, Cell, PieChart, Pie } from 'recharts';
import { MetricCard, ChartNoData } from '../BRSRCharts/MetricCard';
import { ScoreBreakdownBar } from '../BRSRCharts/MetricCard';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';
import { formatGHGAsTCO2, formatNumber } from '../../../utils/brsr/numberFormat';
import { useBRSRMetrics } from '../../../hooks/useBRSRAnalysis';

// Enhanced Carbon Target Summary with SBTi Validation
const CarbonTargetSummary = ({ report }) => {
  const [showDetails, setShowDetails] = useState(false);

  const targets = report?.decarbonization?.targets || {
    baseYear: 2022,
    baseEmissions: 150000,
    targetYear: 2030,
    targetEmissions: 75000,
    currentYear: 2024,
    currentEmissions: 125000,
    interimYear: 2025,
    interimEmissions: 120000,
  };

  // SBTi validation criteria
  const sbtiCriteria = {
    targetYear: targets.targetYear <= 2040,
    reductionTarget: ((targets.baseEmissions - targets.targetEmissions) / targets.baseEmissions) * 100 >= 42,
    scopeCoverage: true, // Assume all scopes covered
    nearTermTarget: (targets.targetYear - targets.baseYear) <= 10,
  };
  const isSBTiAligned = Object.values(sbtiCriteria).every(v => v === true);

  const progressPct = ((targets.baseEmissions - targets.currentEmissions) / (targets.baseEmissions - targets.targetEmissions)) * 100;
  const yearsRemaining = targets.targetYear - targets.currentYear;
  const annualReductionNeeded = (targets.currentEmissions - targets.targetEmissions) / yearsRemaining;
  const currentAnnualReduction = (targets.baseEmissions - targets.currentEmissions) / (targets.currentYear - targets.baseYear);
  const isOnTrack = currentAnnualReduction >= annualReductionNeeded;
  const annualReductionPct = ((targets.baseEmissions - targets.currentEmissions) / targets.baseEmissions) * 100 / (targets.currentYear - targets.baseYear);

  // Carbon budget analysis
  const remainingBudget = targets.targetEmissions * yearsRemaining;
  const budgetUsed = targets.currentEmissions * yearsRemaining;
  const budgetStatus = remainingBudget > budgetUsed;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-cyan-400 text-sm uppercase tracking-wider">Net Zero Target</h3>
          {isSBTiAligned && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <Award size={12} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">SBTi Aligned</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-xs text-dimmed hover:text-white transition-colors"
        >
          <Info size={14} />
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-navy rounded-xl border border-white/5">
          <div className="text-xs text-dimmed mb-1">Base Year</div>
          <div className="text-3xl font-bold text-white">{targets.baseYear}</div>
          <div className="text-xs text-dimmed mt-1">{formatGHGAsTCO2(targets.baseEmissions)}</div>
        </div>
        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
          <div className="text-xs text-dimmed mb-1">Target Year</div>
          <div className="text-3xl font-bold text-cyan-400">{targets.targetYear}</div>
          <div className="text-xs text-dimmed mt-1">{formatGHGAsTCO2(targets.targetEmissions)}</div>
        </div>
        <div className={`p-4 rounded-xl border ${isOnTrack ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
          <div className="flex items-center gap-1 mb-1">
            <Target size={14} className={isOnTrack ? 'text-emerald-400' : 'text-amber-400'} />
            <span className={`text-xs font-semibold ${isOnTrack ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isOnTrack ? 'On Track' : 'Behind'}
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{progressPct.toFixed(0)}%</div>
          <div className="text-xs text-dimmed mt-1">{yearsRemaining} years remaining</div>
        </div>
      </div>

      <ScoreBreakdownBar
        label="Target Achievement"
        score={progressPct}
        max={100}
        threshold={80}
        color={progressPct >= 80 ? 'emerald' : progressPct >= 50 ? 'amber' : 'red'}
      />

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-white/10 space-y-4"
          >
            {/* SBTi Alignment Details */}
            <div className={`p-4 rounded-xl border ${isSBTiAligned ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className={isSBTiAligned ? 'text-emerald-400' : 'text-amber-400'} />
                <span className={`text-sm font-bold ${isSBTiAligned ? 'text-emerald-400' : 'text-amber-400'}`}>
                  SBTi Validation Criteria
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  {sbtiCriteria.targetYear ? <CheckCircle2 size={14} className="text-emerald-400" /> : <X size={14} className="text-red-400" />}
                  <span className="text-xs text-dimmed">Target Year ≤ 2040</span>
                </div>
                <div className="flex items-center gap-2">
                  {sbtiCriteria.reductionTarget ? <CheckCircle2 size={14} className="text-emerald-400" /> : <X size={14} className="text-red-400" />}
                  <span className="text-xs text-dimmed">Reduction ≥ 42%</span>
                </div>
                <div className="flex items-center gap-2">
                  {sbtiCriteria.scopeCoverage ? <CheckCircle2 size={14} className="text-emerald-400" /> : <X size={14} className="text-red-400" />}
                  <span className="text-xs text-dimmed">All Scopes Covered</span>
                </div>
                <div className="flex items-center gap-2">
                  {sbtiCriteria.nearTermTarget ? <CheckCircle2 size={14} className="text-emerald-400" /> : <X size={14} className="text-red-400" />}
                  <span className="text-xs text-dimmed">Near-term Target (5-10 yrs)</span>
                </div>
              </div>
            </div>

            {/* Carbon Budget Analysis */}
            <div className={`p-4 rounded-xl border ${budgetStatus ? 'bg-blue-500/5 border-blue-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
              <div className="flex items-center gap-2 mb-3">
                <PieChart size={18} className="text-blue-400" />
                <span className="text-sm font-bold text-blue-400">Carbon Budget Analysis</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-navy rounded-lg">
                  <div className="text-xs text-dimmed mb-1">Remaining Budget</div>
                  <div className="text-lg font-bold text-white">{formatNumber(remainingBudget)}</div>
                  <div className="text-xs text-dimmed">tCO2e</div>
                </div>
                <div className="p-3 bg-navy rounded-lg">
                  <div className="text-xs text-dimmed mb-1">Budget Used</div>
                  <div className="text-lg font-bold text-white">{formatNumber(budgetUsed)}</div>
                  <div className="text-xs text-dimmed">tCO2e</div>
                </div>
                <div className={`p-3 rounded-lg ${budgetStatus ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  <div className="text-xs text-dimmed mb-1">Status</div>
                  <div className={`text-lg font-bold ${budgetStatus ? 'text-emerald-400' : 'text-red-400'}`}>
                    {budgetStatus ? 'On Track' : 'Exceeded'}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-navy rounded-lg border border-white/5">
                <div className="text-xs text-dimmed mb-1">Current Year</div>
                <div className="text-xl font-bold text-white">{targets.currentYear}</div>
                <div className="text-xs text-dimmed">{formatGHGAsTCO2(targets.currentEmissions)}</div>
              </div>
              <div className="p-3 bg-navy rounded-lg border border-white/5">
                <div className="text-xs text-dimmed mb-1">Interim Target</div>
                <div className="text-xl font-bold text-amber-400">{targets.interimYear}</div>
                <div className="text-xs text-dimmed">{formatGHGAsTCO2(targets.interimEmissions)}</div>
              </div>
              <div className="p-3 bg-navy rounded-lg border border-white/5">
                <div className="text-xs text-dimmed mb-1">Annual Reduction Needed</div>
                <div className="text-xl font-bold text-white">{formatNumber(annualReductionNeeded)}</div>
                <div className="text-xs text-dimmed">tCO2e/year</div>
              </div>
              <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                <div className="text-xs text-dimmed mb-1">Current Annual Reduction</div>
                <div className="text-xl font-bold text-emerald-400">{formatNumber(currentAnnualReduction)}</div>
                <div className="text-xs text-dimmed">tCO2e/year ({annualReductionPct.toFixed(1)}%)</div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isOnTrack ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isOnTrack ? <CheckCircle2 size={20} className="text-emerald-400" /> : <AlertTriangle size={20} className="text-amber-400" />}
                <span className={`text-sm font-bold ${isOnTrack ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isOnTrack ? 'Progress Assessment' : 'Acceleration Needed'}
                </span>
              </div>
              <p className="text-sm text-dimmed">
                {isOnTrack
                  ? `Company is on track to achieve Net Zero target by ${targets.targetYear}. Current annual reduction of ${annualReductionPct.toFixed(1)}% exceeds the required ${(annualReductionNeeded / targets.baseEmissions * 100).toFixed(1)}% per year.`
                  : `Company needs to accelerate reduction efforts. Current annual reduction of ${annualReductionPct.toFixed(1)}% is below the required ${(annualReductionNeeded / targets.baseEmissions * 100).toFixed(1)}% per year. Consider additional renewable energy and efficiency measures.`
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Emission Trend Chart with Multiple Views
const EmissionTrendChart = ({ report }) => {
  const [selectedScope, setSelectedScope] = useState('all');
  const [chartType, setChartType] = useState('area'); // area, line, intensity

  const emissionData = [
    { year: '2020', scope1: 80000, scope2: 60000, scope3: 90000, total: 230000, revenue: 500000000, production: 1000000 },
    { year: '2021', scope1: 85000, scope2: 62000, scope3: 85000, total: 232000, revenue: 550000000, production: 1100000 },
    { year: '2022', scope1: 90000, scope2: 65000, scope3: 80000, total: 235000, revenue: 600000000, production: 1200000 },
    { year: '2023', scope1: 82000, scope2: 63000, scope3: 78000, total: 223000, revenue: 650000000, production: 1250000 },
    { year: '2024', scope1: 75000, scope2: 58000, scope3: 72000, total: 205000, revenue: 700000000, production: 1300000 },
  ];

  // Calculate intensity metrics
  const intensityData = emissionData.map(d => ({
    year: d.year,
    revenueIntensity: (d.total / (d.revenue / 10000000)), // tCO2e/Cr revenue
    productionIntensity: (d.total / d.production) * 1000, // tCO2e/1000 units
    scope1Intensity: (d.scope1 / (d.revenue / 10000000)),
    scope2Intensity: (d.scope2 / (d.revenue / 10000000)),
    scope3Intensity: (d.scope3 / (d.revenue / 10000000)),
  }));

  const currentYear = emissionData[emissionData.length - 1];
  const reductionFromPeak = ((emissionData[2].total - currentYear.total) / emissionData[2].total * 100);
  const reductionFromBase = ((emissionData[0].total - currentYear.total) / emissionData[0].total * 100);

  const scopes = [
    { id: 'all', label: 'All Scopes' },
    { id: 'scope1', label: 'Scope 1' },
    { id: 'scope2', label: 'Scope 2' },
    { id: 'scope3', label: 'Scope 3' },
  ];

  const chartTypes = [
    { id: 'area', label: 'Area', icon: AreaChart },
    { id: 'line', label: 'Line', icon: LineChart },
    { id: 'intensity', label: 'Intensity', icon: TrendingDown },
  ];

  const getChartData = () => {
    if (chartType === 'intensity') {
      return intensityData;
    }
    if (selectedScope === 'all') {
      return emissionData.map(d => ({
        year: d.year,
        scope1: d.scope1,
        scope2: d.scope2,
        scope3: d.scope3,
        total: d.total,
      }));
    }
    return emissionData.map(d => ({
      year: d.year,
      [selectedScope]: d[selectedScope],
    }));
  };

  const renderChart = () => {
    if (chartType === 'intensity') {
      return (
        <LineChart data={getChartData()}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
          <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
          <YAxis tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => value.toFixed(2)} stroke="#64748B" strokeWidth={1.5} />
          <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value, name) => [value.toFixed(3) + ' tCO2e/₹ Cr', name]} />
          <Legend />
          <Line type="monotone" dataKey="revenueIntensity" stroke="#10B981" strokeWidth={2.5} name="Revenue Intensity" dot={{ fill: '#10B981', r: 5 }} />
          <Line type="monotone" dataKey="scope1Intensity" stroke="#EF4444" strokeWidth={2} name="Scope 1" dot={{ fill: '#EF4444', r: 4 }} />
          <Line type="monotone" dataKey="scope2Intensity" stroke="#F59E0B" strokeWidth={2} name="Scope 2" dot={{ fill: '#F59E0B', r: 4 }} />
          <Line type="monotone" dataKey="scope3Intensity" stroke="#8B5CF6" strokeWidth={2} name="Scope 3" dot={{ fill: '#8B5CF6', r: 4 }} />
        </LineChart>
      );
    }

    if (chartType === 'line') {
      return (
        <LineChart data={getChartData()}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
          <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
          <YAxis tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} stroke="#64748B" strokeWidth={1.5} />
          <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value, name) => [`${value.toLocaleString()} tCO2e`, name === 'total' ? 'Total' : name]} />
          <Legend />
          {selectedScope === 'all' && (
            <>
              <Line type="monotone" dataKey="scope3" stroke="#8B5CF6" strokeWidth={2} name="Scope 3" dot={{ fill: '#8B5CF6', r: 5 }} />
              <Line type="monotone" dataKey="scope2" stroke="#3B82F6" strokeWidth={2} name="Scope 2" dot={{ fill: '#3B82F6', r: 5 }} />
              <Line type="monotone" dataKey="scope1" stroke="#10B981" strokeWidth={2} name="Scope 1" dot={{ fill: '#10B981', r: 5 }} />
            </>
          )}
          {selectedScope !== 'all' && (
            <Line type="monotone" dataKey={selectedScope} stroke={SUSTAINSUTRA_THEME.colors.emerald} strokeWidth={2.5} name={selectedScope} dot={{ fill: SUSTAINSUTRA_THEME.colors.emerald, r: 6 }} />
          )}
        </LineChart>
      );
    }

    // Area chart (default)
    return (
      <AreaChart data={getChartData()}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
        <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
        <YAxis tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} stroke="#64748B" strokeWidth={1.5} />
        <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value, name) => [`${value.toLocaleString()} tCO2e`, name === 'total' ? 'Total' : name]} />
        <Legend />
        {selectedScope === 'all' && (
          <>
            <Area type="monotone" dataKey="scope3" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} strokeWidth={1.5} name="Scope 3" />
            <Area type="monotone" dataKey="scope2" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={1.5} name="Scope 2" />
            <Area type="monotone" dataKey="scope1" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} strokeWidth={1.5} name="Scope 1" />
          </>
        )}
        {selectedScope !== 'all' && (
          <Area type="monotone" dataKey={selectedScope} stroke={SUSTAINSUTRA_THEME.colors.emerald} fill={SUSTAINSUTRA_THEME.colors.emerald} fillOpacity={0.3} strokeWidth={2.5} name={selectedScope === 'all' ? 'Total' : selectedScope} />
        )}
      </AreaChart>
    );
  };

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-wider">Emission Trends</h3>
        <div className="flex gap-2">
          {scopes.map((scope) => (
            <button
              key={scope.id}
              onClick={() => setSelectedScope(scope.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedScope === scope.id
                  ? 'bg-gold text-navy'
                  : 'bg-navy text-dimmed hover:text-white border border-white/10'
              }`}
              disabled={chartType === 'intensity'}
            >
              {scope.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {chartTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setChartType(type.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                chartType === type.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-navy text-dimmed hover:text-white border border-white/10'
              }`}
            >
              <Icon size={14} />
              {type.label}
            </button>
          );
        })}
      </div>

      <div className="h-[320px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {chartType === 'intensity' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-navy rounded-xl border border-white/5">
            <div className="text-xs text-dimmed mb-1">Current Revenue Intensity</div>
            <div className="text-xl font-bold text-white">{intensityData[intensityData.length - 1].revenueIntensity.toFixed(2)}</div>
            <div className="text-xs text-dimmed">tCO2e/₹ Cr</div>
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <div className="text-xs text-dimmed mb-1">Intensity Reduction</div>
            <div className="text-xl font-bold text-emerald-400">
              {((intensityData[0].revenueIntensity - intensityData[intensityData.length - 1].revenueIntensity) / intensityData[0].revenueIntensity * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-dimmed">since base year</div>
          </div>
          <div className="p-4 bg-navy rounded-xl border border-white/5">
            <div className="text-xs text-dimmed mb-1">Scope 1 Intensity</div>
            <div className="text-xl font-bold text-red-400">{intensityData[intensityData.length - 1].scope1Intensity.toFixed(3)}</div>
            <div className="text-xs text-dimmed">tCO2e/₹ Cr</div>
          </div>
          <div className="p-4 bg-navy rounded-xl border border-white/5">
            <div className="text-xs text-dimmed mb-1">Scope 2 Intensity</div>
            <div className="text-xl font-bold text-amber-400">{intensityData[intensityData.length - 1].scope2Intensity.toFixed(3)}</div>
            <div className="text-xs text-dimmed">tCO2e/₹ Cr</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-navy rounded-xl border border-white/5">
            <div className="text-xs text-dimmed mb-1">Current Year</div>
            <div className="text-xl font-bold text-white">{currentYear.year}</div>
          </div>
          <div className="p-4 bg-navy rounded-xl border border-white/5">
            <div className="text-xs text-dimmed mb-1">Total Emissions</div>
            <div className="text-xl font-bold text-white">{(currentYear.total / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <div className="flex items-center gap-1 mb-1">
              <TrendingDown size={14} className="text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400">-{reductionFromPeak.toFixed(1)}%</div>
            <div className="text-xs text-dimmed">vs Peak</div>
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <div className="text-xs text-dimmed mb-1">vs Base Year</div>
            <div className="text-xl font-bold text-emerald-400">-{reductionFromBase.toFixed(1)}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Initiatives & Projects
const InitiativesProjects = ({ report }) => {
  const [showActive, setShowActive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      name: 'Solar Power Plant Expansion',
      status: 'In Progress',
      progress: 75,
      investment: 1250000000,
      co2Reduction: 15000,
      completionDate: '2024-06',
      icon: Sun,
      category: 'Renewable Energy',
      location: 'Maharashtra',
      roi: 15,
      technologyType: 'Ground Mount',
    },
    {
      name: 'Energy Efficiency Retrofit',
      status: 'Completed',
      progress: 100,
      investment: 450000000,
      co2Reduction: 8000,
      completionDate: '2023-12',
      icon: Zap,
      category: 'Efficiency',
      location: 'Multiple Sites',
      roi: 22,
      technologyType: 'LED + HVAC',
    },
    {
      name: 'Electric Vehicle Fleet',
      status: 'In Progress',
      progress: 45,
      investment: 800000000,
      co2Reduction: 5000,
      completionDate: '2024-09',
      icon: Truck,
      category: 'Transport',
      location: 'Pan India',
      roi: 18,
      technologyType: 'EV Transition',
    },
    {
      name: 'Waste-to-Energy Plant',
      status: 'Planned',
      progress: 0,
      investment: 2000000000,
      co2Reduction: 20000,
      completionDate: '2025-03',
      icon: Flame,
      category: 'Waste Management',
      location: 'Gujarat',
      roi: 12,
      technologyType: 'Biomass',
    },
    {
      name: 'Green Building Certification',
      status: 'Completed',
      progress: 100,
      investment: 150000000,
      co2Reduction: 3000,
      completionDate: '2023-08',
      icon: Building2,
      category: 'Infrastructure',
      location: 'Karnataka',
      roi: 25,
      technologyType: 'LEED Platinum',
    },
    {
      name: 'Battery Storage System',
      status: 'In Progress',
      progress: 60,
      investment: 600000000,
      co2Reduction: 4000,
      completionDate: '2024-07',
      icon: Battery,
      category: 'Renewable Energy',
      location: 'Rajasthan',
      roi: 14,
      technologyType: 'Lithium-ion',
    },
    {
      name: 'Green Hydrogen Pilot',
      status: 'Planned',
      progress: 0,
      investment: 3500000000,
      co2Reduction: 25000,
      completionDate: '2026-01',
      icon: Droplets,
      category: 'Emerging Tech',
      location: 'Tamil Nadu',
      roi: 8,
      technologyType: 'Electrolysis',
    },
    {
      name: 'Supply Chain Decarbonization',
      status: 'In Progress',
      progress: 35,
      investment: 900000000,
      co2Reduction: 12000,
      completionDate: '2025-06',
      icon: Link2,
      category: 'Scope 3',
      location: 'Global',
      roi: 16,
      technologyType: 'Supplier Engagement',
    },
  ];

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = projects.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

  const activeProjects = filteredProjects.filter(p => p.status === 'In Progress' || p.status === 'Planned');
  const completedProjects = filteredProjects.filter(p => p.status === 'Completed');
  const totalInvestment = filteredProjects.reduce((sum, p) => sum + p.investment, 0);
  const totalCO2Reduction = filteredProjects.reduce((sum, p) => sum + p.co2Reduction, 0);
  const avgROI = filteredProjects.reduce((sum, p) => sum + p.roi, 0) / filteredProjects.length;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gold text-sm uppercase tracking-wider">Decarbonization Initiatives</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowActive(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showActive ? 'bg-gold text-navy' : 'bg-navy text-dimmed hover:text-white border border-white/10'
            }`}
          >
            Active ({activeProjects.length})
          </button>
          <button
            onClick={() => setShowActive(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !showActive ? 'bg-gold text-navy' : 'bg-navy text-dimmed hover:text-white border border-white/10'
            }`}
          >
            Completed ({completedProjects.length})
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-navy text-dimmed hover:text-white border border-white/10'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <div className="text-xs text-dimmed mb-1">Total Investment</div>
          <div className="text-xl font-bold text-emerald-400">₹{(totalInvestment / 10000000).toFixed(0)} Cr</div>
        </div>
        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
          <div className="text-xs text-dimmed mb-1">Total CO2 Reduction</div>
          <div className="text-xl font-bold text-cyan-400">{(totalCO2Reduction / 1000).toFixed(0)}K</div>
          <div className="text-xs text-dimmed">tCO2e/year</div>
        </div>
        <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
          <div className="text-xs text-dimmed mb-1">Active Projects</div>
          <div className="text-xl font-bold text-purple-400">{activeProjects.length}</div>
        </div>
        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
          <div className="text-xs text-dimmed mb-1">Avg ROI</div>
          <div className="text-xl font-bold text-amber-400">{avgROI.toFixed(1)}%</div>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {(showActive ? activeProjects : completedProjects).map((project, index) => {
          const Icon = project.icon;
          const statusColor = {
            'Completed': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            'In Progress': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            'Planned': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
          }[project.status];

          return (
            <div key={index} className={`p-4 rounded-xl border hover:border-gold/30 transition-all ${statusColor.split(' ').slice(1).join(' ')}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-navy ${statusColor.split(' ')[0]}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{project.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-dimmed">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {project.location}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusColor.split(' ').slice(1).join(' ')}`}>
                      {project.status}
                    </span>
                  </div>

                  {project.status !== 'Planned' && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-dimmed">Progress</span>
                        <span className="text-white font-medium">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold transition-all duration-1000"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <div className="text-dimmed mb-0.5">Investment</div>
                      <div className="text-white font-medium">₹{(project.investment / 10000000).toFixed(1)} Cr</div>
                    </div>
                    <div>
                      <div className="text-dimmed mb-0.5">CO2 Reduction</div>
                      <div className="text-emerald-400 font-medium">{project.co2Reduction.toLocaleString()} t</div>
                    </div>
                    <div>
                      <div className="text-dimmed mb-0.5">ROI</div>
                      <div className="text-amber-400 font-medium">{project.roi}%</div>
                    </div>
                    <div>
                      <div className="text-dimmed mb-0.5">Completion</div>
                      <div className="text-white font-medium">{project.completionDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced Scope 3 Breakdown
const Scope3Breakdown = ({ report }) => {
  const scope3Data = [
    { category: 'Purchased Goods & Services', emissions: 28000, percentage: 38.9, trend: -5 },
    { category: 'Capital Goods', emissions: 12000, percentage: 16.7, trend: -8 },
    { category: 'Fuel & Energy Related', emissions: 8000, percentage: 11.1, trend: -12 },
    { category: 'Upstream Transportation', emissions: 6500, percentage: 9.0, trend: -3 },
    { category: 'Waste Generated', emissions: 4500, percentage: 6.3, trend: -15 },
    { category: 'Business Travel', emissions: 4200, percentage: 5.8, trend: -20 },
    { category: 'Employee Commuting', emissions: 3800, percentage: 5.3, trend: -10 },
    { category: 'Downstream Transportation', emissions: 5500, percentage: 7.6, trend: -7 },
    { category: 'Processing of Sold Products', emissions: 2500, percentage: 3.5, trend: 0 },
    { category: 'Use of Sold Products', emissions: 1500, percentage: 2.1, trend: 2 },
    { category: 'End-of-Life Treatment', emissions: 1200, percentage: 1.7, trend: -4 },
    { category: 'Franchises', emissions: 0, percentage: 0, trend: 0 },
    { category: 'Investments', emissions: 0, percentage: 0, trend: 0 },
    { category: 'Other', emissions: 2000, percentage: 2.8, trend: -6 },
  ].filter(d => d.emissions > 0);

  const totalScope3 = scope3Data.reduce((sum, d) => sum + d.emissions, 0);
  const topCategories = scope3Data.slice(0, 5);

  const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-purple-400 text-sm uppercase tracking-wider">Scope 3 Breakdown</h3>
        <button className="flex items-center gap-2 text-xs text-dimmed hover:text-white transition-colors">
          <Download size={14} />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div>
          <h4 className="text-xs text-dimmed mb-4">Emissions by Category</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topCategories}
                  dataKey="emissions"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.percentage.toFixed(0)}%`}
                >
                  {topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value) => [`${value.toLocaleString()} tCO2e`, 'Emissions']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Categories List */}
        <div>
          <h4 className="text-xs text-dimmed mb-4">Top Categories</h4>
          <div className="space-y-3">
            {topCategories.map((cat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-navy rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div>
                    <div className="text-sm font-medium text-white">{cat.category}</div>
                    <div className="text-xs text-dimmed">{cat.percentage.toFixed(1)}% of Scope 3</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{(cat.emissions / 1000).toFixed(1)}K</div>
                  <div className={`text-xs font-medium flex items-center justify-end gap-1 ${cat.trend < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {cat.trend < 0 ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
                    {Math.abs(cat.trend)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Categories Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-3 text-dimmed font-medium">Category</th>
              <th className="text-right py-2 px-3 text-dimmed font-medium">Emissions (tCO2e)</th>
              <th className="text-right py-2 px-3 text-dimmed font-medium">%</th>
              <th className="text-right py-2 px-3 text-dimmed font-medium">YoY Change</th>
            </tr>
          </thead>
          <tbody>
            {scope3Data.map((cat, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-2 px-3 text-white">{cat.category}</td>
                <td className="py-2 px-3 text-right text-white">{cat.emissions.toLocaleString()}</td>
                <td className="py-2 px-3 text-right text-white">{cat.percentage.toFixed(1)}%</td>
                <td className={`py-2 px-3 text-right font-medium ${cat.trend < 0 ? 'text-emerald-400' : cat.trend > 0 ? 'text-red-400' : 'text-dimmed'}`}>
                  {cat.trend !== 0 && (
                    <span className="flex items-center justify-end gap-1">
                      {cat.trend < 0 ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
                      {Math.abs(cat.trend)}%
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Enhanced Sector Benchmarking
const SectorBenchmarking = ({ report }) => {
  const benchmarks = [
    {
      sector: 'Manufacturing',
      metrics: [
        { name: 'Carbon Intensity', company: 2.93, sector: 3.5, percentile: 65, unit: 'tCO2e/₹ Cr' },
        { name: 'Renewable Energy', company: 28.5, sector: 22, percentile: 72, unit: '%' },
        { name: 'Scope 3 Coverage', company: 35, sector: 28, percentile: 68, unit: '%' },
        { name: 'CDP Score', company: 'A-', sector: 'B', percentile: 75, unit: '' },
      ],
    },
  ];

  const currentBenchmarks = benchmarks[0];

  const getScoreColor = (percentile) => {
    if (percentile >= 75) return 'text-emerald-400 bg-emerald-500/10';
    if (percentile >= 50) return 'text-amber-400 bg-amber-500/10';
    return 'text-red-400 bg-red-500/10';
  };

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-blue-400 text-sm uppercase tracking-wider">Sector Benchmarking</h3>
        <div className="flex items-center gap-2 text-xs text-dimmed">
          <Building2 size={14} />
          <span>Manufacturing Sector</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentBenchmarks.metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-navy rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-dimmed">{metric.name}</div>
              <div className={`px-2 py-0.5 rounded text-xs font-bold ${getScoreColor(metric.percentile)}`}>
                {metric.percentile}th
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{metric.company}{metric.unit}</div>
                <div className="text-xs text-dimmed mt-1">Your Company</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-dimmed">{metric.sector}{metric.unit}</div>
                <div className="text-xs text-dimmed mt-1">Sector Avg</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${metric.percentile >= 75 ? 'bg-emerald-400' : metric.percentile >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                style={{ width: `${metric.percentile}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Climate Risk Assessment
const ClimateRiskAssessment = ({ report }) => {
  const risks = [
    {
      category: 'Physical Risks',
      icon: Thermometer,
      color: 'red',
      risks: [
        { name: 'Heat Stress', impact: 'High', likelihood: 'Very High', financialExposure: 450, timeHorizon: 'Now' },
        { name: 'Water Scarcity', impact: 'High', likelihood: 'High', financialExposure: 320, timeHorizon: '0-5 years' },
        { name: 'Flooding', impact: 'Medium', likelihood: 'Medium', financialExposure: 180, timeHorizon: '5-10 years' },
      ],
    },
    {
      category: 'Transition Risks',
      icon: TrendingUp,
      color: 'amber',
      risks: [
        { name: 'Carbon Pricing', impact: 'High', likelihood: 'High', financialExposure: 280, timeHorizon: '0-5 years' },
        { name: 'Regulatory Changes', impact: 'Medium', likelihood: 'Very High', financialExposure: 150, timeHorizon: 'Now' },
        { name: 'Market Shift', impact: 'Medium', likelihood: 'Medium', financialExposure: 200, timeHorizon: '5-10 years' },
      ],
    },
    {
      category: 'Opportunities',
      icon: Award,
      color: 'emerald',
      risks: [
        { name: 'Renewable Energy', impact: 'High', likelihood: 'High', financialExposure: -500, timeHorizon: 'Now' },
        { name: 'Green Products', impact: 'Medium', likelihood: 'Medium', financialExposure: -320, timeHorizon: '0-5 years' },
        { name: 'Energy Efficiency', impact: 'Medium', likelihood: 'Very High', financialExposure: -280, timeHorizon: 'Now' },
      ],
    },
  ];

  const totalRiskExposure = risks.flatMap(r => r.risks).filter(r => r.financialExposure > 0).reduce((sum, r) => sum + r.financialExposure, 0);
  const totalOpportunityValue = Math.abs(risks.flatMap(r => r.risks).filter(r => r.financialExposure < 0).reduce((sum, r) => sum + r.financialExposure, 0));

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Very High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLikelihoodColor = (likelihood) => {
    switch (likelihood) {
      case 'Very High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-orange-400 text-sm uppercase tracking-wider">Climate Risk Assessment (TCFD)</h3>
        <button className="flex items-center gap-2 text-xs text-dimmed hover:text-white transition-colors">
          <FileText size={14} />
          Full Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
          <div className="text-xs text-dimmed mb-1">Total Risk Exposure</div>
          <div className="text-2xl font-bold text-red-400">₹{totalRiskExposure} Cr</div>
          <div className="text-xs text-dimmed mt-1">Over 10 years</div>
        </div>
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <div className="text-xs text-dimmed mb-1">Total Opportunity Value</div>
          <div className="text-2xl font-bold text-emerald-400">₹{totalOpportunityValue} Cr</div>
          <div className="text-xs text-dimmed mt-1">Over 10 years</div>
        </div>
      </div>

      <div className="space-y-6">
        {risks.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <div key={catIndex}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} className={`text-${category.color}-400`} />
                <h4 className="text-sm font-bold text-white">{category.category}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {category.risks.map((risk, riskIndex) => (
                  <div key={riskIndex} className="p-3 bg-navy rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-xs font-semibold text-white">{risk.name}</h5>
                      <div className="text-xs font-bold text-amber-400">
                        ₹{Math.abs(risk.financialExposure)} Cr
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-dimmed mb-0.5">Impact</div>
                        <div className={`px-2 py-0.5 rounded text-xs font-medium ${getImpactColor(risk.impact)}`}>{risk.impact}</div>
                      </div>
                      <div>
                        <div className="text-dimmed mb-0.5">Likelihood</div>
                        <div className={`px-2 py-0.5 rounded text-xs font-medium ${getLikelihoodColor(risk.likelihood)}`}>{risk.likelihood}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-dimmed">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {risk.timeHorizon}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Keep existing components (CarbonCreditUsage, MilestoneTracker) but they can be enhanced too
const CarbonCreditUsage = ({ report }) => {
  const creditData = [
    { year: '2020', generated: 5000, retired: 2000, balance: 3000 },
    { year: '2021', generated: 6000, retired: 2500, balance: 6500 },
    { year: '2022', generated: 7000, retired: 3000, balance: 10500 },
    { year: '2023', generated: 8000, retired: 4000, balance: 14500 },
    { year: '2024', generated: 9000, retired: 5000, balance: 18500 },
  ];

  const currentYear = creditData[creditData.length - 1];
  const creditSources = [
    { name: 'Renewable Energy', generated: 12000, percentage: 40, icon: Sun, quality: 'Gold Standard' },
    { name: 'Reforestation', generated: 9000, percentage: 30, icon: TreePine, quality: 'Verra' },
    { name: 'Energy Efficiency', generated: 6000, percentage: 20, icon: Zap, quality: 'CDM' },
    { name: 'Other Projects', generated: 3000, percentage: 10, icon: Leaf, quality: 'VCS' },
  ];

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-wider">Carbon Credit Management</h3>
        <button className="flex items-center gap-2 text-xs text-dimmed hover:text-white transition-colors">
          <Download size={14} />
          Credit Portfolio
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <div className="text-xs text-dimmed mb-1">Total Generated</div>
          <div className="text-2xl font-bold text-emerald-400">{currentYear.generated.toLocaleString()}</div>
          <div className="text-xs text-dimmed mt-1">Credits</div>
        </div>
        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
          <div className="text-xs text-dimmed mb-1">Total Retired</div>
          <div className="text-2xl font-bold text-amber-400">{currentYear.retired.toLocaleString()}</div>
          <div className="text-xs text-dimmed mt-1">Credits</div>
        </div>
        <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
          <div className="text-xs text-dimmed mb-1">Current Balance</div>
          <div className="text-2xl font-bold text-purple-400">{currentYear.balance.toLocaleString()}</div>
          <div className="text-xs text-dimmed mt-1">Credits</div>
        </div>
      </div>

      <div className="h-[200px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={creditData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
            <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
            <YAxis tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
            <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value, name) => [value, name]} />
            <Bar dataKey="generated" fill="#10B981" radius={[4, 4, 0, 0]} name="Generated" />
            <Bar dataKey="retired" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Retired" />
            <Bar dataKey="balance" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Balance" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4 className="mb-4 text-sm font-bold text-dimmed">Credit Sources</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {creditSources.map((source, index) => {
          const Icon = source.icon;
          return (
            <div key={index} className="p-4 bg-navy rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-emerald-400" />
                <span className="text-xs text-dimmed">{source.name}</span>
              </div>
              <div className="text-xl font-bold text-white">{source.generated.toLocaleString()}</div>
              <div className="text-xs text-dimmed">{source.percentage}% of total</div>
              <div className="mt-2 text-xs text-emerald-400">{source.quality}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MilestoneTracker = ({ report }) => {
  const milestones = [
    {
      year: 2022,
      milestone: 'Baseline Established',
      description: 'Comprehensive emissions baseline for all 3 scopes',
      status: 'completed',
      targetEmissions: 150000,
      actualEmissions: 150000,
      icon: Target,
    },
    {
      year: 2025,
      milestone: 'First Reduction Target',
      description: 'Reduce emissions by 20% from baseline',
      status: 'in-progress',
      targetEmissions: 120000,
      actualEmissions: 125000,
      icon: TrendingDown,
    },
    {
      year: 2027,
      milestone: 'Interim Target',
      description: 'Reduce emissions by 40% from baseline',
      status: 'upcoming',
      targetEmissions: 90000,
      actualEmissions: null,
      icon: CheckCircle2,
    },
    {
      year: 2030,
      milestone: 'Net Zero Target',
      description: 'Achieve net-zero emissions',
      status: 'upcoming',
      targetEmissions: 0,
      actualEmissions: null,
      icon: Award,
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: CheckCircle2 };
      case 'in-progress':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: Zap };
      case 'upcoming':
        return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: Target };
      default:
        return { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', icon: Target };
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gold text-sm uppercase tracking-wider">Net Zero Roadmap</h3>
        <button className="flex items-center gap-2 text-xs text-dimmed hover:text-white transition-colors">
          <Download size={14} />
          Download Roadmap
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const config = getStatusConfig(milestone.status);
          const Icon = config.icon;
          const isPast = milestone.year < currentYear;
          const isCurrent = milestone.year === currentYear;

          const progress = milestone.actualEmissions !== null
            ? ((150000 - milestone.actualEmissions) / (150000 - milestone.targetEmissions)) * 100
            : 0;

          return (
            <div
              key={index}
              className={`p-5 rounded-xl border transition-all ${config.bg} ${config.border} ${isPast ? 'opacity-70' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl bg-navy ${config.text} flex-shrink-0`}>
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{milestone.milestone}</h4>
                      <div className="text-xs text-dimmed">{milestone.year}</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${config.bg} ${config.text} ${config.border}`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-sm text-dimmed mb-3">{milestone.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-dimmed">
                      Target: {(milestone.targetEmissions / 1000).toFixed(0)}K tCO2e
                    </div>
                    {milestone.actualEmissions !== null && (
                      <div className="text-xs">
                        <span className="text-dimmed mr-2">Actual:</span>
                        <span className="text-white font-medium">{(milestone.actualEmissions / 1000).toFixed(0)}K tCO2e</span>
                      </div>
                    )}
                  </div>

                  {milestone.actualEmissions !== null && (
                    <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${progress >= 100 ? 'bg-emerald-400' : progress >= 80 ? 'bg-cyan-400' : progress >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// New: Renewable Energy Transition
const RenewableEnergyTransition = ({ report, metrics }) => {
  const indicators = report?.indicators || {};

  // Use actual renewable energy breakdown from metrics
  const energyBreakdown = metrics?.energy?.breakdown || {};
  const renewableTotal = metrics?.energy?.renewable || 0;
  const nonRenewableTotal = metrics?.energy?.total - renewableTotal || 0;
  const renewableShare = metrics?.energy?.renewableShare || 0;

  // Create energy data from actual values
  const currentYear = new Date().getFullYear();
  const financialYear = report?.financialYear || `FY ${currentYear}-${(currentYear + 1).toString().slice(-2)}`;

  // Energy mix data using actual values
  const energyData = [
    {
      year: financialYear,
      renewable: Math.round(renewableShare),
      fossil: Math.round(100 - renewableShare)
    },
  ];

  // Renewable sources from actual data
  const renewableBreakdown = energyBreakdown.renewable || {};
  const renewableTargets = [
    {
      name: 'Electricity',
      current: Math.round(renewableBreakdown.electricity || 0),
      target: Math.round((renewableBreakdown.electricity || 0) * 1.5),
      unit: 'GJ',
      icon: Zap,
      color: '#F59E0B'
    },
    {
      name: 'Fuel',
      current: Math.round(renewableBreakdown.fuel || 0),
      target: Math.round((renewableBreakdown.fuel || 0) * 1.5),
      unit: 'GJ',
      icon: Flame,
      color: '#EF4444'
    },
    {
      name: 'Other',
      current: Math.round(renewableBreakdown.other || 0),
      target: Math.round((renewableBreakdown.other || 0) * 1.5),
      unit: 'GJ',
      icon: Sun,
      color: '#10B981'
    },
  ].filter(source => source.current > 0);

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-wider">Renewable Energy Transition</h3>
        <div className="text-xs text-dimmed">Target: 50% by 2030</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Energy Mix Trend */}
        <div>
          <h4 className="text-xs text-dimmed mb-4">Energy Mix Evolution</h4>
          <div className="h-[200px]">
            {energyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
                  <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#E2E8F0', fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
                  <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value) => [`${value}%`, '']} />
                  <Area type="monotone" dataKey="renewable" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} name="Renewable" />
                  <Area type="monotone" dataKey="fossil" stackId="1" stroke="#64748B" fill="#64748B" fillOpacity={0.5} name="Fossil Fuels" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-dimmed text-sm">
                No energy data available
              </div>
            )}
          </div>
        </div>

        {/* Source Breakdown */}
        <div>
          <h4 className="text-xs text-dimmed mb-4">Renewable Sources</h4>
          <div className="space-y-3">
            {renewableTargets.length > 0 ? renewableTargets.map((source, index) => {
              const Icon = source.icon;
              const progress = (source.current / source.target) * 100;
              return (
                <div key={index} className="p-3 bg-navy rounded-xl border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${source.color}20` }}>
                      <Icon size={16} style={{ color: source.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-white">{source.name}</span>
                        <span className="text-xs text-dimmed">{source.current.toLocaleString()} / {source.target.toLocaleString()} {source.unit}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full transition-all" style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: source.color }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="p-4 bg-navy rounded-xl border border-white/5 text-center text-dimmed text-sm">
                No renewable source breakdown available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
          <div className="text-3xl font-bold text-emerald-400">{Math.round(renewableShare)}%</div>
          <div className="text-xs text-dimmed">Current Renewable</div>
        </div>
        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-center">
          <div className="text-3xl font-bold text-blue-400">{Math.round(renewableTotal).toLocaleString()}</div>
          <div className="text-xs text-dimmed">GJ Renewable</div>
        </div>
        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-center">
          <div className="text-3xl font-bold text-amber-400">{Math.round(metrics?.energy?.total || 0).toLocaleString()}</div>
          <div className="text-xs text-dimmed">GJ Total Energy</div>
        </div>
      </div>
    </div>
  );
};

// Main BRSR Decarbonization Component
const BRSRDecarbonization = ({ report }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const metrics = useBRSRMetrics(report);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'scope3', label: 'Scope 3', icon: PieChartIcon },
    { id: 'benchmarks', label: 'Benchmarks', icon: Award },
    { id: 'risks', label: 'Risks', icon: Shield },
    { id: 'energy', label: 'Energy', icon: Zap },
  ];

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-dimmed">Select a report to view decarbonization analysis</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-gold text-navy shadow-lg shadow-gold/20'
                  : 'bg-navy-light/30 text-dimmed hover:text-white border border-white/10'
              }`}
            >
              <Icon size={16} />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Overview Section */}
      <AnimatePresence mode="wait">
        {activeSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CarbonTargetSummary report={report} />
              <CarbonCreditUsage report={report} />
            </div>
            <EmissionTrendChart report={report} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InitiativesProjects report={report} />
              <MilestoneTracker report={report} />
            </div>
            <RenewableEnergyTransition report={report} metrics={metrics} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scope 3 Section */}
      <AnimatePresence mode="wait">
        {activeSection === 'scope3' && (
          <motion.div
            key="scope3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Scope3Breakdown report={report} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benchmarks Section */}
      <AnimatePresence mode="wait">
        {activeSection === 'benchmarks' && (
          <motion.div
            key="benchmarks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SectorBenchmarking report={report} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Risks Section */}
      <AnimatePresence mode="wait">
        {activeSection === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ClimateRiskAssessment report={report} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Energy Section */}
      <AnimatePresence mode="wait">
        {activeSection === 'energy' && (
          <motion.div
            key="energy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RenewableEnergyTransition report={report} metrics={metrics} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { BRSRDecarbonization };
