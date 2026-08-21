// Activity log service. Auth via httpOnly cookie (credentials: 'include').

const API_URL = '/api/activity';

const parseError = async (response) => {
    try {
        const e = await response.json();
        return new Error(e.error || e.message || 'Request failed');
    } catch {
        return new Error(`Request failed (${response.status})`);
    }
};

export const activityService = {
    // Global activity feed (admins see all; users see their own).
    list: async (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        const url = qs ? `${API_URL}?${qs}` : API_URL;
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // History for a specific entity.
    forEntity: async (entityType, entityId, limit = 20) => {
        const response = await fetch(
            `${API_URL}/${entityType}/${entityId}?limit=${limit}`,
            { credentials: 'include' }
        );
        if (!response.ok) throw await parseError(response);
        return response.json();
    }
};

export default activityService;
