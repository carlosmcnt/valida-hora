const Usuario = require('../models/Usuario');

class UsuarioService {

    async listarTodosUsuarios() {
        return await Usuario.listarTodosUsuarios();
    }

    async obterUsuarioPorId(id) {
        return await Usuario.obterUsuarioPorId(id);
    }

    async deletarUsuarioPorId(id) {
        await Usuario.deletarUsuarioPorId(id);
    }

    async criarUsuario(usuario) {
        await Usuario.criarUsuario(usuario);
    }

    async login(email, senha) {
        return await Usuario.login(email, senha);
    }
}

module.exports = new UsuarioService();