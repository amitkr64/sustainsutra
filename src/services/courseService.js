// Course service for managing course data via API
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/courses';

export const courseService = {
    // Get all courses
    getAllCourses: async () => {
        try {
            const response = await fetch(`${API_URL}`);
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
            const response = await fetch(`${API_URL}/published`);
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
            const response = await fetch(`${API_URL}/slug/${slug}`);
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
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Course not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching course by ID:', error);
            return null;
        }
    },

    // Create course (Admin only)
    createCourse: async (courseData, token) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
    updateCourse: async (id, courseData, token) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
    deleteCourse: async (id, token) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
    registerForCourse: async (courseId, userId, token) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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

    getUserRegistrations: async (email, token) => {
        try {
            const response = await fetch(`${API_URL}/my-registrations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch registrations');
            return await response.json();
        } catch (error) {
            console.error('Error fetching registrations:', error);
            return [];
        }
    },

    isUserRegistered: async (courseId, email, token) => {
        try {
            const response = await fetch(`${API_URL}/check-registration/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data.registered;
        } catch (error) {
            console.error('Error checking registration:', error);
            return false;
        }
    },

    updateProgress: async (courseId, progressData, token) => {
        try {
            const response = await fetch(`${API_URL}/progress`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
