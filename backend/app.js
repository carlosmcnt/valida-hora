const express = require('express');
const cors = require('cors');  

const usuarioRoutes = require('./routes/UsuarioRoute');
const pedidoRoutes = require('./routes/PedidoRoute');
const cursoRoutes = require('./routes/CursoRoute');
const baremaRoutes = require('./routes/baremaRoute');
const estudanteRoutes = require('./routes/estudanteRoute');
const avaliadorRoutes = require('./routes/avaliadorRoute');
const avaliacaoRoutes = require('./routes/avaliacaoRoute'); 
const consultaRoutes = require('./routes/consultaRoute'); 
const cancelamentoRoutes = require('./routes/cancelamentoRoute'); 
const historicoRoutes = require('./routes/historicoRoute');
const filaRoutes = require('./routes/filaRoute');

const app = express();

// Usando o middleware CORS para permitir todas as origens 
app.use(cors()); 

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
// Rotas de baremas
app.use('/baremas', baremaRoutes);
// Rotas de cursos
app.use('/cursos', cursoRoutes);
// Rotas de avaliadores
app.use('/avaliadores', avaliadorRoutes);
// Rotas de pedidos
app.use('/pedidos', pedidoRoutes);
// Rotas de avaliações
app.use('/pedidos', avaliacaoRoutes);
// Rotas de consultas
app.use('/consultas', consultaRoutes); 
// Rota para cancelamento
app.use('/cancelamento', cancelamentoRoutes);
// Rota para histórico
app.use('/historico', historicoRoutes);
// Rota para fila
app.use('/fila', filaRoutes);

// Middleware para rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

module.exports = app;
