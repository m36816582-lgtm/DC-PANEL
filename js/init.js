// init.js - À exécuter avec node
const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb+srv://cdevaux112_db_user:FVKvLowqzhyTy6mV@dc-bot-license.tea0c8i.mongodb.net/?appName=DC-BOT-LICENSE';

async function init() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    const db = client.db('licences');
    
    // Créer un code Super Admin
    await db.collection('accreditations').insertOne({
        code: "12345",
        level: 5,
        createdBy: "system",
        createdAt: new Date().toISOString(),
        used: false,
        assignedTo: null
    });
    
    console.log('✅ Code 12345 créé (Niveau 5 Super Admin)');
    process.exit();
}

init();
