const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Rota para criar pedido com comprovante
router.post('/criar', upload.single('comprovante'), PedidoController.criarPedido);

// Rota para listar pedidos por usuário
router.get('/usuario/:id_usuario', PedidoController.listarPedidosPorUsuario);

// Rota para download do comprovante
router.get('/:id_pedido/comprovante', PedidoController.baixarComprovante);

module.exports = router;


