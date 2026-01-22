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
    const { user } = useAuth();

    useEffect(() => {
        loadCourses();
        if (user) {
            loadUserRegistrations();
        }
    }, [user]);

    const loadCourses = () => {
        try {
            const allCourses = courseService.getAllCourses();
            setCourses(allCourses);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUserRegistrations = () => {
        if (user?.email) {
            const userRegs = courseService.getUserRegistrations(user.email);
            setRegistrations(userRegs);
        }
    };

    const registerForCourse = async (courseId) => {
        if (!user) {
            throw new Error('Must be logged in to register');
        }

        const result = courseService.registerForCourse(
            courseId,
            user.email,
            user.name || user.email
        );

        if (result.success) {
            loadUserRegistrations();
        }

        return result;
    };

    const isRegistered = (courseId) => {
        return courseService.isUserRegistered(courseId, user?.email);
    };

    const createCourse = (courseData) => {
        const newCourse = courseService.createCourse(courseData);
        loadCourses();
        return newCourse;
    };

    const updateCourse = (id, courseData) => {
        const updated = courseService.updateCourse(id, courseData);
        loadCourses();
        return updated;
    };

    const deleteCourse = (id) => {
        courseService.deleteCourse(id);
        loadCourses();
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
