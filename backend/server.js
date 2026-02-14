const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/db');
const logger = require('./utils/logger');

// Load env vars
dotenv.config();

const app = express();

// Demo mode configuration
global.isDemoMode = false;
const { initializeMockData } = require('./utils/mockData');

// Connect to database and then start server
const startServer = async () => {
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
      if (process.env.REQUIRE_DB === 'true') {
        logger.error('FATAL: Could not connect to standard OR embedded MongoDB. Exiting.');
        logger.error(embeddedErr);
        process.exit(1);
      }
      logger.warn('⚠️ Embedded MongoDB failed. Falling back to Demo Mode.');
      global.isDemoMode = true;
      initializeMockData();
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

// Basic route
app.get('/', (req, res) => {
  res.send('SustainSutra API is running...');
});

// Health check route
app.get('/api/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    demoMode: global.isDemoMode,
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
// app.use('/api/payment', require('./routes/paymentRoutes'));
// app.use('/api/ccc', require('./routes/cctcRoutes'));
// app.use('/api/btec', require('./routes/btecRoutes'));
// app.use('/api/ccts/entity', require('./routes/cctsEntityRoutes'));
// app.use('/api/ccts/verifier', require('./routes/cctsVerifierRoutes'));

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  logger.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;
