const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// 🛡️ Mock Storage for Demo Mode
let mockUsers = [
    {
        _id: 'demo-admin-id',
        name: 'Admin User',
        email: 'admin@sustainsutra.com',
        password: '$2a$10$demoHashedPassword123', // demohashed
        role: 'admin'
    }
];

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields (Name, Email, Password)');
    }

    // 🛡️ [DEMO MODE HANDLER]
    if (global.isDemoMode) {
        const userExists = mockUsers.find(u => u.email === email);
        if (userExists) {
            res.status(400);
            throw new Error('An account with this email already exists (Demo Mode)');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            _id: 'mock-' + Date.now(),
            name,
            email,
            phone,
            password: hashedPassword,
            role: role || 'user'
        };

        mockUsers.push(newUser);
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            token: generateToken(newUser._id)
        });
    }

    if (!process.env.JWT_SECRET) {
        console.error('FATAL: JWT_SECRET is not defined in .env');
        res.status(500);
        throw new Error('Server configuration error: JWT_SECRET missing');
    }

    // Check if user exists
    let userExists;
    try {
        userExists = await User.findOne({ email });
    } catch (err) {
        console.error('Database query error on registration:', err);
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
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data provided');
        }
    } catch (err) {
        console.error('User creation error:', err);
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

    // 🛡️ [DEMO MODE HANDLER]
    if (global.isDemoMode) {
        const user = mockUsers.find(u => u.email === email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password (Demo Mode)');
        }
    }

    if (!process.env.JWT_SECRET) {
        console.error('FATAL: JWT_SECRET is not defined in .env');
        res.status(500);
        throw new Error('Server configuration error: JWT_SECRET missing');
    }

    // Check for user email
    let user;
    try {
        user = await User.findOne({ email });
    } catch (err) {
        console.error('Database query error on login:', err);
        res.status(500);
        throw new Error('Database connection issue');
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id)
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

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
