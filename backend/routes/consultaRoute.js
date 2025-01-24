const express = require('express');
const ConsultaController = require('../controllers/consultaController.js');

const router = express.Router();

// Rota para buscar pedidos por matrícula
router.get('/matricula/:matricula_aluno', ConsultaController.obterPedidosPorMatricula);

// Rota para buscar pedidos por status
router.get('/status/:status', ConsultaController.obterPedidosPorStatus);

// Rota para buscar todos os pedidos
router.get('/todos', ConsultaController.obterTodosOsPedidos);

module.exports = router;
