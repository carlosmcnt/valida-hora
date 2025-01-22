const express = require('express');
const CursoController = require('../controllers/cursoController'); // Corrigido aqui

const router = express.Router();

router.post('/criar', CursoController.criarCurso);
router.get('/todos/nomes', CursoController.obterNomeTodosCursos);
router.get('/ch-total-ext/:id', CursoController.obterCargaHorariaTotalExtensaoPorCursoId);
router.get('/ch-total-comp/:id', CursoController.obterCargaHorariaTotalComplementarPorCursoId);

module.exports = router;

