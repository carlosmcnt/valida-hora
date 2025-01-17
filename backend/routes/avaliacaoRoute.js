const express = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');

const router = express.Router();

router.get('/pedido/:id_pedido', AvaliacaoController.buscarAvaliacaoPorPedido);

router.post('/avaliar/:id_pedido', AvaliacaoController.salvarAvaliacao);

module.exports = router;


