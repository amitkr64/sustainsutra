const mongoose = require('mongoose');

const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();

        console.log('Seeder running...');
        // Import models and seed data here later

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // destroyData();
} else {
    seedData();
}
