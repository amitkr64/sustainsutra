import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { getMonitoringDataById } from '@/services/cctsMonitoringService';
import { createVerificationReport } from '@/services/cctsVerificationService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle, FileText, Download, Save, AlertTriangle, Upload, FileCheck, ClipboardList, Search, Plus } from 'lucide-react';

const VerificationDetail = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [verifierComments, setVerifierComments] = useState('');
    const [materialityCheck, setMaterialityCheck] = useState('Pass');
    const [verifiedEmissions, setVerifiedEmissions] = useState(0);

    // New verification criteria
    const [verificationCriteria, setVerificationCriteria] = useState({
        dataCompleteness: 'Pass',
        documentationReviewed: 'Pass',
        siteVisitConducted: 'Pass',
        methodologyAppropriate: 'Pass',
        internalControlsAdequate: 'Pass'
    });

    // Document uploads
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [uploadingFile, setUploadingFile] = useState(false);

    // Follow-up actions
    const [followUpRequired, setFollowUpRequired] = useState(false);
    const [followUpActions, setFollowUpActions] = useState([]);
    const [newFollowUpAction, setNewFollowUpAction] = useState('');

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

    // Handle document upload
    const handleDocumentUpload = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setUploadingFile(true);

            // Simulate file upload (in real app, upload to server/cloud storage)
            setTimeout(() => {
                const newDocs = Array.from(files).map(file => ({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    type: file.type,
                    size: (file.size / 1024).toFixed(2) + ' KB',
                    uploadedAt: new Date()
                }));
                setUploadedDocuments(prev => [...prev, ...newDocs]);
                setUploadingFile(false);
                toast({
                    title: 'Success',
                    description: `${files.length} document(s) uploaded`,
                });
            }, 1000);
        }
    };

    const removeDocument = (docId) => {
        setUploadedDocuments(prev => prev.filter(doc => doc.id !== docId));
    };

    const addFollowUpAction = () => {
        if (newFollowUpAction.trim()) {
            setFollowUpActions(prev => [...prev, {
                id: Date.now(),
                action: newFollowUpAction,
                status: 'Pending',
                createdAt: new Date()
            }]);
            setNewFollowUpAction('');
            setFollowUpRequired(true);
        }
    };

    const removeFollowUpAction = (actionId) => {
        setFollowUpActions(prev => prev.filter(action => action.id !== actionId));
    };

    // Calculate overall verification score
    const getOverallCriteriaStatus = () => {
        const criteria = Object.values(verificationCriteria);
        const passCount = criteria.filter(c => c === 'Pass').length;
        const failCount = criteria.filter(c => c === 'Fail').length;

        if (failCount > 0) return 'Fail';
        if (passCount === criteria.length) return 'Pass';
        return 'Partial';
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
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold text-gold mb-8">Verification Assessment</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Entity Submission */}
                        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
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

                        {/* Middle: Verifier Assessment */}
                        <div className="lg:col-span-2 space-y-6">
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

                            {/* Expanded Verification Criteria */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <h2 className="text-xl font-semibold text-offwhite mb-4 flex items-center gap-2">
                                    <ClipboardList className="text-purple-400" /> Verification Criteria
                                </h2>
                                <div className="space-y-3">
                                    {Object.entries({
                                        dataCompleteness: 'Data Completeness',
                                        documentationReviewed: 'Documentation Reviewed',
                                        siteVisitConducted: 'Site Visit Conducted',
                                        methodologyAppropriate: 'Methodology Appropriate',
                                        internalControlsAdequate: 'Internal Controls Adequate'
                                    }).map(([key, label]) => (
                                        <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                            <span className="text-sm text-offwhite">{label}</span>
                                            <select
                                                value={verificationCriteria[key]}
                                                onChange={(e) => setVerificationCriteria(prev => ({
                                                    ...prev,
                                                    [key]: e.target.value
                                                }))}
                                                className="bg-navy border border-white/10 rounded-lg px-3 py-1 text-sm text-offwhite focus:border-gold outline-none"
                                            >
                                                <option value="Pass">Pass</option>
                                                <option value="Fail">Fail</option>
                                                <option value="NA">N/A</option>
                                            </select>
                                        </div>
                                    ))}
                                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-offwhite">Overall Status:</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                            getOverallCriteriaStatus() === 'Pass' ? 'bg-green-500/20 text-green-400' :
                                            getOverallCriteriaStatus() === 'Fail' ? 'bg-red-500/20 text-red-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {getOverallCriteriaStatus()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Document Upload */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <h2 className="text-xl font-semibold text-offwhite mb-4 flex items-center gap-2">
                                    <FileCheck className="text-blue-400" /> Supporting Documents
                                </h2>

                                <div className="mb-4">
                                    <label className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-gold/50 hover:bg-white/5 transition-all">
                                        <Upload className="w-8 h-8 text-offwhite/50" />
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-offwhite">Click to upload documents</p>
                                            <p className="text-xs text-offwhite/50">PDF, Excel, Images up to 10MB</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png"
                                            onChange={handleDocumentUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {uploadedDocuments.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-offwhite">Uploaded Documents:</p>
                                        {uploadedDocuments.map(doc => (
                                            <div key={doc.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="w-4 h-4 text-blue-400" />
                                                    <div>
                                                        <p className="text-sm text-offwhite">{doc.name}</p>
                                                        <p className="text-xs text-offwhite/50">{doc.size}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={() => removeDocument(doc.id)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Follow-up Actions */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-offwhite flex items-center gap-2">
                                        <Search className="text-amber-400" /> Follow-up Actions
                                    </h2>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={followUpRequired}
                                            onChange={(e) => setFollowUpRequired(e.target.checked)}
                                            className="w-4 h-4 rounded border-white/20 bg-navy text-gold focus:ring-gold"
                                        />
                                        <span className="text-sm text-offwhite">Follow-up Required</span>
                                    </label>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={newFollowUpAction}
                                        onChange={(e) => setNewFollowUpAction(e.target.value)}
                                        placeholder="Add follow-up action required..."
                                        className="flex-1 bg-navy border border-white/10 rounded-lg px-4 py-2 text-sm text-offwhite focus:border-gold outline-none"
                                        onKeyPress={(e) => e.key === 'Enter' && addFollowUpAction()}
                                    />
                                    <Button
                                        onClick={addFollowUpAction}
                                        size="sm"
                                        variant="outline"
                                        className="border-gold/50 text-gold"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                {followUpActions.length > 0 && (
                                    <div className="space-y-2">
                                        {followUpActions.map(action => (
                                            <div key={action.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-offwhite">{action.action}</p>
                                                    <p className="text-xs text-offwhite/50 mt-1">Status: {action.status}</p>
                                                </div>
                                                <Button
                                                    onClick={() => removeFollowUpAction(action.id)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerificationDetail;
