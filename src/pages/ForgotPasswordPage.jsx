import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [resetToken, setResetToken] = useState('');

    const { requestPasswordReset } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const result = requestPasswordReset(email);

            if (result.success) {
                setResetToken(result.token);
                setSubmitted(true);
            } else {
                setError(result.message);
            }
            setIsLoading(false);
        }, 800);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center px-4">
                <Helmet>
                    <title>Check Your Email | SustainSutra</title>
                </Helmet>

                <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="text-green-400" size={32} />
                    </div>

                    <h2 className="text-2xl font-playfair text-offwhite mb-4">Check Your Email</h2>
                    <p className="text-dimmed mb-6">
                        We've sent password reset instructions to <strong className="text-offwhite">{email}</strong>
                    </p>

                    {/* Demo mode - show token */}
                    <div className="bg-gold/10 border border-gold/30 p-4 rounded-lg mb-6">
                        <p className="text-xs text-offwhite/60 mb-2">Demo Mode - Use this link:</p>
                        <button
                            onClick={() => navigate(`/reset-password/${resetToken}`)}
                            className="text-gold hover:underline text-sm break-all"
                        >
                            Click here to reset password
                        </button>
                    </div>

                    <Link to="/login" className="text-gold hover:underline">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy flex items-center justify-center px-4">
            <Helmet>
                <title>Forgot Password | SustainSutra</title>
            </Helmet>

            <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl">
                <Link to="/login" className="inline-flex items-center gap-2 text-gold hover:underline mb-6">
                    <ArrowLeft size={20} />
                    Back to Login
                </Link>

                <h1 className="text-3xl font-playfair text-gold mb-2">Forgot Password?</h1>
                <p className="text-offwhite/60 mb-8">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-offwhite mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gold text-navy hover:bg-gold/90 rounded-lg font-medium"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
