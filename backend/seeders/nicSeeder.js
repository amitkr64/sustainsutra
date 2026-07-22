/**
 * NIC Code Seeder
 *
 * Loads the National Industrial Classification (NIC) 2008 hierarchy from
 * backend/data/nic_database.json into the NICCode collection as flattened
 * documents (one row per subclass). Idempotent: clears the collection first.
 *
 * Run: node seeders/nicSeeder.js
 */
const path = require('path');
const fs = require('fs');
const NICCode = require('../models/nicCodeModel');
const connectDB = require('../config/db');

const SOURCE = path.join(__dirname, '..', 'data', 'nic_database.json');

const flatten = (data) => {
    const rows = [];
    for (const section of data.sections || []) {
        for (const division of section.divisions || []) {
            for (const group of division.groups || []) {
                for (const cls of group.classes || []) {
                    for (const sub of cls.subclasses || []) {
                        rows.push({
                            code: sub.id,
                            description: sub.description,
                            section: section.id,
                            sectionDescription: section.description,
                            division: division.id,
                            divisionDescription: division.description,
                            group: group.id,
                            groupDescription: group.description,
                            class: cls.id,
                            classDescription: cls.description,
                            subClass: sub.id,
                            subClassDescription: sub.description
                        });
                    }
                }
            }
        }
    }
    return rows;
};

const seedNIC = async () => {
    if (!fs.existsSync(SOURCE)) {
        console.error(`NIC data file not found at ${SOURCE}`);
        process.exit(1);
    }

    const raw = fs.readFileSync(SOURCE, 'utf8');
    const data = JSON.parse(raw);
    const rows = flatten(data);

    await connectDB();

    console.log(`Seeding ${rows.length} NIC codes...`);
    await NICCode.deleteMany({});
    // Insert in batches to avoid memory spikes on the large set.
    const BATCH = 1000;
    for (let i = 0; i < rows.length; i += BATCH) {
        await NICCode.insertMany(rows.slice(i, i + BATCH), { ordered: false });
    }

    console.log(`✓ Seeded ${rows.length} NIC codes successfully.`);
    process.exit(0);
};

seedNIC().catch((err) => {
    console.error('NIC seed failed:', err);
    process.exit(1);
});
