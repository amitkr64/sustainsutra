import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { createEntity } from '@/services/cctsEntityService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Building2, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';

const EntityRegistration = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        entityName: '',
        registrationNumber: '',
        sector: '',
        address: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
        },
        contactPerson: {
            name: '',
            email: '',
            phone: '',
            designation: ''
        },
        baselineData: {
            year: '2023-24',
            totalProduction: 0,
            totalGHGEmissions: 0,
            ghgIntensity: 0
        },
        targets: []
    });

    // Calculate initial baseline GHG intensity automatically
    const updateBaselineIntensity = (production, emissions) => {
        const prod = parseFloat(production) || 0;
        const emis = parseFloat(emissions) || 0;
        if (prod > 0) {
            setFormData(prev => ({
                ...prev,
                baselineData: {
                    ...prev.baselineData,
                    totalProduction: prod,
                    totalGHGEmissions: emis,
                    ghgIntensity: emis / prod
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                baselineData: {
                    ...prev.baselineData,
                    totalProduction: prod,
                    totalGHGEmissions: emis,
                    ghgIntensity: 0
                }
            }));
        }
    };

    const handleInputChange = (section, field, value) => {
        if (section) {
            if (section === 'baselineData' && (field === 'totalProduction' || field === 'totalGHGEmissions')) {
                const prod = field === 'totalProduction' ? value : formData.baselineData.totalProduction;
                const emis = field === 'totalGHGEmissions' ? value : formData.baselineData.totalGHGEmissions;
                updateBaselineIntensity(prod, emis);
            } else {
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: value
                    }
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const addTarget = () => {
        setFormData(prev => ({
            ...prev,
            targets: [
                ...prev.targets,
                { complianceYear: '2024-25', targetGEI: 0 }
            ]
        }));
    };

    const updateTarget = (index, field, value) => {
        const newTargets = [...formData.targets];
        newTargets[index] = {
            ...newTargets[index],
            [field]: field === 'targetGEI' ? parseFloat(value) : value
        };
        setFormData(prev => ({ ...prev, targets: newTargets }));
    };

    const removeTarget = (index) => {
        const newTargets = formData.targets.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, targets: newTargets }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createEntity(token, formData);
            toast({
                title: 'Success',
                description: 'Entity registered successfully',
            });
            navigate('/admin'); // Redirect to admin dashboard
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

    return (
        <>
            <Helmet>
                <title>Register Entity | CCTS Admin | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center mb-8">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/admin')}
                            className="mr-4 text-offwhite hover:text-gold"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-3xl font-bold text-gold">Register New Entity</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-8 space-y-8 shadow-4xl">

                        {/* 1. Basic Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 border-b border-gold/20 pb-2">
                                <Building2 className="w-5 h-5 text-gold" />
                                <h2 className="text-xl font-semibold text-offwhite">Entity Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Entity Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.entityName}
                                        onChange={e => handleInputChange(null, 'entityName', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                        placeholder="e.g. Acme Steel Ltd."
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Registration Number (CIN/GST) *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.registrationNumber}
                                        onChange={e => handleInputChange(null, 'registrationNumber', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Sector *</label>
                                    <select
                                        required
                                        value={formData.sector}
                                        onChange={e => handleInputChange(null, 'sector', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    >
                                        <option value="">Select Sector</option>
                                        <option value="Iron & Steel">Iron & Steel</option>
                                        <option value="Cement">Cement</option>
                                        <option value="Petrochemicals">Petrochemicals</option>
                                        <option value="Thermal Power">Thermal Power</option>
                                        <option value="Aluminum">Aluminum</option>
                                        <option value="Textile">Textile</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 2. Address */}
                        <div>
                            <h3 className="text-lg font-semibold text-offwhite mb-4">Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-offwhite/80 mb-1 text-sm">Street Address</label>
                                    <input
                                        type="text"
                                        value={formData.address.street}
                                        onChange={e => handleInputChange('address', 'street', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">City</label>
                                    <input
                                        type="text"
                                        value={formData.address.city}
                                        onChange={e => handleInputChange('address', 'city', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">State</label>
                                    <input
                                        type="text"
                                        value={formData.address.state}
                                        onChange={e => handleInputChange('address', 'state', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Pincode</label>
                                    <input
                                        type="text"
                                        value={formData.address.pincode}
                                        onChange={e => handleInputChange('address', 'pincode', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Contact Person */}
                        <div>
                            <h3 className="text-lg font-semibold text-offwhite mb-4">Contact Person</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.contactPerson.name}
                                        onChange={e => handleInputChange('contactPerson', 'name', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.contactPerson.email}
                                        onChange={e => handleInputChange('contactPerson', 'email', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Phone</label>
                                    <input
                                        type="text"
                                        value={formData.contactPerson.phone}
                                        onChange={e => handleInputChange('contactPerson', 'phone', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Designation</label>
                                    <input
                                        type="text"
                                        value={formData.contactPerson.designation}
                                        onChange={e => handleInputChange('contactPerson', 'designation', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 4. Baseline Data */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-semibold text-gold mb-4">Baseline Data (Reference Year)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Baseline Year</label>
                                    <select
                                        value={formData.baselineData.year}
                                        onChange={e => handleInputChange('baselineData', 'year', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite focus:border-gold outline-none"
                                    >
                                        <option value="2021-22">2021-22</option>
                                        <option value="2022-23">2022-23</option>
                                        <option value="2023-24">2023-24</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Production (tonnes)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.baselineData.totalProduction}
                                        onChange={e => handleInputChange('baselineData', 'totalProduction', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Emissions (tCO₂e)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.baselineData.totalGHGEmissions}
                                        onChange={e => handleInputChange('baselineData', 'totalGHGEmissions', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Calculated GEI</label>
                                    <div className="w-full bg-navy/50 border border-white/10 rounded-xl px-3 py-2 text-gold font-mono font-bold">
                                        {formData.baselineData.ghgIntensity.toFixed(4)}
                                    </div>
                                    <p className="text-xs text-offwhite/50 mt-1">tCO₂e / tonne product</p>
                                </div>
                            </div>
                        </div>

                        {/* 5. Targets */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-offwhite">Compliance Targets</h3>
                                <Button type="button" onClick={addTarget} size="sm" variant="outline" className="border-gold/50 text-gold">
                                    <Plus className="w-4 h-4 mr-2" /> Add Target Year
                                </Button>
                            </div>

                            {formData.targets.length === 0 ? (
                                <p className="text-offwhite/50 italic text-sm">No targets set yet. Add at least one target year.</p>
                            ) : (
                                <div className="space-y-3">
                                    {formData.targets.map((target, index) => (
                                        <div key={index} className="flex gap-4 items-end bg-mediumgray/30 p-4 rounded border border-white/5">
                                            <div className="flex-1">
                                                <label className="block text-offwhite/80 mb-1 text-xs">Compliance Year</label>
                                                <select
                                                    value={target.complianceYear}
                                                    onChange={e => updateTarget(index, 'complianceYear', e.target.value)}
                                                    className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite text-sm focus:border-gold outline-none"
                                                >
                                                    <option value="2024-25">2024-25</option>
                                                    <option value="2025-26">2025-26</option>
                                                    <option value="2026-27">2026-27</option>
                                                    <option value="2027-28">2027-28</option>
                                                    <option value="2028-29">2028-29</option>
                                                    <option value="2029-30">2029-30</option>
                                                </select>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-offwhite/80 mb-1 text-xs">Target GEI (tCO₂e/tonne)</label>
                                                <input
                                                    type="number"
                                                    step="0.0001"
                                                    value={target.targetGEI}
                                                    onChange={e => updateTarget(index, 'targetGEI', e.target.value)}
                                                    className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite text-sm focus:border-gold outline-none"
                                                />
                                            </div>
                                            <Button type="button" onClick={() => removeTarget(index)} size="icon" variant="ghost" className="text-red-400 hover:bg-red-950/30">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gold/20 flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/admin')} className="border-gold/30 text-offwhite hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-gold text-navy font-bold hover:bg-gold/90">
                                <Save className="w-4 h-4 mr-2" />
                                {loading ? 'Registering...' : 'Register Entity'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EntityRegistration;
