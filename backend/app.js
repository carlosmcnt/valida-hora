const express = require('express');

const usuarioRoutes = require('./routes/UsuarioRoute');
const pedidoRoutes = require('./routes/PedidoRoute'); // Importando as rotas de pedidos
const estudanteRoutes = require('./routes/estudanteRoute');
const avaliadorRoutes = require('./routes/avaliadorRoute');

const app = express();

// Middleware para analisar o corpo JSON
app.use(express.json());

// Middleware para garantir que as respostas sejam enviadas com codificação UTF-8
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// Rotas de usuários
app.use('/usuarios', usuarioRoutes);
// Rotas de estudantes
app.use('/estudantes', estudanteRoutes);
// Rotas de avaliadores
app.use('/avaliadores', avaliadorRoutes);

// Rotas de pedidos
app.use('/pedidos', pedidoRoutes); // Rotas para pedidos

// Middleware para rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

module.exports = app;
