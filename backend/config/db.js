const mongoose = require('mongoose');

const connectDB = async (retryCount = 5) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (retryCount > 0) {
            console.error(`Error connecting to MongoDB: ${error.message}. Retrying in 5 seconds... (${retryCount} retries left)`);
            setTimeout(() => connectDB(retryCount - 1), 5000);
        } else {
            console.error(`Failed to connect to MongoDB after multiple attempts: ${error.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
