const mongoose = require('mongoose');
const User = require('./models/userModel');
const connectDB = require('./config/db');

const initialUsers = [
    {
        name: 'Admin User',
        email: 'admin@sustainsutra.com',
        password: 'admin123',
        role: 'admin'
    }
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('Seeder running...');

        // Clear existing users
        await User.deleteMany();

        // Insert new users
        await User.insertMany(initialUsers);

        console.log('Admin Data Imported!');
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
