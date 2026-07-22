const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (retryCount = 2) => {
    while (retryCount >= 0) {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
                maxPoolSize: 10, // Maximum number of connections in the pool
                minPoolSize: 2,  // Minimum number of connections in the pool
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
                family: 4, // Use IPv4, skip trying IPv6
            });
            logger.info(`✓ MongoDB Connected: ${conn.connection.host}`);
            // Log pool config defensively — the pool/minSize API varies across
            // mongoose/driver versions, and reading it must never throw (it
            // previously crashed the connection path with "Cannot read
            // properties of undefined (reading 'minSize')").
            try {
                const pool = conn.connection.pool;
                if (pool && (pool.minSize !== undefined || pool.maxSize !== undefined)) {
                    logger.info(`✓ Connection pool configured: min=${pool.minSize}, max=${pool.maxSize}`);
                }
            } catch (_) { /* pool stats are informational only */ }
            return;
        } catch (error) {
            logger.error(`✗ Error connecting to MongoDB: ${error.message}`);
            if (retryCount > 0) {
                logger.info(`Retrying in 2 seconds... (${retryCount} retries left)`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                retryCount--;
            } else {
                logger.warn('⚠️ Standard connection failed. Attempting embedded database...');
                try {
                    const { startEmbeddedMongo } = require('../utils/embeddedDb');
                    let uri = await startEmbeddedMongo();

                    // Ensure the database name is appended if missing
                    if (uri.endsWith('/')) {
                        uri += 'sustainsutra';
                    }

                    process.env.MONGO_URI = uri;
                    const conn = await mongoose.connect(uri);
                    logger.info(`✓ Embedded MongoDB Connected (DB: ${conn.connection.name})`);
                    return;
                } catch (embedErr) {
                    logger.error(`✗ FATAL: Failed to connect to standard OR embedded MongoDB.`);
                    throw new Error('MongoDB connection failed');
                }
            }
        }
    }
};

module.exports = connectDB;
