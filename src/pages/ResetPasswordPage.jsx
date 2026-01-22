import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const result = resetPassword(token, password);

            if (result.success) {
                setSuccess(true);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(result.message);
            }
            setIsLoading(false);
        }, 800);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center px-4">
                <Helmet>
                    <title>Password Reset Successful | SustainSutra</title>
                </Helmet>

                <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-400" size={32} />
                    </div>

                    <h2 className="text-2xl font-playfair text-offwhite mb-4">Password Reset Successful!</h2>
                    <p className="text-dimmed mb-6">
                        Your password has been changed. Redirecting to login...
                    </p>

                    <Link to="/login" className="text-gold hover:underline">
                        Go to Login →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy flex items-center justify-center px-4">
            <Helmet>
                <title>Reset Password | SustainSutra</title>
            </Helmet>

            <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl">
                <h1 className="text-3xl font-playfair text-gold mb-2">Reset Password</h1>
                <p className="text-offwhite/60 mb-8">
                    Enter your new password below.
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-offwhite mb-2">New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <p className="text-xs text-offwhite/40 mt-1">Minimum 6 characters</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-offwhite mb-2">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gold text-navy hover:bg-gold/90 rounded-lg font-medium"
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-gold hover:underline text-sm">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
