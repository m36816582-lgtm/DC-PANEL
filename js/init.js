// init.js - Initialisation des codes d'accréditation
const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb+srv://cdevaux112_db_user:FVKvLowqzhyTy6mV@dc-bot-license.tea0c8i.mongodb.net/?appName=DC-BOT-LICENSE';

async function init() {
    console.log('🔌 Connexion à MongoDB...');
    const client = new MongoClient(MONGO_URL);
    
    try {
        await client.connect();
        console.log('✅ Connecté !');
        
        const db = client.db('licences');
        
        // Créer la collection si elle n'existe pas (optionnel)
        const collections = await db.listCollections({ name: 'accreditations' }).toArray();
        if (collections.length === 0) {
            await db.createCollection('accreditations');
            console.log('📁 Collection "accreditations" créée');
        }
        
        // Supprimer les anciens codes (optionnel)
        await db.collection('accreditations').deleteMany({});
        
        // Insérer les nouveaux codes
        const result = await db.collection('accreditations').insertMany([
            { code: "11111", level: 1, createdBy: "system", createdAt: new Date().toISOString(), used: false, assignedTo: null },
            { code: "22222", level: 2, createdBy: "system", createdAt: new Date().toISOString(), used: false, assignedTo: null },
            { code: "33333", level: 3, createdBy: "system", createdAt: new Date().toISOString(), used: false, assignedTo: null },
            { code: "44444", level: 4, createdBy: "system", createdAt: new Date().toISOString(), used: false, assignedTo: null },
            { code: "55555", level: 5, createdBy: "system", createdAt: new Date().toISOString(), used: false, assignedTo: null }
        ]);
        
        console.log(`✅ ${result.insertedCount} codes d'accréditation créés !`);
        console.log('📋 Codes disponibles :');
        console.log('   11111 → Niveau 1 (Utilisateur)');
        console.log('   22222 → Niveau 2 (Modérateur)');
        console.log('   33333 → Niveau 3 (Admin Blacklist)');
        console.log('   44444 → Niveau 4 (Admin Partenaires)');
        console.log('   55555 → Niveau 5 (Super Admin)');
        
    } catch (error) {
        console.error('❌ Erreur :', error.message);
    } finally {
        await client.close();
        console.log('🔌 Déconnexion');
    }
}

init();
