const express = require('express');
const FilaController = require('../controllers/filaController');

const router = express.Router();

router.get('/fila', FilaController.listarFila); 
router.get('/fila/:id_pedido', FilaController.consultarPosicao); 

module.exports = router;
