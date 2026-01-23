/**
 * CCTS Monitoring Data Service
 * Handles API calls for emissions monitoring data
 */

const API_URL = '/api/ccts/monitoring';

/**
 * Get all monitoring data (filtered by role)
 */
export const getMonitoringData = async (token, filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch monitoring data');
    }

    return response.json();
};

/**
 * Get monitoring data by ID
 */
export const getMonitoringDataById = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch monitoring data');
    }

    return response.json();
};

/**
 * Create new monitoring data
 */
export const createMonitoringData = async (token, data) => {
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
        throw new Error(error.message || 'Failed to create monitoring data');
    }

    return response.json();
};

/**
 * Update monitoring data
 */
export const updateMonitoringData = async (token, id, data) => {
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
        throw new Error(error.message || 'Failed to update monitoring data');
    }

    return response.json();
};

/**
 * Calculate emissions for monitoring data
 */
export const calculateEmissions = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to calculate emissions');
    }

    return response.json();
};

/**
 * Submit monitoring data for verification
 */
export const submitForVerification = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit for verification');
    }

    return response.json();
};

/**
 * Assign verifier (Admin only)
 */
export const assignVerifier = async (token, id, verifierId) => {
    const response = await fetch(`${API_URL}/${id}/assign-verifier`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ verifierId })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to assign verifier');
    }

    return response.json();
};

/**
 * Delete monitoring data
 */
export const deleteMonitoringData = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete monitoring data');
    }

    return response.json();
};

/**
 * Get monitoring statistics (Admin only)
 */
export const getMonitoringStats = async (token) => {
    const response = await fetch(`${API_URL}/stats/overview`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch statistics');
    }

    return response.json();
};

export default {
    getMonitoringData,
    getMonitoringDataById,
    createMonitoringData,
    updateMonitoringData,
    calculateEmissions,
    submitForVerification,
    assignVerifier,
    deleteMonitoringData,
    getMonitoringStats
};
