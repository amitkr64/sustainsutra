import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle, Minus, TrendingUp, TrendingDown, Download, Maximize2 } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const ReportComparison = ({ 
  reports = [], 
  onCompare,
  onClose,
  maxReports = 4
}) => {
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [comparisonMode, setComparisonMode] = useState('metrics');
  const [expandedView, setExpandedView] = useState(null);

  const toggleReportSelection = (reportId) => {
    setSelectedForComparison(prev => {
      if (prev.includes(reportId)) {
        return prev.filter(id => id !== reportId);
      } else if (prev.length < maxReports) {
        return [...prev, reportId];
      }
      return prev;
    });
  };

  const getComparisonData = () => {
    return reports
      .filter(report => selectedForComparison.includes(report._id))
      .sort((a, b) => {
        const aIndex = selectedForComparison.indexOf(a._id);
        const bIndex = selectedForComparison.indexOf(b._id);
        return aIndex - bIndex;
      });
  };

  const getMetricIcon = (value, threshold, betterDirection = 'higher') => {
    if (value === null || value === undefined) return <Minus className="text-dimmed" size={16} />;
    
    const isBetter = betterDirection === 'higher' 
      ? value >= threshold 
      : value <= threshold;

    return isBetter 
      ? <CheckCircle2 className="text-emerald-400" size={16} />
      : <XCircle className="text-red-400" size={16} />;
  };

  const getTrendIcon = (trend) => {
    if (!trend || trend === 0) return <Minus className="text-dimmed" size={16} />;
    return trend > 0 
      ? <TrendingUp className="text-emerald-400" size={16} />
      : <TrendingDown className="text-red-400" size={16} />;
  };

  const comparisonMetrics = [
    { key: 'esgScore', label: 'ESG Score', threshold: 75 },
    { key: 'indicators.environmental', label: 'Environmental Score', threshold: 80 },
    { key: 'indicators.social', label: 'Social Score', threshold: 80 },
    { key: 'indicators.governance', label: 'Governance Score', threshold: 80 },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const selectedReports = getComparisonData();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-navy-light/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-navy border border-white/10 rounded-3xl shadow-2xl max-w-6xl w-[95vw] max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Compare Reports</h2>
              <p className="text-sm text-dimmed">Select up to {maxReports} reports to compare</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExpandedView(expandedView ? null : 'table')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {expandedView ? <XCircle size={18} className="text-dimmed" /> : <Maximize2 size={18} className="text-dimmed" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} className="text-dimmed" />
              </button>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Select Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reports.map(report => {
                  const isSelected = selectedForComparison.includes(report._id);
                  return (
                    <motion.div
                      key={report._id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleReportSelection(report._id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gold/20 border-gold/50'
                          : 'bg-navy border-white/10 hover:border-gold/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm mb-1">
                            {report.companyName}
                          </div>
                          <div className="text-xs text-dimmed">{report.financialYear}</div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="text-gold" size={20} />
                        )}
                      </div>
                      <div className="text-2xl font-bold text-gold">
                        {report.esgScore || 0}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {selectedReports.length >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-navy-light/30 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Comparison Summary</h3>
                  {onCompare && (
                    <button
                      onClick={() => onCompare(selectedReports)}
                      className="inline-flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-lg font-bold hover:bg-gold/80 transition-all"
                    >
                      <Download size={16} />
                      Generate Report
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dimmed">Metric</th>
                        {selectedReports.map(report => (
                          <th key={report._id} className="text-center py-3 px-4 text-sm font-semibold text-gold min-w-[120px]">
                            {report.companyName}
                            <br />
                            <span className="text-xs font-normal text-dimmed">{report.financialYear}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonMetrics.map(metric => {
                        const getReportValue = (report) => {
                          const keys = metric.key.split('.');
                          let value = report;
                          keys.forEach(k => {
                            if (value && value[k] !== undefined) {
                              value = value[k];
                            }
                          });
                          return value || 0;
                        };

                        return (
                          <tr key={metric.key} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 text-sm text-white font-medium">
                              {metric.label}
                            </td>
                            {selectedReports.map(report => {
                              const value = getReportValue(report);
                              return (
                                <td key={report._id} className="py-3 px-4 text-center">
                                  <span className={`text-2xl font-bold ${getScoreColor(value)}`}>
                                    {value.toLocaleString('en-IN')}
                                  </span>
                                  <div className="flex items-center justify-center mt-1">
                                    {getMetricIcon(value, metric.threshold)}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedReports.map(report => {
                    const topPerformer = selectedReports.reduce((best, current) => 
                      (current.esgScore || 0) > (best.esgScore || 0) ? current : best
                    );
                    const isBest = report._id === topPerformer._id;

                    return (
                      <motion.div
                        key={report._id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border ${
                          isBest 
                            ? 'bg-gold/10 border-gold/30' 
                            : 'bg-navy border-white/10'
                        }`}
                      >
                        <div className="text-xs text-dimmed mb-1">Overall Performance</div>
                        <div className="text-2xl font-bold text-gold mb-2">
                          {isBest && <span className="mr-2">🏆</span>}
                          {report.esgScore || 0}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-dimmed">Environmental</span>
                            <span className="text-white font-medium">
                              {report.indicators?.environmental || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-dimmed">Social</span>
                            <span className="text-white font-medium">
                              {report.indicators?.social || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-dimmed">Governance</span>
                            <span className="text-white font-medium">
                              {report.indicators?.governance || 0}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export { ReportComparison };
