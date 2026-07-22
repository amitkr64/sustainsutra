import { useState, useEffect, useMemo, useCallback } from 'react';
import emissionFactorService from '../services/emissionFactorService';

/**
 * useEmissionFactors - React hook for working with emission factors
 * 
 * @param {Object} initialFilters - Initial filter values
 * @returns {Object} Emission factor state and actions
 */
export const useEmissionFactors = (initialFilters = {}) => {
    const [factors, setFactors] = useState([]);
    const [categories, setCategories] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        total: 0
    });
    const [filters, setFilters] = useState({
        category: '',
        subcategory: '',
        gas: '',
        region: '',
        ...initialFilters
    });

    // Fetch factors with current filters
    const fetchFactors = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const result = await emissionFactorService.getFactors({
                ...filters,
                page,
                limit: 50
            });
            setFactors(result.factors);
            setPagination({
                page: result.page,
                pages: result.pages,
                total: result.total
            });
        } catch (err) {
            setError(err.message);
            setFactors([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Search factors
    const searchFactors = useCallback(async (query) => {
        if (!query || query.length < 2) {
            return fetchFactors(1);
        }

        setLoading(true);
        setError(null);
        try {
            const result = await emissionFactorService.search(query, filters);
            setFactors(result.factors);
            setPagination({
                page: result.page,
                pages: result.pages,
                total: result.total
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters, fetchFactors]);

    // Fetch categories
    const fetchCategories = useCallback(async () => {
        try {
            const data = await emissionFactorService.getCategories();
            // API returns { summary, categories }, extract the categories array
            setCategories(data.categories || []);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
            setCategories([]);
        }
    }, []);

    // Fetch stats
    const fetchStats = useCallback(async () => {
        try {
            const data = await emissionFactorService.getStats();
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    }, []);

    // Update filters
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Reset filters
    const resetFilters = useCallback(() => {
        setFilters({
            category: '',
            subcategory: '',
            gas: '',
            region: ''
        });
    }, []);

    // Get curated factors
    const getCurated = useCallback(async (type) => {
        setLoading(true);
        try {
            const result = await emissionFactorService.getCurated(type);
            return result.factors;
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // Load initial data
    useEffect(() => {
        fetchCategories();
        fetchStats();
    }, [fetchCategories, fetchStats]);

    // Refetch when filters change
    useEffect(() => {
        fetchFactors(1);
    }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        // State
        factors,
        categories,
        stats,
        loading,
        error,
        pagination,
        filters,

        // Actions
        fetchFactors,
        searchFactors,
        updateFilters,
        resetFilters,
        getCurated,

        // Helpers
        nextPage: () => fetchFactors(pagination.page + 1),
        prevPage: () => fetchFactors(Math.max(1, pagination.page - 1)),
        goToPage: (page) => fetchFactors(page)
    };
};

/**
 * useEmissionCalculator - Hook for calculating emissions
 */
export const useEmissionCalculator = () => {
    const [selectedFactor, setSelectedFactor] = useState(null);
    const [activityValue, setActivityValue] = useState('');
    const [result, setResult] = useState(null);

    const calculate = useCallback(() => {
        if (!selectedFactor || !activityValue) {
            setResult(null);
            return;
        }

        const value = parseFloat(activityValue);
        if (isNaN(value)) {
            setResult(null);
            return;
        }

        const emissions = emissionFactorService.calculateEmissions(value, selectedFactor);

        setResult({
            emissions,
            unit: selectedFactor.gas === 'CO2e' ? 'kgCO2e' : `kg${selectedFactor.gas}`,
            co2e: emissions, // Assuming already converted
            factor: selectedFactor,
            activityValue: value
        });
    }, [selectedFactor, activityValue]);

    // Auto-calculate when inputs change
    useEffect(() => {
        calculate();
    }, [selectedFactor, activityValue, calculate]);

    return {
        selectedFactor,
        setSelectedFactor,
        activityValue,
        setActivityValue,
        result,
        reset: () => {
            setSelectedFactor(null);
            setActivityValue('');
            setResult(null);
        }
    };
};

/**
 * useIndiaGridFactor - Quick access to India electricity grid factors
 */
export const useIndiaGridFactor = (region = 'national') => {
    const [factor, setFactor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFactor = async () => {
            try {
                const data = await emissionFactorService.getIndiaGridFactor(region);
                setFactor(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFactor();
    }, [region]);

    return { factor, loading, error };
};

export default useEmissionFactors;
