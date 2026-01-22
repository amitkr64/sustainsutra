// Mock Service for Payment Logic & Configuration
// In a real app, this would fetch from/save to an API

const PAYMENT_SETTINGS_KEY = 'sustainsutra_payment_settings';

export const paymentService = {
    // Get current payment settings
    getSettings: () => {
        const settings = localStorage.getItem(PAYMENT_SETTINGS_KEY);
        return settings ? JSON.parse(settings) : {
            reportFee: 999,
            currency: 'INR',
            gatewayEnabled: true,
            gatewayKey: 'rzp_test_mock_123',
            provider: 'Razorpay'
        };
    },

    // Save settings (Admin only)
    saveSettings: (newSettings) => {
        localStorage.setItem(PAYMENT_SETTINGS_KEY, JSON.stringify(newSettings));
        return true;
    },

    // Process a mock payment
    processPayment: async (amount) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    transactionId: 'TXN_' + Math.floor(Math.random() * 1000000),
                    amount
                });
            }, 2000);
        });
    }
};
