const express = require('express');
const AvaliacaoController = require('../controllers/avaliacaoController');

const router = express.Router();

router.get('/pedido/:id_pedido', AvaliacaoController.buscarAvaliacaoPorPedido);

router.post('/avaliar/:id_pedido', AvaliacaoController.salvarAvaliacao);

module.exports = router;


