// Configuration API
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:27247' 
    : 'http://5.180.34.39:27247';

async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/api${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        }
    });
    
    if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login.html';
        return null;
    }
    
    return response.json();
}
