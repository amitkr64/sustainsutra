// Emission Factor Service - Manages emission factors for carbon calculations

const EMISSION_FACTORS_KEY = 'sustainsutra_emission_factors';

// Default emission factors (baseline data)
const defaultEmissionFactors = [
    // Scope 1 - Stationary Combustion
    {
        id: 'ef-1',
        name: 'Natural Gas',
        scope: 1,
        category: 'Stationary Combustion',
        unit: 'kgCO2e/m³',
        factor: 1.93,
        source: 'EPA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-2',
        name: 'Diesel (Stationary)',
        scope: 1,
        category: 'Stationary Combustion',
        unit: 'kgCO2e/liter',
        factor: 2.68,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-3',
        name: 'Coal',
        scope: 1,
        category: 'Stationary Combustion',
        unit: 'kgCO2e/kg',
        factor: 2.42,
        source: 'IPCC',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 1 - Mobile Combustion
    {
        id: 'ef-4',
        name: 'Petrol (Gasoline)',
        scope: 1,
        category: 'Mobile Combustion',
        unit: 'kgCO2e/liter',
        factor: 2.31,
        source: 'EPA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-5',
        name: 'Diesel (Mobile)',
        scope: 1,
        category: 'Mobile Combustion',
        unit: 'kgCO2e/liter',
        factor: 2.68,
        source: 'EPA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 1 - Fugitive Emissions
    {
        id: 'ef-6',
        name: 'R-134a (Refrigerant)',
        scope: 1,
        category: 'Fugitive Emissions',
        unit: 'kgCO2e/kg',
        factor: 1430,
        source: 'IPCC AR5',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 2 - Purchased Energy
    {
        id: 'ef-7',
        name: 'Grid Electricity (India)',
        scope: 2,
        category: 'Purchased Electricity',
        unit: 'kgCO2e/kWh',
        factor: 0.82,
        source: 'CEA India 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-8',
        name: 'Grid Electricity (USA)',
        scope: 2,
        category: 'Purchased Electricity',
        unit: 'kgCO2e/kWh',
        factor: 0.42,
        source: 'EPA eGRID 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-9',
        name: 'District Heating',
        scope: 2,
        category: 'Purchased Heat/Steam',
        unit: 'kgCO2e/kWh',
        factor: 0.21,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 3 - Category 1: Purchased Goods
    {
        id: 'ef-10',
        name: 'Paper Products',
        scope: 3,
        category: 'Cat 1: Purchased Goods',
        unit: 'kgCO2e/kg',
        factor: 1.06,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-11',
        name: 'Steel',
        scope: 3,
        category: 'Cat 1: Purchased Goods',
        unit: 'kgCO2e/kg',
        factor: 2.1,
        source: 'World Steel 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 3 - Category 4: Upstream Transportation
    {
        id: 'ef-12',
        name: 'Road Freight (Truck)',
        scope: 3,
        category: 'Cat 4: Upstream Transport',
        unit: 'kgCO2e/tonne-km',
        factor: 0.11,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 3 - Category 5: Waste
    {
        id: 'ef-13',
        name: 'Landfill Waste',
        scope: 3,
        category: 'Cat 5: Waste',
        unit: 'kgCO2e/kg',
        factor: 0.57,
        source: 'EPA WARM 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-14',
        name: 'Recycled Waste',
        scope: 3,
        category: 'Cat 5: Waste',
        unit: 'kgCO2e/kg',
        factor: -0.21,
        source: 'EPA WARM 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 3 - Category 6: Business Travel
    {
        id: 'ef-15',
        name: 'Air Travel (Short-haul)',
        scope: 3,
        category: 'Cat 6: Business Travel',
        unit: 'kgCO2e/passenger-km',
        factor: 0.15,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-16',
        name: 'Air Travel (Long-haul)',
        scope: 3,
        category: 'Cat 6: Business Travel',
        unit: 'kgCO2e/passenger-km',
        factor: 0.11,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-17',
        name: 'Hotel Stay',
        scope: 3,
        category: 'Cat 6: Business Travel',
        unit: 'kgCO2e/night',
        factor: 20.3,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Scope 3 - Category 7: Employee Commuting
    {
        id: 'ef-18',
        name: 'Car Commute (Petrol)',
        scope: 3,
        category: 'Cat 7: Employee Commuting',
        unit: 'kgCO2e/km',
        factor: 0.17,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'ef-19',
        name: 'Public Transit (Bus)',
        scope: 3,
        category: 'Cat 7: Employee Commuting',
        unit: 'kgCO2e/passenger-km',
        factor: 0.10,
        source: 'DEFRA 2023',
        year: 2023,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const emissionFactorService = {
    // Initialize emission factors
    initialize: () => {
        if (!localStorage.getItem(EMISSION_FACTORS_KEY)) {
            localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(defaultEmissionFactors));
        }
    },

    // Get all emission factors
    getAll: () => {
        const factors = localStorage.getItem(EMISSION_FACTORS_KEY);
        return factors ? JSON.parse(factors) : [];
    },

    // Get factors by scope
    getByScope: (scope) => {
        const factors = emissionFactorService.getAll();
        return factors.filter(f => f.scope === scope);
    },

    // Get factors by category
    getByCategory: (category) => {
        const factors = emissionFactorService.getAll();
        return factors.filter(f => f.category === category);
    },

    // Get factor by ID
    getById: (id) => {
        const factors = emissionFactorService.getAll();
        return factors.find(f => f.id === id);
    },

    // Add new emission factor
    add: (factorData) => {
        const factors = emissionFactorService.getAll();
        const newFactor = {
            ...factorData,
            id: `ef-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        factors.push(newFactor);
        localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(factors));
        return newFactor;
    },

    // Update emission factor
    update: (id, updates) => {
        const factors = emissionFactorService.getAll();
        const index = factors.findIndex(f => f.id === id);
        if (index !== -1) {
            factors[index] = {
                ...factors[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(factors));
            return factors[index];
        }
        return null;
    },

    // Delete emission factor
    delete: (id) => {
        const factors = emissionFactorService.getAll();
        const filtered = factors.filter(f => f.id !== id);
        localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(filtered));
        return true;
    },

    // Bulk upload emission factors (from CSV/JSON)
    bulkUpload: (factorsArray) => {
        const existingFactors = emissionFactorService.getAll();
        const newFactors = factorsArray.map(f => ({
            ...f,
            id: f.id || `ef-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: f.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));

        const allFactors = [...existingFactors, ...newFactors];
        localStorage.setItem(EMISSION_FACTORS_KEY, JSON.stringify(allFactors));
        return { success: true, count: newFactors.length };
    },

    // Search emission factors
    search: (query) => {
        const factors = emissionFactorService.getAll();
        const lowerQuery = query.toLowerCase();
        return factors.filter(f =>
            f.name.toLowerCase().includes(lowerQuery) ||
            f.category.toLowerCase().includes(lowerQuery) ||
            f.source.toLowerCase().includes(lowerQuery)
        );
    },

    // Get unique categories
    getCategories: () => {
        const factors = emissionFactorService.getAll();
        return [...new Set(factors.map(f => f.category))];
    },

    // Get unique sources
    getSources: () => {
        const factors = emissionFactorService.getAll();
        return [...new Set(factors.map(f => f.source))];
    }
};

// Initialize on load
if (typeof window !== 'undefined') {
    emissionFactorService.initialize();
}
