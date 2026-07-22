const API_URL = '/api/users';
// All requests use `credentials: 'include'` so the httpOnly JWT cookie set on
// login is sent with every subsequent call (and across origins in dev/prod).

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function parseResponse(response) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    }
    const text = await response.text();
    throw new Error(text || `Server error: ${response.status}`);
}

export const userService = {
    initialize: () => {
        // No initialization needed with httpOnly cookies
    },

    getAll: async () => {
        try {
            const response = await fetch(API_URL, { credentials: 'include' });
            if (!response.ok) throw new Error('Failed to fetch users');
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    getById: async (id) => {
        // No public per-user endpoint; resolve via the authenticated user.
        return userService.getCurrentUser();
    },

    // Register
    create: async (userData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            const data = await parseResponse(response);

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Token is stored in an httpOnly cookie, not in localStorage.
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
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await parseResponse(response);

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            return data;
        } catch (error) {
            console.error('Login API error:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout API error:', error);
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await fetch(`${API_URL}/me`, { credentials: 'include' });
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
        // Token is in an httpOnly cookie; not accessible client-side.
        return null;
    },

    update: async (id, updates) => {
        // Updates the authenticated user's profile (PUT /api/users/me).
        // The `id` argument is retained for callers that pass it, but the
        // backend resolves the target from the JWT. Admin operations on
        // OTHER users go through the /api/admin/users endpoints below.
        try {
            const response = await fetch(`${API_URL}/me`, {
                method: 'PUT',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify(updates)
            });
            if (!response.ok) {
                const data = await parseResponse(response).catch(() => ({}));
                throw new Error(data.message || 'Update failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Update user API error:', error);
            throw error;
        }
    },

    changePassword: async (currentPassword, newPassword) => {
        const response = await fetch(`${API_URL}/update-password`, {
            method: 'PUT',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify({ currentPassword, newPassword })
        });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || 'Password change failed');
        }
        return data;
    },

    forgotPassword: async (email) => {
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify({ email })
        });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || 'Password reset request failed');
        }
        // Demo/dev mode may return a resetToken so the dev flow can click through.
        return data;
    },

    resetPassword: async (token, password) => {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify({ token, password })
        });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || 'Password reset failed');
        }
        return data;
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Delete failed');
        return true;
    },

    // ---- Admin user-management (requires admin role server-side) ----
    // These target OTHER users via /api/admin/users, unlike update() which
    // only touches the authenticated user's own profile.
    adminListUsers: async () => {
        const response = await fetch('/api/admin/users', { credentials: 'include' });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'Failed to load users');
        return data;
    },

    adminCreateUser: async (payload) => {
        const response = await fetch('/api/admin/users', {
            method: 'POST',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'Failed to create user');
        return data;
    },

    adminUpdateUser: async (id, updates) => {
        const response = await fetch(`/api/admin/users/${id}`, {
            method: 'PUT',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify(updates)
        });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'Failed to update user');
        return data;
    },

    adminChangeRole: async (id, role) => {
        const response = await fetch(`/api/admin/users/${id}/role`, {
            method: 'PATCH',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify({ role })
        });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'Failed to change role');
        return data;
    },

    adminDeleteUser: async (id) => {
        const response = await fetch(`/api/admin/users/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const data = await parseResponse(response).catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'Failed to delete user');
        return data;
    }
};
