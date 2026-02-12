const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'instructor', 'ccts-entity', 'ccts-verifier', 'ccts-admin'],
        default: 'user'
    },
    bio: {
        type: String
    },
    // CCTS-specific fields
    cctsEntity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CCTSEntity'
        // For users with 'ccts-entity' role
    },
    verifierAccreditation: {
        accreditationNumber: String,
        accreditationAuthority: {
            type: String,
            default: 'Bureau of Energy Efficiency (BEE)'
        },
        validFrom: Date,
        validUntil: Date,
        scope: [String],
        // Sectors authorized to verify: ['Cement', 'Steel', 'Textile', etc.]
        certificate: String
        // URL to accreditation certificate
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Database indexes for performance
userSchema.index({ email: 1 }); // Already unique, but explicit index
userSchema.index({ role: 1 });
userSchema.index({ cctsEntity: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ role: 1, createdAt: -1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
