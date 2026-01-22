const API_URL = '/api/newsletter';

export const newsletterService = {
    getAll: async () => {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                }
            });
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (!response.ok) {
                // If it's just "already subscribed", treat as success or specific message
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
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                }
            });
            if (!response.ok) throw new Error('Unsubscribe failed');
            return true;
        } catch (error) {
            console.error('Newsletter error:', error);
            throw error;
        }
    }
};
