import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { getVerificationReports, getPendingVerifications } from '@/services/cctsVerificationService';
import { getMonitoringData } from '@/services/cctsMonitoringService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Eye, CheckCircle, Clock, AlertCircle, Search, Filter, Briefcase } from 'lucide-react';

const VerificationQueue = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // pending, history

    useEffect(() => {
        loadData();
    }, [token, filter]);

    const loadData = async () => {
        try {
            setLoading(true);
            let data = [];

            if (filter === 'pending') {
                // Get monitoring data with status 'Submitted' or 'Under Verification'
                const res = await getMonitoringData(token, { status: 'Submitted' }); // For now, fetch submitted
                // Filter for those not yet assigned or assigned to me
                data = res.data;
            } else {
                // Get completed verification reports by me
                const res = await getVerificationReports(token, { verifierId: user._id });
                data = res.data;
            }

            setReports(data || []);
        } catch (error) {
            console.error('Error loading verification queue:', error);
            // toast({
            //     title: 'Error',
            //     description: 'Failed to load verification queue.',
            //     variant: 'destructive'
            // });
            // Fallback for demo
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Verification Queue | CCTS Verifier | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-darkgray via-mediumgray to-darkgray py-20 px-4">
                <div className="container mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gold mb-2">Verification Queue</h1>
                            <p className="text-offwhite/70">Review and verify emission monitoring reports</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setFilter('pending')}
                                variant={filter === 'pending' ? 'default' : 'outline'}
                                className={filter === 'pending' ? 'bg-gold text-navy' : 'border-gold/30 text-gold'}
                            >
                                <Clock className="w-4 h-4 mr-2" /> Pending
                            </Button>
                            <Button
                                onClick={() => setFilter('history')}
                                variant={filter === 'history' ? 'default' : 'outline'}
                                className={filter === 'history' ? 'bg-gold text-navy' : 'border-gold/30 text-gold'}
                            >
                                <CheckCircle className="w-4 h-4 mr-2" /> History
                            </Button>
                        </div>
                    </div>

                    {/* Queue Content */}
                    <div className="bg-darkgray/60 backdrop-blur-sm border border-gold/30 rounded-lg overflow-hidden min-h-[400px]">
                        {loading ? (
                            <div className="flex items-center justify-center h-64 text-gold">Loading queue...</div>
                        ) : reports.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-96 p-8 opacity-70">
                                <Briefcase className="w-16 h-16 text-offwhite/20 mb-4" />
                                <h3 className="text-xl font-semibold text-offwhite mb-2">No Reports Found</h3>
                                <p className="text-offwhite/60 text-center max-w-md">
                                    {filter === 'pending'
                                        ? "Great job! You have cleared your verification queue."
                                        : "You haven't completed any verifications yet."
                                    }
                                </p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-mediumgray/50 border-b border-gold/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Entity</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Year</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Total Emissions</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Sector</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Status</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gold">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/10">
                                    {reports.map((item) => (
                                        <tr key={item._id} className="hover:bg-mediumgray/30 transition-colors">
                                            {/* Handle both monitoring data objects and verification report objects */}
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-offwhite">{item.entity?.entityName || 'Unknown Entity'}</p>
                                                <p className="text-xs text-offwhite/50">{item.entity?.registrationNumber}</p>
                                            </td>
                                            <td className="px-6 py-4 text-offwhite">
                                                {item.complianceYear}
                                            </td>
                                            <td className="px-6 py-4 text-offwhite font-mono">
                                                {(item.calculatedData?.totalGHG || item.verifiedData?.totalGHG || 0).toFixed(2)} tCO₂e
                                            </td>
                                            <td className="px-6 py-4 text-offwhite/70">
                                                {item.entity?.sector}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${item.status === 'Submitted' ? 'bg-blue-500/20 text-blue-400' :
                                                    item.status === 'Under Verification' ? 'bg-purple-500/20 text-purple-400' :
                                                        item.status === 'Verified' ? 'bg-green-500/20 text-green-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button
                                                    onClick={() => navigate(`/ccts/verification/${item._id}`)}
                                                    size="sm"
                                                    className="bg-gold text-navy hover:bg-gold/90 font-semibold"
                                                >
                                                    {filter === 'pending' ? 'Start Verification' : 'View Report'}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default VerificationQueue;
