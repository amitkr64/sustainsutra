const API_URL = '/api/blogs';

export const blogService = {
    getAll: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch blogs');
            return await response.json();
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
    },

    // Note: getBlogBySlug logic might need adjustment if backend only supports ID
    // ideally backend should support slug or we start using ID in frontend
    getBlogById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch blog');
            return await response.json();
        } catch (error) {
            console.error('Error fetching blog:', error);
            return null;
        }
    },

    create: async (blogData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                },
                body: JSON.stringify(blogData)
            });
            if (!response.ok) throw new Error('Failed to create blog');
            return await response.json();
        } catch (error) {
            console.error('Error creating blog:', error);
            throw error;
        }
    },

    update: async (id, blogData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                },
                body: JSON.stringify(blogData)
            });
            if (!response.ok) throw new Error('Failed to update blog');
            return await response.json();
        } catch (error) {
            console.error('Error updating blog:', error);
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
            if (!response.ok) throw new Error('Failed to delete blog');
            return true;
        } catch (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }
    }
};