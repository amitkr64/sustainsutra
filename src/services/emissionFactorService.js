// Unified Emission Factor Service 
// Points to the formal CCTS backend database with local fallback

import { getEmissionFactors, createEmissionFactor, updateEmissionFactor, deleteEmissionFactor } from './cctsEmissionFactorService';

const EMISSION_FACTORS_KEY = 'sustainsutra_emission_factors';

// Default / Fallback factors (baseline data)
const defaultEmissionFactors = [
    { id: 'ef-1', name: 'Natural Gas', scope: 1, category: 'Stationary Combustion', unit: 'kgCO2e/m³', factor: 1.93, source: 'EPA 2023', year: 2023 },
    { id: 'ef-2', name: 'Diesel (Stationary)', scope: 1, category: 'Stationary Combustion', unit: 'kgCO2e/liter', factor: 2.68, source: 'DEFRA 2023', year: 2023 },
    { id: 'ef-3', name: 'Coal', scope: 1, category: 'Stationary Combustion', unit: 'kgCO2e/kg', factor: 2.42, source: 'IPCC', year: 2023 },
    { id: 'ef-4', name: 'Petrol (Gasoline)', scope: 1, category: 'Mobile Combustion', unit: 'kgCO2e/liter', factor: 2.31, source: 'EPA 2023', year: 2023 },
    { id: 'ef-5', name: 'Diesel (Mobile)', scope: 1, category: 'Mobile Combustion', unit: 'kgCO2e/liter', factor: 2.68, source: 'EPA 2023', year: 2023 },
    { id: 'ef-6', name: 'R-134a (Refrigerant)', scope: 1, category: 'Fugitive Emissions', unit: 'kgCO2e/kg', factor: 1430, source: 'IPCC AR5', year: 2023 },
    { id: 'ef-7', name: 'Grid Electricity (India)', scope: 2, category: 'Purchased Electricity', unit: 'kgCO2e/kWh', factor: 0.82, source: 'CEA India 2023', year: 2023 },
    { id: 'ef-10', name: 'Paper Products', scope: 3, category: 'Cat 1: Purchased Goods', unit: 'kgCO2e/kg', factor: 1.06, source: 'DEFRA 2023', year: 2023 },
    { id: 'ef-11', name: 'Steel', scope: 3, category: 'Cat 1: Purchased Goods', unit: 'kgCO2e/kg', factor: 2.1, source: 'World Steel 2023', year: 2023 },
    { id: 'ef-15', name: 'Air Travel (Short-haul)', scope: 3, category: 'Cat 6: Business Travel', unit: 'kgCO2e/passenger-km', factor: 0.15, source: 'DEFRA 2023', year: 2023 }
];

// Helper to normalize scope between the two modules
const normalizeScope = (scope) => {
    if (typeof scope === 'number') return scope;
    if (scope === 'Scope 1') return 1;
    if (scope === 'Scope 2') return 2;
    if (scope === 'Scope 3') return 3;
    return parseInt(scope.toString().replace(/\D/g, '')) || 1;
};

const denormalizeScope = (scope) => {
    return `Scope ${scope}`;
};

export const emissionFactorService = {
    // Get all emission factors (from API with local fallback)
    getAll: async () => {
        try {
            // Attempt to fetch from official CCTS database
            const res = await getEmissionFactors();
            if (res && res.data && res.data.length > 0) {
                // Return normalized API data
                return res.data.map(f => ({
                    ...f,
                    id: f._id || f.id,
                    scope: normalizeScope(f.scope)
                }));
            }
        } catch (error) {
            console.warn('CCTS API unreachable, falling back to local emission database');
        }

        // Fallback to local storage or defaults
        const local = localStorage.getItem(EMISSION_FACTORS_KEY);
        if (local) return JSON.parse(local).map(f => ({ ...f, scope: normalizeScope(f.scope) }));

        return defaultEmissionFactors;
    },

    // Sync local with API (called by admin or on app load)
    sync: async () => {
        const factors = await emissionFactorService.getAll();
        localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(factors));
        return factors;
    },

    // Add new emission factor (Updates both Backend and Local)
    add: async (factorData, token) => {
        try {
            // 1. Try updating backend if token exists
            if (token) {
                const apiData = {
                    ...factorData,
                    scope: denormalizeScope(factorData.scope)
                };
                const res = await createEmissionFactor(token, apiData);
                return { ...res.data, id: res.data._id, scope: normalizeScope(res.data.scope) };
            }
        } catch (error) {
            console.error('Failed to create factor on backend:', error);
        }

        // 2. Always update local storage as well
        const factors = JSON.parse(localStorage.getItem(EMISSION_FACTORS_KEY) || '[]');
        const newFactor = {
            ...factorData,
            id: `ef-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        factors.push(newFactor);
        localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(factors));
        return newFactor;
    },

    // Update emission factor
    update: async (id, updates, token) => {
        try {
            if (token && id.length > 10) { // Assume mongoID if long
                const apiUpdates = {
                    ...updates,
                    scope: updates.scope ? denormalizeScope(updates.scope) : undefined
                };
                await updateEmissionFactor(token, id, apiUpdates);
            }
        } catch (error) {
            console.error('Failed to update factor on backend:', error);
        }

        const factors = JSON.parse(localStorage.getItem(EMISSION_FACTORS_KEY) || '[]');
        const index = factors.findIndex(f => f.id === id);
        if (index !== -1) {
            factors[index] = { ...factors[index], ...updates };
            localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(factors));
            return factors[index];
        }
        return null;
    },

    // Delete emission factor
    delete: async (id, token) => {
        try {
            if (token && id.length > 10) {
                await deleteEmissionFactor(token, id);
            }
        } catch (error) {
            console.error('Failed to delete factor on backend:', error);
        }

        const factors = JSON.parse(localStorage.getItem(EMISSION_FACTORS_KEY) || '[]');
        const filtered = factors.filter(f => f.id !== id);
        localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(filtered));
        return true;
    },

    // Search and Filters (Legacy Wrapper)
    getAllSync: () => {
        const local = localStorage.getItem(EMISSION_FACTORS_KEY);
        return local ? JSON.parse(local) : defaultEmissionFactors;
    }
};

// Initial sync
if (typeof window !== 'undefined') {
    // Non-blocking sync
    emissionFactorService.getAll().then(factors => {
        localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(factors));
    });
}
