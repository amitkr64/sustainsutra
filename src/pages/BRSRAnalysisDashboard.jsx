import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { getMyEntity, getEntityDashboard } from '@/services/cctsEntityService';
import { getMyCCCBalance } from '@/services/cctsCCCBalanceService';
import ComplianceTrajectoryChart from '@/components/ComplianceTrajectoryChart';
import { FileText, TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BRSDashboard = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [entity, setEntity] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [trajectoryOpen, setTrajectoryOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Tabs for environmental BRSR data
    const [activeTab, setActiveTab] = useState('environmental');

    // Load entity and dashboard data
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [entityRes, dashboardRes] = await Promise.all([
                    getMyEntity(token),
                    getEntityDashboard(token, entityRes.data._id || entityRes.data.id)
                ]);
                setEntity(entityRes.data);
                setDashboard(dashboardRes.data);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load BRSR data',
                    variant: 'destructive'
                });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [token]);

    // Calculate overall metrics from dashboard data
    const metrics = useMemo(() => {
        if (!dashboard) return {};

        const indicators = dashboard?.indicators || {};
        const prevIndicators = dashboard?.prev_year_indicators || {};

        // Environmental metrics
        const envScore = Math.min(100,
            (indicators.p6_water_withdrawal_fy || 0) * 1.5 +
            (indicators.p6_water_consumption_fy || 0) * 1.5 +
            (indicators.p6_scope1 || indicators.p6_scope2 ? 30 : 0) * 1
        );

        const socialScore = Math.min(100,
            (indicators.gender_diversity_ratio || 0) * 2 +
            (indicators.csr_spend_pct_revenue || 0) * 1.5
        );

        const govScore = indicators.p7_score || (['policy_ethics', 'policy_human_rights', 'policy_environment'].filter(f => indicators[f] === 'Yes' || indicators[f] === true).length / 3 * 100) || 70;

        return { entity, metrics, envScore, socialScore, govScore, indicators, prevIndicators };
    }, [dashboard]);

    // Tab configurations
    const tabs = [
        { id: 'environmental', label: 'Environmental', icon: Leaf },
        { id: 'social', label: 'Social', icon: Users },
        { id: 'governance', label: 'Governance', icon: ShieldCheck },
        { id: 'concerns', label: 'Concerns', icon: AlertTriangle },
        { id: 'decarbonisation', label: 'Decarbonisation', icon: TrendingUp },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
    ];

    if (loading) {
        return <div className="min-h-screen bg-navy flex items-center justify-center text-gold">Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title>BRSR Analysis | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy py-20 px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-bold text-gold">BRSR Analysis Dashboard</h1>
                    {entity && (
                        <div className="flex items-center gap-8">
                            <h2 className="text-2xl font-semibold text-white">{entity.entityName}</h2>
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/admin')}
                                className="text-offwhite hover:text-gold"
                            >
                                <FileText className="w-4 h-4" />
                                Back to Admin
                            </Button>
                        </div>
                    )}
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-4xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-offwhite">Compliance Status</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                indicators?.p7_overall_status === 'Compliant' ? 'bg-green-500 text-white' :
                                indicators?.p7_overall_status === 'Non-Compliant' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                            }`}>
                                {indicators?.p7_overall_status || 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-4xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-offwhite">GHG Intensity Trend</h3>
                            <span className="text-sm text-offwhite/60">
                                Current: <strong className="text-gold">{indicators?.p7_scope1_and_2_intensity_fy?.toFixed(4) || 'N/A'}</strong> tCO₂e/tonne
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <TrendingUp className={`w-5 h-5 ${
                                (indicators?.p7_scope1_and_2_intensity_fy || 0) > (indicators?.prev_year_indicators?.p7_scope1_and_2_intensity_fy || 0) ? 'text-green-500' : 'text-red-500'
                            }`} />
                            <span className="text-sm text-offwhite/60">
                                Previous: {indicators?.prev_year_indicators?.p7_scope1_and_2_intensity_fy?.toFixed(4) || 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-4xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-offwhite">Energy Intensity</h3>
                            <span className="text-sm text-offwhite/60">
                                Current: <strong className="text-gold">{indicators?.p6_e1_intensity_physical_output_fy?.toFixed(4) || 'N/A'}</strong>
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <TrendingUp className={`w-5 h-5 ${
                                (indicators?.p6_e1_intensity_physical_output_fy || 0) > (indicators?.prev_year_indicators?.p6_e1_intensity_physical_output_fy || 0) ? 'text-green-500' : 'text-red-500'
                            }`} />
                            <span className="text-sm text-offwhite/60">
                                Previous: {indicators?.prev_year_indicators?.p6_e1_intensity_physical_output_fy || 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-4xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-offwhite">Water Intensity</h3>
                            <span className="text-sm text-offwhite/60">
                                Current: <strong className="text-gold">{indicators?.p6_e3_intensity_physical_output_fy?.toFixed(4) || 'N/A'}</strong>
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <TrendingUp className={`w-5 h-5 ${
                                (indicators?.p6_e3_intensity_physical_output_fy || 0) > (indicators?.prev_year_indicators?.p6_e3_intensity_physical_output_fy || 0) ? 'text-green-500' : 'text-red-500'
                            }`} />
                            <span className="text-sm text-offwhite/60">
                                Previous: {indicators?.prev_year_indicators?.p6_e3_intensity_physical_output_fy || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
                    <div className="flex items-center justify-between mb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-gold text-navy'
                                        : 'text-offwhite hover:bg-white/10 hover:text-gold'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="text-lg font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'environmental' && (
                        <motion.div
                            key="environmental"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Environmental KPIs */}
                                        <div className="bg-gradient-to-br from-green-900/50 to-green-800/20 via-lime-600/10 rounded-2xl p-6 border border-white/10 shadow-2xl">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-bold text-offwhite">Environmental Performance</h3>
                                                <span className="text-sm text-green-300">Current FY</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <p className="text-offwhite/60 mb-1">Total Withdrawal</p>
                                                    <p className="text-3xl font-bold text-gold">
                                                        {indicators?.p6_water_withdrawal_fy?.toLocaleString() || 'N/A'} KL
                                                    </p>
                                                    <p className="text-sm text-offwhite/70">
                                                        {indicators?.prev_year_indicators?.p6_water_withdrawal_fy && (
                                                            <span className={indicators?.p6_water_withdrawal_fy > indicators.prev_year_indicators.p6_water_withdrawal_fy ? 'text-green-400' : 'text-red-400'}>
                                                                {indicators?.p6_water_withdrawal_fy > indicators.prev_year_indicators.p6_water_withdrawal_fy ? <TrendingUp /> : <TrendingDown />}
                                                            </span>
                                                        )}{' '}
                                                        vs {indicators?.prev_year_indicators?.p6_water_withdrawal_fy?.toLocaleString() || 'N/A'}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-offwhite/60 mb-1">Total Consumption</p>
                                                    <p className="text-3xl font-bold text-gold">
                                                        {indicators?.p6_water_consumption_fy?.toLocaleString() || 'N/A'} KL
                                                    </p>
                                                    <p className="text-sm text-offwhite/70">
                                                        {indicators?.prev_year_indicators?.p6_water_consumption_fy && (
                                                            <span className={indicators?.p6_water_consumption_fy > indicators.prev_year_indicators.p6_water_consumption_fy ? 'text-green-400' : 'text-red-400'}>
                                                                {indicators?.p6_water_consumption_fy > indicators.prev_year_indicators.p6_water_consumption_fy ? <TrendingUp /> : <TrendingDown />}
                                                            </span>
                                                        )}{' '}
                                                        vs {indicators?.prev_year_indicators?.p6_water_consumption_fy?.toLocaleString() || 'N/A'}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-offwhite/60 mb-1">Recycled & Reused</p>
                                                    <p className="text-3xl font-bold text-gold">
                                                        {((indicators?.p6_water_recycled_fy || 0) + (indicators?.p6_water_reused_fy || 0))?.toLocaleString() || 'N/A'} KL
                                                    </p>
                                                    <p className="text-sm text-offwhite/70">
                                                        {indicators?.prev_year_indicators?.p6_water_recycled_fy && (
                                                            <span className="text-green-400">+{indicators?.p6_water_recycled_fy - indicators.prev_year_indicators.p6_water_recycled_fy}%</span>
                                                        )}{' '}
                                                        vs {indicators?.prev_year_indicators?.p6_water_recycled_fy?.toLocaleString() || 'N/A'}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-offwhite/60 mb-1">Discharge Quality</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className={`text-2xl font-bold ${
                                                            indicators?.p6_waste_water_treatment_compliance_rate === 'Compliant' ? 'text-green-500' : 'text-red-500'
                                                        }`}>
                                                            {indicators?.p6_waste_water_treatment_compliance_rate || 'N/A'}%
                                                        </span>
                                                        {indicators?.p6_waste_water_treatment_std_limit && (
                                                            <span className="text-sm text-offwhite/70 ml-2">
                                                                (Limit: {indicators?.p6_waste_water_treatment_std_limit}%)
                                                            </span>
                                                        )}
                                                    </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-offwhite/60 mb-1">Zero Liquid Discharge</p>
                                                    <p className={`text-lg font-bold ${indicators?.p6_zld_status === 'Yes' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {indicators?.p6_zld_status === 'Yes' ? 'Achieved' : 'Not Achieved'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* Trajectory Chart Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-offwhite">Compliance Trajectory</h2>
                    <Button
                        variant="ghost"
                        onClick={() => setTrajectoryOpen(!trajectoryOpen)}
                        className="text-gold hover:text-gold/80"
                    >
                        {trajectoryOpen ? 'Hide Chart' : 'Show Chart'}
                    </Button>
                </div>

                {trajectoryOpen && (
                    <ComplianceTrajectoryChart
                        baseline={entity?.baselineData}
                        targets={entity?.targets || []}
                        achieved={entity?.achievedData || []}
                        height={500}
                    />
                )}
            </div>
        </div>
    );
};

export default BRSDashboard;
