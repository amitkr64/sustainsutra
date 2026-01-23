import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { getMonitoringDataById } from '@/services/cctsMonitoringService';
import { createVerificationReport } from '@/services/cctsVerificationService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle, FileText, Download, Save, AlertTriangle } from 'lucide-react';

const VerificationDetail = () => {
    const { id } = useParams(); // Start with Monitoring Data ID
    const { token } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [verifierComments, setVerifierComments] = useState('');
    const [materialityCheck, setMaterialityCheck] = useState('Pass');
    const [verifiedEmissions, setVerifiedEmissions] = useState(0); // Initialize later

    useEffect(() => {
        loadReport();
    }, [id, token]);

    const loadReport = async () => {
        try {
            setLoading(true);
            const res = await getMonitoringDataById(token, id);
            setReport(res.data);
            if (res.data.calculatedData) {
                setVerifiedEmissions(res.data.calculatedData.totalGHG);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to load report data',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitVerification = async (outcome) => {
        try {
            setLoading(true);
            const payload = {
                monitoringData: id,
                entity: report?.entity?._id || report?.entity?.id,
                complianceYear: report?.complianceYear,
                verificationOutcome: outcome, // 'Positive' or 'Negative'
                verifiedData: {
                    totalGHG: parseFloat(verifiedEmissions),
                    // In a real app, verifier would override line items, here we simplify
                    ghgIntensity: parseFloat(verifiedEmissions) / report.productionData.totalProduction
                },
                materialityThresholdCheck: materialityCheck,
                comments: verifierComments,
                siteVisitDate: new Date()
            };

            await createVerificationReport(token, payload);

            toast({
                title: 'Success',
                description: `Verification Report Submitted: ${outcome}`,
            });
            navigate('/ccts/verification-queue');

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

    if (loading || !report) {
        return <div className="min-h-screen bg-navy flex items-center justify-center text-gold">Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title>Verify Report | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-3xl font-bold text-gold mb-8">Verification Assessment</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: Entity Submission */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <h2 className="text-xl font-semibold text-offwhite mb-4 flex items-center gap-2">
                                <FileText className="text-blue-400" /> Entity Submission
                            </h2>

                            <div className="space-y-4 text-sm text-offwhite/80">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Entity:</span>
                                    <span className="text-white font-medium">{report.entity.entityName}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Monitoring Period:</span>
                                    <span className="text-white">{new Date(report.reportingPeriod.startDate).toLocaleDateString()} - {new Date(report.reportingPeriod.endDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Reported Total GHG:</span>
                                    <span className="text-gold font-bold">{report.calculatedData?.totalGHG?.toFixed(2)} tCO₂e</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Reported GEI:</span>
                                    <span className="text-gold font-bold">{report.calculatedData?.ghgIntensity?.toFixed(4)} tCO₂e/tonne</span>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-white font-semibold mb-2">Source Data Breakdown:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Raw Materials: {report.rawMaterials.length} entries</li>
                                        <li>Fuel Inputs: {report.fuelInputs.length} entries</li>
                                        <li>Electricity: {report.energyInputs.electricityConsumed} MWh</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right: Verifier Assessment */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[100px] -z-10 group-hover:bg-gold/20 transition-all" />
                            <h2 className="text-xl font-semibold text-offwhite mb-4 flex items-center gap-2">
                                <CheckCircle className="text-green-400" /> Verification Findings
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-offwhite mb-2">Verified Total GHG Emissions (tCO₂e)</label>
                                    <input
                                        type="number"
                                        value={verifiedEmissions}
                                        onChange={(e) => setVerifiedEmissions(e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none transition-all"
                                    />
                                    <p className="text-xs text-offwhite/50 mt-1">Adjust if discrepancies found during audit.</p>
                                </div>

                                <div>
                                    <label className="block text-offwhite mb-2">Materiality Check Results</label>
                                    <select
                                        value={materialityCheck}
                                        onChange={(e) => setMaterialityCheck(e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none transition-all"
                                    >
                                        <option value="Pass">Pass (Discrepancy &lt; 5%)</option>
                                        <option value="Fail">Fail (Discrepancy &gt; 5%)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-offwhite mb-2">Verification Statement / Comments</label>
                                    <textarea
                                        value={verifierComments}
                                        onChange={(e) => setVerifierComments(e.target.value)}
                                        rows={4}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none transition-all"
                                        placeholder="Describe methodology, site visit findings, and basis for opinion..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <Button
                                        onClick={() => handleSubmitVerification('Negative')}
                                        disabled={loading}
                                        variant="destructive"
                                        className="w-full"
                                    >
                                        <XCircle className="w-4 h-4 mr-2" /> Issue Adverse Opinion
                                    </Button>
                                    <Button
                                        onClick={() => handleSubmitVerification('Positive')}
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" /> Issue Positive Opinion
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerificationDetail;
