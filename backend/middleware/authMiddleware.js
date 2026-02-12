const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const logger = require('../utils/logger');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Try to get token from httpOnly cookie first
    token = req.cookies.jwt;

    // Fallback to Authorization header for backward compatibility
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (global.isDemoMode) {
                req.user = global.mockUsers.find(u => String(u._id) === String(decoded.id));

                if (!req.user) {
                    logger.debug(`[AUTH DEBUG] Demo Mode: User ID ${decoded.id} not found in mockUsers (Length: ${global.mockUsers.length})`);
                }
            } else {
                if (decoded.id && decoded.id.match(/^[0-9a-fA-F]{24}$/)) {
                    req.user = await User.findById(decoded.id).select('-password');
                } else {
                    logger.warn(`[AUTH] Invalid ObjectId in token: ${decoded.id}`);
                }
            }

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            logger.debug(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Admin role check middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };
