import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { getAllMonitoringData, deleteMonitoringData } from '@/services/cctsMonitoringService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Eye, Edit, Trash2, Filter, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

const MonitoringDataList = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [monitoringData, setMonitoringData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadMonitoringData();
    }, [token, filter]);

    const loadMonitoringData = async () => {
        try {
            setLoading(true);
            const filters = filter !== 'all' ? { status: filter } : {};
            const res = await getAllMonitoringData(token, filters);
            setMonitoringData(res.data);
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

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this monitoring report?')) return;

        try {
            await deleteMonitoringData(token, id);
            toast({
                title: 'Success',
                description: 'Monitoring report deleted'
            });
            loadMonitoringData();
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            });
        }
    };

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            'Draft': { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', icon: FileText },
            'Submitted': { color: 'bg-blue-500/20 text-blue-400 border-blue-500/50', icon: Clock },
            'Under Verification': { color: 'bg-purple-500/20 text-purple-400 border-purple-500/50', icon: Eye },
            'Verified': { color: 'bg-green-500/20 text-green-400 border-green-500/50', icon: CheckCircle },
            'Rejected': { color: 'bg-red-500/20 text-red-400 border-red-500/50', icon: XCircle }
        };

        const config = statusConfig[status] || statusConfig['Draft'];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${config.color}`}>
                <Icon className="w-3 h-3" />
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-darkgray via-mediumgray to-darkgray flex items-center justify-center">
                <div className="text-gold text-xl">Loading reports...</div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Monitoring Reports | CCTS | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-darkgray via-mediumgray to-darkgray py-20 px-4">
                <div className="container mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gold mb-2">Monitoring Reports</h1>
                            <p className="text-offwhite/70">View and manage your emissions monitoring data</p>
                        </div>
                        <Button
                            onClick={() => navigate('/ccts/monitoring-data/new')}
                            className="bg-gold text-darkgray hover:bg-gold/90 font-semibold"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Report
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-4">
                            <Filter className="w-5 h-5 text-gold" />
                            <span className="text-offwhite font-semibold">Filter by Status:</span>
                            <div className="flex gap-2">
                                {['all', 'Draft', 'Submitted', 'Under Verification', 'Verified', 'Rejected'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setFilter(status)}
                                        className={`px-4 py-2 rounded-lg transition-all ${filter === status
                                                ? 'bg-gold text-darkgray font-semibold'
                                                : 'bg-mediumgray text-offwhite/70 hover:bg-mediumgray/70'
                                            }`}
                                    >
                                        {status === 'all' ? 'All' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Reports Table */}
                    {monitoringData.length === 0 ? (
                        <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg p-12 text-center">
                            <FileText className="w-16 h-16 text-gold/50 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-offwhite mb-2">No Reports Found</h3>
                            <p className="text-offwhite/60 mb-6">
                                {filter === 'all'
                                    ? 'You haven\'t submitted any monitoring reports yet.'
                                    : `No reports with status "${filter}".`
                                }
                            </p>
                            <Button
                                onClick={() => navigate('/ccts/monitoring-data/new')}
                                className="bg-gold text-darkgray"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create First Report
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-mediumgray/50 border-b border-gold/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Compliance Year</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Reporting Period</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">GEI</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Submitted</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/10">
                                    {monitoringData.map((report) => (
                                        <tr key={report._id} className="hover:bg-mediumgray/30 transition-colors">
                                            <td className="px-6 py-4 text-offwhite font-semibold">
                                                {report.complianceYear}
                                            </td>
                                            <td className="px-6 py-4 text-offwhite/80 text-sm">
                                                {new Date(report.reportingPeriod.startDate).toLocaleDateString()} - {new Date(report.reportingPeriod.endDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-offwhite font-mono">
                                                {report.calculatedData?.ghgIntensity
                                                    ? report.calculatedData.ghgIntensity.toFixed(4)
                                                    : '—'
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={report.status} />
                                            </td>
                                            <td className="px-6 py-4 text-offwhite/70 text-sm">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        onClick={() => navigate(`/ccts/monitoring-data/${report._id}`)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-gold hover:text-gold/80"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    {(report.status === 'Draft' || report.status === 'Rejected') && (
                                                        <>
                                                            <Button
                                                                onClick={() => navigate(`/ccts/monitoring-data/edit/${report._id}`)}
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-blue-400 hover:text-blue-300"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleDelete(report._id)}
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-400 hover:text-red-300"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Stats Summary */}
                    {monitoringData.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            <div className="bg-darkgray/40 border border-gold/20 rounded-lg p-4 text-center">
                                <p className="text-offwhite/70 text-sm">Total Reports</p>
                                <p className="text-3xl font-bold text-gold">{monitoringData.length}</p>
                            </div>
                            <div className="bg-darkgray/40 border border-green-500/20 rounded-lg p-4 text-center">
                                <p className="text-offwhite/70 text-sm">Verified</p>
                                <p className="text-3xl font-bold text-green-400">
                                    {monitoringData.filter(r => r.status === 'Verified').length}
                                </p>
                            </div>
                            <div className="bg-darkgray/40 border border-blue-500/20 rounded-lg p-4 text-center">
                                <p className="text-offwhite/70 text-sm">Under Review</p>
                                <p className="text-3xl font-bold text-blue-400">
                                    {monitoringData.filter(r => r.status === 'Under Verification').length}
                                </p>
                            </div>
                            <div className="bg-darkgray/40 border border-yellow-500/20 rounded-lg p-4 text-center">
                                <p className="text-offwhite/70 text-sm">Drafts</p>
                                <p className="text-3xl font-bold text-yellow-400">
                                    {monitoringData.filter(r => r.status === 'Draft').length}
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default MonitoringDataList;
