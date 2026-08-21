/**
 * CCTS Monitoring Data Service
 * Handles API calls for emissions monitoring data.
 *
 * Auth is via the httpOnly JWT cookie (credentials: 'include').
 */

const API_URL = '/api/ccts/monitoring';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function parseError(response) {
    try {
        const error = await response.json();
        return new Error(error.message || 'Request failed');
    } catch {
        return new Error(`Request failed (${response.status})`);
    }
}

/**
 * Get all monitoring data (filtered by role)
 */
export const getMonitoringData = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

    const response = await fetch(url, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get monitoring data by ID
 */
export const getMonitoringDataById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Create new monitoring data
 */
export const createMonitoringData = async (data) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Update monitoring data
 */
export const updateMonitoringData = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Calculate emissions for monitoring data
 */
export const calculateEmissions = async (id) => {
    const response = await fetch(`${API_URL}/${id}/calculate`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Submit monitoring data for verification
 */
export const submitForVerification = async (id) => {
    const response = await fetch(`${API_URL}/${id}/submit`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Assign verifier (Admin only)
 */
export const assignVerifier = async (id, verifierId) => {
    const response = await fetch(`${API_URL}/${id}/assign-verifier`, {
        method: 'PATCH',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify({ verifierId })
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Delete monitoring data
 */
export const deleteMonitoringData = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get monitoring statistics (Admin only)
 */
export const getMonitoringStats = async () => {
    const response = await fetch(`${API_URL}/stats/overview`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
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
