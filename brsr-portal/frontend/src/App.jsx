import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Logo from '@/components/Logo';
import { LogOut, LayoutDashboard } from 'lucide-react';

const BRSRDashboard = lazy(() => import('@/pages/BRSRDashboard'));
const BRSRDiffPage = lazy(() => import('@/pages/BRSRDiffPage'));
const BRSRReportWizard = lazy(() => import('@/pages/BRSRReportWizard'));
const BRSRAnalysisDashboardNew = lazy(() => import('@/pages/BRSRAnalysisDashboardNew'));
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
                <Link to="/brsr/dashboard">
                    <Logo size={40} />
                </Link>
                <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        BRSR Portal{user ? ` · ${user.name}` : ''}
                    </span>
                    {isAuthenticated && (
                        <>
                            <Link
                                to="/brsr/dashboard"
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
                                <Route path="/brsr/dashboard" element={<ProtectedRoute><BRSRDashboard /></ProtectedRoute>} />
                                <Route path="/brsr/diff" element={<ProtectedRoute><BRSRDiffPage /></ProtectedRoute>} />
                                <Route path="/brsr/wizard/:id" element={<ProtectedRoute><BRSRReportWizard /></ProtectedRoute>} />
                                <Route path="/brsr/analysis" element={<ProtectedRoute><BRSRAnalysisDashboardNew /></ProtectedRoute>} />
                                <Route path="*" element={<Navigate to="/brsr/dashboard" replace />} />
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
