const mongoose = require('mongoose');

/**
 * Admin-configurable payment settings. A single document (singleton) holds the
 * report fee, currency and provider. The Razorpay KEY SECRET is NEVER stored
 * here — it lives only in the server environment (RAZORPAY_KEY_SECRET).
 *
 * We key the singleton with a string field `singletonKey` (default 'main')
 * rather than overloading `_id`, so the default ObjectId `_id` is unaffected.
 */
const paymentSettingsSchema = new mongoose.Schema({
    singletonKey: {
        type: String,
        default: 'main',
        unique: true,
        index: true
    },
    reportFee: {
        type: Number,
        default: 999,
        min: 0
    },
    currency: {
        type: String,
        default: 'INR'
    },
    provider: {
        type: String,
        enum: ['Razorpay', 'Stripe', 'PayPal'],
        default: 'Razorpay'
    },
    // Key ID only (publishable). The secret stays in env.
    keyId: {
        type: String,
        default: ''
    },
    gatewayEnabled: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Always read/update the singleton document.
paymentSettingsSchema.statics.getSingleton = async function () {
    let settings = await this.findOne({ singletonKey: 'main' });
    if (!settings) {
        settings = await this.create({ singletonKey: 'main' });
    }
    return settings;
};

module.exports = mongoose.model('PaymentSettings', paymentSettingsSchema);
