const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

// Middleware per il parsing del body JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurazione sessione
app.use(session({
    secret: 'dreamdrive_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Rotte per l'autenticazione
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // Demo login
    if (email === 'demo@example.com' && password === 'password') {
        req.session.user = {
            name: 'Utente Demo',
            email: email
        };
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

app.post('/api/register', (req, res) => {
    const { name, email, password, birthDate } = req.body;
    // Verifica età
    const age = calculateAge(new Date(birthDate));
    if (age < 18) {
        return res.status(400).json({ success: false, message: 'Età minima richiesta: 18 anni' });
    }
    // Demo registration
    res.json({ success: true });
});

// API per le prenotazioni
app.post('/api/bookings', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false });
    }
    // Salva prenotazione
    res.json({ success: true });
});

app.get('/api/bookings', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false });
    }
    // Recupera prenotazioni
    res.json([]);
});

// Funzione helper per calcolare l'età
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
