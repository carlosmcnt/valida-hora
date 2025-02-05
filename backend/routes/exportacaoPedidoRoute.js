const express = require('express');
const ExportacaoPedidoController = require('../controllers/exportacaoPedidoController');

const router = express.Router();

router.get('/exportar/:id_usuario', ExportacaoPedidoController.exportarPedidos);
router.get('/exportar-pedido/:id_pedido', ExportacaoPedidoController.exportarPedidoPorId);

router.get('/download/:id_usuario', ExportacaoPedidoController.baixarArquivo);
router.get('/download-pedido/:id_pedido', ExportacaoPedidoController.baixarArquivoPorPedido);

module.exports = router;



