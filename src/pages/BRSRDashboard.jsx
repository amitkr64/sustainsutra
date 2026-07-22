import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, FileText, Trash2, Edit3, ChevronRight, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BRSRDashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();

    // Auth is via the httpOnly JWT cookie (withCredentials).
    const config = { withCredentials: true };

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">BRSR Master Dashboard</h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Manage your Business Responsibility &amp; Sustainability Reports. Complete all 1000+ indicators through our guided compliance system.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate('/brsr/analysis')}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                        <BarChart3 size={16} />
                        Analysis
                    </button>
                    <button
                        onClick={() => navigate('/brsr/diff')}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                        <Plus size={16} />
                        Compare
                    </button>
                    <button
                        onClick={createNewReport}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all shadow-sm"
                    >
                        <Plus size={16} />
                        New Report
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
            ) : reports.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
                    <FileText className="mx-auto mb-4 text-muted-foreground/40" size={48} />
                    <h2 className="text-xl font-semibold text-foreground">No Reports Found</h2>
                    <p className="mt-2 mb-6 text-muted-foreground">Start your sustainability reporting journey by creating your first BRSR report.</p>
                    <button
                        onClick={createNewReport}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all"
                    >
                        <Plus size={16} />
                        Initialize First Report
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {reports.map((report) => (
                        <div key={report._id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md group">
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${report.status === 'approved' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                                        report.status === 'submitted' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' :
                                            'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                        }`}>
                                        {report.status}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(report.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">FY {report.financialYear}</h3>
                                <p className="mt-0.5 text-sm text-muted-foreground">BRSR Master Reporting Template</p>

                                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => deleteReport(report._id)}
                                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                            title="Delete"
                                            aria-label="Delete report"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <Link
                                            to={`/brsr/wizard/${report._id}`}
                                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                                            title="Edit"
                                            aria-label="Edit report"
                                        >
                                            <Edit3 size={16} />
                                        </Link>
                                    </div>
                                    <Link
                                        to={`/brsr/wizard/${report._id}`}
                                        className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
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
