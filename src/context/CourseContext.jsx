import React, { createContext, useContext, useState, useEffect } from 'react';
import { courseService } from '@/services/courseService';
import { useAuth } from './AuthContext';

const CourseContext = createContext();

export const useCourses = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourses must be used within CourseProvider');
    }
    return context;
};

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();

    useEffect(() => {
        loadCourses();
        if (user) {
            loadUserRegistrations();
        }
    }, [user]);

    const loadCourses = async () => {
        setLoading(true);
        try {
            const allCourses = await courseService.getAllCourses();
            setCourses(allCourses || []);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUserRegistrations = async () => {
        if (user?.email) {
            try {
                // Note: getUserRegistrations need to be implemented in courseService
                if (courseService.getUserRegistrations) {
                    const userRegs = await courseService.getUserRegistrations(user.email, token);
                    setRegistrations(userRegs || []);
                }
            } catch (error) {
                console.error('Error loading registrations:', error);
            }
        }
    };

    const registerForCourse = async (courseId) => {
        if (!user) {
            throw new Error('Must be logged in to register');
        }

        try {
            const result = await courseService.registerForCourse(
                courseId,
                user._id || user.id,
                token
            );

            if (result.success) {
                await loadUserRegistrations();
            }

            return result;
        } catch (error) {
            console.error('Error registering for course:', error);
            return { success: false, message: error.message };
        }
    };

    const isRegistered = (courseId) => {
        // Since registrations is loaded on mount/user change, we can check locally
        return registrations.some(r => r.courseId === courseId);
    };

    const createCourse = async (courseData) => {
        try {
            const newCourse = await courseService.createCourse(courseData, token);
            await loadCourses();
            return newCourse;
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    };

    const updateCourse = async (id, courseData) => {
        try {
            const updated = await courseService.updateCourse(id, courseData, token);
            await loadCourses();
            return updated;
        } catch (error) {
            console.error('Error updating course:', error);
            throw error;
        }
    };

    const deleteCourse = async (id) => {
        try {
            await courseService.deleteCourse(id, token);
            await loadCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
        }
    };

    const value = {
        courses,
        registrations,
        loading,
        registerForCourse,
        isRegistered,
        createCourse,
        updateCourse,
        deleteCourse,
        refreshCourses: loadCourses
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
