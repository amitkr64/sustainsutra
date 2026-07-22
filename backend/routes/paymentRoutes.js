const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { paymentLimiter } = require('../middleware/rateLimitMiddleware');
const {
    createOrder,
    verifyPayment,
    getMyPurchases,
    getPaymentSettings,
    updatePaymentSettings,
    getRevenueStats
} = require('../controllers/paymentController');

// Public: read display-only settings (fee, currency, provider, enabled flag)
router.get('/settings', getPaymentSettings);

// Authenticated checkout flow
router.post('/create-order', protect, paymentLimiter, createOrder);
router.post('/verify', protect, paymentLimiter, verifyPayment);
router.get('/my-purchases', protect, getMyPurchases);

// Admin
router.put('/settings', protect, admin, updatePaymentSettings);
router.get('/revenue', protect, admin, getRevenueStats);

module.exports = router;
