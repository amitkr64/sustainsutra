import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Filter, Download, BarChart3, FileText, AlertCircle, Leaf, Zap } from 'lucide-react';
import { BRSRAnalysisProvider, useBRSRAnalysis } from '../contexts/BRSRAnalysisContext';
import { BRSROverview } from '../components/BRSRAnalysis/BRSROverview/OverviewContainer';
import { BRSREnvironmental } from '../components/BRSRAnalysis/BRSREnvironmental/EnvironmentalContainer';
import { BRSRSocial } from '../components/BRSRAnalysis/BRSRSocial/SocialContainer';
import { BRSRGovernance } from '../components/BRSRAnalysis/BRSRGovernance/GovernanceContainer';
import { BRSRConcerns } from '../components/BRSRAnalysis/BRSRConcerns/ConcernsContainer';
import { BRSRDecarbonization } from '../components/BRSRAnalysis/BRSRDecarbonization/DecarbonizationContainer';
import { BRSRAnalytics } from '../components/BRSRAnalysis/BRSRAnalytics/BRSRAnalytics/AnalyticsContainer';
import { TabNavigation, TabPanel } from '../components/BRSRShared/TabNavigation';
import { DataQualityBadge, QualityGauge, IssueBadge } from '../components/BRSRAnalysis/BRSRCharts/DataQualityBadge';
import { SUSTAINSUTRA_THEME } from '../../utils/brsr/themeConfig';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'environmental', label: 'Environmental', icon: Leaf },
  { id: 'social', label: 'Social', icon: FileText },
  { id: 'governance', label: 'Governance', icon: Filter },
  { id: 'concerns', label: 'Data Quality', icon: AlertCircle },
  { id: 'analytics', label: 'Analytics', icon: Zap },
];

const ReportsList = () => {
  const { state, actions } = useBRSRAnalysis();
  const [uploading, setUploading] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.xml')) {
      alert('Please upload a valid XML file (.xml)');
      return;
    }

    setUploading(true);
    try {
      const result = await actions.uploadXBRL(file);
      actions.setCurrentReport(result);
      setSelectedReports([...selectedReports, result._id]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload XBRL file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (state.view === 'list') {
    return (
      <div className="relative overflow-hidden pt-24 pb-12 mb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6">
          <ReportsList />
        </div>
      </div>
    );
  }

  if (!state.currentReport) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-dimmed">No report selected</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-offwhite pb-24">
      <div className="container mx-auto px-6">
        <ReportsList />
      </div>
    </div>
  );
};

export default ReportsList;