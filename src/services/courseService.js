// Course service for managing course data via API.
// Auth is via the httpOnly JWT cookie (credentials: 'include'). There is no
// Bearer token on the client.
const API_URL = '/api/courses';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const courseService = {
    // Get all courses
    getAllCourses: async () => {
        try {
            const response = await fetch(`${API_URL}`, { credentials: 'include' });
            if (!response.ok) throw new Error('Failed to fetch courses');
            return await response.json();
        } catch (error) {
            console.error('Error fetching all courses:', error);
            return [];
        }
    },

    // Get published courses
    getPublishedCourses: async () => {
        try {
            const response = await fetch(`${API_URL}/published`, { credentials: 'include' });
            if (!response.ok) throw new Error('Failed to fetch published courses');
            return await response.json();
        } catch (error) {
            console.error('Error fetching published courses:', error);
            return [];
        }
    },

    // Get course by slug
    getCourseBySlug: async (slug) => {
        try {
            const response = await fetch(`${API_URL}/slug/${slug}`, { credentials: 'include' });
            if (!response.ok) throw new Error('Course not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching course by slug:', error);
            return null;
        }
    },

    // Get course by ID
    getCourseById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { credentials: 'include' });
            if (!response.ok) throw new Error('Course not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching course by ID:', error);
            return null;
        }
    },

    // Create course (Admin only)
    createCourse: async (courseData) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify(courseData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create course');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    },

    // Update course (Admin only)
    updateCourse: async (id, courseData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify(courseData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update course');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating course:', error);
            throw error;
        }
    },

    // Delete course (Admin only)
    deleteCourse: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete course');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
        }
    },

    // Registration Methods
    registerForCourse: async (courseId, userId) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify({ courseId })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            return { success: true, ...data };
        } catch (error) {
            console.error('Error registering for course:', error);
            return { success: false, message: error.message };
        }
    },

    getUserRegistrations: async (email) => {
        try {
            const response = await fetch(`${API_URL}/my-registrations`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch registrations');
            return await response.json();
        } catch (error) {
            console.error('Error fetching registrations:', error);
            return [];
        }
    },

    isUserRegistered: async (courseId, email) => {
        try {
            const response = await fetch(`${API_URL}/check-registration/${courseId}`, {
                credentials: 'include'
            });
            const data = await response.json();
            return data.registered;
        } catch (error) {
            console.error('Error checking registration:', error);
            return false;
        }
    },

    updateProgress: async (courseId, progressData) => {
        try {
            const response = await fetch(`${API_URL}/progress`, {
                method: 'PUT',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify({ courseId, ...progressData })
            });
            if (!response.ok) throw new Error('Failed to update progress');
            return await response.json();
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    }
};
