import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Database, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/ccts/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const success = await login(email, password);
            if (success) {
                navigate(from, { replace: true });
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Sign in failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="glassmorphism rounded-3xl border border-white/5 p-10">
                    <div className="flex flex-col items-center mb-8">
                        <Logo size={48} />
                        <div className="flex items-center gap-2 mt-4 text-gold text-xs font-black uppercase tracking-[0.3em]">
                            <Database size={14} /> CCTS Portal
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle size={16} className="shrink-0" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-offwhite focus:border-gold/50 transition-all outline-none"
                            />
                        </div>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-offwhite focus:border-gold/50 transition-all outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gold text-navy font-black rounded-2xl py-4 hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>
                <p className="text-center text-dimmed text-xs mt-6">
                    Access to the Carbon Credit Trading Scheme portal is for registered entities and verifiers. Contact info@sustainsutra.in for access.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
