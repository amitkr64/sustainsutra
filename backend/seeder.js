const mongoose = require('mongoose');
const crypto = require('crypto');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Course = require('./models/courseModel');
const connectDB = require('./config/db');

dotenv.config();

// Admin credentials come from the environment. If ADMIN_PASSWORD is not set we
// generate a strong random one and print it once so the operator can log in —
// we never seed a known-weak default like 'admin123'.
const adminEmail = process.env.ADMIN_EMAIL || 'admin@sustainsutra.com';
const adminPassword = process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64').slice(0, 16);

const initialUsers = [
    {
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        phone: '1234567890'
    }
];

const initialCourses = [
    {
        id: 'ghg-accounting',
        slug: 'greenhouse-gas-accounting',
        title: 'Greenhouse Gas (GHG) Accounting',
        category: 'Climate',
        level: 'Intermediate',
        duration: '8 weeks',
        price: 15000,
        description: 'Comprehensive training on GHG Protocol, Scope 1, 2, and 3 emissions calculation and reporting.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'Master Scope 1, 2 & 3 Emissions',
            'GHG Protocol Standard Training',
            'Hands-on Excel Modeling',
            'BRSR Alignment Support'
        ],
        prerequisites: [
            'Basic understanding of environmental science',
            'Proficiency in Microsoft Excel',
            'Familiarity with corporate operations'
        ],
        objectives: [
            'Understand GHG Protocol standards',
            'Calculate Scope 1, 2, and 3 emissions',
            'Prepare GHG inventory reports',
            'Implement emission reduction strategies'
        ],
        modules: [
            { title: 'Concepts & Standards', duration: '2 weeks' },
            { title: 'Quantifying Scope 1 & 2', duration: '3 weeks' },
            { title: 'Scope 3 & Reporting', duration: '3 weeks' }
        ],
        published: true
    },
    {
        id: 'iso-14064',
        slug: 'iso-14064-verification',
        title: 'ISO 14064 Verification & Validation',
        category: 'Standards',
        level: 'Advanced',
        duration: '6 weeks',
        price: 18000,
        description: 'Master ISO 14064 standards for GHG quantification, monitoring, reporting and verification.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'ISO 14064-1 & 14064-2 Focus',
            'Verification Audit Simulation',
            'Validation Methodology',
            'Global Compliance Standards'
        ],
        prerequisites: [
            'Completion of GHG Accounting course or equivalent',
            'Basic knowledge of auditing principles',
            'Industry experience of 2+ years'
        ],
        objectives: [
            'Understand ISO 14064 framework',
            'Conduct verification audits',
            'Validate GHG reports',
            'Ensure compliance with international standards'
        ],
        modules: [
            { title: 'Standard Requirements', duration: '2 weeks' },
            { title: 'Verification Process', duration: '4 weeks' }
        ],
        published: true
    },
    {
        id: 'lca',
        slug: 'life-cycle-assessment',
        title: 'Life Cycle Assessment (LCA)',
        category: 'Environmental',
        level: 'Advanced',
        duration: '8 weeks',
        price: 20000,
        description: 'Complete guide to conducting Life Cycle Assessments from goal definition to interpretation.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'Cradle-to-Grave Analysis',
            'LCA Software Tools Guide',
            'Environmental Impact Metrics',
            'Product Carbon Footprinting'
        ],
        prerequisites: [
            'Engineering or Science background',
            'Understanding of manufacturing processes',
            'Basic statistics knowledge'
        ],
        objectives: [
            'Master LCA methodology',
            'Use LCA software tools',
            'Conduct impact assessments',
            'Interpret and communicate results'
        ],
        modules: [
            { title: 'LCA Methodology', duration: '3 weeks' },
            { title: 'Inventory & Analysis', duration: '5 weeks' }
        ],
        published: true
    },
    {
        id: 'carbon-footprinting',
        slug: 'carbon-footprinting',
        title: 'Carbon Footprinting for Organizations',
        category: 'Climate',
        level: 'Beginner',
        duration: '4 weeks',
        price: 12000,
        description: 'Learn to measure, manage and reduce organizational carbon footprints.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'Measure Org Carbon Footprint',
            'Identify Emission Hotspots',
            'Reduction Strategy Planning',
            'Beginner Friendly Approach'
        ],
        prerequisites: [
            'None - Beginner Friendly',
            'Interest in sustainability',
            'Basic computer skills'
        ],
        objectives: [
            'Calculate organizational carbon footprint',
            'Identify emission hotspots',
            'Develop reduction strategies',
            'Create carbon neutrality roadmaps'
        ],
        modules: [
            { title: 'Footprint Foundations', duration: '2 weeks' },
            { title: 'Reduction Strategies', duration: '2 weeks' }
        ],
        published: true
    }
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('Seeder running...');

        // Clear existing data
        await User.deleteMany();
        await Course.deleteMany();

        // Insert new data
        await User.insertMany(initialUsers);
        await Course.insertMany(initialCourses);

        console.log('Data Imported Successfully!');
        if (!process.env.ADMIN_PASSWORD) {
            console.log('---------------------------------------------------------');
            console.log(' Generated admin credentials (set ADMIN_PASSWORD in env to override):');
            console.log(`   Email   : ${adminEmail}`);
            console.log(`   Password: ${adminPassword}`);
            console.log('---------------------------------------------------------');
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await User.deleteMany();
        await Course.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    seedData();
}
