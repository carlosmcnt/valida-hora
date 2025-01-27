const express = require('express');
const ConsultaController = require('../controllers/consultaController.js');

const router = express.Router();


router.get('/matricula/:matricula_aluno', ConsultaController.obterPedidosPorMatricula);


router.get('/status/:status', ConsultaController.obterPedidosPorStatus);


router.get('/todos', ConsultaController.obterTodosOsPedidos);

module.exports = router;
