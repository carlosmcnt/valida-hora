const UsuarioService = require('../services/UsuarioService');

class UsuarioController {

    async listarTodosUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.listarTodosUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterUsuarioPorId(req, res) {
        try {
            const id = req.params.id;
            const usuario = await UsuarioService.obterUsuarioPorId(id);
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletarUsuarioPorId(req, res) {
        try {
            const id = req.params.id;
            const usuario = await UsuarioService.obterUsuarioPorId(id);
            if (!usuario) {
                res.status(204).send();
            }
            else {
                await UsuarioService.deletarUsuarioPorId(id);
                res.status(200).json({ message: 'Usuário deletado com sucesso!' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async criarUsuario(req, res) {
        try {
            const usuario = req.body;
            await UsuarioService.criarUsuario(usuario);
            res.status(201).json({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await UsuarioService.login(email, senha);
            if (!usuario) {
                res.status(401).json({ message: 'Email ou senha inválidos' });
            }
            else {
                res.json(usuario);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new UsuarioController();