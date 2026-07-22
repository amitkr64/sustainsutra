import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, GitCompareArrows, Loader2 } from 'lucide-react';
import { brsrReportService } from '@/services/brsrReportService';
import { Button } from '@/components/ui/button';

// Year-over-year (or any two-report) field-by-field comparison.
const BRSRDiffPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [, setYears] = useState([]); // reserved for year-filter UI
    const [idA, setIdA] = useState('');
    const [idB, setIdB] = useState('');
    const [diff, setDiff] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load the user's reports + years on mount.
    useEffect(() => {
        Promise.all([
            brsrReportService.getReports().catch(() => []),
            brsrReportService.getYears().catch(() => ({ years: [] }))
        ]).then(([r, y]) => {
            setReports(Array.isArray(r) ? r : []);
            setYears(y.years || []);
            // Pre-select the two most recent reports for a quick default.
            const sorted = [...(Array.isArray(r) ? r : [])].sort((a, b) =>
                (a.financialYear || '').localeCompare(b.financialYear || '')
            );
            if (sorted.length >= 2) {
                setIdA(sorted[sorted.length - 2]._id);
                setIdB(sorted[sorted.length - 1]._id);
            }
        });
    }, []);

    const runDiff = async () => {
        if (!idA || !idB || idA === idB) {
            setError('Select two different reports to compare.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const result = await brsrReportService.getDiff(idA, idB);
            setDiff(result);
        } catch (err) {
            setError(err.message);
            setDiff(null);
        } finally {
            setLoading(false);
        }
    };

    // Auto-run when both ids are selected and differ.
    useEffect(() => {
        if (idA && idB && idA !== idB) runDiff();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idA, idB]);

    const reportLabel = (id) => {
        const r = reports.find(x => x._id === id);
        return r ? `FY ${r.financialYear}` : '—';
    };

    const labelA = useMemo(() => diff ? reportLabel(diff.a._id) : '', [diff, reports]); // eslint-disable-line react-hooks/exhaustive-deps
    const labelB = useMemo(() => diff ? reportLabel(diff.b._id) : '', [diff, reports]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container mx-auto px-4 py-12">
            <Helmet><title>BRSR Year-over-Year Comparison | SustainSutra</title></Helmet>

            <button
                onClick={() => navigate('/brsr/dashboard')}
                className="inline-flex items-center gap-2 text-gold hover:underline mb-6"
            >
                <ArrowLeft size={18} /> {t('brsr.dashboardTitle')}
            </button>

            <div className="flex items-center gap-3 mb-2">
                <GitCompareArrows className="text-gold" size={28} />
                <h1 className="text-4xl font-playfair text-gold">{t('brsr.diffTitle')}</h1>
            </div>
            <p className="text-dimmed mb-8 max-w-2xl">
                {t('brsr.diffDesc')}
            </p>

            {/* Selectors */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-offwhite uppercase tracking-widest mb-2" htmlFor="report-a">{t('brsr.reportA')}</label>
                        <select
                            id="report-a"
                            value={idA}
                            onChange={(e) => setIdA(e.target.value)}
                            className="w-full h-12 px-4 bg-navy border border-white/10 rounded-lg text-offwhite focus:border-gold outline-none"
                        >
                            <option value="">{t('brsr.selectReport')}</option>
                            {reports.map(r => (
                                <option key={r._id} value={r._id}>FY {r.financialYear} ({r.status})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-offwhite uppercase tracking-widest mb-2" htmlFor="report-b">{t('brsr.reportB')}</label>
                        <select
                            id="report-b"
                            value={idB}
                            onChange={(e) => setIdB(e.target.value)}
                            className="w-full h-12 px-4 bg-navy border border-white/10 rounded-lg text-offwhite focus:border-gold outline-none"
                        >
                            <option value="">{t('brsr.selectReport')}</option>
                            {reports.map(r => (
                                <option key={r._id} value={r._id}>FY {r.financialYear} ({r.status})</option>
                            ))}
                        </select>
                    </div>
                </div>
                {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            </div>

            {/* Results */}
            {loading && (
                <div className="flex items-center gap-2 text-dimmed py-12 justify-center">
                    <Loader2 className="animate-spin" size={20} /> {t('brsr.comparing')}
                </div>
            )}

            {!loading && diff && (
                <>
                    {/* Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-widest text-dimmed">{t('brsr.fieldsCompared')}</p>
                            <p className="text-2xl font-playfair text-white">{diff.summary.totalFields}</p>
                        </div>
                        <div className="bg-amber-500/5 border border-amber-500/30 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-widest text-amber-400/80">{t('brsr.changed')}</p>
                            <p className="text-2xl font-playfair text-amber-400">{diff.summary.changed}</p>
                        </div>
                        <div className="bg-green-500/5 border border-green-500/30 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-widest text-green-400/80">{t('brsr.added')}</p>
                            <p className="text-2xl font-playfair text-green-400">{diff.summary.added}</p>
                        </div>
                        <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-widest text-red-400/80">{t('brsr.removed')}</p>
                            <p className="text-2xl font-playfair text-red-400">{diff.summary.removed}</p>
                        </div>
                    </div>

                    {/* Changed fields table */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-playfair text-white">{t('brsr.changedFields')}</h2>
                            <div className="text-xs text-dimmed">
                                <span className="text-offwhite">{labelA}</span> → <span className="text-gold">{labelB}</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">Field</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">{labelA}</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">{labelB}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {diff.fields.map((f) => (
                                        <tr key={f.name} className="hover:bg-white/5">
                                            <td className="px-4 py-3 text-sm text-offwhite font-mono break-all max-w-xs">{f.name}</td>
                                            <td className="px-4 py-3 text-sm text-dimmed break-words">{f.a === null || f.a === '' ? <span className="italic text-white/30">—</span> : String(f.a)}</td>
                                            <td className="px-4 py-3 text-sm text-gold break-words">{f.b === null || f.b === '' ? <span className="italic text-white/30">—</span> : String(f.b)}</td>
                                        </tr>
                                    ))}
                                    {diff.fields.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-12 text-center text-dimmed">{t('brsr.noFieldsChanged')}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {!loading && !diff && !error && reports.length < 2 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-dimmed">
                    <p>{t('brsr.needTwoReports')}</p>
                    <Button onClick={() => navigate('/brsr/dashboard')} className="mt-6 bg-gold text-navy">{t('brsr.dashboardTitle')}</Button>
                </div>
            )}
        </div>
    );
};

export default BRSRDiffPage;
