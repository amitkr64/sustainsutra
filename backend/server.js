const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/db');
const logger = require('./utils/logger');
const { apiLimiter } = require('./middleware/rateLimitMiddleware');

// Load env vars
dotenv.config();

const app = express();

// Demo mode configuration
// Demo mode accepts ANY password for known emails (no persistence). It is a
// development convenience ONLY and must never be reachable in production.
global.isDemoMode = false;
const isProduction = process.env.NODE_ENV === 'production';
const { initializeMockData } = require('./utils/mockData');

// Connect to database and then start server
const startServer = async () => {
  const forceDemo = String(process.env.DEMO_MODE || '').toLowerCase() === 'true';

  // Honor an explicit DEMO_MODE=true request, but only outside production.
  if (forceDemo && !isProduction) {
    logger.warn('⚠️ DEMO_MODE=true requested — starting in Demo Mode (development only).');
    global.isDemoMode = true;
    initializeMockData();
  } else {
    try {
      await connectDatabase();
      logger.info('✓ MongoDB Connected Successfully');
    } catch (err) {
      logger.warn('⚠️ Standard MongoDB connection failed. Attempting to start embedded database...');

      try {
        const { startEmbeddedMongo } = require('./utils/embeddedDb');
        const uri = await startEmbeddedMongo();

        // Update process.env with new URI
        process.env.MONGO_URI = uri;

        // Retry connection
        await connectDatabase();
        logger.info('✓ Embedded MongoDB Connected Successfully');
      } catch (embeddedErr) {
        // In production we ALWAYS fail closed: a DB outage must never silently
        // enable the demo-mode password bypass, regardless of REQUIRE_DB.
        if (isProduction || process.env.REQUIRE_DB === 'true') {
          logger.error('FATAL: Could not connect to MongoDB and demo mode is disabled in this environment. Exiting.');
          logger.error(embeddedErr);
          process.exit(1);
        }
        logger.warn('⚠️ Embedded MongoDB failed. Falling back to Demo Mode (development only).');
        global.isDemoMode = true;
        initializeMockData();
      }
    }
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    if (global.isDemoMode) {
      logger.warn('⚠️ Running in DEMO MODE - Changes will not be persisted to MongoDB');
    }
  });
};

startServer();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://*.unsplash.com", "https://images.unsplash.com"],
      connectSrc: ["'self'", "http://localhost:5000", "https://api.z.ai"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(morgan('dev'));

// Global rate limiter for all /api routes (auth endpoints apply a stricter
// limiter on top of this via authLimiter in their route definitions).
app.use('/api', apiLimiter);

// Basic route
app.get('/', (req, res) => {
  res.send('SustainSutra API is running...');
});

// Health check route
// NOTE: intentionally does NOT expose demoMode — advertising that the
// password bypass is active is itself a security leak.
app.get('/api/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
// TODO: Implement missing routes
// app.use('/api/upload', require('./routes/uploadRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/emission-factors', require('./routes/emissionFactorRoutes'));
app.use('/api/nic', require('./routes/nicRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/activity', require('./routes/activityRoutes'));
// BRSR master reports (the wizard + dashboard + diff consume these).
app.use('/api/brsr-reports', require('./routes/brsrMasterReportRoutes'));
// Carbon Credit Trading Scheme (CCTS). Requires a real database — fail closed
// in demo mode rather than letting the controllers hit an absent DB.
app.use('/api/ccts', require('./middleware/requireRealDb'), require('./routes/cctsRoutes'));

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  logger.error(err.stack);
  // Respect a status code already set on the response by middleware that uses
  // the `res.status(N); throw new Error(...)` pattern (e.g. authMiddleware),
  // then fall back to err.statusCode, then 500.
  const statusCode = (res.statusCode && res.statusCode >= 400)
    ? res.statusCode
    : (err.statusCode || 500);
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;
