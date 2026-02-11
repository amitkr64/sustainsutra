import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { createEntity } from '@/services/cctsEntityService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Building2, Save, ArrowLeft, Plus, Trash2, MapPin, User, Phone, Mail, Factory } from 'lucide-react';

const EntityRegistration = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        entityName: '',
        registrationNumber: '',
        sector: '',
        subSector: '',
        plantAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
        },
        contactDetails: {
            email: '',
            phone: '',
            website: ''
        },
        complianceOfficer: {
            name: '',
            email: '',
            phone: '',
            designation: ''
        },
        baselineYear: '2023-24',
        baselineProduction: 0,
        baselineProductionUnit: 'tonnes',
        baselineGHGIntensity: 0,
        targets: []
    });

    // Registration number format: ALMOE014MH, REFOE001MP
    const validateRegistrationNumber = (value) => {
        // Relaxed format: 3 letters + OE + 3 digits + 2 letters
        const regex = /^[A-Z]{3}OE\d{3}[A-Z]{2}$/;
        return regex.test(value.toUpperCase());
    };

    const formatRegistrationNumber = (value) => {
        return value.toUpperCase();
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

    const addTarget = () => {
        setFormData(prev => ({
            ...prev,
            targets: [
                ...prev.targets,
                { complianceYear: '2024-25', targetGEI: 0, reductionPercentage: 0 }
            ]
        }));
    };

    const updateTarget = (index, field, value) => {
        const newTargets = [...formData.targets];
        newTargets[index] = {
            ...newTargets[index],
            [field]: field === 'targetGEI' || field === 'reductionPercentage' ? parseFloat(value) || 0 : value
        };
        // Auto-calculate reduction percentage
        if (field === 'targetGEI') {
            const baseline = formData.baselineGHGIntensity || 0;
            if (baseline > 0) {
                newTargets[index].reductionPercentage = ((baseline - value) / baseline * 100).toFixed(2);
            }
        }
        setFormData(prev => ({ ...prev, targets: newTargets }));
    };

    const removeTarget = (index) => {
        const newTargets = formData.targets.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, targets: newTargets }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate registration number format
        if (!validateRegistrationNumber(formData.registrationNumber)) {
            toast({
                title: 'Validation Error',
                description: 'Registration number must be in format: ABCOE123XY (3 letters + OE + 3 digits + 2 letters)',
                variant: 'destructive'
            });
            return;
        }

        try {
            setLoading(true);
            await createEntity(token, formData);
            toast({
                title: 'Success',
                description: 'Entity registered successfully',
            });
            navigate('/admin');
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

    const sectors = [
        'Aluminium',
        'Cement',
        'Copper',
        'Fertilizer',
        'Iron & Steel',
        'Petroleum Refinery',
        'Pulp & Paper',
        'Textile',
        'Thermal Power Plant',
        'Petrochemical'
    ];

    return (
        <>
            <Helmet>
                <title>Register Entity | CCTS Admin | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy py-20 px-4">
                <div className="container mx-auto max-w-5xl">
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
                                    <label className="block text-offwhite/80 mb-1 text-sm">Registration Number (CIN format) *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.registrationNumber}
                                        onChange={e => handleInputChange(null, 'registrationNumber', formatRegistrationNumber(e.target.value))}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite uppercase focus:border-gold outline-none"
                                        placeholder="e.g. ALMOE014MH"
                                    />
                                    <p className="text-xs text-offwhite/50 mt-1">Format: 3 letters + OE + 3 digits + 2 letters (e.g., ALMOE014MH)</p>
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
                                        {sectors.map(sector => (
                                            <option key={sector} value={sector}>{sector}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Sub-Sector *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subSector}
                                        onChange={e => handleInputChange(null, 'subSector', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                        placeholder="e.g. Secondary Aluminium, Integrated Steel Plant"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Plant Address */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 border-b border-gold/20 pb-2">
                                <MapPin className="w-5 h-5 text-gold" />
                                <h2 className="text-xl font-semibold text-offwhite">Plant Address</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-offwhite/80 mb-1 text-sm">Address Line 1 *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.plantAddress.addressLine1}
                                        onChange={e => handleInputChange('plantAddress', 'addressLine1', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-offwhite/80 mb-1 text-sm">Address Line 2</label>
                                    <input
                                        type="text"
                                        value={formData.plantAddress.addressLine2}
                                        onChange={e => handleInputChange('plantAddress', 'addressLine2', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">City *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.plantAddress.city}
                                        onChange={e => handleInputChange('plantAddress', 'city', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">State *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.plantAddress.state}
                                        onChange={e => handleInputChange('plantAddress', 'state', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Pincode *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.plantAddress.pincode}
                                        onChange={e => handleInputChange('plantAddress', 'pincode', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Country</label>
                                    <input
                                        type="text"
                                        value={formData.plantAddress.country}
                                        onChange={e => handleInputChange('plantAddress', 'country', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Contact Details */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 border-b border-gold/20 pb-2">
                                <Phone className="w-5 h-5 text-gold" />
                                <h2 className="text-xl font-semibold text-offwhite">Contact Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Email</label>
                                    <input
                                        type="email"
                                        value={formData.contactDetails.email}
                                        onChange={e => handleInputChange('contactDetails', 'email', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Phone</label>
                                    <input
                                        type="text"
                                        value={formData.contactDetails.phone}
                                        onChange={e => handleInputChange('contactDetails', 'phone', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Website</label>
                                    <input
                                        type="url"
                                        value={formData.contactDetails.website}
                                        onChange={e => handleInputChange('contactDetails', 'website', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                        placeholder="https://"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 4. Compliance Officer */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 border-b border-gold/20 pb-2">
                                <User className="w-5 h-5 text-gold" />
                                <h2 className="text-xl font-semibold text-offwhite">Compliance Officer</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.complianceOfficer.name}
                                        onChange={e => handleInputChange('complianceOfficer', 'name', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.complianceOfficer.email}
                                        onChange={e => handleInputChange('complianceOfficer', 'email', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Phone *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.complianceOfficer.phone}
                                        onChange={e => handleInputChange('complianceOfficer', 'phone', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Designation *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.complianceOfficer.designation}
                                        onChange={e => handleInputChange('complianceOfficer', 'designation', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-4 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 5. Baseline Data */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-2 mb-4 border-b border-gold/20 pb-2">
                                <Factory className="w-5 h-5 text-gold" />
                                <h2 className="text-xl font-semibold text-gold">Baseline Data</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Baseline Year *</label>
                                    <select
                                        value={formData.baselineYear}
                                        onChange={e => handleInputChange(null, 'baselineYear', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite focus:border-gold outline-none"
                                    >
                                        <option value="2021-22">2021-22</option>
                                        <option value="2022-23">2022-23</option>
                                        <option value="2023-24">2023-24</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Baseline Production *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        required
                                        value={formData.baselineProduction}
                                        onChange={e => handleInputChange(null, 'baselineProduction', parseFloat(e.target.value))}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Unit</label>
                                    <select
                                        value={formData.baselineProductionUnit}
                                        onChange={e => handleInputChange(null, 'baselineProductionUnit', e.target.value)}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite focus:border-gold outline-none"
                                    >
                                        <option value="tonnes">tonnes</option>
                                        <option value="kg">kg</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-offwhite/80 mb-1 text-sm">Baseline GEI *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.0001"
                                        required
                                        value={formData.baselineGHGIntensity}
                                        onChange={e => handleInputChange(null, 'baselineGHGIntensity', parseFloat(e.target.value))}
                                        className="w-full bg-navy border border-white/10 rounded-xl px-3 py-2 text-offwhite focus:border-gold outline-none"
                                    />
                                    <p className="text-xs text-offwhite/50 mt-1">tCO₂e / {formData.baselineProductionUnit}</p>
                                </div>
                            </div>
                        </div>

                        {/* 6. Targets */}
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
                                            <div className="flex-1">
                                                <label className="block text-offwhite/80 mb-1 text-xs">Reduction %</label>
                                                <div className="w-full bg-navy/50 border border-white/10 rounded-xl px-3 py-2 text-emerald-400 font-mono text-sm">
                                                    {target.reductionPercentage}%
                                                </div>
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
