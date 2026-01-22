import React, { useState, useEffect } from 'react';
import { paymentService } from '@/services/paymentService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Save, ShieldCheck, DollarSign } from 'lucide-react';

const PaymentSettings = () => {
    const [settings, setSettings] = useState({
        reportFee: 999,
        currency: 'INR',
        gatewayEnabled: true,
        gatewayKey: '',
        provider: 'Razorpay'
    });
    const { toast } = useToast();

    useEffect(() => {
        const currentSettings = paymentService.getSettings();
        setSettings(currentSettings);
    }, []);

    const handleSave = () => {
        paymentService.saveSettings(settings);
        toast({
            title: "Settings Saved",
            description: "Payment configuration has been updated successfully."
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-playfair text-white">Payment Gateway Configuration</h3>
                        <p className="text-sm text-dimmed">Configure the fees and integration for Carbon Calculator reports.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-offwhite uppercase tracking-widest">Report Generation Fee</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold font-bold">₹</span>
                            <input
                                type="number"
                                value={settings.reportFee}
                                onChange={(e) => setSettings({ ...settings, reportFee: parseInt(e.target.value) || 0 })}
                                className="w-full h-14 pl-10 pr-6 bg-navy border border-white/10 rounded-xl text-white outline-none focus:border-gold transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold text-offwhite uppercase tracking-widest">Payment Provider</label>
                        <select
                            value={settings.provider}
                            onChange={(e) => setSettings({ ...settings, provider: e.target.value })}
                            className="w-full h-14 px-6 bg-navy border border-white/10 rounded-xl text-white outline-none focus:border-gold transition-all"
                        >
                            <option value="Razorpay">Razorpay (India)</option>
                            <option value="Stripe">Stripe (Global)</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>

                    <div className="space-y-4 md:col-span-2">
                        <label className="text-xs font-bold text-offwhite uppercase tracking-widest">API Key / Merchant ID</label>
                        <input
                            type="password"
                            value={settings.gatewayKey}
                            onChange={(e) => setSettings({ ...settings, gatewayKey: e.target.value })}
                            placeholder="rzp_live_xxxxxxxxxxxxxx"
                            className="w-full h-14 px-6 bg-navy border border-white/10 rounded-xl text-white outline-none focus:border-gold transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-gold/5 border border-gold/10 rounded-2xl md:col-span-2">
                        <input
                            type="checkbox"
                            checked={settings.gatewayEnabled}
                            onChange={(e) => setSettings({ ...settings, gatewayEnabled: e.target.checked })}
                            id="gateway-toggle"
                            className="w-6 h-6 rounded bg-navy border-white/10 text-gold focus:ring-gold"
                        />
                        <label htmlFor="gateway-toggle" className="text-offwhite cursor-pointer select-none font-medium">
                            Enable Live Payment Gateway for Carbon Reports
                        </label>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <Button
                        onClick={handleSave}
                        className="h-14 px-10 flex items-center gap-3 shadow-xl shadow-gold/20"
                    >
                        <Save size={20} />
                        Update Payment Settings
                    </Button>
                </div>
            </div>

            <div className="bg-navy border border-white/5 p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h4 className="text-white font-medium">Compliance Note</h4>
                    <p className="text-sm text-dimmed">Ensure your Terms of Service and Refund Policy are updated before enabling live payments to comply with local financial regulations.</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSettings;
