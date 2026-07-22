const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const logger = require('../utils/logger');

// Roles an admin is allowed to assign. Public self-registration can only
// ever create 'user' (see userController.registerUser); privileged roles are
// granted exclusively through these admin endpoints.
const ALLOWED_ROLES = ['user', 'admin', 'instructor', 'ccts-entity', 'ccts-verifier', 'ccts-admin'];

const toPublicUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

// @desc    List all users
// @route   GET /api/admin/users
// @access  Private/Admin
const listUsers = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        return res.status(200).json(global.mockUsers.map(u => ({ ...u })));
    }
    const users = await User.find().select('-password').sort('-createdAt').lean();
    res.status(200).json(users);
});

// @desc    Create a user with an explicit role
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields (Name, Email, Password)');
    }

    const assignedRole = ALLOWED_ROLES.includes(role) ? role : 'user';

    if (global.isDemoMode) {
        if (global.mockUsers.find(u => u.email === email)) {
            res.status(400);
            throw new Error('An account with this email already exists');
        }
        const newUser = {
            _id: 'mock-user-' + Date.now(),
            name,
            email,
            phone: phone || '',
            role: assignedRole
        };
        global.mockUsers.push(newUser);
        return res.status(201).json(newUser);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('An account with this email already exists');
    }

    try {
        const user = await User.create({ name, email, phone, password, role: assignedRole });
        if (req.logActivity) {
            req.logActivity({
                action: 'user.create',
                entityType: 'user',
                entityId: String(user._id),
                summary: `Created user ${email} with role ${assignedRole}`,
                metadata: { email, role: assignedRole }
            });
        }
        res.status(201).json(toPublicUser(user));
    } catch (err) {
        logger.error('Admin user creation error:', err);
        res.status(err.name === 'ValidationError' ? 400 : 500);
        throw new Error(err.message || 'Error creating user account');
    }
});

// @desc    Update a user (incl. role)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const { name, email, phone, bio, role } = req.body;
    const { id } = req.params;

    if (global.isDemoMode) {
        const idx = global.mockUsers.findIndex(u => String(u._id) === String(id));
        if (idx === -1) {
            res.status(404);
            throw new Error('User not found');
        }
        if (name) global.mockUsers[idx].name = name;
        if (email) {
            const clash = global.mockUsers.find(u => u.email === email && String(u._id) !== String(id));
            if (clash) {
                res.status(400);
                throw new Error('Email already in use');
            }
            global.mockUsers[idx].email = email;
        }
        if (phone !== undefined) global.mockUsers[idx].phone = phone;
        if (bio !== undefined) global.mockUsers[idx].bio = bio;
        if (ALLOWED_ROLES.includes(role)) global.mockUsers[idx].role = role;
        return res.status(200).json({ ...global.mockUsers[idx] });
    }

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (name) user.name = name;
    if (email && email !== user.email) {
        const clash = await User.findOne({ email });
        if (clash && clash._id.toString() !== user._id.toString()) {
            res.status(400);
            throw new Error('Email already in use');
        }
        user.email = email;
    }
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (ALLOWED_ROLES.includes(role)) user.role = role;

    try {
        const saved = await user.save();
        res.status(200).json(toPublicUser(saved));
    } catch (err) {
        logger.error('Admin user update error:', err);
        if (err.code === 11000) {
            res.status(400);
            throw new Error('Email already exists');
        }
        if (err.name === 'ValidationError') {
            res.status(400);
            throw new Error(err.message);
        }
        res.status(500);
        throw new Error('Error updating user');
    }
});

// @desc    Change a user's role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
const changeRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;

    if (!ALLOWED_ROLES.includes(role)) {
        res.status(400);
        throw new Error(`Invalid role. Allowed: ${ALLOWED_ROLES.join(', ')}`);
    }

    if (global.isDemoMode) {
        const idx = global.mockUsers.findIndex(u => String(u._id) === String(id));
        if (idx === -1) {
            res.status(404);
            throw new Error('User not found');
        }
        global.mockUsers[idx].role = role;
        return res.status(200).json({ ...global.mockUsers[idx] });
    }

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Guardrail: don't let an admin demote/lock out the last admin (incl. self).
    if (user.role === 'admin' && role !== 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
            res.status(400);
            throw new Error('Cannot demote the last remaining admin account');
        }
    }

    const previousRole = user.role;
    user.role = role;
    await user.save();
    logger.info(`Admin ${req.user.email} changed user ${user.email} role to ${role}`);
    if (req.logActivity) {
        req.logActivity({
            action: 'user.role_change',
            entityType: 'user',
            entityId: String(user._id),
            summary: `Changed ${user.email} role from ${previousRole} to ${role}`,
            metadata: { email: user.email, from: previousRole, to: role }
        });
    }
    res.status(200).json(toPublicUser(user));
});

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (global.isDemoMode) {
        const idx = global.mockUsers.findIndex(u => String(u._id) === String(id));
        if (idx === -1) {
            res.status(404);
            throw new Error('User not found');
        }
        global.mockUsers.splice(idx, 1);
        return res.status(200).json({ success: true, message: 'User removed' });
    }

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Guardrail: prevent deleting the last admin.
    if (user.role === 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
            res.status(400);
            throw new Error('Cannot delete the last remaining admin account');
        }
    }

    // Prevent self-deletion.
    if (user._id.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error('You cannot delete your own account');
    }

    await User.deleteOne({ _id: user._id });
    logger.info(`Admin ${req.user.email} deleted user ${user.email}`);
    if (req.logActivity) {
        req.logActivity({
            action: 'user.delete',
            entityType: 'user',
            entityId: String(user._id),
            summary: `Deleted user ${user.email}`,
            metadata: { email: user.email }
        });
    }
    res.status(200).json({ success: true, message: 'User removed' });
});

module.exports = {
    listUsers,
    createUser,
    updateUser,
    changeRole,
    deleteUser
};
