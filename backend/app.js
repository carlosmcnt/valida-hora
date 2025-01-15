const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoute');
const estudanteRoutes = require('./routes/estudanteRoute');

const app = express();

app.use(express.json());


app.use('/usuario', usuarioRoutes);
app.use('/estudante', estudanteRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

module.exports = app;
