const API_URL = '/api/team';

export const teamService = {
    getAll: async () => {
        try {
            const response = await fetch(API_URL);
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                },
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                },
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
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete member');
            return true;
        } catch (error) {
            console.error('Error deleting team member:', error);
            throw error;
        }
    }
};
