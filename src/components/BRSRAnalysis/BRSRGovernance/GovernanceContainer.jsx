import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, ShieldCheck, FileText, Users, AlertCircle, CheckCircle2, TrendingUp, TrendingDown, ChevronRight, Info, Download, Eye, Star, Award, BookOpen, Clock, BarChart3, Target, ThumbsUp, ThumbsDown, Filter, Calendar, MapPin, Building2, Briefcase } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { MetricCard, ChartNoData, ScoreBreakdownBar } from '../BRSRCharts/MetricCard';
import { useBRSRMetrics } from '../../../hooks/useBRSRAnalysis';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const GovernanceHero = ({ metrics, indicators, prevIndicators }) => {
  // Calculate trends dynamically from previous year data
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return null;
    return ((current - previous) / previous) * 100;
  };

  const totalBoardDirectors = indicators?.p1_total_board_directors || indicators?.p1_independent_directors || 1;
  const femaleDirectors = indicators?.p3_female_directors || 0;
  const prevBoardMeetings = prevIndicators?.p1_board_meetings || 0;

  // Calculate governance metrics from actual XBRL data
  const hasEthicsPolicy = indicators?.policy_ethics === 'Yes' || indicators?.p1_ethics_policy ? 1 : 0;
  const hasAntiCorruption = indicators?.p1_anti_corruption_policy === 'Yes' ? 1 : 0;
  const hasWhistleblower = indicators?.p1_whistleblower_policy === 'Yes' ? 1 : 0;
  const hasHumanRights = indicators?.policy_human_rights === 'Yes' || indicators?.p5_human_rights_policy === 'Yes' ? 1 : 0;
  const hasSustainability = indicators?.policy_sustainability === 'Yes' ? 1 : 0;
  const hasConflictProcess = indicators?.p1_conflict_process === 'Yes' ? 1 : 0;
  const hasSupplierCode = indicators?.p1_supplier_code_of_conduct === 'Yes' ? 1 : 0;

  const totalPolicies = hasEthicsPolicy + hasAntiCorruption + hasWhistleblower + hasHumanRights + hasSustainability + hasConflictProcess + hasSupplierCode;

  const heroCards = [
    {
      icon: Gavel,
      label: 'Board Meetings',
      value: indicators?.p1_board_meetings || 0,
      unit: '/yr',
      trend: calculateTrend(indicators?.p1_board_meetings || 0, prevBoardMeetings),
      status: (indicators?.p1_board_meetings || 0) >= 4 ? 'success' : 'warning',
      description: 'Target: 4 minimum',
    },
    {
      icon: Users,
      label: 'Independent Directors',
      value: indicators?.p1_independent_directors || 0,
      unit: 'Directors',
      trend: null,
      status: (indicators?.p1_independent_directors_pct || 0) >= 50 ? 'success' : 'warning',
      description: `${(indicators?.p1_independent_directors_pct || 0).toFixed(0)}% of board`,
    },
    {
      icon: ShieldCheck,
      label: 'Governance Score',
      value: Math.round(metrics?.governance?.boardIndependence || indicators?.p1_independent_directors_pct || 50),
      unit: '/100',
      trend: null,
      status: (indicators?.p1_independent_directors_pct || 0) >= 50 ? 'success' : 'warning',
      description: 'Based on board independence',
    },
    {
      icon: FileText,
      label: 'Policies Implemented',
      value: totalPolicies,
      unit: 'Policies',
      trend: null,
      status: totalPolicies >= 5 ? 'success' : 'warning',
      description: 'From XBRL disclosure',
    },
    {
      icon: Users,
      label: 'Women Directors',
      value: femaleDirectors,
      unit: 'Directors',
      trend: null,
      status: femaleDirectors >= 1 ? 'success' : 'warning',
      description: totalBoardDirectors > 0 ? `${((femaleDirectors / totalBoardDirectors) * 100).toFixed(0)}% of board` : 'N/A',
    },
    {
      icon: Award,
      label: 'ESG Score',
      value: Math.round(metrics?.esgScore || indicators?.esgScore || 0),
      unit: '/100',
      trend: null,
      status: (metrics?.esgScore || 0) >= 70 ? 'success' : 'warning',
      description: 'BRSR Composite Score',
    },
    {
      icon: Star,
      label: 'CSR Compliance',
      value: indicators?.p8_csr_percentage || metrics?.governance?.csrSpendPct || 0,
      unit: '%',
      trend: null,
      status: (indicators?.p8_csr_percentage || 0) >= 2 ? 'success' : 'warning',
      description: 'Of net profit',
    },
    {
      icon: Info,
      label: 'Conflict Process',
      value: hasConflictProcess ? 'Yes' : 'No',
      unit: '',
      status: hasConflictProcess ? 'success' : 'warning',
      description: 'Conflict of interest policy',
    },
  ].filter(card => card.value !== 0 || card.unit === 'Directors' || card.unit === '/yr');

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {heroCards.map((card, index) => (
        <MetricCard
          key={index}
          {...card}
          size="md"
          showTrendLabel={card.trend !== undefined}
        />
      ))}
    </div>
  );
};

const BoardComposition = ({ indicators, prevIndicators }) => {
  const [selectedView, setSelectedView] = useState('structure');

  // Calculate board composition dynamically
  const totalDirectors = indicators?.p1_total_board_directors || indicators?.p1_independent_directors || 1;
  const independentDirectors = indicators?.p1_independent_directors || 0;
  const femaleDirectors = indicators?.p3_female_directors || 0;

  // Calculate derived values
  const executiveDirectors = indicators?.p1_executive_directors || Math.max(0, totalDirectors - independentDirectors - (indicators?.p1_non_executive_directors || 0));
  const nonExecutiveDirectors = indicators?.p1_non_executive_directors || Math.max(0, totalDirectors - independentDirectors);

  // Calculate percentages dynamically
  const independentPct = totalDirectors > 0 ? (independentDirectors / totalDirectors) * 100 : 0;
  const executivePct = totalDirectors > 0 ? (executiveDirectors / totalDirectors) * 100 : 0;
  const nonExecutivePct = totalDirectors > 0 ? (nonExecutiveDirectors / totalDirectors) * 100 : 0;

  const boardData = [
    { name: 'Independent Directors', value: independentDirectors, color: '#10B981', percentage: independentPct },
    { name: 'Executive Directors', value: executiveDirectors, color: '#3B82F6', percentage: executivePct },
    { name: 'Non-Executive Directors', value: nonExecutiveDirectors, color: '#8B5CF6', percentage: nonExecutivePct },
  ].filter(item => item.value > 0);

  // Calculate gender breakdown dynamically
  const maleDirectors = Math.max(0, totalDirectors - femaleDirectors);
  const malePct = totalDirectors > 0 ? (maleDirectors / totalDirectors) * 100 : 0;
  const femalePct = totalDirectors > 0 ? (femaleDirectors / totalDirectors) * 100 : 0;

  const genderData = [
    { name: 'Men', value: maleDirectors, color: '#3B82F6', percentage: malePct },
    { name: 'Women', value: femaleDirectors, color: '#EC4899', percentage: femalePct },
  ].filter(item => item.value > 0);

  // Calculate governance scores dynamically
  const boardMeetings = indicators?.p1_board_meetings || 0;
  const meetingScore = Math.min(100, (boardMeetings / 4) * 100);

  const governanceScore = [
    {
      subject: 'Board Independence',
      A: independentPct,
      B: prevIndicators?.p1_independent_directors_pct || independentPct * 0.9,
      fullMark: 100
    },
    {
      subject: 'Gender Diversity',
      A: femalePct,
      B: prevIndicators ? ((prevIndicators.p3_female_directors || 0) / (prevIndicators.p1_total_board_directors || 1)) * 100 : femalePct * 0.9,
      fullMark: 100
    },
    {
      subject: 'Meeting Frequency',
      A: meetingScore,
      B: Math.min(100, ((prevIndicators?.p1_board_meetings || 0) / 4) * 100),
      fullMark: 100
    },
    {
      subject: 'Policy Framework',
      A: (indicators?.p1_anti_corruption_policy === 'Yes' ? 25 : 0) +
        (indicators?.p1_whistleblower_policy === 'Yes' ? 25 : 0) +
        (indicators?.p1_conflict_process === 'Yes' ? 25 : 0) +
        (indicators?.policy_ethics === 'Yes' ? 25 : 0),
      B: 75,
      fullMark: 100
    },
    {
      subject: 'CSR Compliance',
      A: Math.min(100, ((indicators?.p8_csr_percentage || 0) / 2) * 100),
      B: Math.min(100, ((prevIndicators?.p8_csr_percentage || 0) / 2) * 100),
      fullMark: 100
    },
  ];

  const views = [
    { id: 'structure', label: 'Board Structure' },
    { id: 'gender', label: 'Gender Diversity' },
    { id: 'radar', label: 'Governance Radar' },
  ];

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-purple-400 text-sm uppercase tracking-wider">Board Composition</h3>
        <div className="flex gap-2">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedView === view.id
                  ? 'bg-gold text-navy'
                  : 'bg-navy text-dimmed hover:text-white border border-white/10'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {selectedView === 'structure' && (
          <motion.div
            key="structure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={boardData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={90} 
                  paddingAngle={5} 
                  dataKey="value"
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                  labelLine={false}
                >
                  {boardData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A192F', border: 'none' }}
                  formatter={(value, name) => [value, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {selectedView === 'gender' && (
          <motion.div
            key="gender"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={genderData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={90} 
                  paddingAngle={5} 
                  dataKey="value"
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                  labelLine={false}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A192F', border: 'none' }}
                  formatter={(value, name) => [value, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {selectedView === 'radar' && (
          <motion.div
            key="radar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={governanceScore}>
                <PolarGrid stroke="#1B4332" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#A0AAB5', fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#A0AAB5' }} />
                <Radar
                  name="Previous Year"
                  dataKey="B"
                  stroke="#6B7280"
                  fill="#6B7280"
                  fillOpacity={0.15}
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
                <Radar
                  name="Current Year"
                  dataKey="A"
                  stroke={SUSTAINSUTRA_THEME.colors.purple}
                  fill={SUSTAINSUTRA_THEME.colors.purple}
                  fillOpacity={0.25}
                  strokeWidth={2.5}
                />
                <Legend verticalAlign="bottom" height={36} iconSize={10} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-navy rounded-xl border border-white/5 text-center hover:border-gold/30 transition-all cursor-pointer">
          <div className="text-xs text-dimmed mb-1">Total Directors</div>
          <div className="text-2xl font-bold text-white">12</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <TrendingUp size={12} className="text-emerald-400" />
            <span className="text-xs text-emerald-400">+1 vs last year</span>
          </div>
        </div>
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center hover:border-emerald-500/30 transition-all cursor-pointer">
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-semibold">Independence</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{indicators?.p1_independent_directors_pct?.toFixed(0)}%</div>
          <div className="text-xs text-dimmed mt-1">Target: 50%</div>
        </div>
        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-center hover:border-blue-500/30 transition-all cursor-pointer">
          <div className="text-xs text-dimmed mb-1">Women on Board</div>
          <div className="text-2xl font-bold text-blue-400">{indicators?.p3_female_directors_pct?.toFixed(0)}%</div>
          <div className="text-xs text-dimmed mt-1">SEBI: 1 min</div>
        </div>
        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-center hover:border-amber-500/30 transition-all cursor-pointer">
          <div className="text-xs text-dimmed mb-1">Board Meetings</div>
          <div className="text-2xl font-bold text-amber-400">{indicators?.p1_board_meetings || 0}</div>
          <div className="text-xs text-dimmed mt-1">Target: 4/yr</div>
        </div>
      </div>
    </div>
  );
};

const PolicyCompliance = ({ indicators }) => {
  // Build policies dynamically from XBRL indicators
  const policies = [];

  // Ethics & Integrity Policy
  if (indicators?.policy_ethics === 'Yes' || indicators?.p1_ethics_policy) {
    policies.push({ name: 'Ethics & Integrity', status: 'Implemented', score: 100, icon: ShieldCheck, lastUpdated: 'Current FY' });
  }

  // Anti-Corruption Policy
  if (indicators?.p1_anti_corruption_policy === 'Yes') {
    policies.push({ name: 'Anti-Corruption', status: 'Implemented', score: 100, icon: Gavel, lastUpdated: 'Current FY' });
  }

  // Whistleblower Policy
  if (indicators?.p1_whistleblower_policy === 'Yes') {
    policies.push({ name: 'Whistleblower Mechanism', status: 'Implemented', score: 100, icon: AlertCircle, lastUpdated: 'Current FY' });
  }

  // Human Rights Policy
  if (indicators?.policy_human_rights === 'Yes' || indicators?.p5_human_rights_policy === 'Yes') {
    policies.push({ name: 'Human Rights Policy', status: 'Implemented', score: 100, icon: CheckCircle2, lastUpdated: 'Current FY' });
  }

  // Cyber Security Policy
  if (indicators?.policy_cyber_security === 'Yes') {
    policies.push({ name: 'Cyber Security', status: 'Implemented', score: 100, icon: ShieldCheck, lastUpdated: 'Current FY' });
  }

  // Sustainability Committee
  if (indicators?.policy_sustainability === 'Yes') {
    policies.push({ name: 'Sustainability Committee', status: 'Implemented', score: 100, icon: TrendingUp, lastUpdated: 'Current FY' });
  }

  // Conflict of Interest Process
  if (indicators?.p1_conflict_process === 'Yes') {
    policies.push({ name: 'Conflict of Interest', status: 'Implemented', score: 100, icon: Info, lastUpdated: 'Current FY' });
  }

  // Supplier Code of Conduct
  if (indicators?.p1_supplier_code_of_conduct === 'Yes') {
    policies.push({ name: 'Supplier Code of Conduct', status: 'Implemented', score: 100, icon: FileText, lastUpdated: 'Current FY' });
  }

  // Equal Opportunity Policy
  if (indicators?.policy_equal_opportunity === 'Yes') {
    policies.push({ name: 'Equal Opportunity', status: 'Implemented', score: 100, icon: ThumbsUp, lastUpdated: 'Current FY' });
  }

  // If no policies found, add a placeholder
  if (policies.length === 0) {
    policies.push({
      name: 'No Policy Data Available',
      status: 'Not Reported',
      score: 0,
      icon: AlertCircle,
      lastUpdated: 'N/A'
    });
  }

  const avgScore = policies.length > 0 ? policies.reduce((sum, p) => sum + p.score, 0) / policies.length : 0;
  const implementedCount = policies.filter(p => p.status === 'Implemented').length;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gold text-sm uppercase tracking-wider">Policy Compliance</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-navy rounded-lg border border-white/10 text-xs text-dimmed hover:text-white hover:border-gold/30 transition-all">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <div className="text-xs text-dimmed mb-1">Overall Score</div>
          <div className="text-2xl font-bold text-emerald-400">{avgScore.toFixed(1)}</div>
          <div className="text-xs text-dimmed mt-1">/ 100</div>
        </div>
        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
          <div className="text-xs text-dimmed mb-1">Implemented</div>
          <div className="text-2xl font-bold text-blue-400">{implementedCount}/9</div>
          <div className="text-xs text-dimmed mt-1">Policies</div>
        </div>
        <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
          <div className="text-xs text-dimmed mb-1">Last Updated</div>
          <div className="text-2xl font-bold text-purple-400">Mar '24</div>
          <div className="text-xs text-dimmed mt-1">3 policies updated</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          const statusColor = policy.status === 'Implemented' 
            ? 'text-emerald-400' 
            : policy.status === 'Partial' 
            ? 'text-amber-400' 
            : 'text-red-400';
          
          return (
            <div key={index} className="bg-navy p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-navy ${statusColor} flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-white truncate">{policy.name}</span>
                    <span className={`text-xs font-bold ${statusColor} flex-shrink-0 ml-2`}>{policy.score}%</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`flex items-center gap-1 text-xs ${statusColor}`}>
                      <CheckCircle2 size={12} />
                      {policy.status}
                    </div>
                  </div>
                  <div className="text-xs text-dimmed">Updated: {policy.lastUpdated}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CommitteeStructure = ({ indicators }) => {
  const committees = [
    { 
      name: 'Audit Committee', 
      members: 4, 
      meetings: 4, 
      independent: 3,
      chairIndependent: true,
      purpose: 'Financial oversight',
    },
    { 
      name: 'Nomination & Remuneration', 
      members: 3, 
      meetings: 5, 
      independent: 3,
      chairIndependent: true,
      purpose: 'Board composition',
    },
    { 
      name: 'Stakeholder Relations', 
      members: 5, 
      meetings: 6, 
      independent: 4,
      chairIndependent: false,
      purpose: 'Engagement',
    },
    { 
      name: 'Risk Management', 
      members: 4, 
      meetings: 4, 
      independent: 3,
      chairIndependent: true,
      purpose: 'Risk oversight',
    },
    { 
      name: 'ESG Committee', 
      members: 5, 
      meetings: 8, 
      independent: 4,
      chairIndependent: true,
      purpose: 'Sustainability',
    },
    { 
      name: 'CSR Committee', 
      members: 4, 
      meetings: 6, 
      independent: 3,
      chairIndependent: true,
      purpose: 'CSR oversight',
    },
  ];

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-cyan-400 text-sm uppercase tracking-wider">Board Committees</h3>
        <button className="flex items-center gap-2 text-xs text-dimmed hover:text-white transition-colors">
          <Download size={14} />
          Export Structure
        </button>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left text-dimmed uppercase text-xs">Committee</th>
              <th className="p-3 text-center text-dimmed uppercase text-xs">Members</th>
              <th className="p-3 text-center text-dimmed uppercase text-xs">Meetings</th>
              <th className="p-3 text-center text-dimmed uppercase text-xs">Independent</th>
              <th className="p-3 text-center text-dimmed uppercase text-xs">Indep %</th>
              <th className="p-3 text-center text-dimmed uppercase text-xs">Chair</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {committees.map((committee, index) => {
              const independencePct = ((committee.independent / committee.members) * 100).toFixed(0);
              const isGoodIndependence = independencePct >= 50;
              
              return (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div>
                      <div className="text-white font-medium">{committee.name}</div>
                      <div className="text-xs text-dimmed">{committee.purpose}</div>
                    </div>
                  </td>
                  <td className="p-3 text-center">{committee.members}</td>
                  <td className="p-3 text-center">{committee.meetings}</td>
                  <td className="p-3 text-center">{committee.independent}</td>
                  <td className="p-3 text-center">
                    <span className={`font-bold ${isGoodIndependence ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {independencePct}%
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {committee.chairIndependent ? (
                      <CheckCircle2 size={16} className="text-emerald-400 mx-auto" />
                    ) : (
                      <AlertCircle size={16} className="text-amber-400 mx-auto" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <div className="text-xs text-dimmed mb-1">Avg Independence</div>
          <div className="text-2xl font-bold text-emerald-400">81%</div>
          <div className="text-xs text-dimmed mt-1">Target: 50%</div>
        </div>
        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
          <div className="text-xs text-dimmed mb-1">Total Committees</div>
          <div className="text-2xl font-bold text-blue-400">6</div>
          <div className="text-xs text-dimmed mt-1">Active</div>
        </div>
        <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
          <div className="text-xs text-dimmed mb-1">Independent Chairs</div>
          <div className="text-2xl font-bold text-purple-400">5/6</div>
          <div className="text-xs text-dimmed mt-1">83%</div>
        </div>
      </div>
    </div>
  );
};

const ComplianceTrends = ({ indicators }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('5y');

  const periods = [
    { id: '1y', label: '1 Year' },
    { id: '3y', label: '3 Years' },
    { id: '5y', label: '5 Years' },
  ];

  const complianceData = {
    '5y': [
      { year: '2020', score: 72, violations: 18, fines: 2.5 },
      { year: '2021', score: 78, violations: 12, fines: 1.2 },
      { year: '2022', score: 82, violations: 9, fines: 0.8 },
      { year: '2023', score: 86, violations: 6, fines: 0.5 },
      { year: '2024', score: 91, violations: 3, fines: 0.2 },
    ],
    '3y': [
      { year: '2022', score: 82, violations: 9, fines: 0.8 },
      { year: '2023', score: 86, violations: 6, fines: 0.5 },
      { year: '2024', score: 91, violations: 3, fines: 0.2 },
    ],
    '1y': [
      { year: '2024', score: 91, violations: 3, fines: 0.2 },
    ],
  };

  const currentData = complianceData[selectedPeriod];

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-wider">Compliance Trends</h3>
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPeriod === period.id
                  ? 'bg-gold text-navy'
                  : 'bg-navy text-dimmed hover:text-white border border-white/10'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
              <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
              <YAxis tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} domain={[0, 100]} stroke="#64748B" strokeWidth={1.5} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A192F', border: 'none' }}
                formatter={(value, name) => [value, 'Compliance Score']}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke={SUSTAINSUTRA_THEME.colors.emerald} 
                fill={SUSTAINSUTRA_THEME.colors.emerald}
                fillOpacity={0.2}
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1B4332" />
              <XAxis dataKey="year" tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
              <YAxis tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} stroke="#64748B" strokeWidth={1.5} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A192F', border: 'none' }}
                formatter={(value, name) => [value, name]}
              />
              <Bar dataKey="violations" fill={SUSTAINSUTRA_THEME.colors.amber} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-emerald-400" />
            <span className="text-sm font-bold text-white">Current Score</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">91/100</div>
          <div className="text-xs text-dimmed mt-1">↑ 15 points since 2020</div>
        </div>
        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={20} className="text-emerald-400" />
            <span className="text-sm font-bold text-white">Violations</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">3</div>
          <div className="text-xs text-dimmed mt-1">↓ 83% reduction since 2020</div>
        </div>
      </div>
    </div>
  );
};

const BRSRGovernance = ({ report }) => {
  const metrics = useBRSRMetrics(report);
  const indicators = report?.indicators || {};
  const prevIndicators = indicators?.prev_year || {};

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-dimmed">Select a report to view governance analysis</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <GovernanceHero metrics={metrics} indicators={indicators} prevIndicators={prevIndicators} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BoardComposition indicators={indicators} prevIndicators={prevIndicators} />
        <CommitteeStructure indicators={indicators} />
      </div>

      <PolicyCompliance indicators={indicators} />

      <ComplianceTrends indicators={indicators} />
    </motion.div>
  );
};

export { BRSRGovernance };
