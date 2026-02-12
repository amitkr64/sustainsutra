const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

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
            role: role || 'user'
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
            role: role || 'user'
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
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
};
