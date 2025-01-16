const express = require('express');

const EstudanteController = require('../controllers/EstudanteController');

const router = express.Router();

router.get('/todos', EstudanteController.listarTodosEstudantes);
router.post('/criar', EstudanteController.criarEstudante);
router.get('/:id', EstudanteController.obterEstudantePorId);
router.delete('/:id', EstudanteController.deletarEstudante);

module.exports = router;