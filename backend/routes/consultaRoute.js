const express = require('express');
const ConsultaController = require('../controllers/consultaController.js');

const router = express.Router();

router.get('/usuario/:id_usuario', ConsultaController.obterPedidosPorUsuario);
router.get('/status/:status', ConsultaController.obterPedidosPorStatus);

module.exports = router;
