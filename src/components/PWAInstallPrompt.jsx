import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Download, X } from 'lucide-react';

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setShowPrompt(false);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            toast({
                title: 'Installing...',
                description: 'SustainSutra is being installed on your device.'
            });
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-br from-navy to-navy/95 border border-gold/30 rounded-lg shadow-2xl p-4 relative">
                <button
                    onClick={handleDismiss}
                    className="absolute top-2 right-2 text-dimmed hover:text-offwhite transition-colors"
                    aria-label="Dismiss"
                >
                    <X size={16} />
                </button>

                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Download className="text-gold" size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="text-offwhite font-semibold text-sm mb-1">
                            Install SustainSutra
                        </h4>
                        <p className="text-dimmed text-xs mb-3">
                            Install our app for faster access and offline support
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={handleInstall}
                                className="bg-gold text-navy px-4 py-2 rounded text-sm font-semibold hover:bg-gold/80 transition-colors"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="bg-white/5 text-offwhite px-3 py-2 rounded text-sm hover:bg-white/10 transition-colors"
                            >
                                Later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
