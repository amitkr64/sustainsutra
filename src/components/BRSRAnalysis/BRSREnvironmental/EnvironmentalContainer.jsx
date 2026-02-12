import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Droplets, Factory, Flame, AlertTriangle, Leaf, Wind, Sun, CloudRain,
  TrendingUp, TrendingDown, Minus, Gauge, Activity, Target,
  CheckCircle, XCircle, Info, Globe, BarChart3, Filter,
  Trash2, Recycle, MapPin, Battery, Building2
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap
} from 'recharts';
import { useBRSRMetrics } from '../../../hooks/useBRSRAnalysis';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';
import { formatNumber, formatPercent, formatEnergy, formatGHG, formatGHGAsTCO2, formatIntensity, formatWater } from '../../../utils/brsr/numberFormat';
import { ChartNoData } from '../BRSRCharts/MetricCard';
import { TrendArrow } from '../BRSRCharts/MetricCard';

// ============================================================================
// ENVIRONMENTAL HERO SECTION - Key Metrics Overview
// ============================================================================
const EnvironmentalHero = ({ report, metrics, prevIndicators }) => {
  const indicators = report?.indicators || {};

  // Use _base values for GHG (already converted to tCO2)
  const scope1 = indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1 || indicators.p6_scope1 || 0;
  const scope2 = indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2 || indicators.p6_scope2 || 0;
  const scope3 = indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3 || indicators.p6_scope3 || 0;
  const totalGHG = scope1 + scope2 + scope3;

  const prevTotalGHG = (prevIndicators?.p6_e7_scope1_fy_base || prevIndicators?.p6_ghg_scope1 || 0) +
                      (prevIndicators?.p6_e7_scope2_fy_base || prevIndicators?.p6_ghg_scope2 || 0) +
                      (prevIndicators?.p6_l2_scope3_fy_base || prevIndicators?.p6_ghg_scope3 || 0);

  const energyFormatted = formatEnergy(metrics?.energy?.total || 0);
  const waterFormatted = formatWater(metrics?.water?.withdrawal || 0);

  // Calculate environmental score
  const envScore = useMemo(() => {
    let score = 0;
    if (metrics?.energy?.renewableShare > 25) score += 20;
    if (metrics?.energy?.renewableShare > 50) score += 20;
    if (metrics?.ghg?.trend < 0) score += 20;
    if (metrics?.waste?.recyclingRate > 50) score += 20;
    if (metrics?.water?.intensity < 0.1) score += 20;
    return Math.min(100, score);
  }, [metrics]);

  return (
    <div className="bg-gradient-to-br from-navy-light/40 to-navy-light/20 border border-white/10 rounded-3xl p-6">
      {/* Header with Score */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Leaf className="text-emerald-400" size={28} />
            Environmental Performance
          </h2>
          <p className="text-dimmed text-sm mt-1">Comprehensive sustainability metrics and analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-dimmed">Environmental Score</div>
            <div className={`text-4xl font-bold ${envScore >= 70 ? 'text-emerald-400' : envScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {envScore}
            </div>
          </div>
          <Gauge className={envScore >= 70 ? 'text-emerald-400' : envScore >= 50 ? 'text-amber-400' : 'text-red-400'} size={48} />
        </div>
      </div>

      {/* Key KPIs - Enhanced Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Energy */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 hover:border-yellow-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Zap className="text-yellow-400" size={24} />
            </div>
            <TrendArrow value={metrics?.energy?.trend || 0} size="sm" invert={true} />
          </div>
          <div className="text-xs text-dimmed mb-1">Total Energy</div>
          <div className="text-2xl font-bold text-white mb-1">
            {energyFormatted.value} {energyFormatted.unit}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-dimmed">Intensity:</span>
            <span className="text-yellow-400 font-medium">{formatNumber(metrics?.energy?.intensity || 0, 3)} GJ/₹ Cr</span>
            {metrics?.energy?.intensityPhysical > 0 && (
              <>
                <span className="text-dimmed">|</span>
                <span className="text-yellow-300 font-medium">{formatNumber(metrics?.energy?.intensityPhysical, 3)} /product</span>
              </>
            )}
          </div>
        </div>

        {/* GHG Emissions */}
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-2xl p-5 hover:border-red-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Factory className="text-red-400" size={24} />
            </div>
            <TrendArrow value={prevTotalGHG > 0 ? ((totalGHG - prevTotalGHG) / prevTotalGHG * 100) : 0} size="sm" />
          </div>
          <div className="text-xs text-dimmed mb-1">GHG Emissions</div>
          <div className="text-2xl font-bold text-white mb-1">
            {formatGHGAsTCO2(totalGHG)}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-dimmed">Intensity:</span>
            <span className="text-red-400 font-medium">{formatNumber(metrics?.ghg?.intensity || 0, 4)} tCO2e/₹ Cr</span>
            {metrics?.ghg?.intensityPhysical > 0 && (
              <>
                <span className="text-dimmed">|</span>
                <span className="text-red-300 font-medium">{formatNumber(metrics?.ghg?.intensityPhysical, 4)} /product</span>
              </>
            )}
          </div>
        </div>

        {/* Water */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-5 hover:border-blue-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Droplets className="text-blue-400" size={24} />
            </div>
            <TrendArrow value={metrics?.water?.trend || 0} size="sm" />
          </div>
          <div className="text-xs text-dimmed mb-1">Water Withdrawal</div>
          <div className="text-2xl font-bold text-white mb-1">
            {waterFormatted.value} {waterFormatted.unit}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-dimmed">Intensity:</span>
            <span className="text-blue-400 font-medium">{formatNumber(metrics?.water?.intensity || 0, 3)} KL/₹ Cr</span>
            {metrics?.water?.intensityPhysical > 0 && (
              <>
                <span className="text-dimmed">|</span>
                <span className="text-blue-300 font-medium">{formatNumber(metrics?.water?.intensityPhysical, 3)} /product</span>
              </>
            )}
          </div>
        </div>

        {/* Waste Recycling */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <Activity className="text-emerald-400" size={24} />
            </div>
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${metrics?.waste?.recyclingRate > 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {metrics?.waste?.recyclingRate > 50 ? 'Good' : 'Improve'}
            </div>
          </div>
          <div className="text-xs text-dimmed mb-1">Waste Recycling Rate</div>
          <div className="text-2xl font-bold text-white mb-1">
            {formatPercent(metrics?.waste?.recyclingRate || 0)}
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${metrics?.waste?.recyclingRate || 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GHG EMISSIONS DASHBOARD - Comprehensive Scope Analysis
// ============================================================================
const GHGEmissionsDashboard = ({ report, metrics, prevIndicators }) => {
  const indicators = report?.indicators || {};

  // Use _base values (already converted to tCO2)
  const scope1 = indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1 || indicators.p6_scope1 || 0;
  const scope2 = indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2 || indicators.p6_scope2 || 0;
  const scope3 = indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3 || indicators.p6_scope3 || 0;
  const totalGHG = scope1 + scope2 + scope3;

  const prevScope1 = prevIndicators?.p6_e7_scope1_fy_base || prevIndicators?.p6_ghg_scope1 || 0;
  const prevScope2 = prevIndicators?.p6_e7_scope2_fy_base || prevIndicators?.p6_ghg_scope2 || 0;
  const prevScope3 = prevIndicators?.p6_l2_scope3_fy_base || prevIndicators?.p6_ghg_scope3 || 0;
  const prevTotalGHG = prevScope1 + prevScope2 + prevScope3;

  // Scope data for visualizations
  const scopeData = [
    {
      name: 'Scope 1',
      fullName: 'Direct Emissions',
      value: scope1,
      previous: prevScope1,
      color: '#EF4444',
      icon: Factory,
      description: 'Combustion, company vehicles, fugitive emissions',
      benchmark: scope1 > 0 ? (scope1 / (metrics?.energy?.total || 1)) * 100 : 0,
    },
    {
      name: 'Scope 2',
      fullName: 'Indirect Energy',
      value: scope2,
      previous: prevScope2,
      color: '#F59E0B',
      icon: Zap,
      description: 'Purchased electricity, steam, heating & cooling',
      benchmark: scope2 > 0 ? (scope2 / (metrics?.energy?.total || 1)) * 100 : 0,
    },
    {
      name: 'Scope 3',
      fullName: 'Value Chain',
      value: scope3,
      previous: prevScope3,
      color: '#10B981',
      icon: Globe,
      description: 'Business travel, commuting, transportation, investments',
      benchmark: scope3 > 0 ? (scope3 / (metrics?.energy?.total || 1)) * 100 : 0,
    },
  ].filter(s => s.value > 0);

  const radarData = [
    { subject: 'Scope 1', value: Math.min(100, (scope1 / (totalGHG || 1)) * 100), fullMark: 100 },
    { subject: 'Scope 2', value: Math.min(100, (scope2 / (totalGHG || 1)) * 100), fullMark: 100 },
    { subject: 'Scope 3', value: Math.min(100, (scope3 / (totalGHG || 1)) * 100), fullMark: 100 },
  ];

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/20 rounded-xl">
            <Factory className="text-red-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Greenhouse Gas Emissions</h3>
            <p className="text-xs text-dimmed">All values in tCO2e (tonnes CO2 equivalent)</p>
          </div>
        </div>
        {prevTotalGHG > 0 && (
          <div className={`px-3 py-1 rounded-lg text-sm ${totalGHG < prevTotalGHG ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {totalGHG < prevTotalGHG ? '↓' : '↑'} {formatPercent(Math.abs(totalGHG - prevTotalGHG) / prevTotalGHG * 100)} vs prev year
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Emissions Summary */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <div className="text-xs text-dimmed mb-2">Total Emissions</div>
          <div className="text-4xl font-bold text-white mb-2">{formatNumber(totalGHG)}</div>
          <div className="text-xs text-dimmed">tCO2e</div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-dimmed">Scopes Reported</span>
              <span className="text-white font-semibold">{scopeData.length}/3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dimmed">Emission Intensity</span>
              <span className="text-white font-semibold">{formatNumber(metrics?.ghg?.intensity || 0, 4)} tCO2e/₹ Cr</span>
            </div>
          </div>
        </div>

        {/* Radar Chart - Scope Distribution */}
        <div className="lg:col-span-2 bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4">Emissions Distribution</h4>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1B4332" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#A0AAB5', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#A0AAB5' }} />
                <Radar
                  name="Emissions"
                  dataKey="value"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value) => [`${value.toFixed(1)}%`, 'Share']} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Scope Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {scopeData.map((scope) => {
          const Icon = scope.icon;
          const change = scope.previous > 0 ? ((scope.value - scope.previous) / scope.previous * 100) : 0;
          const share = ((scope.value / (totalGHG || 1)) * 100).toFixed(1);

          return (
            <div key={scope.name} className="bg-navy rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${scope.color}20` }}>
                    <Icon size={18} style={{ color: scope.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{scope.fullName}</div>
                    <div className="text-xs text-dimmed">{scope.description}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-white">{formatNumber(scope.value)}</div>
                  <div className="text-xs text-dimmed mb-1">tCO2e</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${share}%`, backgroundColor: scope.color }}
                    />
                  </div>
                  <span className="text-xs text-dimmed">{share}%</span>
                </div>

                {scope.previous > 0 && (
                  <div className={`text-xs ${change <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {change <= 0 ? '↓' : '↑'} {formatPercent(Math.abs(change))} vs prev year
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// ENERGY ANALYTICS HUB - Complete Energy Picture
// ============================================================================
const EnergyAnalyticsHub = ({ report, metrics }) => {
  const indicators = report?.indicators || {};
  const breakdown = metrics?.energy?.breakdown || {};

  const renewableTotal = metrics?.energy?.renewable || 0;
  const nonRenewableTotal = (metrics?.energy?.total || 0) - renewableTotal;

  // Energy source breakdown
  const energySources = [
    {
      name: 'Electricity',
      value: (breakdown.renewable?.electricity || 0) + (breakdown.nonRenewable?.electricity || 0),
      renewable: breakdown.renewable?.electricity || 0,
      color: '#3B82F6',
      icon: Zap,
    },
    {
      name: 'Fuel',
      value: (breakdown.renewable?.fuel || 0) + (breakdown.nonRenewable?.fuel || 0),
      renewable: breakdown.renewable?.fuel || 0,
      color: '#8B5CF6',
      icon: Flame,
    },
    {
      name: 'Other',
      value: (breakdown.renewable?.other || 0) + (breakdown.nonRenewable?.other || 0),
      renewable: breakdown.renewable?.other || 0,
      color: '#06B6D4',
      icon: Sun,
    },
  ].filter(e => e.value > 0);

  // Renewable vs Non-renewable mix
  const energyMixData = [
    {
      name: 'Renewable',
      value: renewableTotal,
      fill: '#10B981',
      breakdown: [
        { name: 'Electricity', value: breakdown.renewable?.electricity || 0 },
        { name: 'Fuel', value: breakdown.renewable?.fuel || 0 },
        { name: 'Other', value: breakdown.renewable?.other || 0 },
      ].filter(d => d.value > 0),
    },
    {
      name: 'Non-Renewable',
      value: nonRenewableTotal,
      fill: '#EF4444',
      breakdown: [
        { name: 'Electricity', value: breakdown.nonRenewable?.electricity || 0 },
        { name: 'Fuel', value: breakdown.nonRenewable?.fuel || 0 },
        { name: 'Other', value: breakdown.nonRenewable?.other || 0 },
      ].filter(d => d.value > 0),
    },
  ].filter(e => e.value > 0);

  const energyFormatted = formatEnergy(metrics?.energy?.total || 0);

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-xl">
            <Zap className="text-yellow-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Energy Consumption Analytics</h3>
            <p className="text-xs text-dimmed">Total: {energyFormatted.value} {energyFormatted.unit}</p>
          </div>
        </div>
        <TrendArrow value={metrics?.energy?.trend || 0} size="md" invert={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Mix Pie Chart */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4">Energy Mix by Source</h4>
          {energySources.length > 0 ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={energySources}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                  >
                    {energySources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value) => [formatNumber(value), 'GJ']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-dimmed text-sm">No energy source data</div>
          )}
        </div>

        {/* Renewable vs Non-Renewable Bar Chart */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4">Renewable vs Non-Renewable</h4>
          {energyMixData.length > 0 ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyMixData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
                  <XAxis dataKey="name" tick={{ fill: '#A0AAB5', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#A0AAB5' }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}TJ` : `${v}GJ`} />
                  <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value) => [formatNumber(value), 'GJ']} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {energyMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-dimmed text-sm">No mix data</div>
          )}
        </div>
      </div>

      {/* Renewable Share Highlight */}
      <div className="mt-6 p-5 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-emerald-500/10 border border-emerald-500/30 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <Leaf className="text-emerald-400" size={28} />
            </div>
            <div>
              <div className="text-sm text-white">Renewable Energy Share</div>
              <div className="text-xs text-dimmed">of total energy consumption</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-emerald-400">{formatPercent(metrics?.energy?.renewableShare || 0)}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-48 bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: `${metrics?.energy?.renewableShare || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// WATER MANAGEMENT HUB - Complete Water Tracking
// ============================================================================
const WaterManagementHub = ({ report, metrics }) => {
  const indicators = report?.indicators || {};
  const prevIndicators = indicators.prev_year || {};

  const sources = metrics?.water?.sources || {};

  // Calculate total from actual water source indicators as fallback
  const surfaceWater = sources.surface || indicators.p6_water_surface || 0;
  const groundWater = sources.ground || indicators.p6_water_ground || 0;
  const thirdPartyWater = sources.thirdParty || indicators.p6_water_third_party || 0;
  const municipalWater = sources.municipal || indicators.p6_water_municipal || 0;
  const rainWater = sources.rainwater || indicators.p6_water_rainwater || 0;

  // Calculate effective total withdrawal
  const totalWithdrawal = metrics?.water?.withdrawal || indicators.p6_water_withdrawal || indicators.p6_e3_total_withdrawal_fy || 0;
  const calculatedTotal = surfaceWater + groundWater + thirdPartyWater + municipalWater + rainWater;
  const effectiveTotal = totalWithdrawal > 0 ? totalWithdrawal : calculatedTotal;
  const totalConsumption = metrics?.water?.consumption || indicators.p6_water_consumption || indicators.p6_e3_total_consumption_fy || 0;
  const waterFormatted = formatWater(effectiveTotal);

  const waterSources = [
    { name: 'Surface Water', value: surfaceWater, color: '#3B82F6', icon: Droplets },
    { name: 'Groundwater', value: groundWater, color: '#06B6D4', icon: Droplets },
    { name: 'Third Party', value: thirdPartyWater, color: '#8B5CF6', icon: Droplets },
    { name: 'Municipal', value: municipalWater, color: '#F59E0B', icon: Droplets },
    { name: 'Rainwater', value: rainWater, color: '#10B981', icon: CloudRain },
  ].filter(s => s.value > 0);

  // Water quality and circularity metrics
  const recycled = metrics?.water?.recycled || indicators.p6_water_recycled || 0;
  const reused = metrics?.water?.reused || indicators.p6_water_reused || 0;
  const totalCircular = recycled + reused;
  const recyclingRate = effectiveTotal > 0 ? (totalCircular / effectiveTotal * 100) : 0;
  const consumptionRate = effectiveTotal > 0 ? (totalConsumption / effectiveTotal * 100) : 0;

  // Effluent discharge data
  const effluentDischarged = metrics?.water?.effluentDischarged || indicators.p6_effluent_discharged || 0;
  const effluentTreated = indicators.p6_effluent_treated || 0;
  const effluentTreatmentRate = effluentDischarged > 0 ? (effluentTreated / effluentDischarged * 100) : 0;

  // ZLD status
  const zldImplemented = indicators.p6_zld_status === 'Yes' || indicators.p6_zld_status === true || metrics?.water?.zldImplemented;

  // Water intensity metrics
  const waterIntensity = metrics?.water?.intensity || 0;
  const waterIntensityPhysical = indicators.p6_e3_intensity_physical_fy || 0;
  const prevWaterWithdrawal = prevIndicators.p6_e3_total_withdrawal_fy || prevIndicators.p6_water_withdrawal || 0;
  const waterTrend = prevWaterWithdrawal > 0 ? ((totalWithdrawal - prevWaterWithdrawal) / prevWaterWithdrawal * 100) : 0;

  // Previous year intensity for comparison
  const prevWaterIntensity = prevIndicators.p6_e3_intensity_turnover_fy || 0;
  const intensityImprovement = prevWaterIntensity > 0 ? ((prevWaterIntensity - waterIntensity) / prevWaterIntensity * 100) : 0;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <Droplets className="text-blue-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Water Management Hub</h3>
            <p className="text-xs text-dimmed">Total Withdrawal: {formatNumber(effectiveTotal)} KL</p>
          </div>
        </div>
        <TrendArrow value={waterTrend} size="md" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <div className="text-xs text-dimmed mb-1">Total Withdrawal</div>
          <div className="text-2xl font-bold text-blue-400">{formatNumber(totalWithdrawal)}</div>
          <div className="text-xs text-dimmed">KL</div>
        </div>
        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
          <div className="text-xs text-dimmed mb-1">Consumption</div>
          <div className="text-2xl font-bold text-cyan-400">{formatNumber(totalConsumption)}</div>
          <div className="text-xs text-dimmed">KL ({consumptionRate.toFixed(1)}%)</div>
        </div>
        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <div className="text-xs text-dimmed mb-1">Recycled/Reused</div>
          <div className="text-2xl font-bold text-emerald-400">{formatNumber(totalCircular)}</div>
          <div className="text-xs text-dimmed">KL ({recyclingRate.toFixed(1)}%)</div>
        </div>
        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <div className="text-xs text-dimmed mb-1">Effluent Treated</div>
          <div className="text-2xl font-bold text-purple-400">{effluentTreatmentRate.toFixed(1)}%</div>
          <div className="text-xs text-dimmed">{formatNumber(effluentTreated)} KL</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Sources Breakdown */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Droplets size={16} className="text-blue-400" />
            Water Sources
          </h4>
          <p className="text-xs text-dimmed mb-4 italic">
            Water withdrawn from different sources/points (in KL)
          </p>
          {waterSources.length > 0 ? (
            <div className="space-y-2">
              {waterSources.map((source) => {
                const Icon = source.icon;
                return (
                  <div key={source.name} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon size={14} style={{ color: source.color }} />
                      <span className="text-sm text-white">{source.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-blue-300">{formatNumber(source.value)} KL</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-dimmed italic p-4 text-center">No source breakdown available</div>
          )}
        </div>

        {/* Water Intensity & Efficiency */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Target size={16} className="text-cyan-400" />
            Water Intensity Metrics
          </h4>
          <div className="space-y-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <div className="text-xs text-dimmed mb-1">Intensity (Turnover)</div>
              <div className="text-xl font-bold text-cyan-400">{formatNumber(waterIntensity, 3)} KL/₹ Cr</div>
              {prevWaterIntensity > 0 && (
                <div className={`text-xs mt-1 ${intensityImprovement >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {intensityImprovement >= 0 ? '↓' : '↑'} {Math.abs(intensityImprovement).toFixed(1)}% vs prev year
                </div>
              )}
            </div>
            {waterIntensityPhysical > 0 && (
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-xs text-dimmed mb-1">Intensity (Physical Output)</div>
                <div className="text-xl font-bold text-blue-400">{formatNumber(waterIntensityPhysical, 3)} /product</div>
              </div>
            )}
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xs text-dimmed mb-1">Consumption Efficiency</div>
              <div className="text-xl font-bold text-purple-400">{consumptionRate.toFixed(1)}%</div>
              <div className="text-xs text-dimmed">of withdrawn water consumed</div>
            </div>
          </div>
        </div>

        {/* Wastewater Management */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Zap size={16} className="text-purple-400" />
            Wastewater Management
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div>
                <div className="text-xs text-dimmed">Effluent Generated</div>
                <div className="text-lg font-bold text-purple-400">{formatNumber(effluentDischarged)} KL</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <div>
                <div className="text-xs text-dimmed">Effluent Treated</div>
                <div className="text-lg font-bold text-emerald-400">{formatNumber(effluentTreated)} KL</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${effluentTreatmentRate >= 90 ? 'text-emerald-400' : effluentTreatmentRate >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                  {effluentTreatmentRate.toFixed(1)}%
                </div>
                <div className="text-xs text-dimmed">treatment rate</div>
              </div>
            </div>
            {zldImplemented && (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-emerald-400">Zero Liquid Discharge (ZLD)</div>
                  <div className="text-xs text-dimmed">Implemented at facility</div>
                </div>
              </div>
            )}
            {recycled > 0 && (
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-dimmed">Water Recycled</span>
                  <span className="text-lg font-bold text-blue-400">{formatNumber(recycled)} KL</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(recyclingRate, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// WASTE MANAGEMENT CENTER - Complete Waste Lifecycle
// ============================================================================
const WasteManagementCenter = ({ report, metrics }) => {
  const indicators = report?.indicators || {};
  const prevIndicators = indicators.prev_year || {};

  const byType = metrics?.waste?.byType || {};
  const treatment = metrics?.waste?.treatment || {};
  const totalWaste = metrics?.waste?.total || 0;
  const recycled = treatment.recycled || metrics?.waste?.recycled || 0;
  const reused = treatment.reused || metrics?.waste?.reused || 0;
  const incinerated = treatment.incinerated || indicators.p6_waste_incinerated || 0;
  const landfill = treatment.landfill || indicators.p6_waste_landfill || 0;
  const coProcessed = treatment.coProcessed || indicators.p6_waste_coprocessed || 0;

  // Extended waste categories
  const wasteByType = [
    { name: 'Plastic Waste', value: byType.plastic || indicators.p6_waste_plastic || 0, color: '#3B82F6', icon: Trash2, unit: 'tonnes' },
    { name: 'E-Waste', value: byType.ewaste || indicators.p6_waste_ewaste || 0, color: '#8B5CF6', icon: Battery, unit: 'tonnes' },
    { name: 'Biomedical', value: byType.biomedical || indicators.p6_waste_biomedical || 0, color: '#EC4899', icon: AlertTriangle, unit: 'tonnes' },
    { name: 'Construction & Demolition', value: byType.construction || indicators.p6_waste_construction || 0, color: '#F59E0B', icon: Building2, unit: 'tonnes' },
    { name: 'Hazardous', value: byType.hazardous || indicators.p6_waste_hazardous || 0, color: '#EF4444', icon: AlertTriangle, unit: 'tonnes' },
    { name: 'Industrial', value: byType.industrial || indicators.p6_waste_industrial || 0, color: '#06B6D4', icon: Factory, unit: 'tonnes' },
    { name: 'Municipal', value: byType.municipal || indicators.p6_waste_municipal || 0, color: '#10B981', icon: Trash2, unit: 'tonnes' },
  ].filter(w => w.value > 0);

  // Treatment methods with icons
  const treatmentMethods = [
    { name: 'Recycled', value: recycled, color: '#10B981', icon: Recycle, description: 'Material recovered' },
    { name: 'Reused', value: reused, color: '#06B6D4', icon: Activity, description: 'Used without treatment' },
    { name: 'Co-processed', value: coProcessed, color: '#8B5CF6', icon: Flame, description: 'Used in cement kilns' },
    { name: 'Incinerated', value: incinerated, color: '#F59E0B', icon: Flame, description: 'Energy recovery' },
    { name: 'Landfill', value: landfill, color: '#EF4444', icon: MapPin, description: 'Disposed to landfill' },
  ].filter(t => t.value > 0);

  // Calculate effective total from treatment methods if wasteTotal is 0
  const totalFromTreatment = recycled + reused + coProcessed + incinerated + landfill;
  const effectiveWasteTotal = totalWaste > 0 ? totalWaste : totalFromTreatment;

  // Calculate rates from effective total to ensure consistency
  const recyclingRate = effectiveWasteTotal > 0 ? Math.min(100, ((recycled + reused) / effectiveWasteTotal * 100)) : 0;
  const recoveryRate = effectiveWasteTotal > 0 ? Math.min(100, ((recycled + reused + coProcessed) / effectiveWasteTotal * 100)) : 0;
  const disposalRate = effectiveWasteTotal > 0 ? ((landfill + incinerated) / effectiveWasteTotal * 100) : 0;

  // Intensity metrics
  const intensityPhysical = indicators.p6_e9_intensity_physical_fy || 0;
  const wasteTrend = metrics?.waste?.trend || 0;

  // EPR and Plastic waste specifics
  const plasticWaste = byType.plastic || indicators.p6_waste_plastic || 0;
  const plasticRecycled = indicators.p6_plastic_recycled || 0;
  const plasticEPR = indicators.p6_plastic_epr || plasticWaste > 0 && plasticRecycled > 0;

  // E-waste specifics
  const ewaste = byType.ewaste || indicators.p6_waste_ewaste || 0;
  const ewasteRecycled = indicators.p6_ewaste_recycled || 0;
  const ewasteRecyclingRate = ewaste > 0 ? (ewasteRecycled / ewaste * 100) : 0;

  // Hazardous waste
  const hazardousWaste = byType.hazardous || indicators.p6_waste_hazardous || 0;
  const hazardousTreated = indicators.p6_hazardous_treated || 0;
  const hazardousTreatmentRate = hazardousWaste > 0 ? (hazardousTreated / hazardousWaste * 100) : 0;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-xl">
            <Recycle className="text-orange-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Waste Management Center</h3>
            <p className="text-xs text-dimmed">Total Waste: {formatNumber(totalWaste)} tonnes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendArrow value={wasteTrend} size="md" />
          <div className={`px-3 py-1 rounded-lg text-sm ${recyclingRate >= 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
            Recovery: {formatPercent(recoveryRate)}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <div className="text-xs text-dimmed mb-1">Total Generated</div>
          <div className="text-xl font-bold text-blue-400">{formatNumber(totalWaste)}</div>
          <div className="text-xs text-dimmed">tonnes</div>
        </div>
        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <div className="text-xs text-dimmed mb-1">Recycled</div>
          <div className="text-xl font-bold text-emerald-400">{formatNumber(recycled)}</div>
          <div className="text-xs text-dimmed">tonnes ({formatPercent(recyclingRate)})</div>
        </div>
        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
          <div className="text-xs text-dimmed mb-1">Reused</div>
          <div className="text-xl font-bold text-cyan-400">{formatNumber(reused)}</div>
          <div className="text-xs text-dimmed">tonnes</div>
        </div>
        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
          <div className="text-xs text-dimmed mb-1">Co-processed</div>
          <div className="text-xl font-bold text-amber-400">{formatNumber(coProcessed)}</div>
          <div className="text-xs text-dimmed">tonnes</div>
        </div>
        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
          <div className="text-xs text-dimmed mb-1">Landfilled</div>
          <div className="text-xl font-bold text-red-400">{formatNumber(landfill)}</div>
          <div className="text-xs text-dimmed">tonnes ({formatPercent(disposalRate)})</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Waste by Category */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Trash2 size={16} className="text-orange-400" />
            Waste by Category
          </h4>
          {wasteByType.length > 0 ? (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {wasteByType.map((waste) => {
                const Icon = waste.icon;
                const share = ((waste.value / (totalWaste || 1)) * 100).toFixed(1);
                return (
                  <div key={waste.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${waste.color}20` }}>
                          <Icon size={12} style={{ color: waste.color }} />
                        </div>
                        <span className="text-sm text-white">{waste.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-white">{formatNumber(waste.value)}</span>
                        <span className="text-xs text-dimmed ml-1">t</span>
                        <div className="text-xs text-dimmed">{share}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(share, 100)}%`, backgroundColor: waste.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-dimmed italic p-4 text-center">No category breakdown available</div>
          )}
        </div>

        {/* Treatment Methods */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Activity size={16} className="text-emerald-400" />
            Treatment & Disposal
          </h4>
          {treatmentMethods.length > 0 ? (
            <div className="space-y-3">
              {treatmentMethods.map((method) => {
                const Icon = method.icon;
                const share = ((method.value / (effectiveWasteTotal || 1)) * 100).toFixed(1);
                return (
                  <div key={method.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${method.color}20` }}>
                          <Icon size={12} style={{ color: method.color }} />
                        </div>
                        <div>
                          <span className="text-sm text-white">{method.name}</span>
                          <div className="text-xs text-dimmed">{method.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-white">{formatNumber(method.value)}</span>
                        <span className="text-xs text-dimmed ml-1">t</span>
                        <div className="text-xs text-dimmed">{share}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(share, 100)}%`, backgroundColor: method.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-dimmed italic p-4 text-center">No treatment data available</div>
          )}
        </div>

        {/* Special Waste Streams */}
        <div className="bg-navy rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            Special Waste Streams
          </h4>
          <div className="space-y-3">
            {/* Plastic Waste & EPR */}
            {plasticWaste > 0 && (
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Trash2 size={14} className="text-blue-400" />
                    <span className="text-xs text-white font-medium">Plastic Waste</span>
                  </div>
                  <span className="text-sm font-bold text-blue-400">{formatNumber(plasticWaste)} t</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-dimmed">Recycled: {formatNumber(plasticRecycled)} t</span>
                  {plasticEPR && (
                    <span className="text-emerald-400">EPR Compliant</span>
                  )}
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-blue-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(plasticWaste > 0 ? (plasticRecycled / plasticWaste * 100) : 0, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* E-Waste */}
            {ewaste > 0 && (
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Battery size={14} className="text-purple-400" />
                    <span className="text-xs text-white font-medium">E-Waste</span>
                  </div>
                  <span className="text-sm font-bold text-purple-400">{formatNumber(ewaste)} t</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-dimmed">Recycled: {formatNumber(ewasteRecycled)} t ({ewasteRecyclingRate.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-purple-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(ewasteRecyclingRate, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Hazardous Waste */}
            {hazardousWaste > 0 && (
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-400" />
                    <span className="text-xs text-white font-medium">Hazardous Waste</span>
                  </div>
                  <span className="text-sm font-bold text-red-400">{formatNumber(hazardousWaste)} t</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-dimmed">Treated: {formatNumber(hazardousTreated)} t ({hazardousTreatmentRate.toFixed(1)}%)</span>
                  <span className={hazardousTreatmentRate >= 95 ? 'text-emerald-400' : 'text-amber-400'}>
                    {hazardousTreatmentRate >= 95 ? 'Compliant' : 'Partial'}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                  <div
                    className={`h-full rounded-full transition-all ${hazardousTreatmentRate >= 95 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ width: `${Math.min(hazardousTreatmentRate, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Waste Intensity */}
            {intensityPhysical > 0 && (
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="text-xs text-dimmed mb-1">Waste Intensity (Physical)</div>
                <div className="text-lg font-bold text-amber-400">{formatNumber(intensityPhysical, 4)} /product</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN ENVIRONMENTAL COMPONENT
// ============================================================================
const BRSREnvironmental = ({ report }) => {
  const metrics = useBRSRMetrics(report);
  const prevIndicators = report?.indicators?.prev_year || {};

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-dimmed">Select a report to view environmental analysis</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <EnvironmentalHero report={report} metrics={metrics} prevIndicators={prevIndicators} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GHGEmissionsDashboard report={report} metrics={metrics} prevIndicators={prevIndicators} />
        <EnergyAnalyticsHub report={report} metrics={metrics} />
      </div>

      <WaterManagementHub report={report} metrics={metrics} />

      <WasteManagementCenter report={report} metrics={metrics} />
    </motion.div>
  );
};

export { BRSREnvironmental };
