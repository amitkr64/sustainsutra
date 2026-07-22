import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, FileSpreadsheet, X, Check } from 'lucide-react';
import { ExportService } from '../../../services/exportService';

const ExportMenu = ({ 
  reportData, 
  filename, 
  onClose, 
  onExport,
  position = 'bottom-right'
}) => {
  const [exporting, setExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeMetadata: true,
    compact: false
  });

  const exportFormats = [
    {
      id: 'pdf',
      label: 'PDF Report',
      icon: FileText,
      description: 'Generate professional PDF report',
      color: 'text-red-400'
    },
    {
      id: 'csv',
      label: 'CSV Data',
      icon: FileSpreadsheet,
      description: 'Raw data in CSV format',
      color: 'text-emerald-400'
    },
    {
      id: 'json',
      label: 'JSON Data',
      icon: FileText,
      description: 'Raw data in JSON format',
      color: 'text-blue-400'
    },
    {
      id: 'excel',
      label: 'Excel',
      icon: FileSpreadsheet,
      description: 'Export to Excel spreadsheet',
      color: 'text-green-400'
    }
  ];

  const handleExport = async (format) => {
    setExporting(true);
    try {
      await ExportService.exportReport(reportData, format, filename);
      if (onExport) {
        onExport(format);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed z-50"
      >
        <div className="bg-navy-light/40 backdrop-blur-md fixed inset-0" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed w-80 bg-navy border border-white/10 rounded-2xl shadow-2xl ${
            position === 'bottom-right' ? 'bottom-20 right-20' :
            position === 'bottom-left' ? 'bottom-20 left-20' :
            position === 'top-right' ? 'top-20 right-20' :
            'top-20 left-20'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Download size={20} className="text-gold" />
                <h3 className="text-lg font-bold text-white">Export Options</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} className="text-dimmed" />
              </button>
            </div>

            <div className="space-y-3">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => handleExport(format.id)}
                    disabled={exporting}
                    className={`w-full p-4 bg-navy border border-white/5 rounded-xl text-left hover:border-gold/30 transition-all ${
                      selectedFormat === format.id ? 'border-gold bg-gold/5' : ''
                    } ${exporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${format.color.replace('text-', 'bg-').replace('400', '-500/20')}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white mb-1">{format.label}</div>
                        <div className="text-xs text-dimmed">{format.description}</div>
                      </div>
                      {selectedFormat === format.id && (
                        <Check size={18} className="text-gold" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeCharts}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, includeCharts: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/20 bg-navy focus:border-gold focus:ring-0"
                  />
                  <span className="text-sm text-dimmed">Include charts and visualizations</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeMetadata}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, includeMetadata: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/20 bg-navy focus:border-gold focus:ring-0"
                  />
                  <span className="text-sm text-dimmed">Include metadata and timestamps</span>
                </label>
              </div>
            </div>

            {exporting && (
              <div className="mt-4 p-4 bg-gold/5 border border-gold/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-semibold text-gold">Exporting...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export { ExportMenu };
