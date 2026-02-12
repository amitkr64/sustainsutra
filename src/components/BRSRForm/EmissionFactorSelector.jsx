import React, { useState, useMemo, useEffect } from 'react';
import { Search, Flame, Zap, Truck, Factory, Trash2, Info, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';
import { useEmissionFactors } from '../../hooks/useEmissionFactors';

/**
 * EmissionFactorSelector - A component for selecting and applying IPCC emission factors
 * 
 * Props:
 * - onSelect: (factor) => void - Callback when a factor is selected
 * - category: 'fuels' | 'electricity' | 'transport' | 'industrial' | 'waste' | null - Filter by category
 * - showCalculator: boolean - Show inline CO2e calculator
 */
const EmissionFactorSelector = ({ onSelect, category = null, showCalculator = false }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(category || 'fuels');
    const [selectedFactor, setSelectedFactor] = useState(null);
    const [quantity, setQuantity] = useState('');
    
    // Use emission factors from database
    const { factors, categories, loading, searchFactors, updateFilters } = useEmissionFactors({
        category: category || undefined
    });

    const categoryConfig = [
        { id: 'fuels', label: 'Fuels', icon: Flame, color: 'text-orange-400' },
        { id: 'electricity', label: 'Electricity', icon: Zap, color: 'text-yellow-400' },
        { id: 'transport', label: 'Transport', icon: Truck, color: 'text-blue-400' },
        { id: 'industrial', label: 'Industrial', icon: Factory, color: 'text-slate-400' },
        { id: 'waste', label: 'Waste', icon: Trash2, color: 'text-green-400' },
    ];

    // Group factors by category for display
    const groupedFactors = useMemo(() => {
        const results = {};
        const searchLower = searchQuery.toLowerCase();

        // Filter factors based on search query
        const filteredFactors = factors.filter(factor => {
            if (!searchQuery) return true;
            return (
                factor.name?.toLowerCase().includes(searchLower) ||
                factor.subcategory?.toLowerCase().includes(searchLower) ||
                factor.efId?.toLowerCase().includes(searchLower)
            );
        });

        // Group by category
        filteredFactors.forEach(factor => {
            const catId = factor.category;
            if (!results[catId]) {
                results[catId] = [];
            }
            results[catId].push(factor);
        });

        return results;
    }, [factors, searchQuery]);

    const handleSelect = (factor, categoryId) => {
        setSelectedFactor({ ...factor, category: categoryId });
        if (onSelect) {
            onSelect({ ...factor, category: categoryId });
        }
    };

    const calculatedEmissions = useMemo(() => {
        if (!selectedFactor || !quantity) return null;
        const qty = parseFloat(quantity);
        if (isNaN(qty)) return null;

        // Calculate CO2e based on factor value
        const co2e = (selectedFactor.value || 0) * qty;
        return {
            co2e,
            unit: selectedFactor.unit,
            factor: selectedFactor,
            activityValue: qty
        };
    }, [selectedFactor, quantity]);

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length >= 2) {
                searchFactors(searchQuery);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, searchFactors]);

    if (loading && factors.length === 0) {
        return (
            <div className="bg-navy-light/30 border border-white/10 rounded-2xl p-8 flex items-center justify-center">
                <Loader2 className="animate-spin text-gold" size={32} />
                <span className="ml-3 text-dimmed">Loading emission factors...</span>
            </div>
        );
    }

    return (
        <div className="bg-navy-light/30 border border-white/10 rounded-2xl p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <Info className="text-gold" size={20} />
                <h3 className="text-lg font-semibold text-white">IPCC Emission Factors</h3>
                <span className="ml-auto text-xs text-dimmed">{factors.length} factors loaded</span>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={18} />
                <input
                    type="text"
                    placeholder="Search emission factors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-navy/50 border border-white/10 rounded-lg text-white placeholder-dimmed focus:border-gold/50 focus:outline-none"
                />
            </div>

            {/* Category List */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
                {categoryConfig.map((cat) => {
                    const factorsInCategory = groupedFactors[cat.id];
                    if (!factorsInCategory || factorsInCategory.length === 0) return null;

                    const Icon = cat.icon;
                    const isExpanded = expandedCategory === cat.id;

                    return (
                        <div key={cat.id} className="border border-white/5 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                                className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className={cat.color} size={16} />
                                    <span className="font-medium text-white">{cat.label}</span>
                                    <span className="text-xs text-dimmed">({factorsInCategory.length})</span>
                                </div>
                                {isExpanded ? (
                                    <ChevronDown className="text-dimmed" size={16} />
                                ) : (
                                    <ChevronRight className="text-dimmed" size={16} />
                                )}
                            </button>

                            {isExpanded && (
                                <div className="border-t border-white/5 max-h-60 overflow-y-auto">
                                    {factorsInCategory.map((factor) => (
                                        <button
                                            key={factor._id}
                                            onClick={() => handleSelect(factor, cat.id)}
                                            className="w-full text-left p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-white truncate">
                                                        {factor.name}
                                                    </div>
                                                    <div className="text-xs text-dimmed mt-1">
                                                        {factor.subcategory && (
                                                            <span className="inline-block bg-white/5 px-2 py-0.5 rounded mr-2">
                                                                {factor.subcategory}
                                                            </span>
                                                        )}
                                                        <span className="font-mono">
                                                            {factor.value} {factor.unit}
                                                        </span>
                                                    </div>
                                                </div>
                                                {selectedFactor?._id === factor._id && (
                                                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {Object.keys(groupedFactors).length === 0 && (
                    <div className="text-center py-8 text-dimmed">
                        No emission factors found matching "{searchQuery}"
                    </div>
                )}
            </div>

            {/* Calculator */}
            {showCalculator && selectedFactor && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-2">CO2e Calculator</h4>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Enter quantity..."
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="flex-1 px-3 py-2 bg-navy/50 border border-white/10 rounded-lg text-white placeholder-dimmed focus:border-gold/50 focus:outline-none"
                        />
                        <span className="px-3 py-2 bg-white/5 rounded-lg text-dimmed text-sm">
                            {selectedFactor.unit}
                        </span>
                    </div>
                    {calculatedEmissions && (
                        <div className="mt-2 p-3 bg-gold/10 border border-gold/20 rounded-lg">
                            <div className="text-sm text-dimmed mb-1">Calculated Emissions:</div>
                            <div className="text-2xl font-bold text-gold">
                                {calculatedEmissions.co2e.toFixed(2)} kgCO2e
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const EmissionFactorQuickRef = ({ category = 'fuels' }) => {
    const { factors, loading } = useEmissionFactors({ category });
    
    if (loading) {
        return <div className="text-dimmed text-sm">Loading factors...</div>;
    }

    if (!factors || factors.length === 0) {
        return <div className="text-dimmed text-sm">No factors available</div>;
    }

    return (
        <div className="space-y-1">
            {factors.slice(0, 5).map((factor) => (
                <div key={factor._id} className="text-xs text-dimmed">
                    <span className="font-medium text-white">{factor.name}</span>: {factor.value} {factor.unit}
                </div>
            ))}
            {factors.length > 5 && (
                <div className="text-xs text-gold">+{factors.length - 5} more...</div>
            )}
        </div>
    );
};

export default EmissionFactorSelector;
export { EmissionFactorQuickRef };
