/**
 * CCTS Emission Factor Service
 * Handles API calls for emission factor library
 */

const API_URL = '/api/ccts/emission-factors';

/**
 * Get all emission factors
 */
export const getEmissionFactors = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch emission factors');
    }

    return response.json();
};

/**
 * Get emission factor by ID
 */
export const getEmissionFactorById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch emission factor');
    }

    return response.json();
};

/**
 * Find applicable emission factor
 */
export const findApplicableFactor = async (criteria) => {
    const response = await fetch(`${API_URL}/find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(criteria)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'No applicable emission factor found');
    }

    return response.json();
};

/**
 * Create emission factor
 */
export const createEmissionFactor = async (token, data) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create emission factor');
    }

    return response.json();
};

/**
 * Update emission factor
 */
export const updateEmissionFactor = async (token, id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update emission factor');
    }

    return response.json();
};

/**
 * Delete emission factor
 */
export const deleteEmissionFactor = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete emission factor');
    }

    return response.json();
};

export default {
    getEmissionFactors,
    getEmissionFactorById,
    findApplicableFactor,
    createEmissionFactor,
    updateEmissionFactor,
    deleteEmissionFactor
};
