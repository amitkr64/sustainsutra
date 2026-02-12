const API_URL = '/api/users';
const TOKEN_KEY = 'jwt'; // Key for httpOnly cookie

export const userService = {
    initialize: () => {
        // No initialization needed with httpOnly cookies
    },

    getAll: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch users');
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    getById: async (id) => {
        // API doesn't have a direct public getById, usually admin only or 'me'
        // For now, implementing 'me' as getById is tricky without endpoint
        // Using 'me' endpoint if checking current user
        return userService.getCurrentUser();
    },

    // Register
    create: async (userData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(text || `Server error: ${response.status}`);
            }

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Token is now stored in httpOnly cookie, not in localStorage
            return data;
        } catch (error) {
            console.error('Registration API error:', error);
            throw error;
        }
    },

    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(text || `Server error: ${response.status}`);
            }

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Token is now stored in httpOnly cookie, not in localStorage
            return data;
        } catch (error) {
            console.error('Login API error:', error);

            // Fallback for demo credentials if API is down
            if (email === 'admin@sustainsutra.com' && password === 'admin123') {
                console.warn('Demo credentials fallback - not using localStorage with httpOnly cookies');
                throw new Error('Demo credentials not supported with httpOnly cookies. Please use API.');
            }
            throw error;
        }
    },

    logout: async () => {
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST'
            });
        } catch (error) {
            console.error('Logout API error:', error);
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await fetch(`${API_URL}/me`);
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    },

    getToken: () => {
        // Token is in httpOnly cookie, no client-side access
        return null;
    },

    update: async (id, updates) => {
        try {
            const response = await fetch(`${API_URL}/me`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!response.ok) throw new Error('Update failed');
            return await response.json();
        } catch (error) {
            console.error('Update user API error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Delete failed');
        return true;
    }
};
