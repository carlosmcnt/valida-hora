const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.get('/todos', UsuarioController.listarTodosUsuarios);
router.get('/:id', UsuarioController.obterUsuarioPorId);
router.delete('/:id', UsuarioController.deletarUsuarioPorId);
router.post('/criar', UsuarioController.criarUsuario);
router.post('/login', UsuarioController.login);

module.exports = router;