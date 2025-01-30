const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.post('/criar', upload.single('comprovante'), PedidoController.criarPedido);


router.get('/usuario/:id_usuario', PedidoController.listarPedidosPorUsuario);


router.get('/:id_pedido/comprovante', PedidoController.baixarComprovante);

module.exports = router;


