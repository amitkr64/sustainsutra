// Lead capture service. Submits contact-form leads to the backend.
// Auth via httpOnly cookie (credentials: 'include') — the create endpoint is
// public but rate-limited.

const API_URL = '/api/leads';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const leadService = {
    createLead: async (payload) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || 'Failed to submit inquiry');
        }
        return data;
    },

    // Admin
    getLeads: async (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        const url = qs ? `${API_URL}?${qs}` : API_URL;
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch leads');
        return response.json();
    },

    updateStatus: async (id, status) => {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('Failed to update lead');
        return response.json();
    }
};

export default leadService;
