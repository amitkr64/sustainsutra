const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Initialize Demo Mode
global.isDemoMode = false;

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(morgan('dev')); // Request logging

// Basic route
app.get('/', (req, res) => {
    res.send('SustainSutra API is running...');
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
