import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Flame, Zap, Truck, Factory, Trash2, Leaf, Cloud,
    ChevronRight, ChevronLeft, X, Calculator, Info, Database,
    RefreshCw, Globe, MapPin, ArrowRight, Check, Loader2,
    Snowflake, MoreHorizontal
} from 'lucide-react';
import { useEmissionFactors } from '../../hooks/useEmissionFactors';
import {
    CATEGORY_CONFIG,
    getCategoryConfig,
    getSubcategoryName,
    getGasConfig
} from '../../constants/emissionFactorCategories';

// Icon mapping for category icons
const iconMap = {
    flame: Flame,
    zap: Zap,
    truck: Truck,
    factory: Factory,
    'trash-2': Trash2,
    leaf: Leaf,
    snowflake: Snowflake,
    'more-horizontal': MoreHorizontal
};

/**
 * HierarchicalEmissionFactorSelector - Step-by-step navigation for emission factor selection
 *
 * Navigation: Category → Subcategory → Emission Factor
 */
const HierarchicalEmissionFactorSelector = ({
    onSelect,
    onCancel,
    showCalculator = true
}) => {
    // Navigation state
    const [step, setStep] = useState(1); // 1: Category, 2: Subcategory/Factor, 3: Calculator
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedFactor, setSelectedFactor] = useState(null);

    // Calculator state
    const [quantity, setQuantity] = useState('');

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Use emission factors from database
    const { factors, categories, loading, fetchFactors, updateFilters } = useEmissionFactors();

    // Get categories from database
    const availableCategories = useMemo(() => {
        if (!categories) return [];
        return categories.map(cat => ({
            id: cat._id,
            name: cat._id,
            subcategories: cat.subcategories || []
        }));
    }, [categories]);

    // Get subcategories/factors for selected category
    const categoryData = useMemo(() => {
        if (!selectedCategory) return [];
        
        // Filter factors by selected category
        const categoryFactors = factors.filter(f => f.category === selectedCategory);
        
        // Group by subcategory
        const subcategories = {};
        categoryFactors.forEach(factor => {
            const subcat = factor.subcategory || 'Other';
            if (!subcategories[subcat]) {
                subcategories[subcat] = [];
            }
            subcategories[subcat].push(factor);
        });
        
        return subcategories;
    }, [factors, selectedCategory]);

    // Filter factors by search
    const filteredFactors = useMemo(() => {
        if (!selectedCategory) return [];
        
        const categoryFactors = factors.filter(f => f.category === selectedCategory);
        
        if (!searchQuery) return categoryFactors;
        
        const query = searchQuery.toLowerCase();
        return categoryFactors.filter(factor =>
            factor.name?.toLowerCase().includes(query) ||
            factor.subcategory?.toLowerCase().includes(query) ||
            factor.efId?.toLowerCase().includes(query)
        );
    }, [factors, selectedCategory, searchQuery]);

    // Calculate emissions
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

    // Handlers
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        updateFilters({ category });
        setStep(2);
        setSearchQuery('');
    };

    const handleFactorSelect = (factor) => {
        setSelectedFactor(factor);
        setSelectedSubcategory(factor.subcategory);
        if (showCalculator) {
            setStep(3);
        } else {
            // Directly select
            if (onSelect) {
                onSelect({
                    ...factor,
                    calculatedEmissions: null
                });
            }
        }
    };

    const handleConfirm = () => {
        if (onSelect && selectedFactor) {
            onSelect({
                ...selectedFactor,
                calculatedEmissions
            });
        }
    };

    const handleBack = () => {
        if (step === 3) {
            setStep(2);
            setSelectedFactor(null);
            setQuantity('');
        } else if (step === 2) {
            setStep(1);
            setSelectedCategory(null);
            setSearchQuery('');
        }
    };

    const renderBreadcrumb = () => (
        <div className="flex items-center gap-2 mb-6 text-sm">
            <button
                onClick={() => { setStep(1); setSelectedCategory(null); }}
                className={`${step >= 1 ? 'text-gold' : 'text-dimmed'} hover:text-gold transition-colors`}
            >
                Categories
            </button>
            {selectedCategory && (
                <>
                    <ChevronRight className="text-dimmed" size={14} />
                    <button
                        onClick={() => { setStep(2); setSelectedFactor(null); }}
                        className={`${step >= 2 ? 'text-gold' : 'text-dimmed'} hover:text-gold transition-colors capitalize`}
                    >
                        {selectedCategory}
                    </button>
                </>
            )}
            {selectedFactor && step >= 3 && (
                <>
                    <ChevronRight className="text-dimmed" size={14} />
                    <span className="text-gold">Calculator</span>
                </>
            )}
        </div>
    );

    // Step 1: Category Selection
    if (step === 1) {
        return (
            <div className="bg-navy-light/30 border border-white/10 rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-white">Select Category</h3>
                        <p className="text-sm text-dimmed mt-1">Choose the emission source category</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-dimmed hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={18} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-white placeholder-dimmed focus:border-gold/50 focus:outline-none"
                    />
                </div>

                {/* Category Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="animate-spin text-gold" size={32} />
                        <span className="ml-3 text-dimmed">Loading categories...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(CATEGORY_CONFIG).map(([catId, config]) => {
                            const Icon = iconMap[config.icon] || MoreHorizontal;
                            const factorCount = factors.filter(f => f.category === catId).length;
                            
                            return (
                                <motion.button
                                    key={catId}
                                    onClick={() => handleCategorySelect(catId)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`${config.bgColor} ${config.borderColor} border rounded-xl p-6 text-left hover:border-gold/30 transition-all`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-3 rounded-lg ${config.bgColor}`}>
                                            <Icon className={config.color} size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white mb-1">{config.name}</h4>
                                            <p className="text-xs text-dimmed">{config.description}</p>
                                            <p className="text-xs text-gold mt-2">{factorCount} factors</p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    // Step 2: Subcategory/Factor Selection
    if (step === 2) {
        const catConfig = getCategoryConfig(selectedCategory);
        const iconMap = {
            flame: Flame,
            zap: Zap,
            truck: Truck,
            factory: Factory,
            'trash-2': Trash2,
            leaf: Leaf,
            snowflake: Snowflake,
            'more-horizontal': MoreHorizontal
        };
        const CategoryIcon = iconMap[catConfig.icon] || MoreHorizontal;
        
        return (
            <div className="bg-navy-light/30 border border-white/10 rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-white">Select {catConfig.name} Factor</h3>
                        <p className="text-sm text-dimmed mt-1">{catConfig.description}</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-dimmed hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Breadcrumb */}
                {renderBreadcrumb()}

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={18} />
                    <input
                        type="text"
                        placeholder="Search factors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-white placeholder-dimmed focus:border-gold/50 focus:outline-none"
                    />
                </div>

                {/* Subcategory List */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="animate-spin text-gold" size={32} />
                        <span className="ml-3 text-dimmed">Loading factors...</span>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {Object.entries(categoryData).map(([subcategory, factors]) => {
                            const subcategoryName = getSubcategoryName(selectedCategory, subcategory);
                            
                            return (
                                <div key={subcategory} className="border border-white/5 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => factors.length === 1 ? handleFactorSelect(factors[0]) : null}
                                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CategoryIcon className={catConfig.color} size={20} />
                                            <div className="text-left">
                                                <div className="font-medium text-white">{subcategoryName}</div>
                                                <div className="text-xs text-dimmed">{factors.length} factors</div>
                                            </div>
                                        </div>
                                        {factors.length === 1 ? (
                                            <ChevronRight className="text-dimmed" size={16} />
                                        ) : (
                                            <div className="w-4 h-4" />
                                        )}
                                    </button>

                                    {/* Individual factors for subcategories with multiple factors */}
                                    {factors.length > 1 && (
                                        <div className="border-t border-white/5 max-h-60 overflow-y-auto">
                                            {factors.map((factor) => (
                                                <button
                                                    key={factor._id}
                                                    onClick={() => handleFactorSelect(factor)}
                                                    className="w-full text-left p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-white truncate">
                                                                {factor.name}
                                                            </div>
                                                            <div className="text-xs text-dimmed mt-1 flex items-center gap-2">
                                                                <span className="font-mono">
                                                                    {factor.value} {factor.unit}
                                                                </span>
                                                                {factor.region && (
                                                                    <span className="bg-white/5 px-2 py-0.5 rounded">
                                                                        {factor.region}
                                                                    </span>
                                                                )}
                                                                {factor.gas && (
                                                                    <span className="bg-gold/20 px-2 py-0.5 rounded text-gold">
                                                                        {getGasConfig(factor.gas).formula}
                                                                    </span>
                                                                )}
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

                        {Object.keys(categoryData).length === 0 && (
                            <div className="text-center py-8 text-dimmed">
                                No emission factors found matching "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Step 3: Calculator
    if (step === 3) {
        return (
            <div className="bg-navy-light/30 border border-white/10 rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-white">Calculate Emissions</h3>
                        <p className="text-sm text-dimmed mt-1">Enter activity quantity to calculate CO2e</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-dimmed hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Breadcrumb */}
                {renderBreadcrumb()}

                {/* Selected Factor Info */}
                <div className="bg-navy/50 border border-white/10 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3 mb-3">
                        <Calculator className="text-gold" size={20} />
                        <div className="flex-1">
                            <h4 className="font-semibold text-white">{selectedFactor.name}</h4>
                            <div className="text-sm text-dimmed mt-1">
                                <span className="font-mono">{selectedFactor.value} {selectedFactor.unit}</span>
                                {selectedFactor.source && (
                                    <span className="ml-2">• {selectedFactor.source}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    {selectedFactor.description && (
                        <p className="text-xs text-dimmed">{selectedFactor.description}</p>
                    )}
                </div>

                {/* Calculator */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Activity Quantity
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Enter quantity..."
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="flex-1 px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-white placeholder-dimmed focus:border-gold/50 focus:outline-none"
                            />
                            <span className="px-4 py-3 bg-white/5 rounded-lg text-dimmed text-sm">
                                {selectedFactor.unit}
                            </span>
                        </div>
                    </div>

                    {calculatedEmissions && (
                        <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                            <div className="text-sm text-dimmed mb-2">Calculated Emissions:</div>
                            <div className="text-3xl font-bold text-gold">
                                {calculatedEmissions.co2e.toFixed(2)} kgCO2e
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleBack}
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="mr-2" size={18} />
                        Back
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!calculatedEmissions}
                        className="flex-1 px-4 py-3 bg-gold text-navy rounded-lg font-semibold hover:bg-gold/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Check className="mr-2" size={18} />
                        Confirm Selection
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default HierarchicalEmissionFactorSelector;
