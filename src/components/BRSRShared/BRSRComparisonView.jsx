import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, Minus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useBRSRComparison } from '../../hooks/useBRSRAnalysis';
import { SUSTAINSUTRA_THEME } from '../../utils/brsr/themeConfig';

const BRSRComparisonView = ({ onBack, onCompare }) => {
  const { selectedReports, toggleReport, clearSelection, canCompare, enterComparisonMode } = useBRSRComparison();
  const [showResults, setShowResults] = useState(false);
  const [comparisonResults, setComparisonResults] = useState(null);

  const handleCompare = () => {
    if (!canCompare) return;

    const results = generateComparisonData(selectedReports);
    setComparisonResults(results);
    setShowResults(true);
    onCompare?.();
  };

  const generateComparisonData = (reports) => {
    if (reports.length === 0) return null;

    const metrics = [
      { key: 'esgScore', label: 'ESG Score', format: 'number', higherBetter: true },
      { key: 'environmentalScore', label: 'Environmental', format: 'number', higherBetter: true },
      { key: 'socialScore', label: 'Social', format: 'number', higherBetter: true },
      { key: 'governanceScore', label: 'Governance', format: 'number', higherBetter: true },
      { key: 'energyIntensity', label: 'Energy Intensity', format: 'decimal', higherBetter: false, unit: 'MJ/₹ Cr' },
      { key: 'ghgIntensity', label: 'GHG Intensity', format: 'decimal', higherBetter: false, unit: 'tCO2e/₹ Cr' },
      { key: 'waterIntensity', label: 'Water Intensity', format: 'decimal', higherBetter: false, unit: 'KL/₹ Cr' },
      { key: 'wasteRecyclingRate', label: 'Waste Recycling', format: 'percentage', higherBetter: true, unit: '%' },
      { key: 'employeeTurnover', label: 'Emp. Turnover', format: 'percentage', higherBetter: false, unit: '%' },
      { key: 'genderDiversity', label: 'Gender Diversity', format: 'percentage', higherBetter: true, unit: '%' },
    ];

    return metrics.map(metric => {
      const values = reports.map(r => {
        const value = r[metric.key] || r.indicators?.[metric.key] || 0;
        return {
          reportId: r._id,
          value,
          formattedValue: formatValue(value, metric.format),
        };
      });

      const bestValue = metric.higherBetter
        ? Math.max(...values.map(v => v.value))
        : Math.min(...values.map(v => v.value));

      return {
        ...metric,
        values,
        bestValue,
      };
    });
  };

  const formatValue = (value, format) => {
    if (format === 'percentage') return `${(value * 100).toFixed(1)}%`;
    if (format === 'decimal') return value.toFixed(4);
    if (format === 'number') return value.toFixed(1);
    return value;
  };

  const getTrendIcon = (value, bestValue, higherBetter) => {
    if (value === bestValue) return <CheckCircle className="w-5 h-5 text-green-400" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  if (showResults && comparisonResults) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowResults(false)} className="inline-flex items-center gap-2 text-dimmed hover:text-white transition-colors">
              <ArrowRight size={18} className="rotate-180" />
              <span className="text-sm">Back to Selection</span>
            </button>
            <h3 className="text-lg font-bold text-white">Comparison Results</h3>
          </div>
          <button onClick={clearSelection} className="inline-flex items-center gap-2 bg-navy-light/30 text-dimmed px-3 py-1.5 rounded-lg hover:text-white transition-colors text-sm">
            <X size={16} />
            Clear Selection
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {selectedReports.map((report, index) => (
            <div key={report._id} className="bg-navy-light/30 border border-white/10 rounded-2xl p-4">
              <div className={`text-xs font-semibold mb-2 ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-green-400' : index === 2 ? 'text-yellow-400' : 'text-purple-400'}`}>
                REPORT {index + 1}
              </div>
              <div className="font-bold text-white text-sm mb-1">{report.companyName}</div>
              <div className="text-xs text-dimmed">{report.financialYear}</div>
              <div className="mt-3 text-2xl font-bold text-gold">{report.esgScore || 0}</div>
              <div className="text-xs text-dimmed">ESG Score</div>
            </div>
          ))}
        </div>

        <div className="bg-navy-light/30 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-semibold text-white sticky left-0 bg-navy-light/30">Metric</th>
                  {selectedReports.map((report, index) => (
                    <th key={report._id} className={`text-left p-4 text-sm font-semibold ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-green-400' : index === 2 ? 'text-yellow-400' : 'text-purple-400'}`}>
                      Report {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonResults.map((metric, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-white sticky left-0 bg-navy-light/30">
                      <div>
                        <div className="font-semibold">{metric.label}</div>
                        {metric.unit && <div className="text-xs text-dimmed">{metric.unit}</div>}
                      </div>
                    </td>
                    {metric.values.map((valueObj, valueIndex) => {
                      const isSelectedBest = valueObj.value === metric.bestValue;
                      const isHigherBetter = metric.higherBetter;
                      const trendColor = isSelectedBest
                        ? isHigherBetter
                          ? 'text-green-400'
                          : 'text-red-400'
                        : 'text-dimmed';

                      return (
                        <td key={valueObj.reportId} className="p-4">
                          <div className={`font-mono text-sm ${trendColor}`}>
                            {valueObj.formattedValue}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-navy-light/20 border border-white/10 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-4">Key Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generateInsights(selectedReports, comparisonResults).map((insight, index) => (
              <div key={index} className="bg-navy p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  {insight.icon}
                  <span className="text-sm font-semibold text-white">{insight.title}</span>
                </div>
                <p className="text-xs text-dimmed">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-dimmed hover:text-white transition-colors">
            <ArrowRight size={18} className="rotate-180" />
            <span className="text-sm">Back</span>
          </button>
          <h3 className="text-lg font-bold text-white">Select Reports to Compare</h3>
        </div>
        <div className="text-sm text-dimmed">
          {selectedReports.length} / 4 reports selected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedReports.length === 0 ? (
          <div className="col-span-full bg-navy-light/20 border border-white/10 rounded-3xl p-12 text-center">
            <AlertCircle size={48} className="mx-auto mb-4 text-dimmed" />
            <h4 className="text-lg font-bold text-white mb-2">No Reports Selected</h4>
            <p className="text-sm text-dimmed mb-6">Select at least 2 reports to compare their ESG metrics</p>
          </div>
        ) : (
          selectedReports.map((report, index) => (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-navy-light/30 border rounded-2xl p-4 relative ${index === 0 ? 'border-blue-500/30' : index === 1 ? 'border-green-500/30' : index === 2 ? 'border-yellow-500/30' : 'border-purple-500/30'}`}
            >
              <button
                onClick={() => toggleReport(report._id)}
                className="absolute top-3 right-3 p-1 text-dimmed hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
              <div className={`text-xs font-semibold mb-2 ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-green-400' : index === 2 ? 'text-yellow-400' : 'text-purple-400'}`}>
                REPORT {index + 1}
              </div>
              <div className="font-bold text-white text-sm mb-1">{report.companyName}</div>
              <div className="text-xs text-dimmed mb-3">{report.financialYear}</div>
              <div className="text-3xl font-bold text-gold">{report.esgScore || 0}</div>
              <div className="text-xs text-dimmed">ESG Score</div>
            </motion.div>
          ))
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={clearSelection}
          className="inline-flex items-center gap-2 bg-navy-light/30 text-dimmed px-4 py-2 rounded-lg hover:text-white transition-colors"
        >
          <X size={18} />
          Clear Selection
        </button>
        <button
          onClick={handleCompare}
          disabled={!canCompare}
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${canCompare ? 'bg-gold text-navy hover:bg-gold/80' : 'bg-navy-light/20 text-dimmed cursor-not-allowed'}`}
        >
          <TrendingUp size={18} />
          Compare Reports
        </button>
      </div>
    </div>
  );
};

const generateInsights = (reports, comparisonResults) => {
  const insights = [];

  const topESG = [...reports].sort((a, b) => (b.esgScore || 0) - (a.esgScore || 0))[0];
  if (topESG) {
    insights.push({
      icon: <CheckCircle size={16} className="text-green-400" />,
      title: 'Highest ESG Score',
      description: `${topESG.companyName} (${topESG.financialYear}) leads with ${topESG.esgScore || 0} points`,
    });
  }

  const envBest = comparisonResults.find(m => m.key === 'environmentalScore');
  if (envBest) {
    const bestReport = reports.find(r => r._id === envBest.values.find(v => v.value === envBest.bestValue)?.reportId);
    if (bestReport) {
      insights.push({
        icon: <Leaf size={16} className="text-green-400" />,
        title: 'Best Environmental',
        description: `${bestReport.companyName} scores highest on environmental metrics`,
      });
    }
  }

  const socialBest = comparisonResults.find(m => m.key === 'socialScore');
  if (socialBest) {
    const bestReport = reports.find(r => r._id === socialBest.values.find(v => v.value === socialBest.bestValue)?.reportId);
    if (bestReport) {
      insights.push({
        icon: <CheckCircle size={16} className="text-pink-400" />,
        title: 'Best Social',
        description: `${bestReport.companyName} leads in social performance`,
      });
    }
  }

  const govBest = comparisonResults.find(m => m.key === 'governanceScore');
  if (govBest) {
    const bestReport = reports.find(r => r._id === govBest.values.find(v => v.value === govBest.bestValue)?.reportId);
    if (bestReport) {
      insights.push({
        icon: <CheckCircle size={16} className="text-blue-400" />,
        title: 'Best Governance',
        description: `${bestReport.companyName} has strongest governance practices`,
      });
    }
  }

  const lowestIntensity = comparisonResults.find(m => m.key === 'energyIntensity');
  if (lowestIntensity) {
    const bestReport = reports.find(r => r._id === lowestIntensity.values.find(v => v.value === lowestIntensity.bestValue)?.reportId);
    if (bestReport) {
      insights.push({
        icon: <TrendingDown size={16} className="text-green-400" />,
        title: 'Lowest Energy Intensity',
        description: `${bestReport.companyName} is most energy-efficient`,
      });
    }
  }

  const mostDiverse = comparisonResults.find(m => m.key === 'genderDiversity');
  if (mostDiverse) {
    const bestReport = reports.find(r => r._id === mostDiverse.values.find(v => v.value === mostDiverse.bestValue)?.reportId);
    if (bestReport) {
      insights.push({
        icon: <CheckCircle size={16} className="text-purple-400" />,
        title: 'Most Gender Diverse',
        description: `${bestReport.companyName} has highest gender diversity`,
      });
    }
  }

  return insights.slice(0, 6);
};

export default BRSRComparisonView;
