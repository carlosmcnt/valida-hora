const express = require('express');
const ConsultaController = require('../controllers/consultaController.js');

const router = express.Router();


router.get('/matricula/:matricula_aluno', ConsultaController.obterPedidosPorMatricula);

router.get('/status/:status/usuario/:id', ConsultaController.obterPedidosPorStatus);

router.get('/todos/usuario/:id', ConsultaController.obterTodosOsPedidos);

module.exports = router;
