/**
 * CCTS Entity Service
 * Handles API calls for entity management
 */

const API_URL = '/api/ccts/entities';

/**
 * Get all entities (Admin only)
 */
export const getAllEntities = async (token, filters = {}) => {
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
        throw new Error(error.message || 'Failed to fetch entities');
    }

    return response.json();
};

/**
 * Get my entity profile
 */
export const getMyEntity = async (token) => {
    const response = await fetch(`${API_URL}/my-entity`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch entity profile');
    }

    return response.json();
};

/**
 * Get entity by ID
 */
export const getEntityById = async (token, entityId) => {
    const response = await fetch(`${API_URL}/${entityId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch entity');
    }

    return response.json();
};

/**
 * Create new entity (Admin only)
 */
export const createEntity = async (token, entityData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(entityData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create entity');
    }

    return response.json();
};

/**
 * Update entity
 */
export const updateEntity = async (token, entityId, entityData) => {
    const response = await fetch(`${API_URL}/${entityId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(entityData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update entity');
    }

    return response.json();
};

/**
 * Update entity status (Admin only)
 */
export const updateEntityStatus = async (token, entityId, status) => {
    const response = await fetch(`${API_URL}/${entityId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update status');
    }

    return response.json();
};

/**
 * Delete entity (Admin only)
 */
export const deleteEntity = async (token, entityId) => {
    const response = await fetch(`${API_URL}/${entityId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete entity');
    }

    return response.json();
};

/**
 * Get entity dashboard
 */
export const getEntityDashboard = async (token, entityId) => {
    const response = await fetch(`${API_URL}/${entityId}/dashboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch dashboard');
    }

    return response.json();
};

/**
 * Get entity statistics (Admin only)
 */
export const getEntityStats = async (token) => {
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
