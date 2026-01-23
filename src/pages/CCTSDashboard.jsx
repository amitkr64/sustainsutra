import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { getMyEntity, getEntityDashboard } from '@/services/cctsEntityService';
import { getMyCCCBalance } from '@/services/cctsCCCBalanceService';
import ComplianceTrajectoryChart from '@/components/ComplianceTrajectoryChart';
import { FileText, TrendingUp, TrendingDown, CheckCircle, AlertCircle, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CCTSDashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [entity, setEntity] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [cccBalance, setCCCBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentYear, setCurrentYear] = useState('2025-26');

    useEffect(() => {
        loadDashboardData();
    }, [token]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            // Get entity profile
            const entityRes = await getMyEntity(token);

            if (entityRes && entityRes.data) {
                setEntity(entityRes.data);

                // Get dashboard data
                const dashboardRes = await getEntityDashboard(token, entityRes.data._id);
                setDashboard(dashboardRes.data);
            }

            // Try to get current year's balance
            try {
                const balanceRes = await getMyCCCBalance(token, currentYear);
                setCCCBalance(balanceRes.data);
            } catch (err) {
                // Balance might not exist yet
                console.log('No balance for current year');
            }

        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <div className="text-gold text-xl">Loading dashboard...</div>
            </div>
        );
    }

    if (!entity) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center p-8">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-offwhite mb-2">No Entity Profile Found</h2>
                    <p className="text-offwhite/70 mb-6">Please contact administrator to register your entity.</p>
                </div>
            </div>
        );
    }

    const ComplianceStatusBadge = ({ status }) => {
        const statusConfig = {
            'Compliant': { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50', icon: CheckCircle },
            'Non-Compliant': { color: 'bg-red-500/20 text-red-400 border-red-500/50', icon: AlertCircle },
            'Pending': { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', icon: AlertCircle }
        };

        const config = statusConfig[status] || statusConfig['Pending'];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.color} font-semibold`}>
                <Icon className="w-4 h-4" />
                {status}
            </span>
        );
    };

    return (
        <>
            <Helmet>
                <title>CCTS Dashboard - {entity.entityName} | SustainSutra</title>
                <meta name="description" content="Carbon Credit Trading Scheme compliance dashboard" />
            </Helmet>

            <div className="min-h-screen bg-navy py-20 px-4">
                <div className="container mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gold mb-2">
                            CCTS Compliance Dashboard
                        </h1>
                        <p className="text-xl text-offwhite/80">{entity.entityName}</p>
                        <p className="text-sm text-offwhite/60">Registration: {entity.registrationNumber} | Sector: {entity.sector}</p>
                    </div>

                    {/* Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Baseline Card */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-gold/60 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-offwhite/70 text-sm font-semibold">Baseline GEI</h3>
                                <BarChart3 className="w-5 h-5 text-blue-400" />
                            </div>
                            <p className="text-3xl font-bold text-offwhite mb-1">
                                {dashboard?.baseline?.ghgIntensity?.toFixed(4) || '0.0000'}
                            </p>
                            <p className="text-xs text-offwhite/60">tCO₂e/tonne ({dashboard?.baseline?.year || 'N/A'})</p>
                        </div>

                        {/* Reports Card */}
                        <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg p-6 hover:border-gold/60 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-offwhite/70 text-sm font-semibold">Reports</h3>
                                <FileText className="w-5 h-5 text-gold" />
                            </div>
                            <p className="text-3xl font-bold text-offwhite mb-1">
                                {dashboard?.reports.total || 0}
                            </p>
                            <p className="text-xs text-offwhite/60">
                                {dashboard?.reports.verified || 0} Verified, {dashboard?.reports.pending || 0} Pending
                            </p>
                        </div>

                        {/* Compliance Status Card */}
                        <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg p-6 hover:border-gold/60 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-offwhite/70 text-sm font-semibold">Compliance Status</h3>
                                {cccBalance?.complianceStatus === 'Compliant' ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                )}
                            </div>
                            {cccBalance ? (
                                <ComplianceStatusBadge status={cccBalance.complianceStatus} />
                            ) : (
                                <p className="text-offwhite/60">No data for {currentYear}</p>
                            )}
                        </div>

                        {/* Net Position Card */}
                        <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg p-6 hover:border-gold/60 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-offwhite/70 text-sm font-semibold">Net CCC Position</h3>
                                {cccBalance && cccBalance.netPosition >= 0 ? (
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                ) : (
                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                )}
                            </div>
                            {cccBalance ? (
                                <>
                                    <p className={`text-3xl font-bold mb-1 ${cccBalance.netPosition >= 0 ? 'text-emerald-400' : 'text-red-400'
                                        }`}>
                                        {cccBalance.netPosition >= 0 ? '+' : ''}{cccBalance?.netPosition?.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-offwhite/60">
                                        {cccBalance.netPosition >= 0 ? 'Surplus' : 'Deficit'} tCO₂e
                                    </p>
                                </>
                            ) : (
                                <p className="text-offwhite/60">—</p>
                            )}
                        </div>
                    </div>

                    {/* Compliance Trajectory Chart */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gold mb-6">Compliance Trajectory</h2>
                        {dashboard && (
                            <ComplianceTrajectoryChart
                                baseline={{
                                    year: dashboard.baseline.year,
                                    gei: dashboard.baseline.ghgIntensity
                                }}
                                targets={dashboard.trajectory.filter(t => t.type === 'target')}
                                achieved={dashboard.compliance ? [{
                                    year: dashboard.compliance.complianceYear,
                                    gei: dashboard.compliance.achievedGEI,
                                    complianceStatus: dashboard.compliance.status
                                }] : []}
                            />
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Button
                                    onClick={() => navigate('/ccts/monitoring-data/new')}
                                    className="w-full bg-gold text-darkgray hover:bg-gold/90 font-semibold"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Submit New Monitoring Data
                                </Button>
                                <Button
                                    onClick={() => navigate('/ccts/monitoring-data')}
                                    variant="outline"
                                    className="w-full border-gold/50 text-gold hover:bg-gold/10"
                                >
                                    View All Reports
                                </Button>
                                <Button
                                    onClick={() => navigate('/ccts/offset-projects')}
                                    variant="outline"
                                    className="w-full border-gold/50 text-gold hover:bg-gold/10"
                                >
                                    Explore Offset Projects
                                </Button>
                            </div>
                        </div>

                        {/* CCC Balance Detail */}
                        {cccBalance && (
                            <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-gold mb-4">CCC Balance Detail ({currentYear})</h3>
                                <div className="space-y-3 text-offwhite">
                                    <div className="flex justify-between">
                                        <span className="text-offwhite/70">Target GEI:</span>
                                        <span className="font-semibold">{cccBalance?.targetGEI?.toFixed(4)} tCO₂e/tonne</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-offwhite/70">Achieved GEI:</span>
                                        <span className="font-semibold">{cccBalance?.achievedGEI?.toFixed(4)} tCO₂e/tonne</span>
                                    </div>
                                    <div className="border-t border-gold/20 pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-offwhite/70">Credits Issued:</span>
                                            <span className="font-semibold text-emerald-400">+{cccBalance?.creditIssuance?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-offwhite/70">Surrender Requirement:</span>
                                            <span className="font-semibold text-red-400">-{cccBalance?.surrenderRequirement?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-offwhite/70">Offsets Applied:</span>
                                            <span className="font-semibold">+{cccBalance?.totalOffsetsUsed?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gold/20 pt-3">
                                        <div className="flex justify-between text-lg">
                                            <span className="font-bold">Net Position:</span>
                                            <span className={`font-bold ${cccBalance.netPosition >= 0 ? 'text-emerald-400' : 'text-red-400'
                                                }`}>
                                                {cccBalance.netPosition >= 0 ? '+' : ''}{cccBalance?.netPosition?.toFixed(2)} tCO₂e
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default CCTSDashboard;
