// Blog service. Auth is via the httpOnly JWT cookie (credentials: 'include').
// Previously this read a token from localStorage, which is never populated
// under the cookie-based auth scheme — so admin blog writes were broken.
const API_URL = '/api/blogs';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const blogService = {
    getAll: async () => {
        try {
            const response = await fetch(API_URL, { credentials: 'include' });
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
            console.log(`Incrementing view for blog ${id}`);
        } catch (error) {
            console.error('Error incrementing view:', error);
        }
    },

    getBlogById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { credentials: 'include' });
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
                headers: JSON_HEADERS,
                credentials: 'include',
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
                headers: JSON_HEADERS,
                credentials: 'include',
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
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to delete blog');
            return true;
        } catch (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }
    }
};
