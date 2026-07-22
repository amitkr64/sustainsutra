// Payment service — real Razorpay checkout via the backend.
//
// Flow: createOrder() (server creates a Razorpay order) -> open the Razorpay
// Checkout modal -> on success, verifyPayment() (server verifies the HMAC
// signature and marks the purchase paid). Entitlement to download a report is
// granted server-side when a matching paid Purchase exists.
//
// Auth is via the httpOnly JWT cookie (credentials: 'include').

const API_URL = '/api/payment';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function parseError(response) {
    try {
        const error = await response.json();
        return new Error(error.error || error.message || 'Request failed');
    } catch {
        return new Error(`Request failed (${response.status})`);
    }
}

export const paymentService = {
    // Public display-only settings (fee, currency, provider, enabled).
    // Admins receive the full doc (incl. keyId) from the same endpoint.
    getSettings: async () => {
        const response = await fetch(`${API_URL}/settings`, { credentials: 'include' });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // Admin: save settings (keyId is the publishable key; the secret stays in env).
    saveSettings: async (newSettings) => {
        const response = await fetch(`${API_URL}/settings`, {
            method: 'PUT',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify(newSettings)
        });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // Create a Razorpay order. Returns { orderId, amount, currency, keyId, purchaseId }.
    createOrder: async ({ productType = 'carbon_report', reportId, courseId } = {}) => {
        const response = await fetch(`${API_URL}/create-order`, {
            method: 'POST',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify({ productType, reportId, courseId })
        });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // Server-side signature verification. Returns { success, purchaseId }.
    verifyPayment: async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature, purchaseId }) => {
        const response = await fetch(`${API_URL}/verify`, {
            method: 'POST',
            headers: JSON_HEADERS,
            credentials: 'include',
            body: JSON.stringify({ razorpayOrderId, razorpayPaymentId, razorpaySignature, purchaseId })
        });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // List the current user's paid purchases (entitlement check).
    getMyPurchases: async () => {
        const response = await fetch(`${API_URL}/my-purchases`, { credentials: 'include' });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // Convenience: has the user already purchased a given product?
    hasPurchased: async (productType) => {
        try {
            const purchases = await paymentService.getMyPurchases();
            return Array.isArray(purchases) && purchases.some(p => p.productType === productType);
        } catch {
            return false;
        }
    },

    // Admin: revenue statistics + recent orders.
    getRevenueStats: async () => {
        const response = await fetch(`${API_URL}/revenue`, { credentials: 'include' });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // Full checkout flow: create order -> open Razorpay modal -> verify.
    // Resolves with { success, purchaseId } on success; rejects on failure.
    checkout: async ({ productType = 'carbon_report', reportId, courseId, description, name, email } = {}) => {
        const order = await paymentService.createOrder({ productType, reportId, courseId });

        if (!window.Razorpay) {
            throw new Error('Razorpay checkout failed to load. Please check your connection and try again.');
        }

        return new Promise((resolve, reject) => {
            const rzp = new window.Razorpay({
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                order_id: order.orderId,
                name: name || 'SustainSutra',
                description: description || 'Sustainability Report',
                // prefill if known
                ...(email ? { prefill: { email } } : {}),
                theme: { color: '#D4AF37' },
                handler: async (response) => {
                    try {
                        const verified = await paymentService.verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            purchaseId: order.purchaseId
                        });
                        resolve(verified);
                    } catch (err) {
                        reject(err);
                    }
                },
                modal: {
                    ondismiss: () => reject(new Error('Payment was cancelled.'))
                }
            });
            rzp.on('payment.failed', (resp) => {
                reject(new Error(resp?.error?.description || 'Payment failed.'));
            });
            rzp.open();
        });
    }
};
