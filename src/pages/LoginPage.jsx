import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Mail, User, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
    const { t } = useTranslation();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const { login, register, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(loginData.email, loginData.password);
            if (result.success) {
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (registerData.password !== registerData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        // Validate password strength
        if (registerData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            const result = await register({
                name: registerData.name,
                email: registerData.email,
                phone: registerData.phone,
                password: registerData.password
            });

            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || 'An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <Helmet>
                <title>Login / Register | SustainSutra</title>
            </Helmet>

            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                        Sustain<span className="text-primary">Sutra</span>
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">{t('auth.loginSubtitle')}</p>
                </div>

                {error && (
                    <div className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-center text-sm text-destructive">
                        {error}
                    </div>
                )}

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">{t('nav.login')}</TabsTrigger>
                        <TabsTrigger value="register">{t('nav.register')}</TabsTrigger>
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login" className="mt-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="input-label" htmlFor="login-email">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <input
                                        id="login-email"
                                        type="email"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        className="input-field pl-10"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="login-password">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <input
                                        id="login-password"
                                        type="password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        className="input-field pl-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? t('common.loading') : t('auth.loginButton')}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Register Tab */}
                    <TabsContent value="register" className="mt-6">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="input-label" htmlFor="reg-name">Full Name *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <input
                                        id="reg-name"
                                        type="text"
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                        className="input-field pl-10"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="reg-email">Email Address *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <input
                                        id="reg-email"
                                        type="email"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                        className="input-field pl-10"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="reg-phone">Phone (Optional)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <input
                                        id="reg-phone"
                                        type="tel"
                                        value={registerData.phone}
                                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                        className="input-field pl-10"
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="reg-password">Password *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <input
                                        id="reg-password"
                                        type="password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        className="input-field pl-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">Minimum 8 characters with upper &amp; lower-case letters and a number</p>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="reg-confirm">Confirm Password *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <input
                                        id="reg-confirm"
                                        type="password"
                                        value={registerData.confirmPassword}
                                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                        className="input-field pl-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? t('common.loading') : t('auth.registerButton')}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default LoginPage;