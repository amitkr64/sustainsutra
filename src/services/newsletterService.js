// Newsletter service. Auth is via the httpOnly JWT cookie (credentials:
// 'include'). Subscribe is public; getAll/unsubscribe are admin-only.
const API_URL = '/api/newsletter';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const newsletterService = {
    getAll: async () => {
        try {
            const response = await fetch(API_URL, { credentials: 'include' });
            if (!response.ok) throw new Error('Failed to fetch subscribers');
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    subscribe: async (email) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.message === 'Email already subscribed') {
                    throw new Error('You are already subscribed!');
                }
                throw new Error(data.message || 'Subscription failed');
            }
            return data;
        } catch (error) {
            console.error('Newsletter error:', error);
            throw error;
        }
    },

    unsubscribe: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Unsubscribe failed');
            return true;
        } catch (error) {
            console.error('Newsletter error:', error);
            throw error;
        }
    }
};
