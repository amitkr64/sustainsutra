const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // SECURITY: `role` is intentionally NOT read from req.body.
    // Public self-registration always creates a plain 'user'.
    // Privileged accounts must be created by an admin via /api/admin/users.
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields (Name, Email, Password)');
    }

    if (!process.env.JWT_SECRET) {
        logger.error('FATAL: JWT_SECRET is not defined in .env');
        res.status(500);
        throw new Error('Server configuration error: JWT_SECRET missing');
    }

    // Demo Mode: Create user in memory
    if (global.isDemoMode) {
        // Check if user already exists in mock data
        const userExists = global.mockUsers.find(u => u.email === email);
        if (userExists) {
            res.status(400);
            throw new Error('An account with this email already exists');
        }

        // Create new mock user
        const newUser = {
            _id: 'mock-user-' + Date.now(),
            name,
            email,
            phone: phone || '',
            role: 'user'
        };
        global.mockUsers.push(newUser);

        const token = generateToken(newUser._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        logger.info(`Demo Mode: New user registered - ${email}`);

        return res.status(201).json(newUser);
    }

    // Check if user exists
    let userExists;
    try {
        userExists = await User.findOne({ email });
    } catch (err) {
        logger.error('Database query error on registration:', err);
        res.status(500);
        throw new Error('Database connection issue');
    }

    if (userExists) {
        res.status(400);
        throw new Error('An account with this email already exists');
    }

    // Create user
    try {
        const user = await User.create({
            name,
            email,
            phone,
            password,
            role: 'user'
        });

        if (user) {
            const token = generateToken(user._id);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                path: '/'
            });

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data provided');
        }
        } catch (err) {
        logger.error('User creation error:', err);
        res.status(err.name === 'ValidationError' ? 400 : 500);
        throw new Error(err.message || 'Error creating user account');
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide both email and password');
    }

    if (!process.env.JWT_SECRET) {
        logger.error('FATAL: JWT_SECRET is not defined in .env');
        res.status(500);
        throw new Error('Server configuration error: JWT_SECRET missing');
    }

    // Demo Mode: Accept any password for mock users
    if (global.isDemoMode) {
        const user = global.mockUsers.find(u => u.email === email);

        if (user) {
            const token = generateToken(user._id);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            logger.info(`Demo Mode: User logged in - ${email}`);

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }

    // Check for user email
    let user;
    try {
        user = await User.findOne({ email });
    } catch (err) {
        logger.error('Database query error on login:', err);
        res.status(500);
        throw new Error('Database connection issue');
    }

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/'
        });

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
    const { name, email, phone, bio } = req.body;

    // Demo Mode: Update mock user
    if (global.isDemoMode) {
        const userIndex = global.mockUsers.findIndex(u => String(u._id) === String(req.user._id));

        if (userIndex === -1) {
            res.status(404);
            throw new Error('User not found');
        }

        // Update fields
        if (name) global.mockUsers[userIndex].name = name;
        if (email) {
            // Check if email already exists
            const emailExists = global.mockUsers.find(u => u.email === email && String(u._id) !== String(req.user._id));
            if (emailExists) {
                res.status(400);
                throw new Error('Email already in use');
            }
            global.mockUsers[userIndex].email = email;
        }
        if (phone !== undefined) global.mockUsers[userIndex].phone = phone;
        if (bio !== undefined) global.mockUsers[userIndex].bio = bio;

        return res.status(200).json(global.mockUsers[userIndex]);
    }

    // Production: Update in MongoDB
    try {
        // Get user
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Update fields if provided and different
        if (name && name !== user.name) user.name = name;
        if (email && email !== user.email) {
            // Check if email already exists
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                res.status(400);
                throw new Error('Email already in use');
            }
            user.email = email;
        }
        if (phone !== undefined) user.phone = phone;
        if (bio !== undefined) user.bio = bio;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
            bio: updatedUser.bio
        });
    } catch (err) {
        logger.error('User update error:', err);
        if (err.code === 11000) {
            res.status(400);
            throw new Error('Email already exists');
        }
        if (err.name === 'ValidationError') {
            res.status(400);
            throw new Error(err.message);
        }
        res.status(500);
        throw new Error('Error updating user profile');
    }
});

// @desc    Update user password
// @route   PUT /api/users/update-password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error('Please provide both current and new password');
    }

    if (newPassword.length < 8) {
        res.status(400);
        throw new Error('New password must be at least 8 characters long');
    }

    // Demo Mode: passwords are not persisted, so changes cannot be saved.
    if (global.isDemoMode) {
        res.status(400);
        throw new Error('Password change is not available in demo mode');
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Verify current password
    const isPasswordValid = await user.matchPassword(currentPassword);

    if (!isPasswordValid) {
        res.status(401);
        throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;

    try {
        await user.save();
        logger.info(`Password updated for user: ${user.email}`);

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (err) {
        logger.error('Password update error:', err);
        res.status(500);
        throw new Error('Error updating password');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

// Hash a reset token for storage. We never store the raw token — only its
// SHA-256 hash — so a DB leak cannot be used to reset passwords.
const hashResetToken = (token) =>
    crypto.createHash('sha256').update(token).digest('hex');

// @desc    Send a password-reset email
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Demo mode: return the reset token directly so the dev can click through.
    // (In demo mode there is no persisted DB, so we cannot store a token hash.)
    if (global.isDemoMode) {
        const user = global.mockUsers.find(u => u.email === email);
        if (user) {
            const resetToken = crypto.randomBytes(32).toString('hex');
            user._resetToken = resetToken;
            user._resetExpires = Date.now() + 60 * 60 * 1000;
            logger.info(`[DEMO] Password reset requested for ${email}. Token: ${resetToken}`);
            return res.status(200).json({
                success: true,
                message: 'Password reset email sent (demo mode).',
                resetToken // only exposed in demo mode for the dev "Demo Mode" link
            });
        }
        // Always return generic success to avoid user-enumeration.
        return res.status(200).json({ success: true, message: 'If that email exists, a reset link has been sent.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        // Avoid user-enumeration: respond identically whether or not the email exists.
        return res.status(200).json({ success: true, message: 'If that email exists, a reset link has been sent.' });
    }

    // Generate a raw token (sent to the user) and store only its hash.
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = hashResetToken(resetToken);
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    try {
        const result = await emailService.sendPasswordReset(user.email, resetUrl);
        if (result && result.demo) {
            // No SMTP configured — return the token so the flow is testable in dev
            // without email. In production SMTP must be configured.
            logger.warn('[DEMO SMTP] Password reset email not sent (EMAIL_* env not set). Returning token for dev.');
            if (process.env.NODE_ENV !== 'production') {
                return res.status(200).json({
                    success: true,
                    message: 'SMTP not configured — reset token returned for development.',
                    resetToken
                });
            }
        }
        res.status(200).json({ success: true, message: 'If that email exists, a reset link has been sent.' });
    } catch (err) {
        // Reset the token so the user can retry; never reveal the email error.
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save({ validateBeforeSave: false });
        logger.error('Failed to send password reset email:', err);
        res.status(500);
        throw new Error('There was a problem sending the reset email. Please try again.');
    }
});

// @desc    Reset password using a token
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    // Demo mode: validate against the in-memory token we issued.
    if (global.isDemoMode) {
        const user = global.mockUsers.find(
            u => u._resetToken === token && u._resetExpires && u._resetExpires > Date.now()
        );
        if (!user) {
            res.status(400);
            throw new Error('Invalid or expired reset token');
        }
        user._resetToken = undefined;
        user._resetExpires = undefined;
        user.passwordChangedAt = new Date();
        logger.info(`[DEMO] Password reset completed for ${user.email}`);
        return res.status(200).json({ success: true, message: 'Password has been reset.' });
    }

    const hashedToken = hashResetToken(token);

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired reset token');
    }

    // The pre('save') hook re-hashes the new plaintext password.
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = new Date();
    await user.save();

    logger.info(`Password reset completed for user ${user.email}`);
    res.status(200).json({ success: true, message: 'Password has been reset.' });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    updateMe,
    updatePassword,
    forgotPassword,
    resetPassword,
};
