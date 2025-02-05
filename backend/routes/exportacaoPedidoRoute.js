const express = require('express');
const ExportacaoPedidoController = require('../controllers/exportacaoPedidoController');

const router = express.Router();

router.get('/exportar/:id_usuario', ExportacaoPedidoController.exportarPedidos);
router.get('/exportar-pedido/:id_pedido', ExportacaoPedidoController.exportarPedidoPorId);

module.exports = router;


