import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { emissionFactorService } from '@/services/emissionFactorService';
import { carbonCalculationService, scope3Categories } from '@/services/carbonCalculationService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
    Calculator, Plus, Trash2, Download, Lock, ChevronDown, ChevronRight,
    Flame, Zap, Globe, TrendingUp, AlertCircle
} from 'lucide-react';

const CarbonCalculatorPage = () => {
    const { user, isAuthenticated } = useAuth();
    const { toast } = useToast();

    const [activeScope, setActiveScope] = useState(1);
    const [scope1Activities, setScope1Activities] = useState([]);
    const [scope2Activities, setScope2Activities] = useState([]);
    const [scope3Activities, setScope3Activities] = useState([]);
    const [emissionFactors, setEmissionFactors] = useState([]);
    const [result, setResult] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [organizationName, setOrganizationName] = useState('');
    const [reportingPeriod, setReportingPeriod] = useState('');

    useEffect(() => {
        // Load emission factors
        const factors = emissionFactorService.getAll();
        setEmissionFactors(factors);
    }, []);

    const addActivity = (scope) => {
        const newActivity = {
            id: Date.now(),
            name: '',
            quantity: 0,
            emissionFactorId: '',
            emissionFactor: 0,
            unit: ''
        };

        if (scope === 1) {
            setScope1Activities([...scope1Activities, newActivity]);
        } else if (scope === 2) {
            setScope2Activities([...scope2Activities, newActivity]);
        } else if (scope === 3) {
            setScope3Activities([...scope3Activities, newActivity]);
        }
    };

    const removeActivity = (scope, id) => {
        if (scope === 1) {
            setScope1Activities(scope1Activities.filter(a => a.id !== id));
        } else if (scope === 2) {
            setScope2Activities(scope2Activities.filter(a => a.id !== id));
        } else if (scope === 3) {
            setScope3Activities(scope3Activities.filter(a => a.id !== id));
        }
    };

    const updateActivity = (scope, id, field, value) => {
        const updateFn = (activities) => activities.map(a => {
            if (a.id === id) {
                const updated = { ...a, [field]: value };

                // If emission factor changed, update factor value and unit
                if (field === 'emissionFactorId') {
                    const factor = emissionFactors.find(f => f.id === value);
                    if (factor) {
                        updated.emissionFactor = factor.factor;
                        updated.unit = factor.unit;
                    }
                }

                return updated;
            }
            return a;
        });

        if (scope === 1) {
            setScope1Activities(updateFn(scope1Activities));
        } else if (scope === 2) {
            setScope2Activities(updateFn(scope2Activities));
        } else if (scope === 3) {
            setScope3Activities(updateFn(scope3Activities));
        }
    };

    const calculateFootprint = () => {
        const data = {
            scope1: scope1Activities.filter(a => a.quantity > 0 && a.emissionFactor > 0),
            scope2: scope2Activities.filter(a => a.quantity > 0 && a.emissionFactor > 0),
            scope3: scope3Activities.filter(a => a.quantity > 0 && a.emissionFactor > 0)
        };

        const calculationResult = carbonCalculationService.calculateFootprint(data);
        setResult(calculationResult);

        // Save calculation if user is logged in
        if (isAuthenticated && user) {
            carbonCalculationService.saveCalculation(user.email, data, {
                organizationName,
                reportingPeriod
            });
        }

        toast({ title: "Calculation Complete!", description: "Your carbon footprint has been calculated." });
    };

    const handleDownloadReport = () => {
        if (!isAuthenticated) {
            toast({
                title: "Login Required",
                description: "Please login to download the detailed report.",
                variant: "destructive"
            });
            return;
        }

        // Show payment modal for paid feature
        setShowPaymentModal(true);
    };

    const processPayment = () => {
        // Mock payment processing
        toast({ title: "Payment Successful!", description: "Your report is being generated..." });
        setShowPaymentModal(false);

        // Generate and download report
        setTimeout(() => {
            const reportData = carbonCalculationService.generateReportData({
                result,
                metadata: { organizationName, reportingPeriod }
            });

            // Create downloadable JSON (in production, this would be a PDF)
            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `carbon-footprint-report-${Date.now()}.json`;
            a.click();

            toast({ title: "Report Downloaded!", description: "Check your downloads folder." });
        }, 1500);
    };

    const getFactorsByScope = (scope) => {
        return emissionFactors.filter(f => f.scope === scope);
    };

    const renderActivityForm = (scope, activities, setActivities) => {
        const factors = getFactorsByScope(scope);

        return (
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="glassmorphism rounded-lg p-4">
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm text-dimmed mb-2">Activity Name</label>
                                <input
                                    type="text"
                                    value={activity.name}
                                    onChange={(e) => updateActivity(scope, activity.id, 'name', e.target.value)}
                                    placeholder="e.g., Office Electricity"
                                    className="w-full px-3 py-2 bg-navy border border-white/10 rounded text-offwhite text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-dimmed mb-2">Emission Factor</label>
                                <select
                                    value={activity.emissionFactorId}
                                    onChange={(e) => updateActivity(scope, activity.id, 'emissionFactorId', e.target.value)}
                                    className="w-full px-3 py-2 bg-navy border border-white/10 rounded text-offwhite text-sm"
                                >
                                    <option value="">Select factor...</option>
                                    {factors.map(f => (
                                        <option key={f.id} value={f.id}>
                                            {f.name} ({f.unit})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-dimmed mb-2">Quantity</label>
                                <input
                                    type="number"
                                    value={activity.quantity}
                                    onChange={(e) => updateActivity(scope, activity.id, 'quantity', parseFloat(e.target.value) || 0)}
                                    placeholder="0"
                                    className="w-full px-3 py-2 bg-navy border border-white/10 rounded text-offwhite text-sm"
                                />
                            </div>
                            <div className="flex items-end">
                                <Button
                                    onClick={() => removeActivity(scope, activity.id)}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                <Button
                    onClick={() => addActivity(scope)}
                    variant="outline"
                    className="w-full border-gold/30 text-gold hover:bg-gold/10"
                >
                    <Plus size={16} className="mr-2" /> Add Activity
                </Button>
            </div>
        );
    };

    return (
        <>
            <Helmet>
                <title>Carbon Footprint Calculator | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-sage-forest rounded-full mb-4">
                            <Calculator className="text-offwhite" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-playfair text-offwhite mb-4">
                            Carbon Footprint Calculator
                        </h1>
                        <p className="text-dimmed max-w-2xl mx-auto">
                            Calculate your organization's greenhouse gas emissions across Scopes 1, 2, and 3.
                            {!isAuthenticated && " Register to access detailed breakdowns and analysis."}
                        </p>
                    </div>

                    {/* Organization Info */}
                    <div className="glassmorphism rounded-2xl p-6 mb-8">
                        <h3 className="text-xl font-semibold text-offwhite mb-4">Organization Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-dimmed mb-2">Organization Name</label>
                                <input
                                    type="text"
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                    placeholder="Your Organization"
                                    className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-dimmed mb-2">Reporting Period</label>
                                <input
                                    type="text"
                                    value={reportingPeriod}
                                    onChange={(e) => setReportingPeriod(e.target.value)}
                                    placeholder="e.g., FY 2023-24"
                                    className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scope Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto">
                        <button
                            onClick={() => setActiveScope(1)}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeScope === 1
                                    ? 'bg-gradient-sage-forest text-offwhite'
                                    : 'bg-white/5 text-dimmed hover:bg-white/10'
                                }`}
                        >
                            <Flame size={18} className="inline mr-2" />
                            Scope 1: Direct
                        </button>
                        <button
                            onClick={() => setActiveScope(2)}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeScope === 2
                                    ? 'bg-gradient-sage-forest text-offwhite'
                                    : 'bg-white/5 text-dimmed hover:bg-white/10'
                                }`}
                        >
                            <Zap size={18} className="inline mr-2" />
                            Scope 2: Energy
                        </button>
                        <button
                            onClick={() => setActiveScope(3)}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeScope === 3
                                    ? 'bg-gradient-sage-forest text-offwhite'
                                    : 'bg-white/5 text-dimmed hover:bg-white/10'
                                }`}
                        >
                            <Globe size={18} className="inline mr-2" />
                            Scope 3: Value Chain
                        </button>
                    </div>

                    {/* Activity Forms */}
                    <div className="glassmorphism rounded-2xl p-6 mb-8">
                        {activeScope === 1 && (
                            <div>
                                <h3 className="text-xl font-semibold text-offwhite mb-4">
                                    Scope 1: Direct Emissions
                                </h3>
                                <p className="text-dimmed mb-6">
                                    Emissions from sources owned or controlled by your organization (combustion, vehicles, fugitive emissions).
                                </p>
                                {renderActivityForm(1, scope1Activities, setScope1Activities)}
                            </div>
                        )}

                        {activeScope === 2 && (
                            <div>
                                <h3 className="text-xl font-semibold text-offwhite mb-4">
                                    Scope 2: Indirect Energy Emissions
                                </h3>
                                <p className="text-dimmed mb-6">
                                    Emissions from purchased electricity, heat, steam, and cooling.
                                </p>
                                {renderActivityForm(2, scope2Activities, setScope2Activities)}
                            </div>
                        )}

                        {activeScope === 3 && (
                            <div>
                                <h3 className="text-xl font-semibold text-offwhite mb-4">
                                    Scope 3: Value Chain Emissions
                                </h3>
                                <p className="text-dimmed mb-6">
                                    All other indirect emissions in your value chain (15 categories).
                                </p>
                                {renderActivityForm(3, scope3Activities, setScope3Activities)}
                            </div>
                        )}
                    </div>

                    {/* Calculate Button */}
                    <div className="text-center mb-8">
                        <Button
                            onClick={calculateFootprint}
                            size="lg"
                            className="bg-gold text-navy hover:bg-gold/90 px-12"
                        >
                            <Calculator size={20} className="mr-2" />
                            Calculate Carbon Footprint
                        </Button>
                    </div>

                    {/* Results */}
                    {result && (
                        <div className="glassmorphism rounded-2xl p-8">
                            <h2 className="text-2xl font-playfair text-offwhite mb-6">Calculation Results</h2>

                            {/* Total Emissions - Always Visible */}
                            <div className="bg-gradient-sage-forest rounded-xl p-6 mb-6">
                                <div className="text-center">
                                    <div className="text-dimmed mb-2">Total Carbon Footprint</div>
                                    <div className="text-4xl font-bold text-offwhite">
                                        {carbonCalculationService.formatEmissions(result.total)}
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Breakdown - Registered Users Only */}
                            {isAuthenticated ? (
                                <>
                                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Flame className="text-orange-400" size={20} />
                                                <span className="text-dimmed text-sm">Scope 1</span>
                                            </div>
                                            <div className="text-2xl font-bold text-offwhite">
                                                {carbonCalculationService.formatEmissions(result.scope1)}
                                            </div>
                                            <div className="text-xs text-dimmed mt-1">
                                                {((result.scope1 / result.total) * 100).toFixed(1)}% of total
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="text-yellow-400" size={20} />
                                                <span className="text-dimmed text-sm">Scope 2</span>
                                            </div>
                                            <div className="text-2xl font-bold text-offwhite">
                                                {carbonCalculationService.formatEmissions(result.scope2)}
                                            </div>
                                            <div className="text-xs text-dimmed mt-1">
                                                {((result.scope2 / result.total) * 100).toFixed(1)}% of total
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Globe className="text-blue-400" size={20} />
                                                <span className="text-dimmed text-sm">Scope 3</span>
                                            </div>
                                            <div className="text-2xl font-bold text-offwhite">
                                                {carbonCalculationService.formatEmissions(result.scope3)}
                                            </div>
                                            <div className="text-xs text-dimmed mt-1">
                                                {((result.scope3 / result.total) * 100).toFixed(1)}% of total
                                            </div>
                                        </div>
                                    </div>

                                    {/* Download Report Button */}
                                    <div className="text-center pt-4 border-t border-white/10">
                                        <Button
                                            onClick={handleDownloadReport}
                                            className="bg-gold text-navy hover:bg-gold/90"
                                        >
                                            <Download size={16} className="mr-2" />
                                            Download Detailed Analysis Report (Paid)
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-white/5 rounded-lg p-6 text-center">
                                    <Lock className="text-gold mx-auto mb-3" size={32} />
                                    <h3 className="text-lg font-semibold text-offwhite mb-2">
                                        Register to View Detailed Breakdown
                                    </h3>
                                    <p className="text-dimmed mb-4">
                                        Create a free account to access scope-wise breakdowns, activity details, and save your calculations.
                                    </p>
                                    <Button
                                        onClick={() => window.location.href = '/login'}
                                        className="bg-gold text-navy hover:bg-gold/90"
                                    >
                                        Register Now
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-navy border border-white/10 rounded-2xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-playfair text-offwhite mb-4">Download Analysis Report</h3>
                        <p className="text-dimmed mb-6">
                            Get a comprehensive PDF report with detailed analysis, recommendations, and benchmarking for ₹999.
                        </p>
                        <div className="space-y-4">
                            <Button
                                onClick={processPayment}
                                className="w-full bg-gold text-navy hover:bg-gold/90"
                            >
                                Proceed to Payment (₹999)
                            </Button>
                            <Button
                                onClick={() => setShowPaymentModal(false)}
                                variant="outline"
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarbonCalculatorPage;
