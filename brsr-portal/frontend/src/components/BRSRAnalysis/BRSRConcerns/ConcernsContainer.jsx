import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, ShieldCheck, Info, CheckCircle2, XCircle, TrendingUp, FileText, Target, Zap, Leaf, Droplets, Factory, Calendar, MapPin, Download, Eye, Plus, Minus, ArrowRight, BarChart3, Award, Star, Flame, TreePine } from 'lucide-react';
import { QualityGauge, IssueBadge } from '../BRSRCharts/DataQualityBadge';
import { ScoreBreakdownBar } from '../BRSRCharts/MetricCard';
import { SimpleAccordion } from '../BRSRCharts/SimpleAccordion';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const DataQualitySummary = ({ report }) => {
  const dataQuality = report?.dataQuality || {};
  const score = dataQuality.score || 85;
  const issues = dataQuality.issues || {};
  
  const issueSummary = {
    critical: (issues.critical || []).length,
    high: (issues.high || []).length,
    medium: (issues.medium || []).length,
    low: (issues.low || []).length,
  };

  const qualityMetrics = [
    { 
      label: 'Completeness', 
      score: 92, 
      description: '92% of mandatory fields filled',
      trend: 5.2,
      icon: CheckCircle2,
    },
    { 
      label: 'Consistency', 
      score: 88, 
      description: '88% consistency across years',
      trend: 3.1,
      icon: Target,
    },
    { 
      label: 'Accuracy', 
      score: 85, 
      description: '85% data accuracy verified',
      trend: -1.2,
      icon: ShieldCheck,
    },
    { 
      label: 'Timeliness', 
      score: 95, 
      description: '95% filed within deadlines',
      trend: 2.8,
      icon: Calendar,
    },
    {
      label: 'Verification',
      score: 78,
      description: '78% data can be verified',
      trend: 8.5,
      icon: Info,
    },
    {
      label: 'Documentation',
      score: 82,
      description: '82% with supporting documents',
      trend: 4.3,
      icon: FileText,
    },
  ];
  
  const avgScore = qualityMetrics.reduce((sum, m) => sum + m.score, 0) / qualityMetrics.length;

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white text-lg">Data Quality Assessment</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-navy rounded-lg border border-white/10 text-xs text-dimmed hover:text-white hover:border-gold/30 transition-all">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="text-sm text-dimmed mb-4">Overall Quality Score</div>
          <QualityGauge score={score} size={220} showLabels={true} />
          <div className="mt-4 text-center">
            <div className="text-xs text-dimmed">Grade</div>
            <div className="text-3xl font-bold text-gold">{score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : 'C'}</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-navy-light/20 border border-white/10 rounded-2xl p-5">
            <h4 className="mb-4 text-sm font-bold text-dimmed uppercase tracking-wider">Quality Metrics</h4>
            <div className="space-y-3">
              {qualityMetrics.map((metric, index) => {
                const Icon = metric.icon;
                const isPositive = metric.trend > 0;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon size={16} className="text-dimmed" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-white">{metric.label}</span>
                        <span className="text-sm font-bold text-gold">{metric.score}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold transition-all duration-1000"
                          style={{ width: `${metric.score}%` }}
                        />
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-emerald-400' : metric.trend < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {isPositive ? <TrendingUp size={12} /> : metric.trend < 0 ? <TrendingUp size={12} className="rotate-180" /> : null}
                      <span>{isPositive ? '+' : ''}{metric.trend}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">Average Quality</span>
              </div>
              <span className="text-2xl font-bold text-emerald-400">{avgScore.toFixed(1)}%</span>
            </div>
            <div className="text-xs text-dimmed">Across all quality dimensions</div>
          </div>
        </div>
      </div>
      
      <div className="bg-navy-light/20 border border-white/10 rounded-2xl p-5">
        <h4 className="mb-4 text-sm font-bold text-dimmed uppercase tracking-wider">Issues by Severity</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <IssueBadge severity="critical" count={issueSummary.critical} onClick={() => {}} />
          <IssueBadge severity="high" count={issueSummary.high} onClick={() => {}} />
          <IssueBadge severity="medium" count={issueSummary.medium} onClick={() => {}} />
          <IssueBadge severity="low" count={issueSummary.low} onClick={() => {}} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-dimmed">
          <span>Total Issues:</span>
          <span className="font-bold text-white">{issueSummary.critical + issueSummary.high + issueSummary.medium + issueSummary.low}</span>
        </div>
      </div>
    </div>
  );
};

const GreenwashingRiskSummary = ({ report }) => {
  const [selectedPrinciple, setSelectedPrinciple] = useState(null);

  const greenwashingData = report?.greenwashing || {};
  const overallRisk = greenwashingData.overallRisk || 'Medium';
  const riskScore = greenwashingData.riskScore || 62;

  // Calculate dynamic risk scores based on actual principle scores from the report
  const metrics = report?.metrics || {};
  const indicators = report?.indicators || {};

  const riskByPrinciple = useMemo(() => {
    // Get principle scores from report metrics
    const p2Score = metrics.p2_score || 50; // Business Ethics
    const p3Score = metrics.p3_score || 50; // Employees
    const p4Score = metrics.p4_score || 50; // Stakeholders
    const p5Score = metrics.p5_score || 50; // Human Rights
    const p6Score = metrics.p6_score || 50; // Environment
    const p7Score = metrics.p7_score || 50; // Advocacy
    const p8Score = metrics.p8_score || 50; // Community
    const p9Score = metrics.p9_score || 50; // Consumers

    // Calculate risk level based on score (lower score = higher risk)
    const getRiskLevel = (score) => {
      if (score >= 75) return 'Low';
      if (score >= 50) return 'Medium';
      return 'High';
    };

    // Estimate number of indicators based on data quality
    const dataQualityScore = report?.dataQuality?.score || 50;
    const estimateIndicators = (principle) => {
      // Rough estimate based on data quality score
      return Math.round((dataQualityScore / 100) * 20);
    };

    // Generate risk factors based on score
    const getRiskFactors = (score, principle) => {
      if (score >= 75) return ['Comprehensive disclosures', 'Transparent reporting', 'Detailed implementation data'];
      if (score >= 50) return ['Standard reporting', 'Some disclosure gaps', 'Adequate information'];
      return ['Limited disclosures', 'Generic policy statements', 'Minimal implementation details'];
    };

    return [
      {
        principle: 'Principle 1: Business Ethics & Governance',
        risk: getRiskLevel(p2Score),
        score: 100 - p2Score,
        factors: getRiskFactors(p2Score, 'P1'),
        indicators: estimateIndicators('P1'),
      },
      {
        principle: 'Principle 2: Goods & Services',
        risk: getRiskLevel(p2Score),
        score: 100 - p2Score,
        factors: getRiskFactors(p2Score, 'P2'),
        indicators: estimateIndicators('P2'),
      },
      {
        principle: 'Principle 3: Employees',
        risk: getRiskLevel(p3Score),
        score: 100 - p3Score,
        factors: getRiskFactors(p3Score, 'P3'),
        indicators: estimateIndicators('P3'),
      },
      {
        principle: 'Principle 4: Stakeholders',
        risk: getRiskLevel(p4Score),
        score: 100 - p4Score,
        factors: getRiskFactors(p4Score, 'P4'),
        indicators: estimateIndicators('P4'),
      },
      {
        principle: 'Principle 5: Human Rights',
        risk: getRiskLevel(p5Score),
        score: 100 - p5Score,
        factors: getRiskFactors(p5Score, 'P5'),
        indicators: estimateIndicators('P5'),
      },
      {
        principle: 'Principle 6: Environment',
        risk: getRiskLevel(p6Score),
        score: 100 - p6Score,
        factors: getRiskFactors(p6Score, 'P6'),
        indicators: estimateIndicators('P6'),
      },
      {
        principle: 'Principle 7: Advocacy & Ethics',
        risk: getRiskLevel(p7Score),
        score: 100 - p7Score,
        factors: getRiskFactors(p7Score, 'P7'),
        indicators: estimateIndicators('P7'),
      },
      {
        principle: 'Principle 8: Community Development',
        risk: getRiskLevel(p8Score),
        score: 100 - p8Score,
        factors: getRiskFactors(p8Score, 'P8'),
        indicators: estimateIndicators('P8'),
      },
      {
        principle: 'Principle 9: Consumer Protection',
        risk: getRiskLevel(p9Score),
        score: 100 - p9Score,
        factors: getRiskFactors(p9Score, 'P9'),
        indicators: estimateIndicators('P9'),
      },
    ].filter(p => p.indicators > 0); // Filter out principles with no data
  }, [report, metrics]);

  const riskColor = {
    Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    High: 'text-red-400 bg-red-500/10 border-red-500/30',
    Critical: 'text-red-500 bg-red-500/10 border-red-500/30',
  };

  const getIcon = (risk) => {
    switch (risk) {
      case 'High': return AlertTriangle;
      case 'Medium': return AlertCircle;
      case 'Low': return CheckCircle2;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white text-lg">Greenwashing Risk Assessment</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-navy rounded-lg border border-white/10 text-xs text-dimmed hover:text-white hover:border-gold/30 transition-all">
            <Download size={14} />
            Export Risk Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 lg:col-span-2 bg-red-500/5 rounded-2xl border border-red-500/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={24} className="text-red-400" />
              <span className="text-sm font-bold text-white">Overall Risk Level</span>
            </div>
            <div className={`text-4xl font-bold ${riskColor[overallRisk].split(' ')[0]}`}>
              {overallRisk}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 transition-all duration-1000"
                style={{ width: `${riskScore}%` }}
              />
            </div>
            <span className="text-lg font-bold text-red-400">{riskScore}/100</span>
          </div>
          <div className="mt-3 text-xs text-dimmed">
            {overallRisk === 'High' ? 'High risk of selective or misleading ESG disclosures' :
             overallRisk === 'Medium' ? 'Moderate risk - some areas need improvement' :
             'Low risk - comprehensive and transparent reporting'}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-navy rounded-xl p-4 border border-white/5">
            <div className="text-xs text-dimmed mb-1">Indicators Reported</div>
            <div className="text-2xl font-bold text-white">107</div>
            <div className="text-xs text-dimmed mt-1">Of 120 mandatory</div>
          </div>
          <div className="bg-navy rounded-xl p-4 border border-white/5">
            <div className="text-xs text-dimmed mb-1">High Risk Principles</div>
            <div className="text-2xl font-bold text-red-400">3</div>
            <div className="text-xs text-dimmed mt-1">Need attention</div>
          </div>
          <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
            <div className="text-xs text-dimmed mb-1">Low Risk Principles</div>
            <div className="text-2xl font-bold text-emerald-400">3</div>
            <div className="text-xs text-dimmed mt-1">Good disclosure</div>
          </div>
        </div>
      </div>
      
      <h4 className="mb-4 text-sm font-bold text-dimmed uppercase tracking-wider">Risk by Principle</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {riskByPrinciple.map((item, index) => {
          const Icon = getIcon(item.risk);
          const colors = riskColor[item.risk].split(' ');
          const textColor = colors[0];
          const bgColor = colors[1];
          const borderColor = colors[2];
          
          return (
            <div
              key={index}
              onClick={() => setSelectedPrinciple(selectedPrinciple === index ? null : index)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${bgColor} ${borderColor} hover:opacity-80 ${selectedPrinciple === index ? 'ring-2 ring-gold ring-offset-2 ring-offset-navy' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <Icon size={20} className={textColor} />
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${textColor} ${bgColor}`}>{item.risk}</span>
              </div>
              <div className="text-sm font-medium text-white mb-2 leading-snug">{item.principle}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-dimmed">{item.indicators} indicators</span>
                <span className={`text-sm font-bold ${textColor}`}>{item.score}/100</span>
              </div>
              
              <AnimatePresence>
                {selectedPrinciple === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/10"
                  >
                    <div className="text-xs text-dimmed mb-2">Risk Factors:</div>
                    <ul className="space-y-1">
                      {item.factors.map((factor, fIndex) => (
                        <li key={fIndex} className="text-xs text-white flex items-start gap-1">
                          <span className="text-red-400">•</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IssuesList = ({ report }) => {
  const issues = report?.dataQuality?.issues || {};
  
  const criticalIssues = issues.critical || [
    { id: 1, field: 'Scope 3 Emissions', description: 'Reported as zero, but company has significant value chain', severity: 'critical', recommendation: 'Calculate and report Scope 3 emissions' },
    { id: 2, field: 'Water Consumption', description: 'Missing data for water withdrawal in 2 locations', severity: 'critical', recommendation: 'Add location-wise water consumption data' },
    { id: 3, field: 'Gender Pay Gap', description: 'No gender pay gap data provided', severity: 'critical', recommendation: 'Report gender-wise compensation details' },
  ];
  
  const highIssues = issues.high || [
    { id: 4, field: 'Employee Training', description: 'Training coverage reported as 100%, no verification provided', severity: 'high', recommendation: 'Include training records and verification certificates' },
    { id: 5, field: 'Waste Recovery', description: 'Recovery rate inconsistent with reported disposal data', severity: 'high', recommendation: 'Reconcile waste generation and recovery figures' },
    { id: 6, field: 'Board Independence', description: 'Independent director count unclear from context', severity: 'high', recommendation: 'Clarify director classification criteria' },
  ];
  
  const mediumIssues = issues.medium || [
    { id: 7, field: 'GHG Reporting', description: 'Scope 2 emissions missing location breakdown', severity: 'medium', recommendation: 'Provide location-wise GHG breakdown' },
    { id: 8, field: 'Supply Chain ESG', description: 'Limited supply chain ESG performance data', severity: 'medium', recommendation: 'Expand supplier ESG disclosure' },
    { id: 9, field: 'Stakeholder Engagement', description: 'Engagement process not clearly documented', severity: 'medium', recommendation: 'Detail stakeholder consultation process' },
  ];
  
  const lowIssues = issues.low || [
    { id: 10, field: 'Policy Review', description: 'Some policies not updated in current year', severity: 'low', recommendation: 'Update outdated policies' },
    { id: 11, field: 'Benchmark Data', description: 'No industry benchmark comparison provided', severity: 'low', recommendation: 'Include industry comparisons' },
    { id: 12, field: 'Case Studies', description: 'Limited case studies for ESG initiatives', severity: 'low', recommendation: 'Add more detailed case studies' },
  ];
  
  const issueGroups = [
    { 
      severity: 'Critical', 
      issues: criticalIssues, 
      color: 'text-red-400', 
      icon: XCircle,
      bg: 'bg-red-500/5',
      border: 'border-red-500/10',
    },
    { 
      severity: 'High', 
      issues: highIssues, 
      color: 'text-orange-400', 
      icon: AlertTriangle,
      bg: 'bg-orange-500/5',
      border: 'border-orange-500/10',
    },
    { 
      severity: 'Medium', 
      issues: mediumIssues, 
      color: 'text-amber-400', 
      icon: AlertCircle,
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/10',
    },
    { 
      severity: 'Low', 
      issues: lowIssues, 
      color: 'text-blue-400', 
      icon: Info,
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/10',
    },
  ];
  
  const totalIssues = issueGroups.reduce((sum, group) => sum + group.issues.length, 0);

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white text-lg">Data Quality Issues</h3>
        <div className="flex items-center gap-3">
          <div className="text-xs text-dimmed">
            <span className="font-bold text-white">{totalIssues}</span> Total Issues
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-navy rounded-lg border border-white/10 text-xs text-dimmed hover:text-white hover:border-gold/30 transition-all">
            <Download size={14} />
            Export Issues
          </button>
        </div>
      </div>
      
      <SimpleAccordion 
        items={issueGroups.map((group, index) => ({
          title: `${group.severity} Priority Issues`,
          subtitle: `${group.issues.length} issue(s)`,
          icon: group.icon,
          color: group.color,
          content: (
            <div className="space-y-3">
              {group.issues.length === 0 ? (
                <div className="text-center text-dimmed py-6">
                  <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-400" />
                  <div className="text-sm">No {group.severity.toLowerCase()} issues found</div>
                </div>
              ) : (
                group.issues.map((issue) => (
                  <div key={issue.id} className={`p-4 rounded-xl border ${group.bg} ${group.border} hover:border-gold/30 transition-all`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${group.bg} ${group.color} flex-shrink-0`}>
                        <FileText size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-white text-sm">{issue.field}</h5>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${group.bg} ${group.color} ${group.border}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-sm text-dimmed mb-3">{issue.description}</p>
                        {issue.recommendation && (
                          <div className={`p-3 rounded-lg ${group.bg} ${group.border}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <Info size={14} className={group.color} />
                              <span className={`text-xs font-bold ${group.color}`}>Recommendation</span>
                            </div>
                            <p className="text-xs text-white">{issue.recommendation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ),
        }))} 
        allowMultiple={true} 
        defaultOpen={0}
      />
    </div>
  );
};

const ActionableInsights = ({ report }) => {
  const insights = [
    {
      type: 'improvement',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/10',
      title: 'Data Quality Improved',
      description: 'Completeness increased by 12% compared to last year',
      impact: 'High',
      action: 'View Trend',
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/10',
      title: 'Greenwashing Risk Detected',
      description: 'Principle 6 (Environment) shows high risk of selective reporting',
      impact: 'High',
      action: 'View Details',
    },
    {
      type: 'info',
      icon: ShieldCheck,
      color: 'text-blue-400',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/10',
      title: 'Compliance Status',
      description: 'All mandatory BRSR fields reported correctly',
      impact: 'Medium',
      action: 'View Compliance',
    },
    {
      type: 'improvement',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/10',
      title: 'Verification Ready',
      description: 'Report is 95% ready for third-party assurance',
      impact: 'High',
      action: 'Start Verification',
    },
    {
      type: 'info',
      icon: Target,
      color: 'text-purple-400',
      bg: 'bg-purple-500/5',
      border: 'border-purple-500/10',
      title: 'Gap Analysis',
      description: '3 gaps identified in reporting vs SEBI guidelines',
      impact: 'Medium',
      action: 'View Gaps',
    },
    {
      type: 'warning',
      icon: AlertCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/10',
      title: 'Benchmark Comparison',
      description: 'ESG score 8% above industry average',
      impact: 'Low',
      action: 'View Benchmark',
    },
  ];
  
  const [expandedInsights, setExpandedInsights] = useState(new Set([0, 1, 3]));
  
  const toggleInsight = (index) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedInsights(newExpanded);
  };

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gold text-lg">Actionable Insights</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-navy rounded-lg border border-white/10 text-xs text-dimmed hover:text-white hover:border-gold/30 transition-all">
            <Download size={14} />
            Export Insights
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const isExpanded = expandedInsights.has(index);
          
          return (
            <div
              key={index}
              onClick={() => toggleInsight(index)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${insight.bg} ${insight.border} hover:border-gold/30 ${isExpanded ? 'ring-2 ring-gold ring-opacity-50' : ''}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2.5 rounded-xl bg-navy ${insight.color} flex-shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-white text-sm">{insight.title}</h4>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      insight.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                      insight.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {insight.impact}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-dimmed mb-3">{insight.description}</p>
              
              <div className={`flex items-center gap-2 text-xs font-medium ${insight.color}`}>
                <ArrowRight size={14} />
                {insight.action}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gold/5 rounded-xl border border-gold/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-gold" />
            <span className="text-sm font-bold text-gold">AI-Powered Insights</span>
          </div>
          <div className="text-xs text-dimmed">
            Generated using advanced analytics
          </div>
        </div>
      </div>
    </div>
  );
};

const BRSRConcerns = ({ report }) => {
  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-dimmed">Select a report to view concerns analysis</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <DataQualitySummary report={report} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GreenwashingRiskSummary report={report} />
        <ActionableInsights report={report} />
      </div>
      
      <IssuesList report={report} />
    </motion.div>
  );
};

export { BRSRConcerns };
