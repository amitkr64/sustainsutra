/**
 * CCTS Emission Factor Service
 * Handles API calls for emission factor library.
 *
 * Auth is via the httpOnly JWT cookie (credentials: 'include'). GET/find
 * endpoints are public on the backend; create/update/delete require auth,
 * which is satisfied by the cookie.
 */

const API_URL = '/api/ccts/emission-factors';

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
 * Get all emission factors
 */
export const getEmissionFactors = async (filters = {}) => {
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
 * Get emission factor by ID
 */
export const getEmissionFactorById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Find applicable emission factor
 */
export const findApplicableFactor = async (criteria) => {
    const response = await fetch(`${API_URL}/find`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(criteria)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Create emission factor
 */
export const createEmissionFactor = async (data) => {
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
 * Update emission factor
 */
export const updateEmissionFactor = async (id, data) => {
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
 * Delete emission factor
 */
export const deleteEmissionFactor = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
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
