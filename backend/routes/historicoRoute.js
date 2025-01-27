const express = require('express');
const HistoricoController = require('../controllers/historicoController');

const router = express.Router();

router.get('/usuario/:id_usuario', HistoricoController.listarHistoricoPorUsuario);

module.exports = router;
