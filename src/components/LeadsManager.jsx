import React, { useState, useEffect } from 'react';
import { leadService } from '@/services/leadService';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, Building2, Calendar, ChevronDown, Loader2 } from 'lucide-react';

const STATUSES = ['new', 'contacted', 'qualified', 'closed'];
const STATUS_STYLES = {
    new: 'bg-blue-500/15 text-blue-500 dark:text-blue-400',
    contacted: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    qualified: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    closed: 'bg-zinc-500/15 text-zinc-500',
};

const LeadDetailModal = ({ lead, onClose, onStatusChange }) => {
    if (!lead) return null;
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
            <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-foreground">{lead.contactName}</h3>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[lead.status] || ''}`}>{lead.status}</span>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Mail size={14} /> {lead.email}</div>
                    {lead.phone && <div className="flex items-center gap-2 text-muted-foreground"><Phone size={14} /> {lead.phone}</div>}
                    {lead.sector && <div className="flex items-center gap-2 text-muted-foreground"><Building2 size={14} /> {lead.sector}{lead.reportingStandard ? ` · ${lead.reportingStandard}` : ''}</div>}
                    <div className="flex items-center gap-2 text-muted-foreground"><Calendar size={14} /> {new Date(lead.createdAt).toLocaleString()}</div>
                </div>
                {lead.inquiryDetails && (
                    <div className="mt-4 rounded-lg bg-secondary p-3">
                        <p className="text-sm text-foreground">{lead.inquiryDetails}</p>
                    </div>
                )}
                <div className="mt-5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Update status:</span>
                    {STATUSES.map((s) => (
                        <button
                            key={s}
                            onClick={() => onStatusChange(lead._id, s)}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${lead.status === s ? STATUS_STYLES[s] : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="mt-5 w-full rounded-lg border border-border py-2 text-sm font-medium text-foreground hover:bg-secondary">
                    Close
                </button>
            </div>
        </div>
    );
};

const LeadsManager = () => {
    const { toast } = useToast();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedLead, setSelectedLead] = useState(null);

    const loadLeads = async () => {
        setLoading(true);
        try {
            const res = await leadService.getLeads(statusFilter ? { status: statusFilter } : {});
            setLeads(res.data || []);
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to load leads', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadLeads(); /* eslint-disable-next-line */ }, [statusFilter]);

    const handleStatusChange = async (id, status) => {
        try {
            await leadService.updateStatus(id, status);
            toast({ title: 'Status updated', description: `Lead marked as ${status}` });
            setSelectedLead(null);
            loadLeads();
        } catch {
            toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-playfair text-offwhite">Leads</h2>
                    <p className="text-dimmed text-sm">Manage inbound inquiries from the contact form.</p>
                </div>
                <div className="flex items-center gap-2">
                    {['', ...STATUSES].map((s) => (
                        <button
                            key={s || 'all'}
                            onClick={() => setStatusFilter(s)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${statusFilter === s ? 'bg-gold text-navy' : 'border border-white/10 text-dimmed hover:text-offwhite'}`}
                        >
                            {s || 'All'}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="animate-spin text-gold" size={24} /></div>
            ) : leads.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center text-dimmed">No leads found.</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                {['Contact', 'Company', 'Sector', 'Status', 'Date', ''].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {leads.map((lead) => (
                                <tr key={lead._id} className="cursor-pointer hover:bg-white/5" onClick={() => setSelectedLead(lead)}>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="font-medium text-offwhite">{lead.contactName}</div>
                                        <div className="text-xs text-dimmed">{lead.email}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{lead.company}</td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{lead.sector || '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[lead.status] || ''}`}>{lead.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-dimmed whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-dimmed"><ChevronDown size={16} className="rotate-[-90deg]" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedLead && (
                <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} onStatusChange={handleStatusChange} />
            )}
        </div>
    );
};

export default LeadsManager;
