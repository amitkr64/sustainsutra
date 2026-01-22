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

    // Get published blogs only
    getPublished: async () => {
        try {
            const blogs = await blogService.getAll();
            return blogs.filter(blog => blog.status === 'published');
        } catch (error) {
            console.error('Error fetching published blogs:', error);
            return [];
        }
    },

    // Get blog by slug
    getBySlug: async (slug) => {
        try {
            // Ideally backend should have a getBySlug endpoint
            // For now, we fetch all and filter, or keep using ID if possible
            const blogs = await blogService.getAll();
            return blogs.find(blog => blog.slug === slug);
        } catch (error) {
            console.error('Error fetching blog by slug:', error);
            return null;
        }
    },

    // Increment view count
    incrementView: async (id) => {
        try {
            // This could be a specialized endpoint in the backend
            // For now, we can just log it or implement a PATCH endpoint later
            console.log(`Incrementing view for blog ${id}`);
        } catch (error) {
            console.error('Error incrementing view:', error);
        }
    },

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