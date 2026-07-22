const mongoose = require('mongoose');

/**
 * Records a single payment/purchase. Created in `created` state when an order
 * is opened, advanced to `paid` (or `failed`) after Razorpay signature
 * verification. Entitlement to download a report is granted when a matching
 * `paid` purchase exists for the user + product.
 */
const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    productType: {
        type: String,
        enum: ['carbon_report', 'brsr_report', 'course'],
        required: true
    },
    // Optional reference to the specific report/course being purchased.
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BRSRMasterReport'
    },
    courseId: {
        type: String
    },
    // Razorpay identifiers
    razorpayOrderId: {
        type: String,
        index: true
    },
    razorpayPaymentId: {
        type: String
    },
    razorpaySignature: {
        type: String,
        select: false
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed', 'refunded'],
        default: 'created',
        index: true
    },
    failureReason: {
        type: String
    }
}, {
    timestamps: true
});

purchaseSchema.index({ user: 1, productType: 1, status: 1 });

module.exports = mongoose.model('Purchase', purchaseSchema);
