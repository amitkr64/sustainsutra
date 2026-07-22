const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

let mongod = null;

const startEmbeddedMongo = async () => {
    try {
        const dbPath = path.join(__dirname, '..', 'data', 'db');

        // Ensure data directory exists
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath, { recursive: true });
        }

        console.log('Starting embedded MongoDB...');
        console.log(`Data directory: ${dbPath}`);

        mongod = await MongoMemoryServer.create({
            instance: {
                port: 27017, // Try to use default port
                dbPath: dbPath,
                storageEngine: 'wiredTiger'
            }
        });

        const uri = mongod.getUri();
        console.log(`\nLocal MongoDB started successfully!`);
        console.log(`Connection URI: ${uri}\n`);

        return uri;
    } catch (error) {
        console.error('Failed to start embedded MongoDB:', error);
        // Fallback to random port if 27017 is taken (though we checked it wasn't)
        if (error.message.includes('EADDRINUSE')) {
            console.log('Port 27017 in use, retrying with random port...');
            mongod = await MongoMemoryServer.create({
                instance: {
                    dbPath: path.join(__dirname, '..', 'data', 'db'),
                    storageEngine: 'wiredTiger'
                }
            });
            const uri = mongod.getUri();
            console.log(`\nLocal MongoDB started on random port!`);
            console.log(`Connection URI: ${uri}\n`);
            return uri;
        }
        throw error;
    }
};

const stopEmbeddedMongo = async () => {
    if (mongod) {
        await mongod.stop();
    }
};

module.exports = { startEmbeddedMongo, stopEmbeddedMongo };
