const express = require('express');

const AvaliadorController = require('../controllers/AvaliadorController');

const router = express.Router();

router.get('/todos', AvaliadorController.listarTodosAvaliadores);
router.post('/criar', AvaliadorController.criarAvaliador);
router.get('/:id', AvaliadorController.obterAvaliadorPorId);
router.delete('/:id', AvaliadorController.deletarAvaliador);

module.exports = router;