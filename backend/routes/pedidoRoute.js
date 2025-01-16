const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const multer = require('multer');


// Configuração do multer para fazer upload de arquivos
const upload = multer({ dest: 'uploads/' });  // O arquivo será armazenado na pasta 'uploads/'

// Criando uma instância do roteador express
const router = express.Router();

// Rota para criar pedido, incluindo o envio do arquivo (comprovante)
// Aqui, o campo 'comprovante' será o nome do campo de arquivo no formulário
router.post('/criar', upload.single('comprovante'), PedidoController.criarPedido);

// Rota para listar pedidos por usuário
router.get('/usuario/:id_usuario', PedidoController.listarPedidosPorUsuario);

module.exports = router;

