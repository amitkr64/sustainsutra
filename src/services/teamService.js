// Team service. Auth is via the httpOnly JWT cookie (credentials: 'include').
// Reads are public; writes/deletes are admin-only.
const API_URL = '/api/team';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const teamService = {
    getAll: async () => {
        try {
            const response = await fetch(API_URL, { credentials: 'include' });
            if (!response.ok) throw new Error('Failed to fetch team');
            return await response.json();
        } catch (error) {
            console.error('Error fetching team:', error);
            return [];
        }
    },

    create: async (memberData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify(memberData)
            });
            if (!response.ok) throw new Error('Failed to create member');
            return await response.json();
        } catch (error) {
            console.error('Error creating team member:', error);
            throw error;
        }
    },

    update: async (id, updateData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify(updateData)
            });
            if (!response.ok) throw new Error('Failed to update member');
            return await response.json();
        } catch (error) {
            console.error('Error updating team member:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to delete member');
            return true;
        } catch (error) {
            console.error('Error deleting team member:', error);
            throw error;
        }
    }
};
