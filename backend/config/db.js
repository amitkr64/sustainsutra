const mongoose = require('mongoose');

const connectDB = async (retryCount = 2) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`\x1b[32m%s\x1b[0m`, `✓ MongoDB Connected: ${conn.connection.host}`);
        global.isDemoMode = false;
    } catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `✗ Error connecting to MongoDB: ${error.message}`);
        if (retryCount > 0) {
            console.log(`Retrying in 2 seconds... (${retryCount} retries left)`);
            setTimeout(() => connectDB(retryCount - 1), 2000);
        } else {
            console.warn(`\x1b[33m%s\x1b[0m`, `⚠ WARNING: Entering [DEMO MODE]. Data will be stored in-memory and reset on server restart.`);
            global.isDemoMode = true;
        }
    }
};

module.exports = connectDB;
