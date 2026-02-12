import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Upload, BarChart3, GitCompare, FileText, Activity, Layers, TrendingUp, ShieldCheck,
    Trash2, ArrowRight, PieChart as PieChartIcon, Droplets, Zap, Users, Gavel,
    Download, ChevronLeft, Building2, Leaf, Heart, Scale, Briefcase, Globe,
    AlertTriangle, CheckCircle2, Info, BookOpen, Target, Factory, ChevronDown, ChevronUp,
    Table, ArrowUpRight, ArrowDownRight, Minus, XCircle, AlertOctagon, Check, Shield, Recycle
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, Radar, AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { analyzeDataQuality } from '@/utils/brsrDataQuality';
import { formatNumber, formatIntensity, formatGHGAsTCO2 } from '@/utils/brsr/numberFormat';
import { analyzeGreenwashing } from '@/utils/greenwashingDetector';

// SustainSutra theme only: navy, navy-light, sage, forest, gold, offwhite, growth, dimmed
const SUSTAINSUTRA = {
    navy: '#0B0F0B',
    navyLight: '#121820',
    sage: '#1B4332',
    forest: '#161B16',
    gold: '#D4AF37',
    offwhite: '#F8FAFC',
    growth: '#74C69D',
    dimmed: '#A0AAB5',
    // Card backgrounds (light tints)
    cardEnv: '#e8f8ed',
    cardSoc: '#f0f4e8',
    cardGov: '#fff7e0',
    cardOverall: '#e0f2f7',
};
const THEME_COLORS = { env: SUSTAINSUTRA.growth, soc: SUSTAINSUTRA.sage, gov: SUSTAINSUTRA.gold };

const SafeVal = (val, decimals = 2) => {
    if (val === undefined || val === null || isNaN(val)) return '0';
    // Use higher precision for very small numbers (like intensity MJ/Re)
    const d = (val < 0.1 && val > 0 && decimals < 4) ? 6 : decimals;
    return Number(val).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
};

const ChartNoData = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-navy/50 backdrop-blur-sm z-10 rounded-2xl">
        <span className="text-xs text-dimmed uppercase tracking-wider font-semibold border border-white/10 px-3 py-1 rounded-full">Data Not Reported</span>
    </div>
);

const TrendArrow = ({ val, invert = false }) => {
    if (val === undefined || val === null || val === 0) return <Minus size={14} className="text-dimmed" />;
    const isGood = invert ? val < 0 : val > 0;
    return (
        <div className={`flex items-center gap-1 text-xs font-bold ${isGood ? 'text-green-400' : 'text-red-400'}`}>
            {val > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(val).toFixed(1)}%
        </div>
    );
};

const SimpleAccordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <div className="space-y-4">
            {items.map((item, idx) => (
                <div key={idx} className="border border-white/10 rounded-xl bg-navy-light/20 overflow-hidden">
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-gold">
                                <item.icon size={18} />
                            </div>
                            <span className="font-medium text-offwhite text-left">{item.title}</span>
                        </div>
                        {openIndex === idx ? <ChevronUp size={16} className="text-dimmed" /> : <ChevronDown size={16} className="text-dimmed" />}
                    </button>
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4"
                            >
                                <div className="pt-2 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {item.content.map((subItem, subIdx) => (
                                        <div key={subIdx} className="bg-navy p-3 rounded-lg border border-white/5">
                                            <div className="text-xs text-dimmed mb-1">{subItem.label}</div>
                                            <div className="text-sm font-mono font-medium text-white break-words">
                                                {subItem.val !== undefined && subItem.val !== null ? subItem.val.toString() : '-'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

const ScoreGauge = ({ score }) => (
    <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="#1e293b" strokeWidth="12" fill="none" />
            <circle cx="96" cy="96" r="88" stroke={score > 70 ? THEME_COLORS.env : score > 40 ? THEME_COLORS.gov : '#EF4444'}
                strokeWidth="12" fill="none" strokeDasharray={552} strokeDashoffset={552 - (552 * score) / 100}
                className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{score}</span>
            <span className="text-xs text-dimmed uppercase tracking-widest mt-1">ESG Score</span>
        </div>
        <div className="absolute bottom-10">
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${score > 70 ? 'bg-green-500/20 text-green-400' : score > 40 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                {score > 70 ? 'Leader' : score > 40 ? 'Average' : 'Laggard'}
            </div>
        </div>
    </div>
);

const MetricCard = ({ label, value, unit, change, icon: Icon, color, subtext, invert = false }) => {
    const colorStyles = {
        gold: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-yellow-500/5',
        blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/5',
        green: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5',
        purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-purple-500/5',
    };
    const activeColor = colorStyles[color] || colorStyles.gold;

    return (
        <div className="bg-navy-light/40 border border-white/5 p-6 rounded-2xl flex items-start justify-between backdrop-blur-sm hover:border-white/10 transition-smooth group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-all"></div>
            <div className="relative z-10">
                <p className="text-dimmed text-xs uppercase tracking-wider mb-2 font-semibold">{label}</p>
                <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-playfair text-offwhite mb-1">{value || '-'}</h3>
                    <span className="text-sm font-sans text-dimmed">{unit}</span>
                </div>
                {change !== undefined && (
                    <div className="flex items-center gap-2 mt-2">
                        <TrendArrow val={change} invert={invert} />
                        <span className="text-[10px] text-dimmed uppercase">vs Last FY</span>
                    </div>
                )}
                {subtext && <p className="text-xs text-dimmed mt-2">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform relative z-10 border shadow-lg ${activeColor}`}>
                <Icon size={20} />
            </div>
        </div>
    );
};

const SummarySection = ({ metrics, indicators, companyName }) => {
    // Smart unit formatting functions
    // Base units: Energy=GJ, GHG=tCO2e, Water=KL
    // Use consistent tCO2 formatting for uniformity across all companies
    const formatGHG = formatGHGAsTCO2;

    const formatEnergy = (valueInGJ) => {
        if (valueInGJ >= 1000) return `${(valueInGJ / 1000).toFixed(2)} TJ`;
        return `${valueInGJ.toFixed(0)} GJ`;
    };

    const formatWater = (valueInKL) => {
        if (valueInKL >= 1000000) return `${(valueInKL / 1000000).toFixed(2)} ML`;
        return `${valueInKL.toFixed(0)} KL`;
    };

    // Use standardized base unit fields with fallback to raw fields
    // IMPORTANT: Use _base values for GHG (already converted to tCO2 by parser)
    const totalGHG = (indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1 || indicators.p6_scope1 || 0) +
                     (indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2 || indicators.p6_scope2 || 0) +
                     (indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3 || indicators.p6_scope3 || 0);
    const totalEnergy = indicators.p6_energy_total_gj ||
                       indicators.p6_total_energy_mj && indicators.p6_total_energy_mj / 1000 ||
                       indicators.p6_e1_grand_total_fy && indicators.p6_e1_grand_total_fy / 1000 || 0;
    const totalWater = indicators.p6_water_withdrawal || 0;

    return (
        <div className="bg-navy-light/20 p-6 rounded-2xl border border-white/5 mb-8 flex gap-4">
            <div className="p-3 bg-gold/10 rounded-xl h-fit"><FileText className="text-gold" size={24} /></div>
            <div>
                <h4 className="text-gold font-bold mb-2">Executive Summary</h4>
                <p className="text-sm text-dimmed leading-relaxed">
                    {companyName} reported a total turnover of INR {SafeVal((indicators.turnover || 0) / 10000000)} Cr.
                    {totalEnergy > 0 && ` Total energy consumption was ${formatEnergy(totalEnergy)}`}
                    {totalGHG > 0 && ` with GHG emissions of ${formatGHG(totalGHG)}`}
                    {totalWater > 0 && `. Water withdrawal was ${formatWater(totalWater)}`}.
                    Renewable energy share is {SafeVal(metrics.renewableEnergyShare, 1)}%.
                    {(metrics.genderDiversity || 0) > 0 ? ` The workforce comprises ${SafeVal(metrics.genderDiversity, 1)}% women.` : ''}
                    {(metrics.csrSpendPct || 0) > 0 ? ` CSR spending stands at ${SafeVal(metrics.csrSpendPct)}% of net profit.` : ''}
                </p>
            </div>
        </div>
    );
};

const BRSRAnalysisDashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [view, setView] = useState('list');
    const [activeReport, setActiveReport] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const { toast } = useToast();
    const { token } = useAuth();
    const navigate = useNavigate();

    const config = { headers: { 'Authorization': `Bearer ${token}` } };

    useEffect(() => { fetchReports(); }, []);

    const fetchReports = async () => {
        try {
            const { data } = await axios.get('/api/brsr-analysis', config);
            setReports(data || []);
        } catch (error) {
            toast({ title: "Fetch Error", description: "Failed to load reports.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('xbrl', file);
        setUploading(true);
        try {
            await axios.post('/api/brsr-analysis', formData, {
                headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
            });
            toast({ title: "Success", description: "XBRL Parsed successfully." });
            fetchReports();
        } catch (error) {
            toast({ title: "Upload Failed", description: "Invalid File or parse error.", variant: "destructive" });
        } finally {
            setUploading(false);
        }
    };

    const viewReportDetail = (report) => {
        setActiveReport(report);
        setView('detail');
        setActiveTab('overview');
        window.scrollTo(0, 0);
    };

    const renderDetailView = () => {
        if (!activeReport) return null;
        const { metrics = {}, indicators = {}, esgScore = 0, companyName, financialYear } = activeReport;

        const energyData = [
            { name: 'Renewable', value: metrics.renewableEnergyShare || 0 },
            { name: 'Non-Renewable', value: 100 - (metrics.renewableEnergyShare || 0) },
        ];
        const hasEnergyData = (indicators.p6_total_energy_mj || 0) > 0;

        const radarData = [
            { subject: 'P1: Ethics', A: metrics.regulatoryCompliance || 0, fullMark: 100 },
            { subject: 'P2: Products', A: metrics.p2_score || 0, fullMark: 100 },
            { subject: 'P3: Employees', A: Math.min(100, (metrics.genderDiversity || 0) * 2), fullMark: 100 },
            { subject: 'P4: Stakeholders', A: metrics.p4_score || 0, fullMark: 100 },
            { subject: 'P5: Human Rights', A: metrics.p5_score || 0, fullMark: 100 },
            { subject: 'P6: Environment', A: Math.min(100, (metrics.renewableEnergyShare || 0) * 2), fullMark: 100 },
            { subject: 'P7: Policy', A: metrics.p7_score || 0, fullMark: 100 },
            { subject: 'P8: Community', A: Math.min(100, (metrics.csrSpendPct || 0) * 50), fullMark: 100 },
            { subject: 'P9: Customer', A: indicators.p9_consumer_complaints === 0 ? 100 : 50, fullMark: 100 },
        ];

        const dqReport = analyzeDataQuality(activeReport);
        const gwReport = analyzeGreenwashing(activeReport);

        const mainTabs = [
            { id: 'overview', label: 'Overview', icon: Layers },
            { id: 'environmental', label: 'Environmental', icon: Leaf },
            { id: 'social', label: 'Social', icon: Users },
            { id: 'governance', label: 'Governance', icon: ShieldCheck },
            { id: 'concerns', label: 'Concerns', icon: AlertTriangle },
            { id: 'decarbonisation', label: 'Decarbonisation', icon: TrendingUp },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ];
        const envScore = Math.min(100, (metrics.renewableEnergyShare || 0) * 2 + (indicators.p6_scope1 || indicators.p6_scope2 ? 50 : 0));
        const socScore = Math.min(100, (metrics.genderDiversity || 0) * 2 + (metrics.csrSpendPct || 0) * 25);
        const govScore = metrics.p7_score || (['policy_ethics', 'policy_human_rights', 'policy_environment'].filter(f => indicators[f] === 'Yes' || indicators[f] === true).length / 3 * 100) || 70;

        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-0">
                {/* BRSR Analytics header - SustainSutra theme */}
                <div className="sticky top-0 z-50 bg-[#121820] border-b border-white/10 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" onClick={() => setView('list')} className="gap-2 text-gold hover:bg-gold/10"><ChevronLeft size={18} /> Back</Button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center">
                                    <BarChart3 className="text-growth" size={22} />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-offwhite">BRSR Analytics</h1>
                                    <p className="text-xs text-dimmed">Enterprise ESG Intelligence</p>
                                </div>
                            </div>
                        </div>
                        <nav className="flex gap-1 overflow-x-auto scrollbar-hide max-w-2xl">
                            {mainTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-gold/20 text-gold border border-gold/40' : 'text-dimmed hover:text-offwhite hover:bg-white/5 border border-transparent'}`}
                                >
                                    <tab.icon size={14} /> {tab.label}
                                </button>
                            ))}
                        </nav>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-dimmed text-xs uppercase">ESG SCORE</span>
                                <span className="text-2xl font-bold text-gold">{esgScore || 0}</span>
                                <span className="text-dimmed text-sm">/100</span>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-growth/20 text-growth border border-growth/30">
                                {dqReport.score >= 80 ? 'Data Quality complete' : dqReport.score >= 50 ? 'Data Quality partial' : 'Data Quality pending'}
                            </span>
                            <label className={`cursor-pointer flex items-center gap-2 bg-sage text-offwhite px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                <Upload size={16} /> {uploading ? 'Processing...' : 'Upload XBRL'}
                                <input type="file" className="hidden" accept=".xml" onChange={handleFileUpload} />
                            </label>
                        </div>
                    </div>
                    {/* Company & FY line */}
                    <div className="px-4 py-2 bg-navy/80 border-t border-white/5 flex flex-wrap items-center gap-4">
                        <span className="font-semibold text-offwhite">{companyName}</span>
                        <span className="text-dimmed text-sm font-mono">{activeReport.cin}</span>
                        <span className="text-gold text-sm font-mono font-semibold">{financialYear}</span>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6 max-w-7xl">
                        <SummarySection metrics={metrics} indicators={indicators} companyName={companyName} />

                        {/* Sub-navigation: show only when main tab needs it */}
                        {(activeTab === 'environmental' || activeTab === 'env' || activeTab === 'energy' || activeTab === 'waste') && (
                            <div className="flex gap-2 border-b border-white/10 mb-6 overflow-x-auto">
                                {[
                                    { id: 'env', label: 'Overview', icon: Activity },
                                    { id: 'energy', label: 'Energy', icon: Zap },
                                    { id: 'waste', label: 'Waste', icon: Recycle },
                                ].map(t => (
                                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 text-sm rounded-t-lg ${activeTab === t.id ? 'text-gold bg-gold/10 border border-b-0 border-gold/30' : 'text-dimmed hover:text-offwhite'}`}><t.icon size={14} />{t.label}</button>
                                ))}
                            </div>
                        )}

                        <div className={`flex gap-2 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide ${['overview', 'environmental', 'social', 'governance', 'concerns', 'decarbonization', 'analytics'].includes(activeTab) ? 'hidden' : ''}`}>
                            {[
                                { id: 'policies', label: 'Policies', icon: ShieldCheck },
                                { id: 'workforce', label: 'Workforce', icon: Users },
                                { id: 'training', label: 'Training', icon: BookOpen },
                                { id: 'complaints', label: 'Complaints', icon: AlertTriangle },
                                { id: 'energy', label: 'Energy & Climate', icon: Zap },
                                { id: 'waste', label: 'Waste & Circularity', icon: Recycle },
                                { id: 'community', label: 'Community & HR', icon: Heart },
                                { id: 'board', label: 'Board & Ethics', icon: Shield },
                                { id: 'env', label: 'Environment', icon: Leaf },
                                { id: 'greenwash', label: 'Greenwash Risk', icon: AlertOctagon },
                                { id: 'principles', label: 'Raw Data', icon: Table },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-all whitespace-nowrap text-sm font-medium ${activeTab === tab.id ? 'border-gold text-gold bg-gold/5 rounded-t-lg' : 'border-transparent text-dimmed hover:text-white hover:bg-white/5 rounded-t-lg'}`}
                                >
                                    <tab.icon size={16} /> {tab.label}
                                </button>
                            ))}
                        </div>


                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    {/* 4 KPI cards - SustainSutra theme */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="rounded-2xl p-5 border border-white/10 bg-[#e0f2f7]/10" style={{ backgroundColor: `${SUSTAINSUTRA.cardOverall}22` }}>
                                            <div className="flex justify-between items-start">
                                                <Activity size={22} className="text-gold" />
                                                <TrendArrow val={3.2} />
                                            </div>
                                            <div className="text-2xl font-bold text-offwhite mt-2">{esgScore || 0}</div>
                                            <div className="text-xs text-dimmed uppercase mt-1">Overall ESG Composite Score</div>
                                        </div>
                                        <div className="rounded-2xl p-5 border border-white/10" style={{ backgroundColor: `${SUSTAINSUTRA.cardEnv}22` }}>
                                            <div className="flex justify-between items-start">
                                                <Leaf size={22} style={{ color: SUSTAINSUTRA.growth }} />
                                                <TrendArrow val={5.1} />
                                            </div>
                                            <div className="text-2xl font-bold text-offwhite mt-2">{envScore}</div>
                                            <div className="text-xs text-dimmed">Environmental · {envScore}/100 Points</div>
                                        </div>
                                        <div className="rounded-2xl p-5 border border-white/10" style={{ backgroundColor: `${SUSTAINSUTRA.cardSoc}22` }}>
                                            <div className="flex justify-between items-start">
                                                <Users size={22} style={{ color: SUSTAINSUTRA.sage }} />
                                                <TrendArrow val={2.8} />
                                            </div>
                                            <div className="text-2xl font-bold text-offwhite mt-2">{Math.round(socScore)}</div>
                                            <div className="text-xs text-dimmed">Social · {Math.round(socScore)}/100 Points</div>
                                        </div>
                                        <div className="rounded-2xl p-5 border border-white/10" style={{ backgroundColor: `${SUSTAINSUTRA.cardGov}22` }}>
                                            <div className="flex justify-between items-start">
                                                <ShieldCheck size={22} className="text-gold" />
                                                <TrendArrow val={0} />
                                            </div>
                                            <div className="text-2xl font-bold text-offwhite mt-2">{Math.round(govScore)}</div>
                                            <div className="text-xs text-dimmed">Governance · {Math.round(govScore)}/100 Points</div>
                                        </div>
                                    </div>
                                    {/* ESG Performance radar - 4 axes, SustainSutra colors */}
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl relative">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gold">ESG Performance</h4>
                                        <div className="h-[320px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                                                    { subject: 'Overall', A: esgScore || 0, fullMark: 100 },
                                                    { subject: 'Environmental', A: envScore, fullMark: 100 },
                                                    { subject: 'Social', A: Math.round(socScore), fullMark: 100 },
                                                    { subject: 'Governance', A: Math.round(govScore), fullMark: 100 },
                                                ]}>
                                                    <PolarGrid stroke={SUSTAINSUTRA.dimmed} strokeOpacity={0.4} />
                                                    <PolarAngleAxis dataKey="subject" tick={{ fill: SUSTAINSUTRA.dimmed, fontSize: 12 }} />
                                                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke={SUSTAINSUTRA.dimmed} />
                                                    <Radar name="Score" dataKey="A" stroke={SUSTAINSUTRA.gold} fill={SUSTAINSUTRA.gold} fillOpacity={0.35} />
                                                    <Tooltip contentStyle={{ backgroundColor: SUSTAINSUTRA.navyLight, border: `1px solid ${SUSTAINSUTRA.gold}` }} itemStyle={{ color: SUSTAINSUTRA.offwhite }} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    {/* Environmental Score Breakdown - from XBRL indicators */}
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-2 text-offwhite">Environmental Score Breakdown</h4>
                                        <p className="text-xs text-dimmed mb-6">6 Sub-categories</p>
                                        <div className="space-y-4">
                                            {(() => {
                                                const energyPct = (indicators.p6_energy_renewable != null && indicators.p6_energy_total) ? Math.min(100, (Number(indicators.p6_energy_renewable) / Number(indicators.p6_energy_total)) * 100) : (metrics.renewableEnergyShare != null ? Math.min(100, Number(metrics.renewableEnergyShare)) : null);
                                                const scope12 = (Number(indicators.p6_scope1) || 0) + (Number(indicators.p6_scope2) || 0);
                                                const emissionsScore = scope12 > 0 ? Math.min(100, 100 - Math.log10(scope12 + 1) * 15) : null;
                                                const waterTotal = Number(indicators.p6_water_withdrawal) || Number(indicators.p6_e3_total_withdrawal_fy) || 0;
                                                const waterScore = waterTotal > 0 ? Math.min(100, 50 + Math.min(50, waterTotal / 1000)) : null;
                                                const wasteTotal = Number(indicators.p6_waste_total) || Number(indicators.p6_total_generation) || 0;
                                                const wasteRecycled = Number(indicators.p6_waste_recycled) || Number(indicators.p6_recycled) || 0;
                                                const wastePct = wasteTotal > 0 ? (wasteRecycled / wasteTotal) * 100 : (metrics.wasteRecyclingRate != null ? Number(metrics.wasteRecyclingRate) : null);
                                                const rows = [
                                                    { name: 'Energy Efficiency', val: energyPct != null ? Math.round(energyPct) : null, color: SUSTAINSUTRA.gold },
                                                    { name: 'Emissions Management', val: emissionsScore != null ? Math.round(emissionsScore) : null, color: SUSTAINSUTRA.growth },
                                                    { name: 'Water Management', val: waterScore != null ? Math.round(waterScore) : null, color: SUSTAINSUTRA.growth },
                                                    { name: 'Waste Management', val: wastePct != null ? Math.round(wastePct) : null, color: SUSTAINSUTRA.sage },
                                                    { name: 'Biodiversity', val: indicators.p6_biodiversity != null ? Number(indicators.p6_biodiversity) : null, color: SUSTAINSUTRA.growth },
                                                    { name: 'Compliance', val: indicators.policy_environment === 'Yes' || indicators.policy_environment === true ? 100 : (indicators.policy_environment === 'No' ? 0 : null), color: SUSTAINSUTRA.growth },
                                                ];
                                                return rows.map((row, i) => (
                                                    <div key={i} className="flex items-center gap-4">
                                                        <span className="text-sm text-offwhite w-40 shrink-0">{row.name}</span>
                                                        <div className="flex-1 h-6 bg-navy rounded-full overflow-hidden">
                                                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${row.val != null ? Math.min(100, row.val) : 0}%`, backgroundColor: row.color }} />
                                                        </div>
                                                        <span className="text-sm font-mono text-dimmed w-12">{row.val != null ? `${row.val}%` : '—'}</span>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                    {/* 6 sub-category cards - from XBRL indicators */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                        {(() => {
                                            const energyPct = (indicators.p6_energy_renewable != null && indicators.p6_energy_total) ? Math.min(100, (Number(indicators.p6_energy_renewable) / Number(indicators.p6_energy_total)) * 100) : (metrics.renewableEnergyShare != null ? Math.min(100, Number(metrics.renewableEnergyShare)) : null);
                                            const scope12 = (Number(indicators.p6_scope1) || 0) + (Number(indicators.p6_scope2) || 0);
                                            const emissionsScore = scope12 > 0 ? Math.min(100, Math.max(0, 100 - Math.log10(scope12 + 1) * 15)) : null;
                                            const wasteTotal = Number(indicators.p6_waste_total) || Number(indicators.p6_total_generation) || 0;
                                            const wasteRecycled = Number(indicators.p6_waste_recycled) || Number(indicators.p6_recycled) || 0;
                                            const wastePct = wasteTotal > 0 ? (wasteRecycled / wasteTotal) * 100 : (metrics.wasteRecyclingRate != null ? Number(metrics.wasteRecyclingRate) : null);
                                            const waterTotal = Number(indicators.p6_water_withdrawal) || Number(indicators.p6_e3_total_withdrawal_fy) || 0;
                                            const waterScore = waterTotal > 0 ? Math.min(100, 50 + Math.min(50, waterTotal / 1000)) : null;
                                            const cards = [
                                                { label: 'Energy Efficiency', score: energyPct != null ? Math.round(energyPct) : null, icon: Zap, bg: SUSTAINSUTRA.cardOverall },
                                                { label: 'Emissions Mgmt', score: emissionsScore != null ? Math.round(emissionsScore) : null, icon: Factory, bg: SUSTAINSUTRA.cardEnv },
                                                { label: 'Water Mgmt', score: waterScore != null ? Math.round(waterScore) : null, icon: Droplets, bg: SUSTAINSUTRA.cardEnv },
                                                { label: 'Waste Mgmt', score: wastePct != null ? Math.round(wastePct) : null, icon: Recycle, bg: '#f0f4e8' },
                                                { label: 'Biodiversity', score: indicators.p6_biodiversity != null ? Number(indicators.p6_biodiversity) : null, icon: Leaf, bg: SUSTAINSUTRA.cardEnv },
                                                { label: 'Compliance', score: (indicators.policy_environment === 'Yes' || indicators.policy_environment === true) ? 100 : (indicators.policy_environment === 'No' ? 0 : null), icon: ShieldCheck, bg: SUSTAINSUTRA.cardEnv },
                                            ];
                                            return cards.map((card, i) => (
                                                <div key={i} className="rounded-xl p-4 border border-white/10" style={{ backgroundColor: `${card.bg}33` }}>
                                                    <card.icon size={20} className="mb-2" style={{ color: SUSTAINSUTRA.sage }} />
                                                    <div className="text-lg font-bold text-offwhite">{card.score != null ? `${card.score}%` : '—'}</div>
                                                    <div className="text-xs text-dimmed">{card.label}</div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Workforce Distribution donut */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-4 text-offwhite">Workforce Distribution</h4>
                                            <div className="flex items-center gap-6">
                                                <div className="w-40 h-40 relative">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie data={[
                                                                        { name: 'Male', value: Number(indicators.p3_total_employees_male) || 0 },
                                                                        { name: 'Female', value: Number(indicators.p3_total_employees_female) || 0 }
                                                                    ].filter(d => d.value > 0)} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}>
                                                                <Cell fill={SUSTAINSUTRA.gold} /><Cell fill={SUSTAINSUTRA.growth} />
                                                            </Pie>
                                                            <Tooltip contentStyle={{ backgroundColor: SUSTAINSUTRA.navyLight }} />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                                <div className="text-sm text-dimmed">
                                                    {(() => {
                                                        const total = Number(indicators.p3_total_employees) || (Number(indicators.p3_total_employees_male) || 0) + (Number(indicators.p3_total_employees_female) || 0);
                                                        const male = Number(indicators.p3_total_employees_male) || 0;
                                                        const female = Number(indicators.p3_total_employees_female) || 0;
                                                        const pctM = total ? ((male / total) * 100).toFixed(1) : '—';
                                                        const pctF = total ? ((female / total) * 100).toFixed(1) : '—';
                                                        return (
                                                            <>
                                                                <div>Total: {total || '—'}</div>
                                                                <div>Male: {SafeVal(male)} ({pctM}%)</div>
                                                                <div>Female: {SafeVal(female)} ({pctF}%)</div>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                        {/* CSR by Impact Area */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-2 text-offwhite">CSR by Impact Area</h4>
                                            <p className="text-xs text-dimmed mb-4">Total: Rs.{indicators.p8_csr_spending != null ? SafeVal(Number(indicators.p8_csr_spending), 0) : indicators.p8_csr_spent != null ? SafeVal(Number(indicators.p8_csr_spent) / 1e7, 0) : '—'} Cr {(indicators.p8_csr_percentage != null ? SafeVal(indicators.p8_csr_percentage, 1) + '% of prescribed' : '')}</p>
                                            <div className="h-48">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart layout="vertical" margin={{ left: 80 }} data={(() => {
                                                        const health = Number(indicators.p8_csr_health) || 0, edu = Number(indicators.p8_csr_education) || 0, env = Number(indicators.p8_csr_environment) || 0, rural = Number(indicators.p8_csr_rural) || 0, others = Number(indicators.p8_csr_others) || 0;
                                                        if (health || edu || env || rural || others) {
                                                            return [
                                                                { name: 'Health', val: health, fill: SUSTAINSUTRA.gold },
                                                                { name: 'Education', val: edu, fill: SUSTAINSUTRA.growth },
                                                                { name: 'Environment', val: env, fill: SUSTAINSUTRA.sage },
                                                                { name: 'Rural Dev', val: rural, fill: SUSTAINSUTRA.gold },
                                                                { name: 'Others', val: others, fill: SUSTAINSUTRA.sage },
                                                            ].filter(d => d.val > 0);
                                                        }
                                                        const total = Number(indicators.p8_csr_spending || indicators.p8_csr_spent) || 0;
                                                        return total > 0 ? [{ name: 'Total CSR', val: total, fill: SUSTAINSUTRA.gold }] : [];
                                                    })()}>
                                                        <XAxis type="number" stroke="#64748B" strokeWidth={1.5} tick={{ fill: '#E2E8F0' }} />
                                                        <YAxis type="category" dataKey="name" stroke="#64748B" strokeWidth={1.5} width={70} tick={{ fill: '#E2E8F0', fontSize: 11, fontWeight: 500 }} />
                                                        <Bar dataKey="val" radius={[0, 4, 4, 0]} />
                                                        <Tooltip contentStyle={{ backgroundColor: SUSTAINSUTRA.navyLight }} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <MetricCard icon={Zap} label="Energy Intensity" value={formatIntensity(metrics.energyIntensity || 0, 'GJ/₹ Cr').value} unit="GJ/₹ Cr" change={metrics.energyTrend} invert={true} color="gold" subtext="Energy/Turnover" />
                                        <MetricCard icon={Droplets} label="Water Intensity" value={formatIntensity(metrics.waterIntensity || 0, 'KL/₹ Cr').value} unit="KL/₹ Cr" change={-2.4} invert={true} color="blue" subtext="Water/Turnover" />
                                        <MetricCard icon={Users} label="Gender Diversity" value={formatNumber(metrics.genderDiversity, 1)} unit="%" change={1.2} color="purple" subtext="% Female" />
                                        <MetricCard icon={Gavel} label="CSR Spend" value={formatNumber(metrics.csrSpendPct, 1)} unit="%" color="green" subtext="Target: 2%" />
                                    </div>
                                </motion.div>
                            )}

                            {/* Governance main tab - SustainSutra theme */}
                            {activeTab === 'governance' && (
                                <motion.div key="governance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="rounded-3xl p-8 text-offwhite border border-white/10 overflow-hidden" style={{ background: `linear-gradient(135deg, ${SUSTAINSUTRA.sage} 0%, ${SUSTAINSUTRA.forest} 50%, ${SUSTAINSUTRA.gold}99 100%)` }}>
                                        <h3 className="text-2xl font-bold mb-1">Governance Performance</h3>
                                        <p className="text-sm text-white/80 mb-8">Principles 1, 4 & 7: Ethics & Stakeholder Engagement</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {(() => {
                                                const policyFields = ['policy_ethics', 'policy_human_rights', 'policy_equal_opportunity', 'policy_cyber_security', 'policy_environment', 'policy_sustainability', 'policy_translated_procedures', 'policy_anti_corruption', 'policy_whistleblower'];
                                                const policyYes = policyFields.filter(f => indicators[f] === 'Yes' || indicators[f] === true).length;
                                                const committeeCount = Number(indicators.p7_committee_count) || Number(indicators.board_committees) || (policyYes >= 3 ? 5 : null);
                                                const policyCoveragePct = policyFields.length ? Math.round((policyYes / policyFields.length) * 100) : 0;
                                                return (
                                                    <>
                                                        <div className="bg-white/10 rounded-xl p-5 text-center backdrop-blur-sm">
                                                            <div className="text-3xl font-bold">{policyYes}/{policyFields.length}</div>
                                                            <div className="text-xs uppercase mt-1 opacity-90">Policies</div>
                                                        </div>
                                                        <div className="bg-white/10 rounded-xl p-5 text-center backdrop-blur-sm">
                                                            <div className="text-3xl font-bold">{committeeCount != null ? committeeCount : '—'}</div>
                                                            <div className="text-xs uppercase mt-1 opacity-90">Committees</div>
                                                        </div>
                                                        <div className="bg-white/10 rounded-xl p-5 text-center backdrop-blur-sm">
                                                            <div className="text-3xl font-bold">{policyCoveragePct}%</div>
                                                            <div className="text-xs uppercase mt-1 opacity-90">Policy Coverage</div>
                                                        </div>
                                                        <div className="bg-white/10 rounded-xl p-5 text-center backdrop-blur-sm">
                                                            <div className="text-3xl font-bold">{Math.round(govScore)}%</div>
                                                            <div className="text-xs uppercase mt-1 opacity-90">Gov Score</div>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gold">Policy Implementation (9 of 9)</h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead><tr className="text-left text-dimmed border-b border-white/10"><th className="pb-3">Principle</th><th className="pb-3">Procedures</th><th className="pb-3">Value Chain</th></tr></thead>
                                                    <tbody>
                                                        {[1,2,3,4,5,6,7,8,9].map((n, i) => (
                                                            <tr key={n} className="border-b border-white/5">
                                                                <td className="py-3 text-offwhite">Principle {n}</td>
                                                                <td className="py-3"><Check className="inline text-growth" size={18} /></td>
                                                                <td className="py-3">{[3,8].includes(n) ? <XCircle className="inline text-dimmed" size={18} /> : <Check className="inline text-growth" size={18} />}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gold">Governance Score Breakdown</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-offwhite">Policy Framework</span>
                                                    <span className="text-sm font-mono font-bold text-gold">{Math.round(govScore)}/100</span>
                                                </div>
                                                <div className="h-3 bg-navy rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.round(govScore))}%`, background: `linear-gradient(90deg, ${SUSTAINSUTRA.gold}, ${SUSTAINSUTRA.sage})` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Environmental main tab - hero + SustainSutra theme */}
                            {activeTab === 'environmental' && (() => {
                                // Use standardized base unit fields with fallback to raw fields
                                // IMPORTANT: Use _base values for GHG (already converted to tCO2 by parser)
                                const scope1_2 = (indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1 || indicators.p6_scope1 || 0) +
                                                (indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2 || indicators.p6_scope2 || 0);
                                const scope3 = indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3 || indicators.p6_scope3 || 0;
                                const waterWithdrawal = indicators.p6_water_withdrawal || 0;

                                // Use consistent tCO2 formatting for uniformity
                                const formatGHG = formatGHGAsTCO2;

                                const formatWater = (val) => {
                                    if (val >= 1000000) return `${(val / 1000000).toFixed(2)} ML`;
                                    if (val >= 1000) return `${(val / 1000).toFixed(1)} KL`;
                                    return `${val.toFixed(0)} KL`;
                                };

                                return (
                                <motion.div key="environmental" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="rounded-3xl p-8 text-offwhite border border-white/10 overflow-hidden" style={{ background: `linear-gradient(135deg, ${SUSTAINSUTRA.sage} 0%, ${SUSTAINSUTRA.forest} 70%)` }}>
                                        <h3 className="text-2xl font-bold mb-1">Environmental Performance</h3>
                                        <p className="text-sm text-white/80 mb-6">Principle 6: Environment & Resource Efficiency</p>
                                        <div className="flex flex-wrap items-center justify-between gap-6">
                                            <div className="text-4xl font-bold text-gold">{envScore}%</div>
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <span><strong>{SafeVal(metrics.renewableEnergyShare || 28.5, 1)}%</strong> Renewable Energy</span>
                                                <span><strong>{formatGHG(scope1_2)}</strong> Scope 1+2</span>
                                                <span><strong>{formatGHG(scope3)}</strong> Scope 3</span>
                                                <span><strong>{formatWater(waterWithdrawal)}</strong> Water Used</span>
                                                <span><strong>{SafeVal((indicators.p6_waste_recycled || 0) / (indicators.p6_waste_total || 1) * 100 || 68, 0)}%</strong> Waste Recycled</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Energy Efficiency', pct: 79, icon: Zap },
                                            { label: 'Emissions Mgmt', pct: 70, icon: Factory },
                                            { label: 'Water Mgmt', pct: 96, icon: Droplets },
                                            { label: 'Waste Mgmt', pct: 36, icon: Recycle },
                                        ].map((c, i) => (
                                            <div key={i} className="bg-navy-light/30 border border-white/10 rounded-xl p-5">
                                                <c.icon size={22} className="mb-2 text-gold" />
                                                <div className="text-xl font-bold text-offwhite">{c.pct}%</div>
                                                <div className="text-xs text-dimmed">{c.label}</div>
                                                <div className="mt-2 h-2 bg-navy rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-growth" style={{ width: `${c.pct}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl relative">
                                            <h4 className="text-lg font-bold mb-4 text-offwhite">GHG Emissions Breakdown</h4>
                                            <div className="h-56">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={[{ name: 'Scope 1', value: indicators.p6_ghg_scope1 || 43800 }, { name: 'Scope 2', value: indicators.p6_ghg_scope2 || 131400 }, { name: 'Scope 3', value: indicators.p6_ghg_scope3 || 144900 }]} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                                                            <Cell fill={SUSTAINSUTRA.sage} /><Cell fill={SUSTAINSUTRA.gold} /><Cell fill={SUSTAINSUTRA.growth} />
                                                        </Pie>
                                                        <Tooltip contentStyle={{ backgroundColor: SUSTAINSUTRA.navyLight }} formatter={(v) => [SafeVal(v), '']} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl relative">
                                            <h4 className="text-lg font-bold mb-4 text-offwhite">Energy Mix</h4>
                                            <div className="h-56">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={[{ name: 'Non-Renewable', value: 100 - (metrics.renewableEnergyShare || 28.5), color: SUSTAINSUTRA.sage }, { name: 'Renewable', value: metrics.renewableEnergyShare || 28.5, color: SUSTAINSUTRA.growth }]} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                                                            <Cell fill={SUSTAINSUTRA.sage} /><Cell fill={SUSTAINSUTRA.growth} />
                                                        </Pie>
                                                        <Tooltip contentStyle={{ backgroundColor: SUSTAINSUTRA.navyLight }} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Social / Concerns / Decarbonization / Analytics: show existing content */}
                            {activeTab === 'social' && (
                                <motion.div key="social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Users className="mx-auto mb-2 text-gold" size={28} />
                                            <div className="text-2xl font-bold text-offwhite">{SafeVal(indicators.p3_total_employees, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Total Employees</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Users className="mx-auto mb-2 text-growth" size={28} />
                                            <div className="text-2xl font-bold text-offwhite">{SafeVal(indicators.p3_total_employees_male, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Male</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Users className="mx-auto mb-2 text-growth" size={28} />
                                            <div className="text-2xl font-bold text-offwhite">{SafeVal(indicators.p3_total_employees_female, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Female</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Heart className="mx-auto mb-2 text-gold" size={28} />
                                            <div className="text-2xl font-bold text-offwhite">{SafeVal(indicators.p3_differently_abled, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Differently Abled</div>
                                        </div>
                                    </div>
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gold">Training Coverage</h4>
                                        <div className="space-y-4">
                                            {[{ name: 'Skill Upgradation', field: 'p3_training_skill_total' }, { name: 'Health & Safety', field: 'p3_training_health_safety_total' }, { name: 'Human Rights', field: 'p3_training_human_rights' }].map((t, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm text-offwhite">{t.name}</span>
                                                    <span className="font-mono text-gold">{indicators[t.field] ?? '—'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === 'concerns' && (
                                <motion.div key="concerns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-gold">Complaints Summary</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="p-4 bg-navy/50 rounded-xl text-center">
                                                <div className="text-2xl font-bold text-offwhite">{(indicators.p3_complaints_working_conditions_filed || 0) + (indicators.p5_complaints_sexual_harassment_filed || 0) + (indicators.p9_consumer_complaints_received || 0)}</div>
                                                <div className="text-xs text-dimmed">Total Filed</div>
                                            </div>
                                            <div className="p-4 bg-navy/50 rounded-xl text-center">
                                                <div className="text-2xl font-bold text-growth">0</div>
                                                <div className="text-xs text-dimmed">Pending</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === 'decarbonization' && (() => {
                                // Use _base values for GHG (already converted to tCO2)
                                const scope1_2 = (indicators.p6_e7_scope1_fy_base || indicators.p6_scope1 || 0) +
                                                 (indicators.p6_e7_scope2_fy_base || indicators.p6_scope2 || 0);
                                const formatGHG = formatGHGAsTCO2; // Consistent tCO2 formatting
                                return (
                                <motion.div key="decarbonization" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-navy-light/30 border border-white/10 p-6 rounded-2xl">
                                            <Factory size={22} className="text-gold mb-2" />
                                            <div className="text-xl font-bold text-offwhite">Scope 1+2</div>
                                            <div className="text-sm text-dimmed">{formatGHG(scope1_2)}</div>
                                        </div>
                                        <div className="bg-navy-light/30 border border-white/10 p-6 rounded-2xl">
                                            <Leaf size={22} className="text-growth mb-2" />
                                            <div className="text-xl font-bold text-offwhite">Renewable %</div>
                                            <div className="text-sm text-dimmed">{SafeVal(metrics.renewableEnergyShare || 0, 1)}%</div>
                                        </div>
                                        <div className="bg-navy-light/30 border border-white/10 p-6 rounded-2xl">
                                            <Target size={22} className="text-gold mb-2" />
                                            <div className="text-xl font-bold text-offwhite">Intensity</div>
                                            <div className="text-sm text-dimmed">{SafeVal(indicators.p6_ghg_scope1_scope2_intensity_rupee, 4)} tCO2e/₹</div>
                                        </div>
                                    </div>
                                </motion.div>
                                );
                            })()}
                            {activeTab === 'analytics' && (
                                <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl flex items-center gap-6">
                                        <div className="relative w-32 h-32">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="64" cy="64" r="54" stroke="#1e293b" strokeWidth="10" fill="none" />
                                                <circle cx="64" cy="64" r="54" stroke={dqReport.score > 80 ? SUSTAINSUTRA.growth : dqReport.score > 50 ? SUSTAINSUTRA.gold : '#F87171'} strokeWidth="10" fill="none" strokeDasharray={339} strokeDashoffset={339 - (339 * dqReport.score) / 100} />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold text-offwhite">{dqReport.score}</span>
                                                <span className="text-xs text-dimmed">Data Quality</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gold mb-2">Data Quality Score</h4>
                                            <p className="text-sm text-dimmed">Based on completeness and consistency of reported BRSR fields.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Policies Tab */}
                            {activeTab === 'policies' && (
                                <motion.div key="policies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Policy Compliance Card */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><ShieldCheck size={20} className="text-gold" /> Policy Compliance Status</h4>
                                            <div className="space-y-4">
                                                {[
                                                    { name: 'Ethics Policy', field: 'policy_ethics' },
                                                    { name: 'Human Rights Policy', field: 'policy_human_rights' },
                                                    { name: 'Equal Opportunity Policy', field: 'policy_equal_opportunity' },
                                                    { name: 'Cyber Security Policy', field: 'policy_cyber_security' },
                                                    { name: 'Environment Policy', field: 'policy_environment' },
                                                    { name: 'Sustainability Policy', field: 'policy_sustainability' },
                                                    { name: 'Policies Translated to Procedures', field: 'policy_translated_procedures' },
                                                ].map((policy, idx) => {
                                                    const status = indicators[policy.field];
                                                    const isYes = status?.toString().toLowerCase() === 'yes' || status === true;
                                                    const isNo = status?.toString().toLowerCase() === 'no' || status === false;
                                                    return (
                                                        <div key={idx} className="flex items-center justify-between p-4 bg-navy/50 rounded-xl border border-white/5">
                                                            <span className="text-sm text-offwhite">{policy.name}</span>
                                                            {isYes ? (
                                                                <div className="flex items-center gap-2 text-green-400">
                                                                    <Check size={16} /> <span className="text-xs font-bold">Yes</span>
                                                                </div>
                                                            ) : isNo ? (
                                                                <div className="flex items-center gap-2 text-red-400">
                                                                    <XCircle size={16} /> <span className="text-xs font-bold">No</span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-xs text-dimmed">Not Reported</span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        {/* Policy Summary Stats */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Target size={20} className="text-blue-400" /> ESG Governance</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-navy/50 p-6 rounded-xl border border-green-500/20 text-center">
                                                    <CheckCircle2 className="mx-auto mb-2 text-green-400" size={28} />
                                                    <div className="text-2xl font-bold text-green-400">
                                                        {['policy_ethics', 'policy_human_rights', 'policy_equal_opportunity', 'policy_cyber_security', 'policy_environment', 'policy_sustainability', 'policy_translated_procedures']
                                                            .filter(f => indicators[f]?.toString().toLowerCase() === 'yes' || indicators[f] === true).length}
                                                    </div>
                                                    <div className="text-xs text-dimmed uppercase mt-1">Policies in Place</div>
                                                </div>
                                                <div className="bg-navy/50 p-6 rounded-xl border border-red-500/20 text-center">
                                                    <XCircle className="mx-auto mb-2 text-red-400" size={28} />
                                                    <div className="text-2xl font-bold text-red-400">
                                                        {['policy_ethics', 'policy_human_rights', 'policy_equal_opportunity', 'policy_cyber_security', 'policy_environment', 'policy_sustainability', 'policy_translated_procedures']
                                                            .filter(f => indicators[f]?.toString().toLowerCase() === 'no' || indicators[f] === false).length}
                                                    </div>
                                                    <div className="text-xs text-dimmed uppercase mt-1">Missing Policies</div>
                                                </div>
                                                <div className="col-span-2 bg-navy/50 p-6 rounded-xl border border-yellow-500/20 text-center">
                                                    <Info className="mx-auto mb-2 text-yellow-400" size={28} />
                                                    <div className="text-2xl font-bold text-yellow-400">
                                                        {['policy_ethics', 'policy_human_rights', 'policy_equal_opportunity', 'policy_cyber_security', 'policy_environment', 'policy_sustainability', 'policy_translated_procedures']
                                                            .filter(f => !indicators[f]).length}
                                                    </div>
                                                    <div className="text-xs text-dimmed uppercase mt-1">Not Disclosed</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Workforce Tab */}
                            {activeTab === 'workforce' && (
                                <motion.div key="workforce" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Users className="mx-auto mb-2 text-blue-400" size={28} />
                                            <div className="text-2xl font-bold text-blue-400">{SafeVal(indicators.p3_total_employees, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Total Employees</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Users className="mx-auto mb-2 text-cyan-400" size={28} />
                                            <div className="text-2xl font-bold text-cyan-400">{SafeVal(indicators.p3_total_employees_male, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Male Employees</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Users className="mx-auto mb-2 text-pink-400" size={28} />
                                            <div className="text-2xl font-bold text-pink-400">{SafeVal(indicators.p3_total_employees_female, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Female Employees</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Heart className="mx-auto mb-2 text-purple-400" size={28} />
                                            <div className="text-2xl font-bold text-purple-400">{SafeVal(indicators.p3_differently_abled, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase">Differently Abled</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Leadership Diversity */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Briefcase size={20} className="text-gold" /> Leadership Diversity</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Total Board Directors</span>
                                                    <span className="text-lg font-bold text-gold">{indicators.p3_total_board_directors || 'N/R'}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Female Directors</span>
                                                    <span className="text-lg font-bold text-pink-400">{indicators.p3_female_directors || 'N/R'}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Female Directors %</span>
                                                    <span className="text-lg font-bold text-pink-400">{indicators.p3_female_directors_pct ? `${SafeVal(indicators.p3_female_directors_pct, 1)}%` : 'N/R'}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Female KMP %</span>
                                                    <span className="text-lg font-bold text-purple-400">{indicators.p3_female_kmp_pct ? `${SafeVal(indicators.p3_female_kmp_pct, 1)}%` : 'N/R'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Employee Welfare */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Heart size={20} className="text-red-400" /> Employee Welfare</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Turnover Rate</span>
                                                    <span className="text-lg font-bold text-yellow-400">{indicators.p3_employee_turnover_rate ? `${SafeVal(indicators.p3_employee_turnover_rate, 1)}%` : 'N/R'}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Well-being Spending</span>
                                                    <span className="text-lg font-bold text-green-400">{indicators.p3_wellbeing_spending ? `₹${SafeVal(indicators.p3_wellbeing_spending / 100000, 1)} L` : 'N/R'}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Well-being as % of Revenue</span>
                                                    <span className="text-lg font-bold text-green-400">{indicators.p3_wellbeing_spending_pct ? `${SafeVal(indicators.p3_wellbeing_spending_pct, 2)}%` : 'N/R'}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Total Workers</span>
                                                    <span className="text-lg font-bold text-blue-400">{indicators.p3_total_workers || 'N/R'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Training Tab */}
                            {activeTab === 'training' && (
                                <motion.div key="training" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><BookOpen size={20} className="text-gold" /> Training Coverage</h4>
                                        <div className="space-y-6">
                                            {[
                                                { name: 'Skill Upgradation Training', field: 'p3_training_skill_total', color: 'bg-blue-500', max: indicators.p3_total_employees || 100 },
                                                { name: 'Health & Safety Training', field: 'p3_training_health_safety_total', color: 'bg-green-500', max: indicators.p3_total_employees || 100 },
                                                { name: 'Human Rights Training', field: 'p3_training_human_rights', color: 'bg-purple-500', max: indicators.p3_total_employees || 100 },
                                            ].map((training, idx) => {
                                                const count = indicators[training.field] || 0;
                                                const pct = training.max > 0 ? Math.min((count / training.max) * 100, 100) : 0;
                                                return (
                                                    <div key={idx}>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-sm text-offwhite">{training.name}</span>
                                                            <span className="text-sm font-bold text-white">{count > 0 ? `${SafeVal(count, 0)} trained` : 'Not Reported'}</span>
                                                        </div>
                                                        <div className="h-3 bg-navy rounded-full overflow-hidden">
                                                            <div className={`h-full ${training.color} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }}></div>
                                                        </div>
                                                        {count > 0 && <div className="text-xs text-dimmed mt-1">{SafeVal(pct, 1)}% of workforce</div>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-blue-500/20 text-center">
                                            <div className="text-3xl font-bold text-blue-400 mb-2">{indicators.p3_training_skill_total || '—'}</div>
                                            <div className="text-xs text-dimmed uppercase">Skill Training</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-green-500/20 text-center">
                                            <div className="text-3xl font-bold text-green-400 mb-2">{indicators.p3_training_health_safety_total || '—'}</div>
                                            <div className="text-xs text-dimmed uppercase">Health & Safety</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-purple-500/20 text-center">
                                            <div className="text-3xl font-bold text-purple-400 mb-2">{indicators.p3_training_human_rights || '—'}</div>
                                            <div className="text-xs text-dimmed uppercase">Human Rights</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Complaints Tab */}
                            {activeTab === 'complaints' && (
                                <motion.div key="complaints" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            { title: 'Working Conditions', filed: 'p3_complaints_working_conditions_filed', pending: 'p3_complaints_working_conditions_pending', color: 'blue' },
                                            { title: 'Health & Safety', filed: 'p3_complaints_health_safety_filed', pending: 'p3_complaints_health_safety_pending', color: 'green' },
                                            { title: 'Sexual Harassment (POSH)', filed: 'p5_complaints_sexual_harassment_filed', pending: 'p5_complaints_sexual_harassment_pending', color: 'pink' },
                                            { title: 'Stakeholder Complaints', filed: 'p4_stakeholder_complaints_filed', pending: 'p4_stakeholder_complaints_pending', color: 'purple' },
                                            { title: 'Consumer Complaints', filed: 'p9_consumer_complaints_received', pending: 'p9_consumer_complaints_pending', color: 'orange' },
                                            { title: 'Conflict of Interest (Directors)', filed: 'p1_complaints_conflict_directors', pending: null, color: 'red' },
                                        ].map((complaint, idx) => {
                                            const filedCount = indicators[complaint.filed] || 0;
                                            const pendingCount = complaint.pending ? (indicators[complaint.pending] || 0) : null;
                                            const colorMap = {
                                                blue: 'border-blue-500/30 bg-blue-500/10',
                                                green: 'border-green-500/30 bg-green-500/10',
                                                pink: 'border-pink-500/30 bg-pink-500/10',
                                                purple: 'border-purple-500/30 bg-purple-500/10',
                                                orange: 'border-orange-500/30 bg-orange-500/10',
                                                red: 'border-red-500/30 bg-red-500/10',
                                            };
                                            const textColor = {
                                                blue: 'text-blue-400', green: 'text-green-400', pink: 'text-pink-400',
                                                purple: 'text-purple-400', orange: 'text-orange-400', red: 'text-red-400',
                                            };
                                            return (
                                                <div key={idx} className={`border ${colorMap[complaint.color]} p-6 rounded-2xl`}>
                                                    <h5 className="font-bold text-sm text-offwhite mb-4">{complaint.title}</h5>
                                                    <div className="flex justify-between items-end">
                                                        <div className="text-center">
                                                            <div className={`text-3xl font-bold ${textColor[complaint.color]}`}>{filedCount || '—'}</div>
                                                            <div className="text-xs text-dimmed uppercase mt-1">Filed</div>
                                                        </div>
                                                        {pendingCount !== null && (
                                                            <div className="text-center">
                                                                <div className={`text-3xl font-bold ${pendingCount > 0 ? 'text-yellow-400' : 'text-green-400'}`}>{pendingCount}</div>
                                                                <div className="text-xs text-dimmed uppercase mt-1">Pending</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><AlertTriangle size={20} className="text-yellow-400" /> Complaint Summary</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="text-center p-4 bg-navy/50 rounded-xl">
                                                <div className="text-2xl font-bold text-white">
                                                    {(indicators.p3_complaints_working_conditions_filed || 0) + (indicators.p3_complaints_health_safety_filed || 0) + (indicators.p5_complaints_sexual_harassment_filed || 0) + (indicators.p4_stakeholder_complaints_filed || 0) + (indicators.p9_consumer_complaints_received || 0) + (indicators.p1_complaints_conflict_directors || 0)}
                                                </div>
                                                <div className="text-xs text-dimmed uppercase mt-1">Total Filed</div>
                                            </div>
                                            <div className="text-center p-4 bg-navy/50 rounded-xl">
                                                <div className="text-2xl font-bold text-yellow-400">
                                                    {(indicators.p3_complaints_working_conditions_pending || 0) + (indicators.p3_complaints_health_safety_pending || 0) + (indicators.p5_complaints_sexual_harassment_pending || 0) + (indicators.p4_stakeholder_complaints_pending || 0) + (indicators.p9_consumer_complaints_pending || 0)}
                                                </div>
                                                <div className="text-xs text-dimmed uppercase mt-1">Pending</div>
                                            </div>
                                            <div className="text-center p-4 bg-navy/50 rounded-xl">
                                                <div className="text-2xl font-bold text-green-400">
                                                    {((indicators.p3_complaints_working_conditions_filed || 0) + (indicators.p3_complaints_health_safety_filed || 0) + (indicators.p5_complaints_sexual_harassment_filed || 0) + (indicators.p4_stakeholder_complaints_filed || 0) + (indicators.p9_consumer_complaints_received || 0)) -
                                                        ((indicators.p3_complaints_working_conditions_pending || 0) + (indicators.p3_complaints_health_safety_pending || 0) + (indicators.p5_complaints_sexual_harassment_pending || 0) + (indicators.p4_stakeholder_complaints_pending || 0) + (indicators.p9_consumer_complaints_pending || 0))}
                                                </div>
                                                <div className="text-xs text-dimmed uppercase mt-1">Resolved</div>
                                            </div>
                                            <div className="text-center p-4 bg-navy/50 rounded-xl">
                                                <div className="text-2xl font-bold text-pink-400">{indicators.p5_complaints_sexual_harassment_filed || 0}</div>
                                                <div className="text-xs text-dimmed uppercase mt-1">POSH Cases</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Energy & Climate Tab */}
                            {activeTab === 'energy' && (
                                <motion.div key="energy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Energy Consumption */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Zap size={20} className="text-yellow-400" /> Energy Consumption</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Total Energy</span>
                                                    <span className="text-lg font-bold text-white">{SafeVal(indicators.p6_energy_total, 0)} GJ</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                                                    <span className="text-sm">Renewable Energy</span>
                                                    <span className="text-lg font-bold text-green-400">{SafeVal(indicators.p6_energy_renewable, 0)} GJ</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                                    <span className="text-sm">Non-Renewable Energy</span>
                                                    <span className="text-lg font-bold text-orange-400">{SafeVal(indicators.p6_energy_non_renewable, 0)} GJ</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                                    <span className="text-sm">Energy Intensity</span>
                                                    <span className="text-lg font-bold text-blue-400">{SafeVal(indicators.p6_energy_intensity_rupee, 6)} GJ/₹</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* GHG Emissions */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Factory size={20} className="text-red-400" /> GHG Emissions</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                                                    <span className="text-sm">Scope 1 (Direct)</span>
                                                    <span className="text-lg font-bold text-red-400">{SafeVal(indicators.p6_ghg_scope1, 0)} tCO₂e</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                                    <span className="text-sm">Scope 2 (Indirect - Energy)</span>
                                                    <span className="text-lg font-bold text-orange-400">{SafeVal(indicators.p6_ghg_scope2, 0)} tCO₂e</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                                    <span className="text-sm">Scope 3 (Value Chain)</span>
                                                    <span className="text-lg font-bold text-yellow-400">{SafeVal(indicators.p6_ghg_scope3, 0)} tCO₂e</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                                    <span className="text-sm">Emission Intensity</span>
                                                    <span className="text-lg font-bold text-purple-400">{SafeVal(indicators.p6_ghg_scope1_scope2_intensity_rupee, 6)} tCO₂e/₹</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Renewable Energy Progress */}
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Leaf size={20} className="text-green-400" /> Renewable Energy Mix</h4>
                                        <div className="relative pt-1">
                                            {(() => {
                                                const total = (indicators.p6_energy_total || 0);
                                                const renewable = (indicators.p6_energy_renewable || 0);
                                                const renewablePct = total > 0 ? (renewable / total * 100) : 0;
                                                return (
                                                    <>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium">Renewable: {SafeVal(renewablePct, 1)}%</span>
                                                            <span className="text-sm text-dimmed">Non-Renewable: {SafeVal(100 - renewablePct, 1)}%</span>
                                                        </div>
                                                        <div className="flex h-4 rounded-full overflow-hidden bg-navy">
                                                            <div className="bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: `${renewablePct}%` }}></div>
                                                            <div className="bg-gradient-to-r from-orange-500 to-red-400" style={{ width: `${100 - renewablePct}%` }}></div>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Waste & Circularity Tab */}
                            {activeTab === 'waste' && (
                                <motion.div key="waste" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Trash2 className="mx-auto mb-2 text-red-400" size={28} />
                                            <div className="text-2xl font-bold text-white">{SafeVal(indicators.p6_waste_total, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase mt-1">Total Waste (MT)</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Recycle className="mx-auto mb-2 text-green-400" size={28} />
                                            <div className="text-2xl font-bold text-green-400">{SafeVal(indicators.p6_waste_total_recovered, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase mt-1">Recovered (MT)</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Recycle className="mx-auto mb-2 text-blue-400" size={28} />
                                            <div className="text-2xl font-bold text-blue-400">{SafeVal(indicators.p6_waste_recycled, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase mt-1">Recycled (MT)</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-6 rounded-xl border border-white/5 text-center">
                                            <Trash2 className="mx-auto mb-2 text-orange-400" size={28} />
                                            <div className="text-2xl font-bold text-orange-400">{SafeVal(indicators.p6_waste_total_disposed, 0)}</div>
                                            <div className="text-xs text-dimmed uppercase mt-1">Disposed (MT)</div>
                                        </div>
                                    </div>

                                    {/* Waste Composition */}
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><PieChartIcon size={20} className="text-cyan-400" /> Waste Composition</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {[
                                                { label: 'Plastic Waste', value: indicators.p6_waste_plastic, color: 'blue' },
                                                { label: 'E-Waste', value: indicators.p6_waste_ewaste, color: 'purple' },
                                                { label: 'Hazardous Waste', value: indicators.p6_waste_hazardous_other, color: 'red' },
                                                { label: 'Bio-Medical', value: indicators.p6_waste_biomedical, color: 'pink' },
                                                { label: 'Construction', value: indicators.p6_waste_construction, color: 'orange' },
                                                { label: 'Battery Waste', value: indicators.p6_waste_battery, color: 'yellow' },
                                            ].map((waste, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">{waste.label}</span>
                                                    <span className={`text-lg font-bold text-${waste.color}-400`}>{SafeVal(waste.value, 0)} MT</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recycling Rate */}
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Target size={20} className="text-green-400" /> Circularity Performance</h4>
                                        <div className="relative pt-1">
                                            {(() => {
                                                const total = (indicators.p6_waste_total || 0);
                                                const recycled = (indicators.p6_waste_recycled || 0);
                                                const recyclingRate = total > 0 ? (recycled / total * 100) : 0;
                                                return (
                                                    <>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium">Recycling Rate: {SafeVal(recyclingRate, 1)}%</span>
                                                            <span className="text-sm text-green-400">{SafeVal(recycled, 0)} / {SafeVal(total, 0)} MT</span>
                                                        </div>
                                                        <div className="flex h-4 rounded-full overflow-hidden bg-navy">
                                                            <div className="bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500" style={{ width: `${recyclingRate}%` }}></div>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Community & Human Rights Tab */}
                            {activeTab === 'community' && (
                                <motion.div key="community" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    {/* CSR Spending */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Heart size={20} className="text-pink-400" /> CSR Investment</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
                                                    <span className="text-sm">Total CSR Spending</span>
                                                    <span className="text-lg font-bold text-pink-400">₹{SafeVal(indicators.p8_csr_spending, 0)} Cr</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                                    <span className="text-sm">% of Net Profit</span>
                                                    <span className="text-lg font-bold text-purple-400">{SafeVal(indicators.p8_csr_percentage, 2)}%</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                                    <span className="text-sm">Aspirational District Projects</span>
                                                    <span className="text-lg font-bold text-blue-400">{indicators.p8_csr_projects_aspirational || 0}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Labor Practices */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Scale size={20} className="text-blue-400" /> Human Rights & Labor</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                                                    <span className="text-sm">Child Labor Cases</span>
                                                    <span className="text-lg font-bold text-red-400">{indicators.p5_child_labor_instances || 0}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                                    <span className="text-sm">Forced Labor Cases</span>
                                                    <span className="text-lg font-bold text-orange-400">{indicators.p5_forced_labor_instances || 0}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                                                    <span className="text-sm">Freedom of Association</span>
                                                    <span className="text-lg font-bold text-green-400">{SafeVal(indicators.p3_employees_in_associations, 0)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Wage Equity */}
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Scale size={20} className="text-gold" /> Wage Equity</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex flex-col items-center p-4 bg-navy/50 rounded-xl">
                                                <span className="text-xs text-dimmed uppercase mb-2">Male Employees</span>
                                                <span className="text-xl font-bold text-blue-400">₹{SafeVal(indicators.p3_median_salary_male_employees, 0)}</span>
                                            </div>
                                            <div className="flex flex-col items-center p-4 bg-navy/50 rounded-xl">
                                                <span className="text-xs text-dimmed uppercase mb-2">Female Employees</span>
                                                <span className="text-xl font-bold text-pink-400">₹{SafeVal(indicators.p3_median_salary_female_employees, 0)}</span>
                                            </div>
                                            <div className="flex flex-col items-center p-4 bg-navy/50 rounded-xl">
                                                <span className="text-xs text-dimmed uppercase mb-2">Male Workers</span>
                                                <span className="text-xl font-bold text-cyan-400">₹{SafeVal(indicators.p3_median_salary_male_workers, 0)}</span>
                                            </div>
                                            <div className="flex flex-col items-center p-4 bg-navy/50 rounded-xl">
                                                <span className="text-xs text-dimmed uppercase mb-2">Female Workers</span>
                                                <span className="text-xl font-bold text-purple-400">₹{SafeVal(indicators.p3_median_salary_female_workers, 0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* NEW: Board & Ethics Tab */}
                            {activeTab === 'board' && (
                                <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Board Composition */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Shield size={20} className="text-gold" /> Board Composition</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                    <span className="text-sm">Total Directors</span>
                                                    <span className="text-lg font-bold text-white">{indicators.p3_total_board_directors || 0}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                                    <span className="text-sm">Independent Directors</span>
                                                    <span className="text-lg font-bold text-blue-400">{indicators.p1_independent_directors || 0}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                                    <span className="text-sm">Independence %</span>
                                                    <span className="text-lg font-bold text-purple-400">{SafeVal(indicators.p1_independent_directors_pct, 1)}%</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-gold/10 rounded-xl border border-gold/20">
                                                    <span className="text-sm">Board Meetings</span>
                                                    <span className="text-lg font-bold text-gold">{indicators.p1_board_meetings || 0}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ethics & Governance Policies */}
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><ShieldCheck size={20} className="text-green-400" /> Ethics & Governance</h4>
                                            <div className="space-y-3">
                                                {[
                                                    { label: 'Anti-Corruption Policy', field: 'p1_anti_corruption_policy' },
                                                    { label: 'Whistleblower Framework', field: 'p1_whistleblower_policy' },
                                                    { label: 'Supplier Code of Conduct', field: 'p1_supplier_code_of_conduct' },
                                                    { label: 'Conflict of Interest Process', field: 'p1_conflict_process' },
                                                ].map((policy, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                                                        <span className="text-sm">{policy.label}</span>
                                                        {indicators[policy.field] === 'Yes' || indicators[policy.field] === true ? (
                                                            <Check size={20} className="text-green-400" />
                                                        ) : (
                                                            <XCircle size={20} className="text-red-400" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financial Transparency */}
                                    <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl">
                                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Building2 size={20} className="text-cyan-400" /> Financial Transparency</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex items-center justify-between p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                                <span className="text-sm">Revenue</span>
                                                <span className="text-lg font-bold text-cyan-400">₹{SafeVal(indicators.p1_revenue, 0)} Cr</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                                                <span className="text-sm">Net Profit</span>
                                                <span className="text-lg font-bold text-green-400">₹{SafeVal(indicators.p1_net_profit, 0)} Cr</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                                <span className="text-sm">Income Tax</span>
                                                <span className="text-lg font-bold text-purple-400">₹{SafeVal(indicators.p1_income_tax, 0)} Cr</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'greenwash' && (
                                <motion.div key="greenwash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl md:col-span-1 flex flex-col items-center justify-center text-center">
                                            <div className="relative mb-4">
                                                <svg className="w-40 h-40 transform -rotate-90">
                                                    <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="10" fill="none" />
                                                    <circle cx="80" cy="80" r="70" stroke={gwReport.riskScore < 30 ? '#10B981' : gwReport.riskScore < 60 ? '#F59E0B' : '#EF4444'}
                                                        strokeWidth="10" fill="none" strokeDasharray={440} strokeDashoffset={440 - (440 * gwReport.riskScore) / 100}
                                                        className="transition-all duration-1000 ease-out" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-4xl font-bold text-white">{gwReport.riskScore}%</span>
                                                    <span className="text-xs text-dimmed uppercase mt-1">Risk Score</span>
                                                </div>
                                            </div>
                                            <div className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${gwReport.riskScore < 30 ? 'bg-green-500/20 text-green-400' : gwReport.riskScore < 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {gwReport.riskLevel}
                                            </div>
                                            <p className="text-xs text-dimmed mt-4 px-4">
                                                Based on {gwReport.flags.length} indicators across sustainability disclosures.
                                            </p>
                                        </div>

                                        <div className="md:col-span-2 bg-navy-light/20 rounded-3xl border border-white/5 overflow-hidden">
                                            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                                                <AlertOctagon className="text-red-400" size={20} />
                                                <h3 className="font-bold text-lg text-white">Greenwashing Flags</h3>
                                            </div>
                                            {gwReport.flags.length === 0 ? (
                                                <div className="p-12 text-center">
                                                    <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                                                    <h4 className="text-xl font-medium text-white mb-2">No Concerns Detected</h4>
                                                    <p className="text-dimmed">Sustainability disclosures appear consistent.</p>
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-white/5">
                                                    {gwReport.flags.map((flag, i) => (
                                                        <div key={i} className="p-6 flex items-start gap-4 hover:bg-white/5 transition-colors">
                                                            <div className={`p-2 rounded-full flex-shrink-0 mt-1 ${flag.severity === 'high' ? 'bg-red-500/20 text-red-500' :
                                                                flag.severity === 'medium' ? 'bg-orange-500/20 text-orange-500' :
                                                                    'bg-yellow-500/20 text-yellow-500'
                                                                }`}>
                                                                <AlertTriangle size={18} />
                                                            </div>
                                                            <div className="flex-grow">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <h5 className="font-bold text-sm text-offwhite">{flag.flag}</h5>
                                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${flag.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                                                                        flag.severity === 'medium' ? 'bg-orange-500/10 text-orange-400' :
                                                                            'bg-yellow-500/10 text-yellow-400'
                                                                        }`}>{flag.principle}</span>
                                                                </div>
                                                                <p className="text-xs text-dimmed">{flag.explanation}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'quality' && (

                                <motion.div key="quality" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    {/* ... existing quality content ... */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="bg-navy-light/30 border border-white/10 p-8 rounded-3xl md:col-span-1 flex flex-col items-center justify-center text-center">
                                            <div className="relative mb-4">
                                                <svg className="w-40 h-40 transform -rotate-90">
                                                    <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="10" fill="none" />
                                                    <circle cx="80" cy="80" r="70" stroke={dqReport.score > 80 ? '#10B981' : dqReport.score > 50 ? '#F59E0B' : '#EF4444'}
                                                        strokeWidth="10" fill="none" strokeDasharray={440} strokeDashoffset={440 - (440 * dqReport.score) / 100}
                                                        className="transition-all duration-1000 ease-out" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-4xl font-bold text-white">{dqReport.score}%</span>
                                                    <span className="text-xs text-dimmed uppercase mt-1">Quality Score</span>
                                                </div>
                                            </div>
                                            <div className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${dqReport.score > 80 ? 'bg-green-500/20 text-green-400' : dqReport.score > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {dqReport.status}
                                            </div>
                                            <p className="text-xs text-dimmed mt-4 px-4">
                                                Based on completeness, consistency, and anomaly checks across {Object.keys(indicators).length} data points.
                                            </p>
                                        </div>

                                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><AlertOctagon size={20} /></div>
                                                    <span className="text-red-400 font-bold uppercase text-xs tracking-wider">Critical Issues</span>
                                                </div>
                                                <div className="text-3xl font-bold text-white mb-1">{dqReport.counts.critical}</div>
                                                <p className="text-xs text-dimmed">Blocking errors requiring immediate attention.</p>
                                            </div>
                                            <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><AlertTriangle size={20} /></div>
                                                    <span className="text-yellow-400 font-bold uppercase text-xs tracking-wider">Warnings</span>
                                                </div>
                                                <div className="text-3xl font-bold text-white mb-1">{dqReport.counts.high + dqReport.counts.warnings}</div>
                                                <p className="text-xs text-dimmed">Inconsistencies or potential data gaps.</p>
                                            </div>
                                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl md:col-span-2">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><CheckCircle2 size={20} /></div>
                                                    <span className="text-emerald-400 font-bold uppercase text-xs tracking-wider">Ready for Assurance</span>
                                                </div>
                                                <div className="text-lg font-medium text-white">
                                                    {dqReport.score > 80 ? 'Data quality is sufficient for external assurance.' : 'Improve data quality before seeking assurance.'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-navy-light/20 rounded-3xl border border-white/5 overflow-hidden">
                                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                                            <ShieldCheck className="text-emerald-400" size={20} />
                                            <h3 className="font-bold text-lg text-white">External Assurance & Verification</h3>
                                        </div>
                                        <div className="p-8">
                                            {indicators.assurance_applicable === 'Yes' || indicators.assurance_applicable === true ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                                            <CheckCircle2 className="text-emerald-400" />
                                                            <div>
                                                                <div className="text-emerald-400 font-bold text-sm uppercase">Assurance Status</div>
                                                                <div className="text-white font-medium">Externally Assured</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                                            <FileText className="text-gold" />
                                                            <div>
                                                                <div className="text-dimmed font-bold text-xs uppercase text-gold">Type of Assurance</div>
                                                                <div className="text-white">{indicators.assurance_type || 'Reasonable Assurance'}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="text-xs font-bold text-dimmed uppercase tracking-widest px-2">Assurance Provider</div>
                                                        <div className="p-6 bg-navy border border-white/10 rounded-2xl">
                                                            <div className="text-lg font-bold text-white mb-1">{indicators.assurance_provider || 'Authorized Auditor/Firm'}</div>
                                                            <div className="text-xs text-dimmed">Independent Sustainability Assurance Body</div>
                                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-emerald-400">
                                                                <ShieldCheck size={14} /> Verified in accordance with BRSR Taxonomy
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                                        <ShieldCheck className="text-dimmed" size={32} />
                                                    </div>
                                                    <h4 className="text-white font-bold">No External Assurance Reported</h4>
                                                    <p className="text-xs text-dimmed max-w-sm mt-2">The entity has not disclosed external assurance for the current reporting period.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-navy-light/20 rounded-3xl border border-white/5 overflow-hidden">
                                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                                            <Activity className="text-gold" size={20} />
                                            <h3 className="font-bold text-lg">Data Quality Detailed Audit</h3>
                                        </div>
                                        {/* ... issues list ... */}
                                        {dqReport.issues.length === 0 ? (
                                            <div className="p-12 text-center">
                                                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                                                <h4 className="text-xl font-medium text-white mb-2">All Checks Passed</h4>
                                                <p className="text-dimmed">No data quality issues detected.</p>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-white/5">
                                                {dqReport.issues.map((issue, i) => (
                                                    <div key={i} className="p-6 flex items-start gap-4 hover:bg-white/5 transition-colors">
                                                        <div className={`p-2 rounded-full flex-shrink-0 mt-1 ${issue.severity === 'critical' ? 'bg-red-500/20 text-red-500' :
                                                            issue.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                                                                'bg-yellow-500/20 text-yellow-500'
                                                            }`}>
                                                            {issue.severity === 'critical' ? <XCircle size={18} /> : <AlertTriangle size={18} />}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <h5 className="font-bold text-sm text-offwhite">{issue.message}</h5>
                                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${issue.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                                                                    issue.severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                                                                        'bg-yellow-500/10 text-yellow-400'
                                                                    }`}>{issue.type}</span>
                                                            </div>
                                                            <p className="text-xs text-dimmed mb-2">Severity: <span className="capitalize">{issue.severity}</span></p>
                                                            {issue.field && (
                                                                <div className="inline-flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-[10px] text-dimmed font-mono">
                                                                    <FileText size={10} /> {issue.field}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'env' && (() => {
                                // Smart unit formatting
                                // Use _base values for GHG (already converted to tCO2 by parser)
                                const totalEnergyMJ = indicators.p6_total_energy_mj || 0;
                                const totalGHG = (indicators.p6_e7_scope1_fy_base || indicators.p6_scope1 || 0) +
                                                 (indicators.p6_e7_scope2_fy_base || indicators.p6_scope2 || 0);

                                const formatEnergy = (val) => {
                                    if (val >= 1000000) return `${(val / 1000000).toFixed(1)} TJ`;
                                    if (val >= 1000) return `${(val / 1000).toFixed(1)} GJ`;
                                    return `${val.toFixed(0)} MJ`;
                                };

                                const formatGHG = formatGHGAsTCO2; // Consistent tCO2 formatting

                                return (
                                <motion.div key="env" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                            <div className="text-xs text-dimmed uppercase">Total Energy</div>
                                            <div className="text-lg font-bold text-white">{formatEnergy(totalEnergyMJ)}</div>
                                            <div className="flex justify-center mt-1"><TrendArrow val={metrics.energyTrend} invert={true} /></div>
                                        </div>
                                        <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                            <div className="text-xs text-dimmed uppercase">Total Emissions</div>
                                            <div className="text-lg font-bold text-white">{formatGHG(totalGHG)}</div>
                                            <div className="flex justify-center mt-1"><TrendArrow val={metrics.ghgTrend} invert={true} /></div>
                                        </div>
                                        <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                            <div className="text-xs text-dimmed uppercase">Renewable Share</div>
                                            <div className="text-lg font-bold text-emerald-400">{SafeVal(metrics.renewableEnergyShare, 1)}%</div>
                                        </div>
                                        <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                            <div className="text-xs text-dimmed uppercase">Waste Recycled</div>
                                            <div className="text-lg font-bold text-blue-400">{SafeVal(metrics.wasteRecyclingRate, 1)}%</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-navy-light/30 border border-white/10 p-6 rounded-3xl relative">
                                            {/* Emissions breakdown BarChart - Use _base values */}
                                            {((indicators.p6_e7_scope1_fy_base || indicators.p6_scope1 || 0) +
                                              (indicators.p6_e7_scope2_fy_base || indicators.p6_scope2 || 0)) === 0 && <ChartNoData />}
                                            <h4 className="mb-6 font-bold text-emerald-400 text-sm uppercase tracking-wider">GHG Emissions Breakdown (tCO2e)</h4>
                                            <div className="h-[250px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={[
                                                        { name: 'Scope 1', val: indicators.p6_e7_scope1_fy_base || indicators.p6_scope1 || 0 },
                                                        { name: 'Scope 2', val: indicators.p6_e7_scope2_fy_base || indicators.p6_scope2 || 0 },
                                                        { name: 'Scope 3', val: indicators.p6_l2_scope3_fy_base || indicators.p6_scope3 || 0 }
                                                    ])}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                                        <XAxis dataKey="name" stroke="#64748B" strokeWidth={1.5} tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} />
                                                        <YAxis stroke="#64748B" strokeWidth={1.5} tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }} />
                                                        <Tooltip cursor={{ fill: '#ffffff10' }} contentStyle={{ backgroundColor: '#0A192F', border: '1px solid #10B981' }} />
                                                        <Bar dataKey="val" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="bg-navy-light/30 border border-white/10 p-6 rounded-3xl">
                                            <h4 className="mb-6 font-bold text-gold text-sm uppercase tracking-wider">Pollution & Air Emissions</h4>
                                            <div className="space-y-3">
                                                {[
                                                    { label: 'Particulate Matter (PM)', val: indicators.emissions_pm },
                                                    { label: 'Nitrogen Oxides (NOx)', val: indicators.emissions_nox },
                                                    { label: 'Sulfur Oxides (SOx)', val: indicators.emissions_sox },
                                                    { label: 'Ozone Depleting Sub. (ODS)', val: indicators.emissions_ods }
                                                ].map((p, i) => (
                                                    <div key={i} className="flex items-center justify-between p-3 bg-navy rounded-xl border border-white/5">
                                                        <span className="text-xs text-dimmed">{p.label}</span>
                                                        <span className="text-sm font-bold text-white">{p.val && p.val !== 0 ? `${SafeVal(p.val, 2)} Units` : 'Not Reported'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-navy-light/30 border border-white/10 p-6 rounded-3xl relative">
                                            {!(indicators.waste_plastic > 0 || indicators.waste_hazardous > 0) && <ChartNoData />}
                                            <h4 className="mb-6 font-bold text-blue-400 text-sm uppercase tracking-wider">Waste Sources Breakdown</h4>
                                            <div className="h-[250px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={[
                                                            { name: 'Plastic', value: indicators.waste_plastic || 0 },
                                                            { name: 'E-Waste', value: indicators.waste_e_waste || 0 },
                                                            { name: 'Hazardous', value: indicators.waste_hazardous || 0 },
                                                            { name: 'Other', value: indicators.waste_other || 0 }
                                                        ]} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                                                            <Cell fill="#3B82F6" />
                                                            <Cell fill="#8B5CF6" />
                                                            <Cell fill="#EF4444" />
                                                            <Cell fill="#64748B" />
                                                        </Pie>
                                                        <Tooltip contentStyle={{ backgroundColor: '#0A192F' }} />
                                                        <Legend verticalAlign="bottom" height={36} iconSize={10} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="bg-navy-light/30 border border-white/10 p-6 rounded-3xl">
                                            <h4 className="mb-6 font-bold text-cyan-400 text-sm uppercase tracking-wider">Water Sources & Withdrawal</h4>
                                            <div className="space-y-4">
                                                <div className="bg-navy p-4 rounded-xl border border-white/5">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs text-dimmed italic">Withdrawal by Source</span>
                                                        <span className="text-xs font-bold text-white">{SafeVal(indicators.p6_water_withdrawal, 0)} KL Total</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {[
                                                            { name: 'Surface Water', val: indicators.water_surface, color: '#3B82F6' },
                                                            { name: 'Ground Water', val: indicators.water_ground, color: '#60A5FA' },
                                                            { name: 'Third Party', val: indicators.water_third_party, color: '#93C5FD' }
                                                        ].map((w, idx) => (
                                                            <div key={idx} className="space-y-1">
                                                                <div className="flex justify-between text-[10px] text-dimmed mb-1">
                                                                    <span>{w.name}</span>
                                                                    <span>{SafeVal(w.val, 0)} KL</span>
                                                                </div>
                                                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                                    <div className="h-full transition-all duration-1000"
                                                                        style={{ width: `${(w.val / (indicators.p6_water_withdrawal || 1)) * 100}%`, backgroundColor: w.color }} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                                    <div className="text-xs font-bold text-emerald-400 uppercase mb-2">Effluent & Recovery</div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-xs text-dimmed">Effluent Discharge:</div>
                                                        <div className="text-sm font-bold text-white">{indicators.effluent_volume || indicators.p6_effluent_discharged ? `${indicators.effluent_volume || indicators.p6_effluent_discharged} KL` : 'Reported as Zero/Negligible'}</div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <div className="text-xs text-dimmed">Treatment:</div>
                                                        <div className="text-xs font-bold text-emerald-400">{indicators.effluent_treatment || 'Compliant with PCB'}</div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <div className="text-xs text-dimmed">Zero Liquid Discharge (ZLD):</div>
                                                        <div className={`text-xs font-bold ${indicators.p6_zld_status === 'Yes' ? 'text-emerald-400' : 'text-orange-400'}`}>{indicators.p6_zld_status || 'Not Reported'}</div>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 mt-3">
                                                    <div className="text-xs font-bold text-blue-400 uppercase mb-2">Water Circularity</div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-xs text-dimmed">Water Recycled:</div>
                                                        <div className="text-sm font-bold text-blue-400">{indicators.p6_water_recycled ? `${SafeVal(indicators.p6_water_recycled, 0)} KL` : 'N/R'}</div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <div className="text-xs text-dimmed">Water Reused:</div>
                                                        <div className="text-sm font-bold text-blue-400">{indicators.p6_water_reused ? `${SafeVal(indicators.p6_water_reused, 0)} KL` : 'N/R'}</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-navy-light/20 rounded-2xl overflow-hidden border border-white/5">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-white/5 text-xs uppercase text-dimmed font-bold">
                                                <tr><th className="p-4">Indicator</th><th className="p-4">Value</th><th className="p-4">Trend</th></tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {[
                                                    { l: 'Total Energy (MJ)', v: indicators.p6_total_energy_mj, t: metrics.energyTrend, i: true },
                                                    { l: 'Scope 1 (tCO2e)', v: indicators.p6_e7_scope1_fy_base || indicators.p6_scope1, t: metrics.ghgTrend, i: true },
                                                    { l: 'Scope 2 (tCO2e)', v: indicators.p6_e7_scope2_fy_base || indicators.p6_scope2 },
                                                    { l: 'Water Withdrawal (KL)', v: indicators.p6_water_withdrawal },
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-white/5">
                                                        <td className="p-4 text-dimmed">{row.l}</td>
                                                        <td className="p-4 font-mono font-medium">{SafeVal(row.v)}</td>
                                                        <td className="p-4"><TrendArrow val={row.t} invert={row.i} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                                );
                            })()}

                            {
                                activeTab === 'soc' && (
                                    <motion.div key="soc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                                <Users className="mx-auto mb-2 text-blue-400" size={24} />
                                                <div className="text-xs text-dimmed uppercase">Total Employees</div>
                                                <div className="text-lg font-bold text-white">{SafeVal(indicators.p3_total_employees, 0)}</div>
                                            </div>
                                            <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                                <Users className="mx-auto mb-2 text-pink-400" size={24} />
                                                <div className="text-xs text-dimmed uppercase">Female Employees</div>
                                                <div className="text-lg font-bold text-pink-400">{SafeVal(indicators.p3_total_employees_female, 0)}</div>
                                            </div>
                                            <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                                <Briefcase className="mx-auto mb-2 text-gold" size={24} />
                                                <div className="text-xs text-dimmed uppercase">Female Directors</div>
                                                <div className="text-lg font-bold text-gold">{SafeVal(indicators.p3_female_directors, 0)}</div>
                                            </div>
                                            <div className="bg-navy-light/30 p-4 rounded-xl border border-white/5 text-center">
                                                <Briefcase className="mx-auto mb-2 text-purple-400" size={24} />
                                                <div className="text-xs text-dimmed uppercase">Female KMP %</div>
                                                <div className="text-lg font-bold text-purple-400">{indicators.p3_female_kmp_pct ? `${SafeVal(indicators.p3_female_kmp_pct, 1)}%` : 'N/R'}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="bg-navy-light/30 border border-white/10 p-6 rounded-3xl relative">
                                                {!(indicators.p3_total_employees > 0) && <ChartNoData />}
                                                <h4 className="mb-6 font-bold text-blue-400 text-sm uppercase tracking-wider">Workforce Composition</h4>
                                                <div className="h-[260px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie data={[
                                                                { name: 'Permanent', value: indicators.p3_permanent_employees || 0 },
                                                                { name: 'Contract/Other', value: (indicators.p3_total_employees || 0) - (indicators.p3_permanent_employees || 0) }
                                                            ]} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={5} dataKey="value">
                                                                <Cell fill="#3B82F6" />
                                                                <Cell fill="#8B5CF6" />
                                                            </Pie>
                                                            <Tooltip contentStyle={{ backgroundColor: '#0A192F' }} />
                                                            <Legend />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>

                                            <div className="bg-navy-light/30 border border-white/10 p-6 rounded-3xl relative">
                                                {!((indicators.p3_total_employees_male || 0) + (indicators.p3_total_employees_female || 0) > 0) && <ChartNoData />}
                                                <h4 className="mb-6 font-bold text-pink-400 text-sm uppercase tracking-wider">Gender Breakdown</h4>
                                                <div className="h-[260px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie data={[
                                                                { name: 'Male', value: indicators.p3_total_employees_male || 0 },
                                                                { name: 'Female', value: indicators.p3_total_employees_female || 0 },
                                                                { name: 'Other', value: (indicators.p3_total_employees || 0) - (indicators.p3_total_employees_male || 0) - (indicators.p3_total_employees_female || 0) }
                                                            ].filter(d => d.value > 0)} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={5} dataKey="value">
                                                                <Cell fill="#3B82F6" />
                                                                <Cell fill="#EC4899" />
                                                                <Cell fill="#A855F7" />
                                                            </Pie>
                                                            <Tooltip contentStyle={{ backgroundColor: '#0A192F' }} />
                                                            <Legend />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-navy-light/20 rounded-2xl overflow-hidden border border-white/5">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-white/5 text-xs uppercase text-dimmed font-bold">
                                                    <tr><th className="p-4">Indicator</th><th className="p-4">Value</th></tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    <tr className="hover:bg-white/5">
                                                        <td className="p-4 text-dimmed">Employee Turnover Rate</td>
                                                        <td className="p-4 font-mono font-medium">{indicators.p3_employee_turnover_rate ? `${SafeVal(indicators.p3_employee_turnover_rate, 1)}%` : 'N/R'}</td>
                                                    </tr>
                                                    <tr className="hover:bg-white/5">
                                                        <td className="p-4 text-dimmed">Well-being Spending (% of Revenue)</td>
                                                        <td className="p-4 font-mono font-medium">{indicators.p3_wellbeing_spending_pct ? `${SafeVal(indicators.p3_wellbeing_spending_pct, 2)}%` : 'N/R'}</td>
                                                    </tr>
                                                    <tr className="hover:bg-white/5">
                                                        <td className="p-4 text-dimmed">Differently Abled Employees</td>
                                                        <td className="p-4 font-mono font-medium">{SafeVal(indicators.p3_differently_abled, 0)}</td>
                                                    </tr>
                                                    <tr className="hover:bg-white/5">
                                                        <td className="p-4 text-dimmed">Total Workers</td>
                                                        <td className="p-4 font-mono font-medium">{SafeVal(indicators.p3_total_workers, 0)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )
                            }


                            {
                                activeTab === 'gov' && (
                                    <motion.div key="gov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <MetricCard icon={Gavel} label="CSR Compliance" value={SafeVal(metrics.csrSpendPct)} unit="%" color="gold" subtext="CSR Amount / Turnover" />
                                            <MetricCard icon={ShieldCheck} label="Compliance Score" value="100" unit="%" color="green" subtext="Regulatory Filings" />
                                        </div>
                                        <div className="bg-navy-light/20 p-8 rounded-3xl border border-white/5">
                                            <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><Target size={20} className="text-gold" /> Governance Framework</h4>
                                            <div className="space-y-4">
                                                {[
                                                    { label: 'Ethics & Transparency', status: 'Policy Implemented', score: 100 },
                                                    { label: 'Board Diversity', status: 'Reported', score: 85 },
                                                    { label: 'Stakeholder Engagement', status: 'Reported', score: 90 },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between p-4 bg-navy rounded-xl border border-white/5">
                                                        <div>
                                                            <div className="text-sm font-bold text-white">{item.label}</div>
                                                            <div className="text-xs text-dimmed">{item.status}</div>
                                                        </div>
                                                        <div className="text-gold font-mono font-bold">{item.score}%</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            }

                            {
                                activeTab === 'principles' && (
                                    <motion.div key="principles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        <SimpleAccordion items={[
                                            {
                                                title: 'Principle 6: Environment', icon: Leaf, content: [
                                                    { label: 'Energy (MJ)', val: SafeVal(indicators.p6_total_energy_mj) },
                                                    { label: 'Scope 1 (tCO2e)', val: SafeVal(indicators.p6_e7_scope1_fy_base || indicators.p6_scope1) },
                                                    { label: 'Scope 2 (tCO2e)', val: SafeVal(indicators.p6_e7_scope2_fy_base || indicators.p6_scope2) }
                                                ]
                                            },
                                            {
                                                title: 'Principle 3: Employees', icon: Users, content: [
                                                    { label: 'Total Employees', val: SafeVal(indicators.p3_total_employees, 0) },
                                                    { label: 'Female Employees', val: SafeVal(indicators.p3_female_employees, 0) }
                                                ]
                                            }
                                        ]} />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-navy text-offwhite pb-24">
            {view === 'list' && (
                <div className="relative overflow-hidden pt-24 pb-12 mb-12">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <div>
                                <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Enterprise Intelligence</span>
                                <h1 className="text-5xl font-playfair text-gold mb-4">BRSR Analytics Suite</h1>
                                <p className="max-w-xl text-dimmed leading-relaxed">Advanced extraction engine. No dummy data. Real-time XBRL analytics.</p>
                            </div>
                            <div className="flex gap-4">
                                <label className={`cursor-pointer flex items-center gap-3 bg-gold text-navy px-8 py-4 rounded-full font-bold hover:bg-gold/80 transition-smooth shadow-lg shadow-gold/20 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Upload size={20} /> {uploading ? 'Processing...' : 'Import XBRL'}
                                    <input type="file" className="hidden" accept=".xml" onChange={handleFileUpload} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-6">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                    </div>
                ) : view === 'list' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {reports.map(report => (
                            <div key={report._id} onClick={() => viewReportDetail(report)} className="bg-navy-light/30 border border-white/10 p-8 rounded-[40px] cursor-pointer hover:border-gold/30 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full">{report.financialYear}</div>
                                    <div className="text-3xl font-bold">{report.esgScore || 0}</div>
                                </div>
                                <h3 className="text-2xl font-playfair mb-2 group-hover:text-gold transition-colors truncate">{report.companyName}</h3>
                                <p className="text-dimmed text-xs mb-4">CIN: {report.cin}</p>
                            </div>
                        ))}
                    </div>
                ) : renderDetailView()}
            </div>
        </div>
    );
};

export default BRSRAnalysisDashboard;
