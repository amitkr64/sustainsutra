import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { emissionFactorService } from '@/services/emissionFactorService';
import { carbonCalculationService } from '@/services/carbonCalculationService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
    Calculator, Plus, Trash2, Download, Lock, ChevronDown,
    Flame, Zap, Globe, TrendingUp, Shield, HelpCircle, ArrowRight,
    LineChart, LayoutDashboard, Database, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(() => {
        const factors = emissionFactorService.getAll();
        setEmissionFactors(factors);

        // Initialize with one activity per scope if empty
        if (scope1Activities.length === 0) addActivity(1);
        if (scope2Activities.length === 0) addActivity(2);
        if (scope3Activities.length === 0) addActivity(3);
    }, []);

    const addActivity = (scope) => {
        const newActivity = {
            id: Date.now() + Math.random(),
            name: '',
            quantity: 0,
            emissionFactorId: '',
            emissionFactor: 0,
            unit: ''
        };

        if (scope === 1) setScope1Activities([...scope1Activities, newActivity]);
        else if (scope === 2) setScope2Activities([...scope2Activities, newActivity]);
        else if (scope === 3) setScope3Activities([...scope3Activities, newActivity]);
    };

    const removeActivity = (scope, id) => {
        if (scope === 1) setScope1Activities(scope1Activities.filter(a => a.id !== id));
        else if (scope === 2) setScope2Activities(scope2Activities.filter(a => a.id !== id));
        else if (scope === 3) setScope3Activities(scope3Activities.filter(a => a.id !== id));
    };

    const updateActivity = (scope, id, field, value) => {
        const updateFn = (activities) => activities.map(a => {
            if (a.id === id) {
                const updated = { ...a, [field]: value };
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

        if (scope === 1) setScope1Activities(updateFn(scope1Activities));
        else if (scope === 2) setScope2Activities(updateFn(scope2Activities));
        else if (scope === 3) setScope3Activities(updateFn(scope3Activities));
    };

    const calculateFootprint = () => {
        setIsCalculating(true);
        setTimeout(() => {
            const data = {
                scope1: scope1Activities.filter(a => a.quantity > 0 && a.emissionFactor > 0),
                scope2: scope2Activities.filter(a => a.quantity > 0 && a.emissionFactor > 0),
                scope3: scope3Activities.filter(a => a.quantity > 0 && a.emissionFactor > 0)
            };

            const calculationResult = carbonCalculationService.calculateFootprint(data);
            setResult(calculationResult);
            setIsCalculating(false);

            if (isAuthenticated && user) {
                carbonCalculationService.saveCalculation(user.email, data, {
                    organizationName,
                    reportingPeriod
                });
            }
            toast({ title: "Calculations Refined", description: "Audit-ready results are now available." });
        }, 800);
    };

    const handleDownloadReport = () => {
        if (!isAuthenticated) {
            toast({
                title: "Authentication Required",
                description: "Institutional reporting requires an authorized session.",
                variant: "destructive"
            });
            return;
        }
        setShowPaymentModal(true);
    };

    const renderActivityForm = (scope, activities) => {
        const factors = emissionFactors.filter(f => f.scope === scope);

        return (
            <div className="space-y-4">
                <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold text-gold/60 uppercase tracking-widest border-b border-white/5">
                    <div className="col-span-3 flex items-center gap-2"><LayoutDashboard size={12} /> Source Description</div>
                    <div className="col-span-4 flex items-center gap-2"><Database size={12} /> Emission Factor</div>
                    <div className="col-span-4 flex items-center gap-2"><TrendingUp size={12} /> Quantity</div>
                    <div className="col-span-1"></div>
                </div>

                <AnimatePresence>
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors rounded-2xl p-4 lg:p-6 border border-white/5"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                                <div className="lg:col-span-3">
                                    <label className="lg:hidden block text-xs font-bold text-gold/60 uppercase mb-2">Description</label>
                                    <input
                                        type="text"
                                        value={activity.name}
                                        onChange={(e) => updateActivity(scope, activity.id, 'name', e.target.value)}
                                        placeholder="e.g. Facility Grid Electricity"
                                        className="w-full h-12 px-4 bg-navy/50 border border-white/10 rounded-xl text-offwhite focus:border-gold outline-none transition-all"
                                    />
                                </div>
                                <div className="lg:col-span-4">
                                    <label className="lg:hidden block text-xs font-bold text-gold/60 uppercase mb-2">Standard Factor</label>
                                    <select
                                        value={activity.emissionFactorId}
                                        onChange={(e) => updateActivity(scope, activity.id, 'emissionFactorId', e.target.value)}
                                        className="w-full h-12 px-4 bg-navy/50 border border-white/10 rounded-xl text-offwhite focus:border-gold outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select standard factor...</option>
                                        {factors.map(f => (
                                            <option key={f.id} value={f.id}>{f.name} ({f.unit})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="lg:col-span-4">
                                    <label className="lg:hidden block text-xs font-bold text-gold/60 uppercase mb-2">Activity Value</label>
                                    <div className="flex items-center gap-2 bg-navy/50 border border-white/20 rounded-xl px-4 focus-within:border-gold transition-all overflow-hidden">
                                        <input
                                            type="number"
                                            value={activity.quantity}
                                            onChange={(e) => updateActivity(scope, activity.id, 'quantity', parseFloat(e.target.value) || 0)}
                                            placeholder="0.00"
                                            className="flex-1 min-w-0 h-12 bg-transparent text-white outline-none placeholder:text-white/20 font-bold"
                                        />
                                        <div
                                            title={activity.unit}
                                            className="shrink-0 text-[10px] text-gold font-bold uppercase tracking-tighter border-l border-white/10 pl-3 py-1 truncate max-w-[90px]"
                                        >
                                            {activity.unit || 'units'}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-1 flex justify-end">
                                    <button
                                        onClick={() => removeActivity(scope, activity.id)}
                                        className="w-12 h-12 flex items-center justify-center text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <Button
                    onClick={() => addActivity(scope)}
                    variant="outline"
                    className="w-full h-16 border-dashed border-2 border-white/10 hover:border-gold/30 hover:bg-white/5 rounded-2xl group transition-all"
                >
                    <Plus size={20} className="mr-2 group-hover:scale-125 transition-transform" /> Add New Dataset Entry
                </Button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-navy text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>GHG Audit Engine | SustainSutra</title>
            </Helmet>

            <div className="pt-32 pb-24 container mx-auto px-4 max-w-7xl">
                {/* Product Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full mb-6 text-gold font-bold text-[10px] uppercase tracking-widest">
                            <Shield size={12} /> Audit-Ready Engine v2.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">
                            GHG <span className="text-gold italic">Audit</span> Tool
                        </h1>
                        <p className="text-xl text-dimmed font-light leading-relaxed">
                            A high-precision quantification engine designed for ISO 14064-1 compliance. Calculate Scope 1, 2, and 3 emissions with proprietary validation logic.
                        </p>
                    </div>
                    {isAuthenticated && (
                        <div className="glassmorphism p-6 rounded-3xl border-white/5 flex items-center gap-6">
                            <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20">
                                <Shield size={28} />
                            </div>
                            <div>
                                <div className="text-xs text-dimmed mb-1 uppercase tracking-tighter">Authenticated Auditor</div>
                                <div className="text-white font-bold">{user.email}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Tool Grid */}
                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* 1. Context */}
                        <section className="bg-white/[0.02] p-8 lg:p-12 rounded-[40px] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
                            <h2 className="text-2xl font-playfair text-white mb-10 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-gold text-navy flex items-center justify-center text-xs font-bold">01</span>
                                Contextual Metadata
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-offwhite mb-2 block uppercase tracking-wide">Institutional Legal Name</label>
                                    <input
                                        type="text"
                                        value={organizationName}
                                        onChange={(e) => setOrganizationName(e.target.value)}
                                        placeholder="Organization Trading Name"
                                        className="w-full h-14 px-6 bg-navy/80 border border-white/10 rounded-2xl text-offwhite focus:border-gold outline-none transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-offwhite mb-2 block uppercase tracking-wide">Audit Reporting Period</label>
                                    <input
                                        type="text"
                                        value={reportingPeriod}
                                        onChange={(e) => setReportingPeriod(e.target.value)}
                                        placeholder="e.g. FY 2024-25"
                                        className="w-full h-14 px-6 bg-navy/80 border border-white/10 rounded-2xl text-offwhite focus:border-gold outline-none transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 2. Calculation Matrix */}
                        <section className="bg-white/[0.02] p-8 lg:p-12 rounded-[40px] border border-white/5">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                                <h2 className="text-2xl font-playfair text-white flex items-center gap-4">
                                    <span className="w-8 h-8 rounded-full bg-gold text-navy flex items-center justify-center text-xs font-bold">02</span>
                                    Emission Matrix
                                </h2>

                                <div className="flex p-1 bg-navy/80 rounded-2xl border border-white/10">
                                    {[1, 2, 3].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setActiveScope(s)}
                                            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeScope === s ? 'bg-gold text-navy shadow-lg' : 'text-dimmed hover:text-white'}`}
                                        >
                                            Scope {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="min-h-[400px]">
                                {activeScope === 1 && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4">
                                        <div className="flex items-center gap-4 mb-8 p-4 bg-orange-400/5 border-l-4 border-orange-400 rounded-r-xl">
                                            <Flame size={20} className="text-orange-400" />
                                            <p className="text-sm text-dimmed"><strong className="text-offwhite">Direct Controls:</strong> Fugitive gases, fuel combustion, and owned mobile assets.</p>
                                        </div>
                                        {renderActivityForm(1, scope1Activities)}
                                    </div>
                                )}
                                {activeScope === 2 && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4">
                                        <div className="flex items-center gap-4 mb-8 p-4 bg-yellow-400/5 border-l-4 border-yellow-400 rounded-r-xl">
                                            <Zap size={20} className="text-yellow-400" />
                                            <p className="text-sm text-dimmed"><strong className="text-offwhite">Energy Purchase:</strong> Imported electricity, cooling, and steam consumption.</p>
                                        </div>
                                        {renderActivityForm(2, scope2Activities)}
                                    </div>
                                )}
                                {activeScope === 3 && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4">
                                        <div className="flex items-center gap-4 mb-8 p-4 bg-blue-400/5 border-l-4 border-blue-400 rounded-r-xl">
                                            <Globe size={20} className="text-blue-400" />
                                            <p className="text-sm text-dimmed"><strong className="text-offwhite">Value Chain:</strong> Upstream and downstream logistics, waste, and employee travel.</p>
                                        </div>
                                        {renderActivityForm(3, scope3Activities)}
                                    </div>
                                )}
                            </div>

                            <div className="mt-12 flex flex-col items-center">
                                <Button
                                    onClick={calculateFootprint}
                                    disabled={isCalculating}
                                    className="w-full h-16 text-xl rounded-2xl group relative overflow-hidden"
                                >
                                    <span className={`flex items-center gap-3 transition-opacity ${isCalculating ? 'opacity-0' : 'opacity-100'}`}>
                                        <Calculator className="group-hover:rotate-12 transition-transform" />
                                        Execute Audit Calculation
                                    </span>
                                    {isCalculating && (
                                        <div className="absolute inset-0 flex items-center justify-center font-bold tracking-widest text-navy bg-gold animate-pulse">
                                            VALIDATING DATA NODES...
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </section>
                    </div>

                    {/* Dashboard/Results Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-10">
                            {/* Visual Result Dashboard */}
                            <section className="bg-white/5 glassmorphism p-10 rounded-[40px] text-center relative border-gold/10">
                                {result ? (
                                    <div className="animate-in zoom-in-95">
                                        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-[8px] uppercase tracking-[0.2em]">Live Intelligence Output</div>
                                        <h3 className="text-sm font-bold text-dimmed uppercase mt-2">Aggregated Impact</h3>
                                        <div className="text-5xl md:text-7xl font-playfair text-gold mt-4 mb-2 drop-shadow-lg">
                                            {carbonCalculationService.formatEmissions(result.total).split(' ')[0]}
                                        </div>
                                        <div className="text-lg font-bold text-white mb-10">tCO₂e <span className="text-xs text-dimmed font-medium">TOTAL</span></div>

                                        {/* Percentage Breakdown (Registered Only) */}
                                        {isAuthenticated ? (
                                            <div className="space-y-6">
                                                {[
                                                    { label: "Scope 1", val: result.scope1, color: "bg-orange-400", icon: <Flame size={12} /> },
                                                    { label: "Scope 2", val: result.scope2, color: "bg-yellow-400", icon: <Zap size={12} /> },
                                                    { label: "Scope 3", val: result.scope3, color: "bg-blue-400", icon: <Globe size={12} /> }
                                                ].map((s, idx) => (
                                                    <div key={idx} className="group cursor-default">
                                                        <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                                                            <span className="flex items-center gap-2 text-offwhite">{s.icon} {s.label}</span>
                                                            <span className="text-gold">
                                                                {result.total > 0 ? ((s.val / result.total) * 100).toFixed(1) : "0.0"}%
                                                            </span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(s.val / result.total) * 100}%` }}
                                                                className={`h-full ${s.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}

                                                <Button
                                                    onClick={handleDownloadReport}
                                                    variant="outline"
                                                    className="w-full mt-10 h-14 border-gold/20 hover:border-gold hover:text-gold"
                                                >
                                                    <Download size={18} className="mr-3" /> Get Full Report
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="p-8 bg-black/40 rounded-3xl border border-white/10">
                                                <Lock className="text-gold mx-auto mb-4" size={32} />
                                                <h4 className="text-white font-bold mb-4">Detailed Analytics Locked</h4>
                                                <p className="text-xs text-dimmed leading-relaxed mb-6">Upgrade to an authorized account to unlock scope-wise data visualization and PDF report generation.</p>
                                                <Button onClick={() => navigate('/login')} className="w-full">Sign In to Unlock</Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-20 flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center animate-pulse mb-8">
                                            <LineChart size={32} className="text-dimmed" />
                                        </div>
                                        <p className="text-xs font-bold text-dimmed uppercase tracking-widest leading-loose">Awaiting Input Data Stream <br /> to Generate Intelligence</p>
                                    </div>
                                )}
                            </section>

                            {/* Help Box */}
                            <section className="p-10 border border-white/5 rounded-[40px] bg-white/[0.01]">
                                <h4 className="flex items-center gap-3 text-white font-medium mb-6">
                                    <Info className="text-gold" size={20} /> Methodology Note
                                </h4>
                                <p className="text-sm text-dimmed leading-relaxed">
                                    Our calculations are powered by the <span className="text-offwhite font-bold">GHG Protocol Corporate Standard</span> and updated with FY 2024 grid intensity factors. Results are intended for baseline establishment and are verified to a 95% confidence interval pending third-party audit.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Download Modal */}
            <AnimatePresence>
                {showPaymentModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-navy/95 backdrop-blur-2xl flex items-center justify-center z-[100] p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-navy border-2 border-white/5 rounded-[40px] p-12 max-w-xl w-full shadow-4xl text-center relative"
                        >
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="absolute top-8 right-8 text-dimmed hover:text-white"
                            >
                                <Plus className="rotate-45" size={24} />
                            </button>

                            <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center text-gold mx-auto mb-10 border border-gold/20 shadow-2xl">
                                <Shield size={32} />
                            </div>

                            <h3 className="text-3xl md:text-4xl font-playfair text-white mb-6">Certified Analysis Report</h3>
                            <p className="text-lg text-dimmed leading-relaxed mb-10">
                                Export a 22-page comprehensive decarbonization roadmap including materiality analysis, benchmark comparisons, and tCO₂e mitigation strategies.
                            </p>

                            <div className="bg-white/5 p-8 rounded-3xl mb-10 flex justify-between items-center text-left">
                                <div>
                                    <div className="text-xs font-bold text-gold uppercase tracking-widest mb-1">Standard Generation Fee</div>
                                    <div className="text-white text-sm font-medium">Verified by SustainSutra Advisors</div>
                                </div>
                                <div className="text-3xl font-playfair text-white">₹999</div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button
                                    className="w-full h-16 text-lg rounded-2xl shadow-xl shadow-gold/20"
                                    onClick={() => {
                                        toast({ title: "Redirecting...", description: "Connecting to secure payment gateway." });
                                        // Mocking the success flow here as per parent
                                        setTimeout(() => setShowPaymentModal(false), 2000);
                                    }}
                                >
                                    Purchase Authorized PDF Report
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setShowPaymentModal(false)}
                                    className="h-14 rounded-2xl"
                                >
                                    Cancel & Return
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarbonCalculatorPage;
