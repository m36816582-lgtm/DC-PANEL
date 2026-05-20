// Fonctions communes du panel

function logout() {
    localStorage.clear();
    window.location.href = '../login.html';
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../login.html';
        return null;
    }
    return token;
}

function getUserLevel() {
    return parseInt(localStorage.getItem('level')) || 0;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleString('fr-FR');
}
