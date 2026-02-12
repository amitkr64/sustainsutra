import axios from 'axios';

const API_BASE = '/api/emission-factors';

// Cache for emission factors
let factorsCache = null;
let categoriesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * EmissionFactorService - API service for fetching emission factors dynamically
 */
const emissionFactorService = {
    /**
     * Get emission factors with pagination and filters
     * @param {Object} params - Query parameters
     * @param {string} params.category - Filter by category
     * @param {string} params.subcategory - Filter by subcategory
     * @param {string} params.gas - Filter by gas type
     * @param {string} params.region - Filter by region
     * @param {number} params.page - Page number
     * @param {number} params.limit - Items per page
     */
    async getFactors(params = {}) {
        try {
            const response = await axios.get(API_BASE, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching emission factors:', error);
            throw error;
        }
    },

    /**
     * Search emission factors with full-text search
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     */
    async search(query, filters = {}) {
        try {
            const response = await axios.get(`${API_BASE}/search`, {
                params: { q: query, ...filters }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching emission factors:', error);
            throw error;
        }
    },

    /**
     * Get categories with subcategory breakdown
     */
    async getCategories() {
        // Return cached if valid
        if (categoriesCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
            return categoriesCache;
        }

        try {
            const response = await axios.get(`${API_BASE}/categories`);
            categoriesCache = response.data;
            cacheTimestamp = Date.now();
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    /**
     * Get single emission factor by MongoDB ID
     * @param {string} id - MongoDB document ID
     */
    async getById(id) {
        try {
            const response = await axios.get(`${API_BASE}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching emission factor:', error);
            throw error;
        }
    },

    /**
     * Get emission factor by EFDB ID
     * @param {string} efId - EFDB ID (e.g., "IND-GRID-2024")
     */
    async getByEfId(efId) {
        try {
            const response = await axios.get(`${API_BASE}/ef/${efId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching emission factor:', error);
            throw error;
        }
    },

    /**
     * Get curated factors for specific use cases
     * @param {string} type - Curated set type: 'brsr', 'carbon_calculator', 'transport', 'electricity_india'
     */
    async getCurated(type) {
        try {
            const response = await axios.get(`${API_BASE}/curated/${type}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching curated factors:', error);
            throw error;
        }
    },

    /**
     * Get database statistics
     */
    async getStats() {
        try {
            const response = await axios.get(`${API_BASE}/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    },

    /**
     * Get all emission factors (returns array for UI compatibility)
     */
    async getAll() {
        const data = await this.getFactors();
        return data.factors || data;
    },

    /**
     * Add new emission factor (Admin)
     */
    async add(data, token) {
        try {
            const response = await axios.post(API_BASE, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error adding emission factor:', error);
            throw error;
        }
    },

    /**
     * Update emission factor (Admin)
     */
    async update(id, data, token) {
        try {
            const response = await axios.put(`${API_BASE}/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating emission factor:', error);
            throw error;
        }
    },

    /**
     * Delete emission factor (Admin)
     */
    async delete(id, token) {
        try {
            const response = await axios.delete(`${API_BASE}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting emission factor:', error);
            throw error;
        }
    },

    /**
     * Bulk upload emission factors (Admin)
     * Placeholder for now as backend doesn't have a dedicated bulk route yet
     */
    async bulkUpload(data, token) {
        console.log('Bulk upload not yet fully implemented on backend, processing sequentially...');
        let count = 0;
        for (const item of data) {
            try {
                await this.add(item, token);
                count++;
            } catch (error) {
                console.error('Error in sequential bulk upload:', error);
            }
        }
        return { success: true, count };
    },

    /**
     * Clear cache
     */
    clearCache() {
        factorsCache = null;
        categoriesCache = null;
        cacheTimestamp = null;
    },

    /**
     * Get India-specific grid electricity factor
     * @param {string} region - 'national', 'northern', 'western', 'southern', 'eastern', 'northeastern'
     */
    async getIndiaGridFactor(region = 'national') {
        const efIdMap = {
            national: 'IND-GRID-2024',
            northern: 'IND-GRID-NORTH-2024',
            western: 'IND-GRID-WEST-2024',
            southern: 'IND-GRID-SOUTH-2024',
            eastern: 'IND-GRID-EAST-2024',
            northeastern: 'IND-GRID-NE-2024'
        };

        const efId = efIdMap[region] || efIdMap.national;
        return this.getByEfId(efId);
    },

    /**
     * Calculate CO2e from activity data
     * @param {number} activityValue - Activity value (e.g., kWh, liters)
     * @param {Object} factor - Emission factor object
     * @param {Object} gwp - GWP values (optional)
     */
    calculateEmissions(activityValue, factor, gwp = { CO2: 1, CH4: 27.9, N2O: 273 }) {
        if (!factor || !activityValue) return 0;

        let emissions = activityValue * factor.value;

        // Apply GWP if not already CO2e
        if (factor.gas !== 'CO2e' && gwp[factor.gas]) {
            emissions *= gwp[factor.gas];
        }

        return emissions;
    }
};

export default emissionFactorService;
