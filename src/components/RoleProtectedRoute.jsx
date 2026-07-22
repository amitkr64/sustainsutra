import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * Role-Protected Route Component
 * Restricts access based on user roles
 * 
 * Usage:
 * <RoleProtectedRoute allowedRoles={['admin', 'instructor']}>
 *   <CreateCoursePage />
 * </RoleProtectedRoute>
 */
const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <div className="text-offwhite">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h1 className="text-3xl font-playfair text-offwhite mb-4">Access Denied</h1>
                    <p className="text-dimmed mb-6">
                        You don't have permission to access this page. This area is restricted to {allowedRoles.join(', ')} users.
                    </p>
                    <a href="/" className="text-gold hover:underline">
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    return children;
};

export default RoleProtectedRoute;
