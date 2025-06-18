const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware per il parsing del body JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aggiungi headers di sicurezza
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Configurazione sessione migliorata con più sicurezza
app.use(session({
    secret: process.env.SESSION_SECRET || 'dreamdrive_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 ore
    }
}));

// Middleware per logging delle richieste
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Configura i percorsi statici
app.use(express.static(path.join(__dirname)));
app.use('/homepage', express.static(path.join(__dirname, 'homepage')));
app.use('/index_page', express.static(path.join(__dirname, 'index_page')));

// Route principale
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'homepage', 'homepage.html'));
    } catch (error) {
        console.error('Error serving homepage:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Aggiungi route per index_page
app.get('/index_page', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index_page', 'index.html'));
    } catch (error) {
        console.error('Error serving index page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route specifiche
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'register.html'));
});

app.get('/servizi', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'servizi.html'));
});

// Catch-all route per debugging
app.use((req, res) => {
    console.log('404 Not Found:', req.url);
    res.status(404).send('Page Not Found');
});

// Gestione errori generici
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Qualcosa è andato storto!');
});

// Avvio del server con gestione errori
app.listen(port, (err) => {
    if (err) {
        console.error('Errore durante l\'avvio del server:', err);
        process.exit(1);
    }
    console.log(`Server running at http://localhost:${port}`);
});

process.on('uncaughtException', (err) => {
    console.error('Errore non gestito:', err);
    process.exit(1);
});