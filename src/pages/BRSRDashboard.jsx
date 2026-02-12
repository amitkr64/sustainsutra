import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, FileText, Trash2, Edit3, ChevronRight, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const BRSRDashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { token } = useAuth();

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const { data } = await axios.get('/api/brsr-reports', config);
            setReports(data);
        } catch (error) {
            toast({
                title: "Error fetching reports",
                description: error.response?.data?.message || error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const createNewReport = async () => {
        const year = prompt("Enter Financial Year (e.g. 2025-26):");
        if (!year) return;

        try {
            const { data } = await axios.post('/api/brsr-reports', { financialYear: year }, config);
            toast({
                title: "Report Created",
                description: `Draft for FY ${year} has been initialized.`
            });
            navigate(`/brsr/wizard/${data._id}`);
        } catch (error) {
            toast({
                title: "Failed to create report",
                description: error.response?.data?.message || error.message,
                variant: "destructive"
            });
        }
    };

    const deleteReport = async (id) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;

        try {
            await axios.delete(`/api/brsr-reports/${id}`, config);
            setReports(reports.filter(r => r._id !== id));
            toast({
                title: "Report Deleted",
                description: "The report has been permanently removed."
            });
        } catch (error) {
            toast({
                title: "Delete Failed",
                description: error.response?.data?.message || error.message,
                variant: "destructive"
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-playfair text-gold mb-2">BRSR Master Dashboard</h1>
                    <p className="text-dimmed max-w-2xl">
                        Manage your Business Responsibility & Sustainability Reports. Complete all 1000+ indicators through our guided compliance system.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/brsr/analysis')}
                        className="flex items-center gap-2 border border-gold/30 text-gold px-6 py-3 rounded-lg font-bold hover:bg-gold/10 transition-smooth"
                    >
                        <BarChart3 size={20} />
                        Analysis Dashboard
                    </button>
                    <button
                        onClick={createNewReport}
                        className="flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-gold/80 transition-smooth shadow-lg shadow-gold/20"
                    >
                        <Plus size={20} />
                        New Report
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                </div>
            ) : reports.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                    <FileText className="mx-auto text-gold/40 mb-4" size={48} />
                    <h2 className="text-2xl font-playfair mb-2">No Reports Found</h2>
                    <p className="text-dimmed mb-8">Start your sustainability reporting journey by creating your first BRSR report.</p>
                    <button
                        onClick={createNewReport}
                        className="text-gold border border-gold/50 px-6 py-2 rounded hover:bg-gold/10 transition-smooth"
                    >
                        Initialize First Report
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-smooth group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${report.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                        report.status === 'submitted' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-gold/20 text-gold'
                                        }`}>
                                        {report.status}
                                    </div>
                                    <span className="text-xs text-dimmed italic">
                                        Last saved: {new Date(report.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-playfair text-offwhite mb-1">FY {report.financialYear}</h3>
                                <p className="text-sm text-dimmed mb-6">BRSR Master Reporting Template</p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => deleteReport(report._id)}
                                            className="p-2 text-dimmed hover:text-red-400 hover:bg-red-400/10 rounded transition-smooth"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <Link
                                            to={`/brsr/wizard/${report._id}`}
                                            className="p-2 text-dimmed hover:text-gold hover:bg-gold/10 rounded transition-smooth"
                                            title="Edit"
                                        >
                                            <Edit3 size={18} />
                                        </Link>
                                    </div>
                                    <Link
                                        to={`/brsr/wizard/${report._id}`}
                                        className="flex items-center gap-1 text-gold font-bold hover:underline"
                                    >
                                        Resume <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-20 bg-gold/5 border border-gold/10 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                    <div className="bg-gold/20 p-3 rounded-lg">
                        <AlertCircle className="text-gold" size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-playfair text-gold mb-2">Compliance Note</h4>
                        <p className="text-sm text-dimmed leading-relaxed">
                            The BRSR Master Reporting System is designed to meet the requirements of the Securities and Exchange Board of India (SEBI).
                            Ensure all mandatory fields marked in the wizard are filled accurately. Drafts are automatically saved as you navigate between sections.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BRSRDashboard;
