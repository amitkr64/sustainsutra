import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import Logo from '@/components/Logo';
import { LogOut, LayoutDashboard, Database } from 'lucide-react';

const CCTSDashboard = lazy(() => import('@/pages/CCTSDashboard'));
const MonitoringDataList = lazy(() => import('@/pages/MonitoringDataList'));
const MonitoringDataForm = lazy(() => import('@/pages/MonitoringDataForm'));
const VerificationQueue = lazy(() => import('@/pages/VerificationQueue'));
const VerificationDetail = lazy(() => import('@/pages/VerificationDetail'));
const EntityRegistration = lazy(() => import('@/pages/EntityRegistration'));
const EmissionFactorLibrary = lazy(() => import('@/pages/EmissionFactorLibrary'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
    </div>
);

const PortalHeader = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/ccts/dashboard">
                    <Logo size={40} />
                </Link>
                <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        CCTS Portal{user ? ` · ${user.name}` : ''}
                    </span>
                    {isAuthenticated && (
                        <>
                            <Link
                                to="/ccts/dashboard"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
                            >
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>
                            <button
                                onClick={() => { logout(); navigate('/login'); }}
                                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                            >
                                <LogOut size={16} /> Sign Out
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div className="min-h-screen bg-navy text-offwhite pt-16">
                        <PortalHeader />
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/ccts/dashboard" element={<ProtectedRoute><CCTSDashboard /></ProtectedRoute>} />
                                <Route path="/ccts/monitoring-data" element={<ProtectedRoute><MonitoringDataList /></ProtectedRoute>} />
                                <Route path="/ccts/monitoring-data/new" element={<ProtectedRoute><MonitoringDataForm /></ProtectedRoute>} />
                                <Route path="/ccts/monitoring-data/edit/:id" element={<ProtectedRoute><MonitoringDataForm /></ProtectedRoute>} />
                                <Route path="/ccts/verification-queue" element={<RoleProtectedRoute allowedRoles={['verifier', 'admin']}><VerificationQueue /></RoleProtectedRoute>} />
                                <Route path="/ccts/verification/:id" element={<RoleProtectedRoute allowedRoles={['verifier', 'admin']}><VerificationDetail /></RoleProtectedRoute>} />
                                <Route path="/admin/ccts/register-entity" element={<RoleProtectedRoute allowedRoles={['admin']}><EntityRegistration /></RoleProtectedRoute>} />
                                <Route path="/resources/emission-factors" element={<ProtectedRoute><EmissionFactorLibrary /></ProtectedRoute>} />
                                <Route path="*" element={<Navigate to="/ccts/dashboard" replace />} />
                            </Routes>
                        </Suspense>
                        <Toaster />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
