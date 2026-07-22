import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const ForgotPasswordPage = () => {
    const { t } = useTranslation();
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

        const result = await requestPasswordReset(email);

        if (result.success) {
            setResetToken(result.token);
            setSubmitted(true);
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    if (submitted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
                <Helmet>
                    <title>Check Your Email | SustainSutra</title>
                </Helmet>

                <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="text-green-400" size={32} />
                    </div>

                    <h2 className="text-2xl font-playfair text-offwhite mb-4">{t('auth.checkEmail')}</h2>
                    <p className="text-dimmed mb-6">
                        {t('auth.forgotDesc')} <strong className="text-offwhite">{email}</strong>
                    </p>

                    {/* Demo mode - show token */}
                    <div className="bg-gold/10 border border-gold/30 p-4 rounded-lg mb-6">
                        <p className="text-xs text-offwhite/60 mb-2">{t('auth.demoModeLink')}</p>
                        <button
                            onClick={() => navigate(`/reset-password/${resetToken}`)}
                            className="text-gold hover:underline text-sm break-all"
                        >
                            {t('auth.clickToReset')}
                        </button>
                    </div>

                    <Link to="/login" className="text-gold hover:underline">
                        ← {t('auth.backToLogin')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Helmet>
                <title>Forgot Password | SustainSutra</title>
            </Helmet>

            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
                <Link to="/login" className="inline-flex items-center gap-2 text-gold hover:underline mb-6">
                    <ArrowLeft size={20} />
                    {t('auth.backToLogin')}
                </Link>

                <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">{t('auth.forgotTitle')}</h1>
                <p className="text-offwhite/60 mb-8">
                    {t('auth.forgotDesc')}
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="input-label">{t('auth.emailLabel')}</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field pl-10"
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
                        {isLoading ? t('auth.sending') : t('auth.sendReset')}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
