const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/db');
const logger = require('./utils/logger');
const { apiLimiter } = require('./middleware/rateLimitMiddleware');

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3200',
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'sustainsutra-ccts-portal',
        uptime: process.uptime(),
    });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ccts', require('./middleware/requireRealDb'), require('./routes/cctsRoutes'));
app.use('/api/emission-factors', require('./routes/emissionFactorRoutes'));
app.use('/api/nic', require('./routes/nicRoutes'));
app.use('/api/activity', require('./routes/activityRoutes'));

app.use('/api', (req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.error(err.stack || err.message);
    res.status(err.statusCode || 500).json({ message: err.message || 'Server Error' });
});

const startServer = async () => {
    const PORT = process.env.PORT || 5201;

    if (!process.env.JWT_SECRET) {
        logger.error('JWT_SECRET missing — refusing to start. Set it in .env');
        process.exit(1);
    }

    if (process.env.NODE_ENV === 'production' && process.env.DEMO_MODE === 'true') {
        logger.error('DEMO_MODE must not be true in production.');
        process.exit(1);
    }

    try {
        await connectDatabase();
        logger.info('MongoDB Connected Successfully');
    } catch (err) {
        logger.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }

    app.listen(PORT, () => {
        logger.info(`CCTS Portal server running on port ${PORT}`);
    });
};

startServer();
