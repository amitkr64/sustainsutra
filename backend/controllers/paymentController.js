const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Purchase = require('../models/purchaseModel');
const PaymentSettings = require('../models/paymentSettingsModel');
const logger = require('../utils/logger');

// Lazily-instantiated Razorpay client. If keys are missing, returns null and
// order creation fails closed with a 503.
let rzpClient = null;
const getRzpClient = () => {
    if (rzpClient !== null) return rzpClient;
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret || keyId.startsWith('rzp_test_xxxxx')) {
        rzpClient = false; // marker: not configured
    } else {
        rzpClient = new Razorpay({ key_id: keyId, key_secret: keySecret });
    }
    return rzpClient;
};

const amountToSubunits = (amount, currency) => {
    // Razorpay expects paise for INR (and the smallest unit generally).
    // For INR multiply by 100; for zero-decimal currencies return as-is.
    const zeroDecimal = ['JPY', 'KRW', 'VND', 'CLP', 'PYG', 'UGX'];
    return zeroDecimal.includes(currency) ? Math.round(amount) : Math.round(amount * 100);
};

// @desc    Create a Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const client = getRzpClient();
    if (!client) {
        res.status(503);
        throw new Error('Payments are not configured on the server. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
    }

    const settings = await PaymentSettings.getSingleton();
    if (!settings.gatewayEnabled) {
        res.status(403);
        throw new Error('Payment gateway is currently disabled.');
    }

    const { productType = 'carbon_report', reportId, courseId } = req.body;
    const amount = amountToSubunits(settings.reportFee, settings.currency);

    let rzpOrder;
    try {
        rzpOrder = await client.orders.create({
            amount,
            currency: settings.currency,
            receipt: `rcpt_${Date.now()}`,
            notes: {
                userId: String(req.user._id),
                productType
            }
        });
    } catch (err) {
        logger.error('Razorpay order creation failed:', err);
        res.status(502);
        throw new Error('Failed to create payment order with the gateway.');
    }

    const purchase = await Purchase.create({
        user: req.user._id,
        productType,
        report: reportId || undefined,
        courseId: courseId || undefined,
        razorpayOrderId: rzpOrder.id,
        amount: settings.reportFee,
        currency: settings.currency,
        status: 'created'
    });

    res.status(200).json({
        orderId: rzpOrder.id,
        purchaseId: purchase._id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID // publishable key, safe to expose
    });
});

// @desc    Verify a Razorpay payment and mark the purchase paid
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, purchaseId } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !purchaseId) {
        res.status(400);
        throw new Error('Missing payment verification details');
    }

    const purchase = await Purchase.findOne({
        _id: purchaseId,
        user: req.user._id,
        razorpayOrderId
    });

    if (!purchase) {
        res.status(404);
        throw new Error('Purchase not found for this order');
    }

    if (purchase.status === 'paid') {
        return res.status(200).json({ success: true, purchaseId: purchase._id, alreadyPaid: true });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
        res.status(503);
        throw new Error('Payments are not configured on the server.');
    }

    // Signature = HMAC-SHA256(orderId|paymentId, keySecret)
    const expected = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

    if (expected !== razorpaySignature) {
        purchase.status = 'failed';
        purchase.failureReason = 'Signature mismatch';
        await purchase.save();
        logger.warn(`Payment signature mismatch for purchase ${purchase._id} (user ${req.user._id})`);
        res.status(400);
        throw new Error('Payment verification failed');
    }

    purchase.status = 'paid';
    purchase.razorpayPaymentId = razorpayPaymentId;
    purchase.razorpaySignature = razorpaySignature;
    await purchase.save();

    if (req.logActivity) {
        req.logActivity({
            action: 'payment.verify',
            entityType: 'purchase',
            entityId: String(purchase._id),
            summary: `Purchased ${purchase.productType}`,
            metadata: { amount: purchase.amount, currency: purchase.currency, orderId: purchase.razorpayOrderId }
        });
    }

    logger.info(`Payment verified: purchase ${purchase._id} for user ${req.user._id}`);
    res.status(200).json({ success: true, purchaseId: purchase._id });
});

// @desc    List the current user's paid purchases (entitlement check)
// @route   GET /api/payment/my-purchases
// @access  Private
const getMyPurchases = asyncHandler(async (req, res) => {
    const purchases = await Purchase.find({
        user: req.user._id,
        status: 'paid'
    })
        .select('-razorpaySignature')
        .sort('-createdAt')
        .lean();
    res.status(200).json(purchases);
});

// Convenience used internally + by the frontend to check entitlement quickly.
const hasPurchased = async (userId, productType) => {
    return !!(await Purchase.exists({ user: userId, productType, status: 'paid' }));
};

// @desc    Get public payment settings (fee + enabled flag, for display)
// @route   GET /api/payment/settings
// @access  Public
const getPaymentSettings = asyncHandler(async (req, res) => {
    // Admin gets the full doc; public callers get only the display fields.
    const settings = await PaymentSettings.getSingleton();
    const isAdmin = req.user && req.user.role === 'admin';
    if (isAdmin) {
        return res.status(200).json(settings.toObject());
    }
    res.status(200).json({
        reportFee: settings.reportFee,
        currency: settings.currency,
        provider: settings.provider,
        gatewayEnabled: settings.gatewayEnabled
    });
});

// @desc    Update payment settings (admin only)
// @route   PUT /api/payment/settings
// @access  Private/Admin
const updatePaymentSettings = asyncHandler(async (req, res) => {
    const { reportFee, currency, provider, keyId, gatewayEnabled } = req.body;
    const settings = await PaymentSettings.getSingleton();

    if (reportFee !== undefined) settings.reportFee = Math.max(0, Number(reportFee));
    if (currency !== undefined) settings.currency = currency;
    if (provider !== undefined) settings.provider = provider;
    if (keyId !== undefined) settings.keyId = keyId; // publishable key id only
    if (gatewayEnabled !== undefined) settings.gatewayEnabled = Boolean(gatewayEnabled);

    await settings.save();
    logger.info(`Payment settings updated by admin ${req.user.email}`);
    res.status(200).json(settings.toObject());
});

// @desc    Revenue statistics + recent orders (admin only)
// @route   GET /api/payment/revenue
// @access  Private/Admin
const getRevenueStats = asyncHandler(async (req, res) => {
    const [agg, recent] = await Promise.all([
        Purchase.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: '$currency', total: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]),
        Purchase.find({ status: 'paid' })
            .populate('user', 'name email')
            .select('-razorpaySignature')
            .sort('-createdAt')
            .limit(50)
            .lean()
    ]);
    res.status(200).json({ totals: agg, recent });
});

module.exports = {
    createOrder,
    verifyPayment,
    getMyPurchases,
    hasPurchased,
    getPaymentSettings,
    updatePaymentSettings,
    getRevenueStats
};
