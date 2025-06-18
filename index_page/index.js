document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.querySelector('.user-icon-link');
    const loginButtons = document.querySelector('.login-buttons');
    
    if (isLoggedIn()) {
        // Utente loggato - l'icona utente porta alla pagina profilo
        userIcon.href = '../login-register_page/utente.html';
        // Nascondi i pulsanti login/register
        loginButtons.style.display = 'none';
    } else {
        // Utente non loggato - l'icona utente porta al login
        userIcon.href = '../login-register_page/login.html';
    }
});
