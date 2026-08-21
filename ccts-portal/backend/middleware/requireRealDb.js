// Middleware that blocks a request when the server is running in demo mode.
//
// Demo mode has no persistent database — only an in-memory mock of users and a
// handful of collections. Controllers that rely on a real MongoDB (the entire
// CCTS subsystem: entities, monitoring, verification, carbon-credit balances,
// offset projects) would crash or hang in demo mode, so we fail closed with a
// 503 instead of letting them throw an opaque error.
const requireRealDb = (req, res, next) => {
    if (global.isDemoMode) {
        return res.status(503).json({
            success: false,
            error: 'This feature requires a database connection and is unavailable in demo mode.'
        });
    }
    next();
};

module.exports = requireRealDb;
