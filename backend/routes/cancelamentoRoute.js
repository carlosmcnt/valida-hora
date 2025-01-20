const express = require('express');
const CancelamentoController = require('../controllers/cancelamentoController');

const router = express.Router();

// Rota para cancelar (remover) pedido
router.delete('/:id_pedido', CancelamentoController.cancelarPedido);

module.exports = router;
