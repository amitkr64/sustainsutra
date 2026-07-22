import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2, MapPin, Users, Briefcase, Receipt, Phone, Mail, Globe,
  Calendar, TrendingUp, TrendingDown, Activity, Award, Target, Shield,
  Zap, Droplets, Factory, Leaf, CheckCircle, XCircle, AlertCircle,
  BarChart3, FileText, Star, DollarSign, GraduationCap, Heart
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, LineChart, Line } from 'recharts';
import { useBRSRMetrics } from '../../../hooks/useBRSRAnalysis';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';
import { formatNumber, formatPercent, formatEnergy, formatWater, formatGHGAsTCO2 } from '../../../utils/brsr/numberFormat';
import { TrendArrow } from '../BRSRCharts/MetricCard';
import { DataQualityBadge } from '../BRSRCharts/DataQualityBadge';

// ============================================================================
// COMPANY INFORMATION PANEL
// ============================================================================
const CompanyInfoPanel = ({ report, metrics }) => {
  const indicators = report?.indicators || {};
  const nicInfo = report?.nicCodeInfo || {};

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Building2 className="text-gold" size={24} />
          <h3 className="text-xl font-bold text-white">Company Information</h3>
        </div>
        <DataQualityBadge score={report.dataQuality?.score || 0} size="sm" showLabel />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Basic Information */}
        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={16} className="text-gold" />
            <h4 className="font-semibold text-sm text-white">Basic Information</h4>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-dimmed">Company Name</span>
              <div className="text-sm text-white truncate" title={report.companyName}>{report.companyName || 'N/A'}</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">CIN</span>
              <div className="text-sm text-white">{indicators.cin || 'N/A'}</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">Industry/Sector</span>
              <div className="text-sm text-white truncate" title={nicInfo.sectionDescription || nicInfo.description}>
                {nicInfo.sectionDescription || nicInfo.description || indicators.nic_sector || 'N/A'}
              </div>
            </div>
            <div>
              <span className="text-xs text-dimmed">NIC Division</span>
              <div className="text-sm text-white truncate">{nicInfo.divisionDescription || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-gold" />
            <h4 className="font-semibold text-sm text-white">Contact Information</h4>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-dimmed">Registered Office</span>
              <div className="text-sm text-white truncate">{indicators.address_registered_office || 'N/A'}</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">Website</span>
              <div className="text-sm text-gold truncate">{indicators.website_company || 'N/A'}</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">Email</span>
              <div className="text-sm text-white truncate">{indicators.email_company || 'N/A'}</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">Contact Person</span>
              <div className="text-sm text-white truncate">{indicators.name_of_contact_person || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Receipt size={16} className="text-gold" />
            <h4 className="font-semibold text-sm text-white">Financial Information</h4>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-dimmed">Financial Year</span>
              <div className="text-sm text-white">{report.financialYear || 'N/A'}</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">Turnover</span>
              <div className="text-sm text-white">₹{formatNumber(indicators.turnover / 10000000)} Cr</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">Paid-up Capital</span>
              <div className="text-sm text-white">₹{formatNumber(indicators.value_of_shares_paid_up / 10000000)} Cr</div>
            </div>
            <div>
              <span className="text-xs text-dimmed">Reporting Boundary</span>
              <div className="text-sm text-white truncate">{indicators.reporting_boundary || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Workforce Summary */}
        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-gold" />
            <h4 className="font-semibold text-sm text-white">Workforce Summary</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-dimmed">Total Employees</span>
              <span className="text-sm font-bold text-white">{formatNumber(metrics?.social?.totalEmployees || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-dimmed">Female %</span>
              <span className="text-sm font-bold text-pink-400">{formatPercent(metrics?.social?.genderDiversity || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-dimmed">Permanent</span>
              <span className="text-sm font-bold text-blue-400">{formatNumber(indicators.p3_permanent_employees || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-dimmed">Female Directors</span>
              <span className="text-sm font-bold text-purple-400">{metrics?.social?.femaleDirectors || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EXECUTIVE SUMMARY - Key KPIs at a glance
// ============================================================================
const ExecutiveSummary = ({ report, metrics, prevIndicators }) => {
  const indicators = report?.indicators || {};

  // Use _base values for GHG (already converted to tCO2)
  const scope1 = indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1 || indicators.p6_scope1 || 0;
  const scope2 = indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2 || indicators.p6_scope2 || 0;
  const scope3 = indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3 || indicators.p6_scope3 || 0;
  const totalGHG = scope1 + scope2 + scope3;

  const prevTotalGHG = (prevIndicators?.p6_e7_scope1_fy_base || prevIndicators?.p6_ghg_scope1 || 0) +
                      (prevIndicators?.p6_e7_scope2_fy_base || prevIndicators?.p6_ghg_scope2 || 0) +
                      (prevIndicators?.p6_l2_scope3_fy_base || prevIndicators?.p6_ghg_scope3 || 0);

  // Format values as display strings
  const energyFormatted = formatEnergy(metrics?.energy?.total || 0);
  const waterFormatted = formatWater(metrics?.water?.withdrawal || 0);

  const kpiData = [
    {
      title: 'Total Energy',
      value: `${energyFormatted.value} ${energyFormatted.unit}`,
      rawValue: metrics?.energy?.total || 0,
      trend: metrics?.energy?.trend || 0,
      icon: Zap,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      invertTrend: true,
    },
    {
      title: 'GHG Emissions',
      value: formatGHGAsTCO2(totalGHG),
      rawValue: totalGHG,
      trend: prevTotalGHG > 0 ? ((totalGHG - prevTotalGHG) / prevTotalGHG * 100) : 0,
      icon: Factory,
      color: 'text-red-400',
      bg: 'bg-red-400/10',
    },
    {
      title: 'Water Withdrawal',
      value: `${waterFormatted.value} ${waterFormatted.unit}`,
      rawValue: metrics?.water?.withdrawal || 0,
      trend: metrics?.water?.trend || 0,
      icon: Droplets,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      title: 'Waste Recycling',
      value: formatPercent(metrics?.waste?.recyclingRate || 0),
      rawValue: metrics?.waste?.recyclingRate || 0,
      icon: Activity,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      title: 'Renewable Energy',
      value: formatPercent(metrics?.energy?.renewableShare || 0),
      rawValue: metrics?.energy?.renewableShare || 0,
      icon: Leaf,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      title: 'Board Independence',
      value: formatPercent(indicators.p1_independent_directors_pct || 0),
      rawValue: indicators.p1_independent_directors_pct || 0,
      icon: Shield,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ].filter(kpi => kpi.rawValue > 0);

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-gold" size={24} />
          <h3 className="text-xl font-bold text-white">Executive Summary</h3>
        </div>
        <div className="text-xs text-dimmed">{kpiData.length} Key Performance Indicators</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-navy rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <Icon size={16} />
                </div>
                <TrendArrow value={kpi.trend} size="sm" invert={kpi.invertTrend} />
              </div>
              <div className="text-xs text-dimmed mb-1">{kpi.title}</div>
              <div className="text-lg font-bold text-white truncate">{kpi.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// SCOPE-WISE GHG BREAKDOWN
// ============================================================================
const GHGScopeBreakdown = ({ report, prevIndicators, metrics }) => {
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

  const intensityPhysical = indicators.p6_e7_intensity_physical_fy || 0;

  const scopeData = [
    {
      name: 'Scope 1',
      fullName: 'Direct Emissions',
      value: scope1,
      previous: prevScope1,
      color: '#EF4444',
      icon: Factory,
      description: 'Emissions from sources owned/controlled',
    },
    {
      name: 'Scope 2',
      fullName: 'Indirect Energy',
      value: scope2,
      previous: prevScope2,
      color: '#F59E0B',
      icon: Zap,
      description: 'Emissions from purchased electricity',
    },
    {
      name: 'Scope 3',
      fullName: 'Value Chain',
      value: scope3,
      previous: prevScope3,
      color: '#10B981',
      icon: Globe,
      description: 'Other indirect emissions',
    },
  ].filter(s => s.value > 0);

  const pieData = scopeData.map(s => ({
    name: s.name,
    value: s.value,
    fill: s.color,
  }));

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Factory className="text-red-400" size={24} />
          <div>
            <h3 className="text-lg font-bold text-white">GHG Emissions by Scope</h3>
            <p className="text-xs text-dimmed">All values in tCO2e (tonnes CO2 equivalent)</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-dimmed">Total Emissions</div>
          <div className="text-2xl font-bold text-white">{formatGHGAsTCO2(totalGHG)}</div>
          {intensityPhysical > 0 && (
            <div className="text-xs text-dimmed mt-1">
              Intensity: {formatNumber(intensityPhysical, 4)} /product
            </div>
          )}
          {prevTotalGHG > 0 && (
            <div className={`text-xs ${totalGHG < prevTotalGHG ? 'text-emerald-400' : 'text-red-400'}`}>
              {totalGHG < prevTotalGHG ? '↓' : '↑'} {formatPercent(Math.abs(totalGHG - prevTotalGHG) / prevTotalGHG * 100)} vs prev
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div>
          {pieData.length > 0 ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: 'none' }} formatter={(value) => [formatNumber(value), 'tCO2e']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-dimmed text-sm">No GHG data available</div>
          )}
        </div>

        {/* Breakdown Cards */}
        <div className="space-y-3">
          {scopeData.map((scope) => {
            const Icon = scope.icon;
            const change = scope.previous > 0 ? ((scope.value - scope.previous) / scope.previous * 100) : 0;
            return (
              <div key={scope.name} className="bg-navy rounded-xl p-4 border border-white/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${scope.color}20` }}>
                      <Icon size={18} style={{ color: scope.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{scope.fullName}</div>
                      <div className="text-xs text-dimmed">{scope.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{formatNumber(scope.value)}</div>
                    <div className="text-xs text-dimmed">tCO2e</div>
                    {scope.previous > 0 && (
                      <div className={`text-xs ${change <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {change <= 0 ? '↓' : '↑'} {formatPercent(Math.abs(change))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${((scope.value / (totalGHG || 1)) * 100)}%`,
                      backgroundColor: scope.color
                    }}
                  />
                </div>
                <div className="text-xs text-dimmed mt-1">{((scope.value / (totalGHG || 1)) * 100).toFixed(1)}% of total</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ENERGY MIX VISUALIZATION
// ============================================================================
const EnergyMixVisualization = ({ report, metrics }) => {
  const indicators = report?.indicators || {};
  const energyBreakdown = metrics?.energy?.breakdown || {};

  const renewableTotal = metrics?.energy?.renewable || 0;
  const nonRenewableTotal = (metrics?.energy?.total || 0) - renewableTotal;

  const energySources = [
    {
      name: 'Renewable Energy',
      value: renewableTotal,
      color: '#10B981',
      breakdown: [
        { name: 'Electricity', value: energyBreakdown.renewable?.electricity || 0 },
        { name: 'Fuel', value: energyBreakdown.renewable?.fuel || 0 },
        { name: 'Other', value: energyBreakdown.renewable?.other || 0 },
      ].filter(d => d.value > 0),
    },
    {
      name: 'Non-Renewable',
      value: nonRenewableTotal,
      color: '#EF4444',
      breakdown: [
        { name: 'Electricity', value: energyBreakdown.nonRenewable?.electricity || 0 },
        { name: 'Fuel', value: energyBreakdown.nonRenewable?.fuel || 0 },
        { name: 'Other', value: energyBreakdown.nonRenewable?.other || 0 },
      ].filter(d => d.value > 0),
    },
  ].filter(e => e.value > 0);

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="text-yellow-400" size={24} />
          <h3 className="text-lg font-bold text-white">Energy Consumption Mix</h3>
        </div>
        <div className="flex items-center gap-2">
          <TrendArrow value={metrics?.energy?.trend || 0} size="sm" invert={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Donut Chart */}
        <div className="flex flex-col items-center justify-center">
          {energySources.length > 0 ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={energySources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
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
            <div className="h-[220px] flex items-center justify-center text-dimmed text-sm">No energy data</div>
          )}
        </div>

        {/* Energy Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-navy rounded-xl p-4">
              <div className="text-xs text-dimmed mb-1">Total Energy</div>
              <div className="text-xl font-bold text-white">
                {(() => {
                  const formatted = formatEnergy(metrics?.energy?.total || 0);
                  return `${formatted.value} ${formatted.unit}`;
                })()}
              </div>
              <div className="text-xs text-dimmed">Total consumption</div>
            </div>
            <div className="bg-navy rounded-xl p-4">
              <div className="text-xs text-dimmed mb-1">Intensity</div>
              <div className="text-xl font-bold text-white">
                {formatNumber(metrics?.energy?.intensity || 0, 3)}
              </div>
              <div className="text-xs text-dimmed">GJ/₹ Cr
                {metrics?.energy?.intensityPhysical > 0 && (
                  <span className="text-dimmed ml-2">
                    | {formatNumber(metrics?.energy?.intensityPhysical, 3)} /product
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Renewable Share */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-xl p-4 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white">Renewable Energy Share</span>
              <Leaf size={16} className="text-emerald-400" />
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-emerald-400">
                {formatPercent(metrics?.energy?.renewableShare || 0)}
              </div>
              <div className="text-right text-sm text-dimmed">of total consumption</div>
            </div>
            <div className="mt-3 w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3 rounded-full transition-all"
                style={{ width: `${metrics?.energy?.renewableShare || 0}%` }}
              />
            </div>
          </div>

          {/* Breakdown */}
          {energySources.length > 0 && energySources.some(e => e.breakdown.length > 0) && (
            <div className="space-y-2">
              {energySources.map((source) => (
                <div key={source.name} className="bg-navy rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-sm text-white">{source.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{formatNumber(source.value)} GJ</span>
                  </div>
                  {source.breakdown.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {source.breakdown.map((item) => (
                        <div key={item.name} className="text-xs">
                          <span className="text-dimmed">{item.name}:</span>
                          <span className="text-white ml-1">{formatNumber(item.value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// WORKFORCE & SOCIAL METRICS SUMMARY
// ============================================================================
const WorkforceSummary = ({ report, metrics }) => {
  const indicators = report?.indicators || {};

  const workforceStats = [
    {
      label: 'Total Workforce',
      value: formatNumber(metrics?.social?.totalEmployees || 0),
      icon: Users,
      color: 'text-blue-400',
    },
    {
      label: 'Female Employees',
      value: formatPercent(metrics?.social?.genderDiversity || 0),
      icon: Users,
      color: 'text-pink-400',
    },
    {
      label: 'Permanent Staff',
      value: formatNumber(indicators.p3_permanent_employees || 0),
      icon: Briefcase,
      color: 'text-purple-400',
    },
    {
      label: 'Women on Board',
      value: metrics?.social?.femaleDirectors || 0,
      icon: Award,
      color: 'text-emerald-400',
    },
    {
      label: 'Training Coverage',
      value: formatPercent(indicators.p3_training_coverage_pct || 0),
      icon: GraduationCap,
      color: 'text-cyan-400',
    },
    {
      label: 'Well-being Spend',
      value: formatPercent(indicators.p3_wellbeing_spending_pct || 0),
      icon: Heart,
      color: 'text-red-400',
    },
  ].filter(s => s.value !== '0' && s.value !== '0%');

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-pink-400" size={24} />
        <h3 className="text-lg font-bold text-white">Workforce & Social Metrics</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {workforceStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-navy rounded-xl p-4 border border-white/5 text-center">
              <Icon className={`mx-auto mb-2 ${stat.color}`} size={20} />
              <div className="text-xs text-dimmed mb-1">{stat.label}</div>
              <div className={`text-lg font-bold text-white`}>{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Gender Diversity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4">Gender Distribution</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Male Employees</span>
                <span className="font-semibold text-blue-400">{formatNumber(indicators.p3_total_employees_male || 0)}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${((indicators.p3_total_employees_male || 0) / (metrics?.social?.totalEmployees || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Female Employees</span>
                <span className="font-semibold text-pink-400">{formatNumber(indicators.p3_total_employees_female || 0)}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-pink-400 h-2 rounded-full"
                  style={{ width: `${((indicators.p3_total_employees_female || 0) / (metrics?.social?.totalEmployees || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-white/10">
              <span className="text-dimmed">Diversity Ratio</span>
              <span className="font-semibold text-white">
                {indicators.p3_total_employees_male > 0
                  ? `${(indicators.p3_total_employees_female / indicators.p3_total_employees_male).toFixed(2)}:1`
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4">Training & Development</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-dimmed">Skill Development</span>
              <span className="text-sm font-semibold text-blue-400">{formatNumber(indicators.p3_training_skill_total || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-dimmed">Health & Safety</span>
              <span className="text-sm font-semibold text-emerald-400">{formatNumber(indicators.p3_training_health_safety_total || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-dimmed">Human Rights</span>
              <span className="text-sm font-semibold text-amber-400">{formatNumber(indicators.p3_training_human_rights || 0)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-sm text-dimmed">Total Trained</span>
              <span className="text-sm font-bold text-white">
                {formatNumber(
                  (indicators.p3_training_skill_total || 0) +
                  (indicators.p3_training_health_safety_total || 0) +
                  (indicators.p3_training_human_rights || 0)
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GOVERNANCE & COMPLIANCE SUMMARY
// ============================================================================
const GovernanceSummary = ({ report }) => {
  const indicators = report?.indicators || {};

  const governanceMetrics = [
    {
      label: 'Board Meetings',
      value: indicators.p1_board_meetings || 0,
      icon: Calendar,
      color: 'text-blue-400',
    },
    {
      label: 'Independent Directors',
      value: formatPercent(indicators.p1_independent_directors_pct || 0),
      icon: Shield,
      color: 'text-emerald-400',
    },
    {
      label: 'Women Directors',
      value: indicators.p3_female_directors || 0,
      icon: Users,
      color: 'text-pink-400',
    },
    {
      label: 'CSR Spending',
      value: `₹${formatNumber((indicators.p8_csr_spent || 0) / 10000000)} Cr`,
      icon: DollarSign,
      color: 'text-gold',
    },
  ];

  const policies = [
    { name: 'Ethics Policy', has: indicators.policy_ethics === 'Yes' },
    { name: 'Human Rights', has: indicators.policy_human_rights === 'Yes' },
    { name: 'Equal Opportunity', has: indicators.policy_equal_opportunity === 'Yes' },
    { name: 'Cyber Security', has: indicators.policy_cyber_security === 'Yes' },
    { name: 'Environment Policy', has: indicators.policy_environment === 'Yes' },
    { name: 'Sustainability', has: indicators.policy_sustainability === 'Yes' },
  ];

  const hasPoliciesCount = policies.filter(p => p.has).length;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-purple-400" size={24} />
        <h3 className="text-lg font-bold text-white">Governance & Compliance</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {governanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-navy rounded-xl p-4 border border-white/5 text-center">
              <Icon className={`mx-auto mb-2 ${metric.color}`} size={20} />
              <div className="text-xs text-dimmed mb-1">{metric.label}</div>
              <div className="text-lg font-bold text-white">{metric.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Policy Framework */}
        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4">Policy Framework</h4>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs text-dimmed">Adopted: </div>
            <div className="text-lg font-bold text-cyan-400">{hasPoliciesCount}/{policies.length}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {policies.map((policy) => (
              <div
                key={policy.name}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                  policy.has
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-gray-500/10 border border-gray-500/30 text-gray-400'
                }`}
              >
                {policy.has ? <CheckCircle size={12} /> : <XCircle size={12} />}
                <span className="truncate">{policy.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Board Composition */}
        <div className="bg-navy rounded-xl p-4 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4">Board Composition Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-dimmed">Total Directors</span>
              <span className="text-sm font-bold text-white">{indicators.p3_total_board_directors || indicators.p1_board_meetings || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-dimmed">Independent Directors</span>
              <span className="text-sm font-bold text-emerald-400">{indicators.p1_independent_directors || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-dimmed">Female Directors</span>
              <span className="text-sm font-bold text-pink-400">{indicators.p3_female_directors || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-dimmed">Female KMP %</span>
              <span className="text-sm font-bold text-purple-400">{formatPercent(indicators.p3_female_kmp_pct || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN OVERVIEW COMPONENT
// ============================================================================
const BRSROverview = ({ report }) => {
  const metrics = useBRSRMetrics(report);
  const prevIndicators = report?.indicators?.prev_year || {};

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-dimmed">Select a report to view analysis</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <CompanyInfoPanel report={report} metrics={metrics} />

      <ExecutiveSummary report={report} metrics={metrics} prevIndicators={prevIndicators} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GHGScopeBreakdown report={report} prevIndicators={prevIndicators} metrics={metrics} />
        <EnergyMixVisualization report={report} metrics={metrics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkforceSummary report={report} metrics={metrics} />
        <GovernanceSummary report={report} />
      </div>
    </motion.div>
  );
};

export { BRSROverview };
