import React, { useState, useEffect } from 'react';
import { emissionFactorService } from '@/services/emissionFactorService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit2, Upload, Search, Filter } from 'lucide-react';

const EmissionFactorManager = () => {
    const { toast } = useToast();
    const [factors, setFactors] = useState([]);
    const [filteredFactors, setFilteredFactors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [scopeFilter, setScopeFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
    const [editingFactor, setEditingFactor] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        scope: 1,
        category: '',
        unit: '',
        factor: 0,
        source: '',
        year: new Date().getFullYear()
    });

    useEffect(() => {
        loadFactors();
    }, []);

    useEffect(() => {
        filterFactors();
    }, [factors, searchQuery, scopeFilter]);

    const loadFactors = () => {
        const allFactors = emissionFactorService.getAll();
        setFactors(allFactors);
    };

    const filterFactors = () => {
        let filtered = factors;

        // Apply scope filter
        if (scopeFilter !== 'all') {
            filtered = filtered.filter(f => f.scope === parseInt(scopeFilter));
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(f =>
                f.name.toLowerCase().includes(query) ||
                f.category.toLowerCase().includes(query) ||
                f.source.toLowerCase().includes(query)
            );
        }

        setFilteredFactors(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingFactor) {
            emissionFactorService.update(editingFactor.id, formData);
            toast({ title: "Emission Factor Updated!" });
        } else {
            emissionFactorService.add(formData);
            toast({ title: "Emission Factor Added!" });
        }

        resetForm();
        loadFactors();
    };

    const handleEdit = (factor) => {
        setEditingFactor(factor);
        setFormData({
            name: factor.name,
            scope: factor.scope,
            category: factor.category,
            unit: factor.unit,
            factor: factor.factor,
            source: factor.source,
            year: factor.year
        });
        setShowAddModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this emission factor?')) {
            emissionFactorService.delete(id);
            toast({ title: "Emission Factor Deleted" });
            loadFactors();
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            scope: 1,
            category: '',
            unit: '',
            factor: 0,
            source: '',
            year: new Date().getFullYear()
        });
        setEditingFactor(null);
        setShowAddModal(false);
    };

    const handleBulkUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                if (Array.isArray(data)) {
                    const result = emissionFactorService.bulkUpload(data);
                    toast({
                        title: "Bulk Upload Successful!",
                        description: `${result.count} emission factors added.`
                    });
                    loadFactors();
                    setShowBulkUploadModal(false);
                } else {
                    toast({
                        title: "Invalid Format",
                        description: "File must contain an array of emission factors.",
                        variant: "destructive"
                    });
                }
            } catch (error) {
                toast({
                    title: "Upload Failed",
                    description: error.message,
                    variant: "destructive"
                });
            }
        };
        reader.readAsText(file);
    };

    const downloadTemplate = () => {
        const template = [
            {
                name: "Example Factor",
                scope: 1,
                category: "Stationary Combustion",
                unit: "kgCO2e/unit",
                factor: 2.5,
                source: "EPA 2023",
                year: 2023
            }
        ];

        const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'emission-factors-template.json';
        a.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-playfair text-offwhite">Emission Factor Management</h2>
                    <p className="text-dimmed text-sm">Manage emission factors for carbon calculations</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setShowBulkUploadModal(true)}
                        variant="outline"
                        className="border-gold/30 text-gold hover:bg-gold/10"
                    >
                        <Upload size={16} className="mr-2" />
                        Bulk Upload
                    </Button>
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="bg-gold text-navy hover:bg-gold/90"
                    >
                        <Plus size={16} className="mr-2" />
                        Add Factor
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="glassmorphism rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={18} />
                        <input
                            type="text"
                            placeholder="Search factors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-dimmed" />
                        <select
                            value={scopeFilter}
                            onChange={(e) => setScopeFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                        >
                            <option value="all">All Scopes</option>
                            <option value="1">Scope 1</option>
                            <option value="2">Scope 2</option>
                            <option value="3">Scope 3</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Factors Table */}
            <div className="glassmorphism rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Scope</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Category</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Factor</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Unit</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Source</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredFactors.map((factor) => (
                                <tr key={factor.id} className="hover:bg-white/5">
                                    <td className="px-4 py-3 text-sm text-offwhite">{factor.name}</td>
                                    <td className="px-4 py-3 text-sm text-offwhite">
                                        <span className={`px-2 py-1 rounded text-xs ${factor.scope === 1 ? 'bg-orange-500/20 text-orange-400' :
                                                factor.scope === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            Scope {factor.scope}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{factor.category}</td>
                                    <td className="px-4 py-3 text-sm text-offwhite font-mono">{factor.factor}</td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{factor.unit}</td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{factor.source} ({factor.year})</td>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(factor)}
                                                className="text-gold hover:text-gold/80"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(factor.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredFactors.length === 0 && (
                    <div className="text-center py-12 text-dimmed">
                        No emission factors found
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-navy border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-playfair text-offwhite mb-6">
                            {editingFactor ? 'Edit' : 'Add'} Emission Factor
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-dimmed mb-2">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-dimmed mb-2">Scope *</label>
                                    <select
                                        required
                                        value={formData.scope}
                                        onChange={(e) => setFormData({ ...formData, scope: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                    >
                                        <option value={1}>Scope 1</option>
                                        <option value={2}>Scope 2</option>
                                        <option value={3}>Scope 3</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-dimmed mb-2">Category *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., Stationary Combustion"
                                        className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-dimmed mb-2">Unit *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.unit}
                                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                        placeholder="e.g., kgCO2e/kWh"
                                        className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-dimmed mb-2">Emission Factor *</label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        required
                                        value={formData.factor}
                                        onChange={(e) => setFormData({ ...formData, factor: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-dimmed mb-2">Source *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        placeholder="e.g., EPA 2023"
                                        className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-dimmed mb-2">Year *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="bg-gold text-navy hover:bg-gold/90">
                                    {editingFactor ? 'Update' : 'Add'} Factor
                                </Button>
                                <Button type="button" onClick={resetForm} variant="outline">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Bulk Upload Modal */}
            {showBulkUploadModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-navy border border-white/10 rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-2xl font-playfair text-offwhite mb-4">Bulk Upload Emission Factors</h3>
                        <p className="text-dimmed mb-6">
                            Upload a JSON file containing an array of emission factors.
                        </p>

                        <div className="space-y-4">
                            <Button
                                onClick={downloadTemplate}
                                variant="outline"
                                className="w-full"
                            >
                                Download Template
                            </Button>

                            <div>
                                <label className="block text-sm text-dimmed mb-2">Select JSON File</label>
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleBulkUpload}
                                    className="w-full px-4 py-2 bg-navy border border-white/10 rounded text-offwhite"
                                />
                            </div>

                            <Button
                                onClick={() => setShowBulkUploadModal(false)}
                                variant="outline"
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmissionFactorManager;
