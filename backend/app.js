const express = require('express');
const usuarioRoutes = require('./routes/UsuarioRoute');

const app = express();

app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

module.exports = app;
