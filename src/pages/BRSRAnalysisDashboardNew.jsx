import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Filter, Download, BarChart3, FileText, AlertCircle, Leaf, Zap, Target, Settings } from 'lucide-react';
import { BRSRAnalysisProvider, useBRSRAnalysis } from '../contexts/BRSRAnalysisContext';
import { useBRSRFilters } from '../hooks/useBRSRAnalysis';
import { BRSROverview } from '../components/BRSRAnalysis/BRSROverview/OverviewContainer';
import { BRSREnvironmental } from '../components/BRSRAnalysis/BRSREnvironmental/EnvironmentalContainer';
import { BRSRSocial } from '../components/BRSRAnalysis/BRSRSocial/SocialContainer';
import { BRSRGovernance } from '../components/BRSRAnalysis/BRSRGovernance/GovernanceContainer';
import { BRSRConcerns } from '../components/BRSRAnalysis/BRSRConcerns/ConcernsContainer';
import { BRSRDecarbonization } from '../components/BRSRAnalysis/BRSRDecarbonization/DecarbonizationContainer';
import { BRSRAnalytics } from '../components/BRSRAnalysis/BRSRAnalytics/AnalyticsContainer';
import { TabNavigation, TabPanel } from '../components/BRSRShared/TabNavigation';
import { BRSRErrorBoundary } from '../components/BRSRShared/BRSRErrorBoundary';
import { DataQualityBadge } from '../components/BRSRAnalysis/BRSRCharts/DataQualityBadge';
import { ExportMenu } from '../components/BRSRAnalysis/BRSRShared/ExportMenu';
import { UserSettings } from '../components/BRSRAnalysis/BRSRShared/UserSettings';
import BRSRAdvancedFilters from '../components/BRSRShared/BRSRAdvancedFilters';
import { SUSTAINSUTRA_THEME } from '../utils/brsr/themeConfig';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'environmental', label: 'Environmental', icon: Leaf },
  { id: 'social', label: 'Social', icon: FileText },
  { id: 'governance', label: 'Governance', icon: Filter },
  { id: 'decarbonization', label: 'Decarbonization', icon: Target },
  { id: 'concerns', label: 'Data Quality', icon: AlertCircle },
  { id: 'analytics', label: 'Analytics', icon: Zap },
];

// Utility: Clean up raw XBRL filenames to extract company name
const formatCompanyName = (rawName) => {
  // Handle different input types
  let nameStr = '';

  if (typeof rawName === 'string') {
    nameStr = rawName;
  } else if (rawName && typeof rawName === 'object') {
    // If it's an object, try to extract company name from known properties
    nameStr = rawName.companyName || rawName.name || rawName.fileName || JSON.stringify(rawName);
  } else {
    return 'Company Name';
  }

  if (!nameStr || nameStr === '') return 'Company Name';

  // Ensure it's a string
  nameStr = String(nameStr);

  // Remove file extensions and common suffixes
  let cleaned = nameStr
    .replace(/\.xml$/i, '')
    .replace(/_xbrl$/i, '')
    .replace(/[-_]\d{1,2}[-_]?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[-_]?\d{2,4}/gi, '')
    .replace(/[-_]?\d{4}[-_]?\d{4}/g, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  // If cleaned is empty, return original
  if (!cleaned) cleaned = nameStr;

  // Title case
  return cleaned
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .replace(/\s+(Limited|Ltd|Pvt|Private|Public|Inc|Corp|Corporation)$/i, (m) => m.trim());
};

const ReportsList = () => {
  const { state, actions } = useBRSRAnalysis();
  const { reports, loading } = state;
  const { filteredReports } = useBRSRFilters();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await actions.uploadXBRL(file);
      actions.setCurrentReport(result);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload XBRL file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="bg-navy-light/20 border border-white/10 rounded-3xl p-12 text-center">
        <Upload size={64} className="mx-auto mb-6 text-dimmed" />
        <h2 className="text-2xl font-playfair text-gold mb-4">No BRSR Reports Yet</h2>
        <p className="text-dimmed mb-8">Upload your first XBRL file to begin analysis</p>
        <label className="cursor-pointer inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-full font-bold hover:bg-gold/80 transition-all">
          <Upload size={20} />
          Upload XBRL File
          <input
            type="file"
            className="hidden"
            accept=".xml"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-5xl font-playfair text-gold mb-4">BRSR Analytics Suite</h1>
          <p className="max-w-xl text-dimmed leading-relaxed">
            Advanced extraction engine. Real-time XBRL analytics. Enterprise-grade insights.
          </p>
        </div>
        <label className={`cursor-pointer inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-full font-bold hover:bg-gold/80 transition-all shadow-lg shadow-gold/20 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <Upload size={20} />
          {uploading ? 'Processing...' : 'Import XBRL'}
          <input
            type="file"
            className="hidden"
            accept=".xml"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <BRSRAdvancedFilters />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <motion.div
                  key={report._id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => actions.setCurrentReport(report)}
                  className="bg-navy-light/30 border border-white/10 p-6 rounded-3xl cursor-pointer hover:border-gold/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <DataQualityBadge score={report.dataQuality?.score || 85} size="sm" />
                    <div className="text-3xl font-bold text-white">{report.esgScore || 0}</div>
                  </div>
                  <h3 className="text-xl font-playfair mb-2 group-hover:text-gold transition-colors">
                    {formatCompanyName(report.companyName)}
                  </h3>

                  <p className="text-sm text-dimmed mb-1">CIN: {report.cin}</p>
                  <p className="text-sm text-gold font-semibold">{report.financialYear}</p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full bg-navy-light/20 border border-white/10 rounded-3xl p-12 text-center">
                <Filter size={64} className="mx-auto mb-6 text-dimmed" />
                <h2 className="text-2xl font-playfair text-gold mb-4">No Reports Match Your Filters</h2>
                <p className="text-dimmed mb-8">Try adjusting your filter criteria or reset all filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BRSRAnalysisDashboardContent = () => {
  const { state, actions } = useBRSRAnalysis();
  const { view, currentReport } = state;
  const [activeTab, setActiveTab] = useState('overview');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleBackToList = () => {
    actions.setView('list');
    setActiveTab('overview');
  };

  const handleExport = () => {
    setShowExportMenu(true);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  if (view === 'list') {
    return (
      <div className="relative overflow-hidden pt-24 pb-12 mb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6">
          <ReportsList />
        </div>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-dimmed">No report selected</div>
      </div>
    );
  }

  return (
    <BRSRErrorBoundary>
      <div className="min-h-screen bg-navy text-offwhite pb-24">
        <div className="relative overflow-hidden pt-24 pb-12 mb-8">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-2 block">Enterprise Intelligence</span>
                <h1 className="text-4xl font-playfair text-gold mb-2">{formatCompanyName(currentReport.companyName)}</h1>

                <p className="text-dimmed">CIN: {currentReport.cin} | FY: {currentReport.financialYear}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBackToList}
                  className="inline-flex items-center gap-2 bg-navy-light/30 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/10 transition-all border border-white/10"
                >
                  ← Back to Reports
                </button>
                <button
                  onClick={handleSettings}
                  className="inline-flex items-center gap-2 bg-navy-light/30 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/10 transition-all border border-white/10"
                >
                  <Settings size={18} />
                  Settings
                </button>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-full font-bold hover:bg-gold/80 transition-all shadow-lg shadow-gold/20"
                >
                  <Download size={18} />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            variant="default"
          />

          <div className="mt-4">
            <AnimatePresence mode="wait">
              <TabPanel activeTab={activeTab} tabId="overview">
                <BRSROverview report={currentReport} />
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="environmental">
                <BRSREnvironmental report={currentReport} />
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="social">
                <BRSRSocial report={currentReport} />
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="governance">
                <BRSRGovernance report={currentReport} />
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="decarbonization">
                <BRSRDecarbonization report={currentReport} />
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="concerns">
                <BRSRConcerns report={currentReport} />
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="analytics">
                <BRSRAnalytics reports={state.reports} currentReport={currentReport} />
              </TabPanel>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showExportMenu && (
        <ExportMenu
          reportData={currentReport}
          filename={`BRSR_Report_${currentReport.companyName}_${currentReport.financialYear}`}
          onClose={() => setShowExportMenu(false)}
        />
      )}

      {showSettings && (
        <UserSettings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={(newSettings) => console.log('Settings saved:', newSettings)}
        />
      )}
    </BRSRErrorBoundary>
  );
};

const BRSRAnalysisDashboardNew = () => {
  return (
    <BRSRAnalysisProvider>
      <BRSRAnalysisDashboardContent />
    </BRSRAnalysisProvider>
  );
};

export default BRSRAnalysisDashboardNew;
