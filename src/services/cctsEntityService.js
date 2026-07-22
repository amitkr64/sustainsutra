/**
 * CCTS Entity Service
 * Handles API calls for entity management.
 *
 * Auth is via the httpOnly JWT cookie (credentials: 'include'). There is no
 * Bearer token on the client — the cookie is set on login and sent
 * automatically.
 */

const API_URL = '/api/ccts/entities';

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
 * Get all entities (Admin only)
 */
export const getAllEntities = async (filters = {}) => {
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
 * Get my entity profile
 */
export const getMyEntity = async () => {
    const response = await fetch(`${API_URL}/my-entity`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get entity by ID
 */
export const getEntityById = async (entityId) => {
    const response = await fetch(`${API_URL}/${entityId}`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Create new entity (Admin only)
 */
export const createEntity = async (entityData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(entityData)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Update entity
 */
export const updateEntity = async (entityId, entityData) => {
    const response = await fetch(`${API_URL}/${entityId}`, {
        method: 'PUT',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(entityData)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Update entity status (Admin only)
 */
export const updateEntityStatus = async (entityId, status) => {
    const response = await fetch(`${API_URL}/${entityId}/status`, {
        method: 'PATCH',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify({ status })
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Delete entity (Admin only)
 */
export const deleteEntity = async (entityId) => {
    const response = await fetch(`${API_URL}/${entityId}`, {
        method: 'DELETE',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get entity dashboard
 */
export const getEntityDashboard = async (entityId) => {
    const response = await fetch(`${API_URL}/${entityId}/dashboard`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get entity statistics (Admin only)
 */
export const getEntityStats = async () => {
    const response = await fetch(`${API_URL}/stats/overview`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

export default {
    getAllEntities,
    getMyEntity,
    getEntityById,
    createEntity,
    updateEntity,
    updateEntityStatus,
    deleteEntity,
    getEntityDashboard,
    getEntityStats
};
