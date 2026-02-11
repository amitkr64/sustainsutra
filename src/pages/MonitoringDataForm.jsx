import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { createMonitoringData, updateMonitoringData, getMonitoringDataById, calculateEmissions } from '@/services/cctsMonitoringService';
import { getMyEntity } from '@/services/cctsEntityService';
import { getEmissionFactors } from '@/services/cctsEmissionFactorService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, ChevronRight, Save, Send, Plus, Trash2, Calculator, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const MonitoringDataForm = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [currentStep, setCurrentStep] = useState(1);
    const [entity, setEntity] = useState(null);
    const [emissionFactors, setEmissionFactors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [calculating, setCalculating] = useState(false);
    const [calculationResult, setCalculationResult] = useState(null);

    const [formData, setFormData] = useState({
        complianceYear: '2025-26',
        reportingPeriod: {
            startDate: '',
            endDate: ''
        },
        rawMaterials: [],
        fuelInputs: [],
        energyInputs: {
            electricityConsumed: 0,
            electricitySource: 'Grid',
            steamConsumed: 0,
            otherEnergy: []
        },
        productionData: {
            totalProduction: 0,
            productType: '',
            unit: 'tonne'
        },
        co2Captured: {
            captured: 0,
            stored: 0,
            utilized: 0
        },
        exclusions: {
            biomassUsed: 0,
            biomassFraction: 0,
            description: ''
        }
    });

    useEffect(() => {
        loadInitialData();
    }, [token, id]);

    const loadInitialData = async () => {
        try {
            setLoading(true);

            // Get entity
            const entityRes = await getMyEntity(token);
            setEntity(entityRes.data);

            // Get emission factors
            const factorsRes = await getEmissionFactors();
            setEmissionFactors(factorsRes.data);

            // If editing, load existing data
            if (id) {
                const dataRes = await getMonitoringDataById(token, id);
                setFormData(dataRes.data);
            }

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

    const handleInputChange = (section, field, value) => {
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const addRawMaterial = () => {
        setFormData(prev => ({
            ...prev,
            rawMaterials: [...prev.rawMaterials, {
                material: '',
                quantity: 0,
                unit: 'tonne',
                emissionFactor: 0,
                emissionFactorSource: '',
                scope: 'Scope 3'
            }]
        }));
    };

    const updateRawMaterial = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            rawMaterials: prev.rawMaterials.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeRawMaterial = (index) => {
        setFormData(prev => ({
            ...prev,
            rawMaterials: prev.rawMaterials.filter((_, i) => i !== index)
        }));
    };

    const addFuelInput = () => {
        setFormData(prev => ({
            ...prev,
            fuelInputs: [...prev.fuelInputs, {
                fuelType: '',
                quantity: 0,
                unit: 'tonne',
                ncv: 0,
                emissionFactor: 0,
                emissionFactorSource: '',
                scope: 'Scope 1'
            }]
        }));
    };

    const updateFuelInput = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            fuelInputs: prev.fuelInputs.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeFuelInput = (index) => {
        setFormData(prev => ({
            ...prev,
            fuelInputs: prev.fuelInputs.filter((_, i) => i !== index)
        }));
    };

    // Real-time calculation preview
    const previewCalculations = useMemo(() => {
        const scope1 = formData.fuelInputs.reduce((sum, fuel) => {
            if (!fuel.quantity || !fuel.emissionFactor) return sum;
            return sum + (fuel.quantity * fuel.emissionFactor);
        }, 0);

        // Scope 2: Electricity (grid emission factor ~0.82 tCO2/MWh for India)
        const gridEF = 0.82;
        const scope2 = (formData.energyInputs.electricityConsumed || 0) * gridEF;

        // Scope 3: Raw materials
        const scope3 = formData.rawMaterials.reduce((sum, material) => {
            if (!material.quantity || !material.emissionFactor) return sum;
            return sum + (material.quantity * material.emissionFactor);
        }, 0);

        // Deductions (biomass, CO2 captured)
        const biomassDeduction = (formData.exclusions.biomassUsed || 0) * (formData.exclusions.biomassFraction || 0);
        const ccsDeduction = formData.co2Captured?.stored || 0;

        const totalGHG = scope1 + scope2 + scope3 - biomassDeduction - ccsDeduction;
        const gei = formData.productionData.totalProduction > 0
            ? totalGHG / formData.productionData.totalProduction
            : 0;

        return {
            scope1: scope1.toFixed(2),
            scope2: scope2.toFixed(2),
            scope3: scope3.toFixed(2),
            totalGHG: totalGHG.toFixed(2),
            gei: gei.toFixed(4),
            deductions: (biomassDeduction + ccsDeduction).toFixed(2)
        };
    }, [formData]);

    // Validation utilities
    const validateNCV = (ncv, fuelType) => {
        if (!ncv || ncv <= 0) return { valid: false, message: 'NCV must be greater than 0' };

        // Typical NCV ranges (GJ/tonne)
        const ncvRanges = {
            'coal': { min: 15, max: 30 },
            'lignite': { min: 5, max: 15 },
            'natural gas': { min: 35, max: 55 },
            'diesel': { min: 35, max: 45 },
            'furnace oil': { min: 35, max: 45 },
            'pet coke': { min: 28, max: 35 }
        };

        const type = fuelType?.toLowerCase();
        for (const [key, range] of Object.entries(ncvRanges)) {
            if (type?.includes(key)) {
                if (ncv < range.min || ncv > range.max) {
                    return {
                        valid: false,
                        message: `NCV for ${fuelType} should be between ${range.min}-${range.max} GJ/tonne`
                    };
                }
                return { valid: true };
            }
        }

        return { valid: true }; // Unknown fuel type, accept any positive value
    };

    // Emission factors by category for dropdown
    const emissionFactorsByCategory = useMemo(() => {
        const grouped = {};
        emissionFactors.forEach(ef => {
            if (!grouped[ef.category]) {
                grouped[ef.category] = [];
            }
            grouped[ef.category].push(ef);
        });
        return grouped;
    }, [emissionFactors]);

    const handleCalculate = async () => {
        try {
            setCalculating(true);
            const result = await calculateEmissions(token, formData);
            setCalculationResult(result.data);
            toast({
                title: 'Success',
                description: 'Emissions calculated successfully',
            });
        } catch (error) {
            toast({
                title: 'Calculation Error',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setCalculating(false);
        }
    };

    const handleSaveDraft = async () => {
        try {
            const payload = {
                ...formData,
                entity: entity?._id || entity?.id,
                status: 'Draft'
            };

            if (id) {
                await updateMonitoringData(token, id, payload);
                toast({ title: 'Success', description: 'Draft saved' });
            } else {
                const res = await createMonitoringData(token, payload);
                navigate(`/ccts/monitoring-data/edit/${res.data._id}`);
                toast({ title: 'Success', description: 'Draft created' });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                entity: entity?._id || entity?.id,
                status: 'Submitted'
            };

            if (id) {
                await updateMonitoringData(token, id, payload);
            } else {
                await createMonitoringData(token, payload);
            }

            toast({
                title: 'Success',
                description: 'Monitoring data submitted for verification',
            });
            navigate('/ccts/monitoring-data');
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            });
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    if (loading) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <div className="text-gold text-xl">Loading form...</div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Monitoring Data Form | CCTS | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy py-20 px-4">
                <div className="container mx-auto max-w-5xl">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gold mb-2">
                            {id ? 'Edit' : 'Submit'} Monitoring Data
                        </h1>
                        <p className="text-offwhite/70">{entity?.entityName}</p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3, 4, 5].map(step => (
                            <div key={step} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep === step
                                    ? 'bg-gold text-darkgray'
                                    : currentStep > step
                                        ? 'bg-green-500 text-white'
                                        : 'bg-darkgray border-2 border-gold/30 text-offwhite/50'
                                    }`}>
                                    {step}
                                </div>
                                {step < 5 && (
                                    <div className={`w-16 h-1 ${currentStep > step ? 'bg-green-500' : 'bg-gold/30'}`}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Labels */}
                    <div className="flex justify-between mb-8 text-sm text-offwhite/70">
                        <span>Basic Info</span>
                        <span>Raw Materials</span>
                        <span>Fuel & Energy</span>
                        <span>Production</span>
                        <span>Review</span>
                    </div>

                    {/* Form Content */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">

                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gold mb-4">Basic Information</h2>

                                <div>
                                    <label className="block text-offwhite mb-2">Compliance Year *</label>
                                    <select
                                        value={formData.complianceYear}
                                        onChange={(e) => handleInputChange(null, 'complianceYear', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    >
                                        <option value="2024-25">2024-25</option>
                                        <option value="2025-26">2025-26</option>
                                        <option value="2026-27">2026-27</option>
                                        <option value="2027-28">2027-28</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-offwhite mb-2">Start Date *</label>
                                        <input
                                            type="date"
                                            value={formData.reportingPeriod.startDate}
                                            onChange={(e) => handleInputChange('reportingPeriod', 'startDate', e.target.value)}
                                            className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-offwhite focus:border-gold outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-offwhite mb-2">End Date *</label>
                                        <input
                                            type="date"
                                            value={formData.reportingPeriod.endDate}
                                            onChange={(e) => handleInputChange('reportingPeriod', 'endDate', e.target.value)}
                                            className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Raw Materials */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gold">Raw Materials (Scope 3)</h2>
                                    <Button onClick={addRawMaterial} className="bg-gold text-darkgray">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Material
                                    </Button>
                                </div>

                                {formData.rawMaterials.length === 0 ? (
                                    <p className="text-offwhite/60 text-center py-8">No raw materials added. Click "Add Material" to begin.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {formData.rawMaterials.map((material, index) => (
                                            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">Material Name</label>
                                                        <input
                                                            type="text"
                                                            value={material.material}
                                                            onChange={(e) => updateRawMaterial(index, 'material', e.target.value)}
                                                            placeholder="e.g., Iron Ore"
                                                            className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-offwhite focus:border-gold outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="block text-offwhite/70 text-sm mb-1">Quantity</label>
                                                            <input
                                                                type="number"
                                                                value={material.quantity}
                                                                onChange={(e) => updateRawMaterial(index, 'quantity', parseFloat(e.target.value))}
                                                                className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-offwhite/70 text-sm mb-1">Unit</label>
                                                            <select
                                                                value={material.unit}
                                                                onChange={(e) => updateRawMaterial(index, 'unit', e.target.value)}
                                                                className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                            >
                                                                <option value="tonne">tonne</option>
                                                                <option value="kg">kg</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">Emission Factor</label>
                                                        <input
                                                            type="number"
                                                            step="0.0001"
                                                            value={material.emissionFactor}
                                                            onChange={(e) => updateRawMaterial(index, 'emissionFactor', parseFloat(e.target.value))}
                                                            className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">Source</label>
                                                        <input
                                                            type="text"
                                                            value={material.emissionFactorSource}
                                                            onChange={(e) => updateRawMaterial(index, 'emissionFactorSource', e.target.value)}
                                                            placeholder="IPCC, Annexure IV"
                                                            className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                        />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <Button
                                                            onClick={() => removeRawMaterial(index)}
                                                            variant="destructive"
                                                            className="w-full"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Live Preview Panel - Step 2 */}
                                {formData.rawMaterials.length > 0 && (
                                    <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Calculator className="w-4 h-4 text-emerald-400" />
                                            <h4 className="text-sm font-semibold text-emerald-400">Live Emissions Preview (Scope 3)</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <p className="text-offwhite/60">Scope 3 Emissions</p>
                                                <p className="text-lg font-bold text-offwhite">{previewCalculations.scope3} tCO₂e</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/60">Total (All Scopes)</p>
                                                <p className="text-lg font-bold text-gold">{previewCalculations.totalGHG} tCO₂e</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 3: Fuel & Energy */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gold">Fuel & Energy Inputs</h2>
                                    <Button onClick={addFuelInput} className="bg-gold text-darkgray">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Fuel
                                    </Button>
                                </div>

                                {/* Fuel Inputs */}
                                <div className="space-y-4 mb-8">
                                    <h3 className="text-lg font-semibold text-offwhite">Fuel Inputs (Scope 1)</h3>
                                    {formData.fuelInputs.length === 0 ? (
                                        <p className="text-offwhite/60 text-center py-4">No fuels added.</p>
                                    ) : (
                                        formData.fuelInputs.map((fuel, index) => (
                                            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">Fuel Type</label>
                                                        <input
                                                            type="text"
                                                            value={fuel.fuelType}
                                                            onChange={(e) => updateFuelInput(index, 'fuelType', e.target.value)}
                                                            placeholder="e.g., Coal, Natural Gas"
                                                            className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">Quantity</label>
                                                        <input
                                                            type="number"
                                                            value={fuel.quantity}
                                                            onChange={(e) => updateFuelInput(index, 'quantity', parseFloat(e.target.value))}
                                                            className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">NCV (GJ/tonne)</label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={fuel.ncv}
                                                            onChange={(e) => updateFuelInput(index, 'ncv', parseFloat(e.target.value))}
                                                            className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">Emission Factor</label>
                                                        <input
                                                            type="number"
                                                            step="0.0001"
                                                            value={fuel.emissionFactor}
                                                            onChange={(e) => updateFuelInput(index, 'emissionFactor', parseFloat(e.target.value))}
                                                            className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-offwhite/70 text-sm mb-1">Source</label>
                                                        <input
                                                            type="text"
                                                            value={fuel.emissionFactorSource}
                                                            onChange={(e) => updateFuelInput(index, 'emissionFactorSource', e.target.value)}
                                                            className="w-full bg-darkgray border border-gold/30 rounded px-3 py-2 text-offwhite"
                                                        />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <Button
                                                            onClick={() => removeFuelInput(index)}
                                                            variant="destructive"
                                                            className="w-full"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Energy Inputs */}
                                <div>
                                    <h3 className="text-lg font-semibold text-offwhite mb-4">Electricity & Steam (Scope 2)</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-offwhite mb-2">Electricity Consumed (MWh)</label>
                                            <input
                                                type="number"
                                                value={formData.energyInputs.electricityConsumed}
                                                onChange={(e) => handleInputChange('energyInputs', 'electricityConsumed', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-offwhite mb-2">Electricity Source</label>
                                            <select
                                                value={formData.energyInputs.electricitySource}
                                                onChange={(e) => handleInputChange('energyInputs', 'electricitySource', e.target.value)}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            >
                                                <option value="Grid">Grid</option>
                                                <option value="Captive">Captive</option>
                                                <option value="Renewable">Renewable</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-offwhite mb-2">Steam Consumed (tonne)</label>
                                            <input
                                                type="number"
                                                value={formData.energyInputs.steamConsumed}
                                                onChange={(e) => handleInputChange('energyInputs', 'steamConsumed', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Live Preview Panel - Step 3 */}
                                {(formData.fuelInputs.length > 0 || formData.energyInputs.electricityConsumed > 0) && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Calculator className="w-4 h-4 text-emerald-400" />
                                            <h4 className="text-sm font-semibold text-emerald-400">Live Emissions Preview (Scope 1 & 2)</h4>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 text-sm">
                                            <div>
                                                <p className="text-offwhite/60">Scope 1 (Fuel)</p>
                                                <p className="text-lg font-bold text-offwhite">{previewCalculations.scope1} tCO₂e</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/60">Scope 2 (Electricity)</p>
                                                <p className="text-lg font-bold text-offwhite">{previewCalculations.scope2} tCO₂e</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/60">Total So Far</p>
                                                <p className="text-lg font-bold text-gold">{previewCalculations.totalGHG} tCO₂e</p>
                                            </div>
                                        </div>

                                        {/* NCV Validation Warnings */}
                                        {formData.fuelInputs.map((fuel, idx) => {
                                            const validation = validateNCV(fuel.ncv, fuel.fuelType);
                                            return !validation.valid && fuel.ncv > 0 ? (
                                                <div key={idx} className="mt-3 flex items-start gap-2 text-amber-400 text-xs">
                                                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <span>{fuel.fuelType}: {validation.message}</span>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Production & Exclusions */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gold mb-4">Production & Exclusions</h2>

                                {/* Production Data */}
                                <div>
                                    <h3 className="text-lg font-semibold text-offwhite mb-4">Production Data</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-offwhite mb-2">Total Production *</label>
                                            <input
                                                type="number"
                                                value={formData.productionData.totalProduction}
                                                onChange={(e) => handleInputChange('productionData', 'totalProduction', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-offwhite mb-2">Product Type</label>
                                            <input
                                                type="text"
                                                value={formData.productionData.productType}
                                                onChange={(e) => handleInputChange('productionData', 'productType', e.target.value)}
                                                placeholder="e.g., Steel, Cement"
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-offwhite mb-2">Unit</label>
                                            <select
                                                value={formData.productionData.unit}
                                                onChange={(e) => handleInputChange('productionData', 'unit', e.target.value)}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            >
                                                <option value="tonne">tonne</option>
                                                <option value="kg">kg</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* CO2 Captured */}
                                <div>
                                    <h3 className="text-lg font-semibold text-offwhite mb-4">CO₂ Captured (if applicable)</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-offwhite mb-2">Captured (tCO₂)</label>
                                            <input
                                                type="number"
                                                value={formData.co2Captured.captured}
                                                onChange={(e) => handleInputChange('co2Captured', 'captured', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-offwhite mb-2">Stored (tCO₂)</label>
                                            <input
                                                type="number"
                                                value={formData.co2Captured.stored}
                                                onChange={(e) => handleInputChange('co2Captured', 'stored', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-offwhite mb-2">Utilized (tCO₂)</label>
                                            <input
                                                type="number"
                                                value={formData.co2Captured.utilized}
                                                onChange={(e) => handleInputChange('co2Captured', 'utilized', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Exclusions */}
                                <div>
                                    <h3 className="text-lg font-semibold text-offwhite mb-4">Exclusions (Biomass)</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-offwhite mb-2">Biomass Used (tonne)</label>
                                            <input
                                                type="number"
                                                value={formData.exclusions.biomassUsed}
                                                onChange={(e) => handleInputChange('exclusions', 'biomassUsed', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-offwhite mb-2">Biomass Fraction</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.exclusions.biomassFraction}
                                                onChange={(e) => handleInputChange('exclusions', 'biomassFraction', parseFloat(e.target.value))}
                                                className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-offwhite mb-2">Description</label>
                                        <textarea
                                            value={formData.exclusions.description}
                                            onChange={(e) => handleInputChange('exclusions', 'description', e.target.value)}
                                            rows={3}
                                            className="w-full bg-mediumgray border border-gold/30 rounded px-4 py-2 text-offwhite"
                                            placeholder="Describe any exclusions or special circumstances..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Review & Submit */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gold mb-4">Review & Calculate</h2>

                                {/* Calculate Button */}
                                <Button
                                    onClick={handleCalculate}
                                    disabled={calculating}
                                    className="w-full bg-gold text-darkgray hover:bg-gold/90 font-semibold py-3"
                                >
                                    <Calculator className="w-5 h-5 mr-2" />
                                    {calculating ? 'Calculating...' : 'Calculate Emissions'}
                                </Button>

                                {/* Calculation Results */}
                                {calculationResult && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-green-400 mb-4">✓ Calculation Complete</h3>
                                        <div className="grid grid-cols-2 gap-4 text-offwhite">
                                            <div>
                                                <p className="text-offwhite/70 text-sm">Total GHG Emissions</p>
                                                <p className="text-2xl font-bold">{calculationResult.totalGHG.toFixed(2)} tCO₂e</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/70 text-sm">GHG Emission Intensity (GEI)</p>
                                                <p className="text-2xl font-bold">{calculationResult.gei.toFixed(4)} tCO₂e/tonne</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/70 text-sm">Scope 1 Emissions</p>
                                                <p className="text-lg font-semibold">{calculationResult.scope1.toFixed(2)} tCO₂e</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/70 text-sm">Scope 2 Emissions</p>
                                                <p className="text-lg font-semibold">{calculationResult.scope2.toFixed(2)} tCO₂e</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/70 text-sm">Scope 3 Emissions</p>
                                                <p className="text-lg font-semibold">{calculationResult.scope3.toFixed(2)} tCO₂e</p>
                                            </div>
                                            <div>
                                                <p className="text-offwhite/70 text-sm">Deductions</p>
                                                <p className="text-lg font-semibold">-{calculationResult.deductions.toFixed(2)} tCO₂e</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Summary */}
                                <div className="bg-mediumgray/30 rounded-lg p-4 text-sm text-offwhite/70">
                                    <p className="font-semibold mb-2">Data Summary:</p>
                                    <ul className="space-y-1">
                                        <li>• Compliance Year: {formData.complianceYear}</li>
                                        <li>• Raw Materials: {formData.rawMaterials.length} items</li>
                                        <li>• Fuel Inputs: {formData.fuelInputs.length} items</li>
                                        <li>• Total Production: {formData.productionData.totalProduction} {formData.productionData.unit}</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8">
                        <Button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            variant="outline"
                            className="border-gold/50 text-gold"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>

                        <div className="flex gap-4">
                            <Button
                                onClick={handleSaveDraft}
                                variant="outline"
                                className="border-gold/50 text-gold"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Draft
                            </Button>

                            {currentStep < 5 ? (
                                <Button
                                    onClick={nextStep}
                                    className="bg-gold text-darkgray"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!calculationResult}
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit for Verification
                                </Button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default MonitoringDataForm;
