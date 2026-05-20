// Simulation de l'API pour les tests sans VPS
// À inclure uniquement pour les tests, supprimer en production

const mockData = {
    stats: { serversCount: 3, blacklistCount: 6, partnersCount: 2, totalReports: 8 },
    userInfo: { discordId: '123456789', discordTag: 'Admin#0001', email: 'admin@test.com', level: 5, createdAt: new Date().toISOString() },
    userServers: [{ name: 'Serveur Test', id: '123456', modules: ['Terminator', 'Jupiter'], active: true }],
    blacklist: [
        { userId: '123456789', userTag: 'Hacker#0001', reason: 'Raid test', validatedBy: 'Admin', blacklistedAt: new Date().toISOString() }
    ],
    partners: [
        { botName: 'RiskBot', apiUrl: 'https://riskbot.com', active: true, contractStatus: 'Actif' }
    ],
    users: [
        { _id: '1', discordId: '123456', discordTag: 'User#0001', email: 'user@test.com', level: 5, active: true, createdAt: new Date().toISOString() }
    ],
    contracts: [
        { partnerName: 'RiskBot', plan: 'PARTNER', startDate: new Date(), endDate: new Date(Date.now() + 30*86400000) }
    ],
    contractsRequests: [],
    accreditations: [
        { code: '12345', level: 5, createdBy: 'Admin', createdAt: new Date().toISOString(), used: false }
    ],
    logs: [
        { timestamp: new Date().toISOString(), type: 'blacklist', action: 'add', user: 'Admin', details: 'Ajout de Hacker#0001' }
    ],
    notifications: []
};

// Intercepter fetch
const originalFetch = window.fetch;
window.fetch = async (url, options) => {
    console.log('[MOCK]', url, options);
    
    if (url.includes('/api/stats')) {
        return { ok: true, json: async () => mockData.stats };
    }
    if (url.includes('/api/user/info')) {
        return { ok: true, json: async () => mockData.userInfo };
    }
    if (url.includes('/api/user/servers')) {
        return { ok: true, json: async () => mockData.userServers };
    }
    if (url.includes('/api/blacklist') && !options?.body) {
        return { ok: true, json: async () => mockData.blacklist };
    }
    if (url.includes('/api/partners') && !options?.body) {
        return { ok: true, json: async () => mockData.partners };
    }
    if (url.includes('/api/admin/users') && !options?.body) {
        return { ok: true, json: async () => mockData.users };
    }
    if (url.includes('/api/contracts') && !options?.body) {
        return { ok: true, json: async () => mockData.contracts };
    }
    if (url.includes('/api/contracts/requests')) {
        return { ok: true, json: async () => mockData.contractsRequests };
    }
    if (url.includes('/api/accreditations') && !options?.body) {
        return { ok: true, json: async () => mockData.accreditations };
    }
    if (url.includes('/api/logs')) {
        return { ok: true, json: async () => mockData.logs };
    }
    if (url.includes('/api/notifications')) {
        return { ok: true, json: async () => mockData.notifications };
    }
    if (url.includes('/api/auth/login')) {
        return { ok: true, json: async () => ({ success: true, token: 'mock-token', level: 5, userId: '1', discordId: '123456' }) };
    }
    
    // Pour les requêtes POST qui modifient les données
    if (options?.method === 'POST') {
        return { ok: true, json: async () => ({ success: true }) };
    }
    
    return originalFetch(url, options);
};

console.log('🔧 Mock API activée - Les données sont simulées. À supprimer en production.');
