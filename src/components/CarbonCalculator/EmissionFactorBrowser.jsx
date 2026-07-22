import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Flame, Zap, Truck, Factory, Trash2, Leaf, Cloud,
    ChevronDown, ChevronRight, X, Calculator, Info, Database,
    RefreshCw, Globe, MapPin, Tag
} from 'lucide-react';
import { useEmissionFactors, useEmissionCalculator } from '../../hooks/useEmissionFactors';

const categoryIcons = {
    fuels: Flame,
    electricity: Zap,
    transport: Truck,
    industrial: Factory,
    waste: Trash2,
    agriculture: Leaf,
    refrigerants: Cloud,
    other: Globe
};

const categoryColors = {
    fuels: 'text-orange-400',
    electricity: 'text-yellow-400',
    transport: 'text-blue-400',
    industrial: 'text-slate-400',
    waste: 'text-green-400',
    agriculture: 'text-lime-400',
    refrigerants: 'text-cyan-400',
    other: 'text-purple-400'
};

/**
 * EmissionFactorBrowser - Full-featured component for browsing and selecting emission factors
 */
const EmissionFactorBrowser = ({
    onSelect,
    initialCategory = null,
    showCalculator = true,
    compact = false
}) => {
    const {
        factors,
        categories,
        stats,
        loading,
        error,
        pagination,
        filters,
        searchFactors,
        updateFilters,
        resetFilters,
        nextPage,
        prevPage
    } = useEmissionFactors(initialCategory ? { category: initialCategory } : {});

    const calculator = useEmissionCalculator();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFactor, setSelectedFactor] = useState(null);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length >= 2) {
                searchFactors(searchQuery);
            } else if (searchQuery.length === 0) {
                searchFactors('');
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, searchFactors]);

    const handleSelectFactor = useCallback((factor) => {
        setSelectedFactor(factor);
        calculator.setSelectedFactor(factor);
        if (onSelect) {
            onSelect(factor);
        }
    }, [onSelect, calculator]);

    const CategoryIcon = ({ category }) => {
        const Icon = categoryIcons[category] || Globe;
        const color = categoryColors[category] || 'text-gray-400';
        return <Icon className={color} size={18} />;
    };

    return (
        <div className={`bg-navy-light/30 border border-white/10 rounded-2xl ${compact ? 'p-4' : 'p-6'}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Database className="text-gold" size={24} />
                    <div>
                        <h3 className="text-lg font-semibold text-white">Emission Factor Database</h3>
                        {stats && (
                            <p className="text-xs text-dimmed">{stats.total?.toLocaleString()} factors available</p>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-navy/50 rounded-lg text-sm text-dimmed hover:text-white transition-colors"
                >
                    <Filter size={16} />
                    Filters
                    {Object.values(filters).filter(Boolean).length > 0 && (
                        <span className="w-5 h-5 rounded-full bg-gold text-navy text-xs flex items-center justify-center font-bold">
                            {Object.values(filters).filter(Boolean).length}
                        </span>
                    )}
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={18} />
                <input
                    type="text"
                    placeholder="Search emission factors (e.g., 'diesel', 'grid electricity', 'cement')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-navy/50 border border-white/10 rounded-xl text-white placeholder-dimmed focus:border-gold/50 focus:outline-none"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dimmed hover:text-white"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-4"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-navy/30 rounded-xl border border-white/5">
                            {/* Category Filter */}
                            <div>
                                <label className="text-xs text-dimmed block mb-1">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => updateFilters({ category: e.target.value, subcategory: '' })}
                                    className="w-full px-3 py-2 bg-navy border border-white/10 rounded-lg text-white text-sm focus:border-gold/50 focus:outline-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories?.categories?.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)} ({cat.total})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subcategory Filter */}
                            <div>
                                <label className="text-xs text-dimmed block mb-1">Subcategory</label>
                                <select
                                    value={filters.subcategory}
                                    onChange={(e) => updateFilters({ subcategory: e.target.value })}
                                    className="w-full px-3 py-2 bg-navy border border-white/10 rounded-lg text-white text-sm focus:border-gold/50 focus:outline-none"
                                    disabled={!filters.category}
                                >
                                    <option value="">All Subcategories</option>
                                    {categories?.categories?.find(c => c._id === filters.category)?.subcategories?.map((sub) => (
                                        <option key={sub.name} value={sub.name}>
                                            {sub.name?.replace(/_/g, ' ')} ({sub.count})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Gas Filter */}
                            <div>
                                <label className="text-xs text-dimmed block mb-1">Gas Type</label>
                                <select
                                    value={filters.gas}
                                    onChange={(e) => updateFilters({ gas: e.target.value })}
                                    className="w-full px-3 py-2 bg-navy border border-white/10 rounded-lg text-white text-sm focus:border-gold/50 focus:outline-none"
                                >
                                    <option value="">All Gases</option>
                                    {stats?.byGas?.map((g) => (
                                        <option key={g._id} value={g._id}>{g._id} ({g.count})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Region Filter */}
                            <div>
                                <label className="text-xs text-dimmed block mb-1">Region</label>
                                <select
                                    value={filters.region}
                                    onChange={(e) => updateFilters({ region: e.target.value })}
                                    className="w-full px-3 py-2 bg-navy border border-white/10 rounded-lg text-white text-sm focus:border-gold/50 focus:outline-none"
                                >
                                    <option value="">All Regions</option>
                                    {stats?.byRegion?.map((r) => (
                                        <option key={r._id} value={r._id}>{r._id} ({r.count})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Reset Button */}
                            <div className="col-span-full flex justify-end">
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-dimmed hover:text-white transition-colors"
                                >
                                    <RefreshCw size={14} />
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <RefreshCw className="animate-spin text-gold" size={32} />
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-400">
                        <p>Error loading factors: {error}</p>
                    </div>
                ) : factors.length === 0 ? (
                    <div className="text-center py-8 text-dimmed">
                        <Database size={48} className="mx-auto mb-3 opacity-50" />
                        <p>No emission factors found</p>
                        <p className="text-xs mt-1">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {factors.map((factor) => (
                            <motion.button
                                key={factor._id}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => handleSelectFactor(factor)}
                                className={`w-full p-4 text-left rounded-xl border transition-all ${selectedFactor?._id === factor._id
                                        ? 'bg-gold/20 border-gold/50'
                                        : 'bg-navy/30 border-white/5 hover:border-gold/30'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <CategoryIcon category={factor.category} />
                                        <div>
                                            <div className="text-sm font-medium text-white line-clamp-1">
                                                {factor.name || `${factor.subcategory} - ${factor.gas}`}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-dimmed bg-navy/50 px-2 py-0.5 rounded">
                                                    {factor.category}
                                                </span>
                                                <span className="text-xs text-dimmed">
                                                    {factor.gas}
                                                </span>
                                                {factor.region !== 'Global' && (
                                                    <span className="flex items-center gap-1 text-xs text-gold">
                                                        <MapPin size={10} />
                                                        {factor.region}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-gold">{factor.value}</div>
                                        <div className="text-xs text-dimmed">{factor.unit}</div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <button
                        onClick={prevPage}
                        disabled={pagination.page <= 1}
                        className="px-4 py-2 text-sm text-dimmed hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Previous
                    </button>
                    <span className="text-sm text-dimmed">
                        Page {pagination.page} of {pagination.pages} ({pagination.total} results)
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={pagination.page >= pagination.pages}
                        className="px-4 py-2 text-sm text-dimmed hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next →
                    </button>
                </div>
            )}

            {/* Calculator */}
            {showCalculator && selectedFactor && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-navy/50 rounded-xl border border-gold/30"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Calculator className="text-gold" size={20} />
                        <h4 className="text-sm font-semibold text-white">Quick Calculator</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-dimmed block mb-1">Selected Factor</label>
                            <div className="text-sm text-white font-medium truncate">
                                {selectedFactor.name?.slice(0, 40)}...
                            </div>
                            <div className="text-xs text-dimmed">
                                {selectedFactor.value} {selectedFactor.unit}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-dimmed block mb-1">
                                Activity Value ({selectedFactor.unit?.split('/')[1] || 'units'})
                            </label>
                            <input
                                type="number"
                                value={calculator.activityValue}
                                onChange={(e) => calculator.setActivityValue(e.target.value)}
                                placeholder="Enter quantity..."
                                className="w-full px-3 py-2 bg-navy border border-white/10 rounded-lg text-white focus:border-gold/50 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-dimmed block mb-1">Emissions</label>
                            {calculator.result ? (
                                <div>
                                    <div className="text-2xl font-bold text-gold">
                                        {calculator.result.emissions.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-dimmed">{calculator.result.unit}</div>
                                </div>
                            ) : (
                                <div className="text-sm text-dimmed">Enter activity value</div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export { EmissionFactorBrowser };
export default EmissionFactorBrowser;
