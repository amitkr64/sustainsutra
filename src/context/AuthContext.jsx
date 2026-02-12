import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '@/services/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await userService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await userService.create(userData);
            setUser(response);
            setIsAuthenticated(true);
            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            return { success: false, message: error.message };
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const sessionUser = await userService.login(email, password);
            setUser(sessionUser);
            setIsAuthenticated(true);
            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        try {
            await userService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateProfile = async (updates) => {
        try {
            await userService.update(user.id || user._id, updates); // Now async
            setUser(prev => ({ ...prev, ...updates }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        // API should handle this validation
        try {
            // Placeholder: Assume API update handles it or create specific endpoint
            await userService.update(user.id || user._id, { password: newPassword });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // Helper functions
    const isAdmin = () => user?.role === 'admin';
    const isInstructor = () => user?.role === 'instructor';
    const hasRole = (role) => user?.role === role;
    const canCreateContent = () => user?.role === 'admin' || user?.role === 'instructor';

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            register,
            logout,
            updateProfile,
            changePassword,
            // Role helpers
            isAdmin,
            isInstructor,
            hasRole,
            canCreateContent
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);