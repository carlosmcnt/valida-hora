const express = require('express');
const ExportacaoPedidoController = require('../controllers/exportacaoPedidoController');

const router = express.Router();

router.get('/exportar/:id_usuario', ExportacaoPedidoController.exportarPedidos);

router.get('/download/:id_usuario', ExportacaoPedidoController.baixarArquivo);

module.exports = router;
