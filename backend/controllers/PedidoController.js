const PedidoService = require('../services/PedidoService');
const UsuarioService = require('../services/UsuarioService');
const fs = require('fs');
const path = require('path');

class PedidoController {
    async criarPedido(req, res) {
        try {
            console.log("Request Body:", req.body);
            console.log("Request File:", req.file);

            const pedido = req.body;
            const id_usuario = pedido.id_usuario;

            // Obtém informações do usuário
            const usuario = await UsuarioService.obterUsuarioPorId(id_usuario);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            pedido.nome = usuario.nome;
            pedido.matricula_aluno = usuario.matricula_aluno;
            pedido.curso = usuario.curso;

            const comprovante = req.file;
            console.log('Comprovante recebido:', comprovante);
            pedido.comprovante = comprovante ? comprovante.path : null;

            const novoPedido = await PedidoService.criarPedido(pedido);

            res.status(201).json({
                message: 'Pedido criado com sucesso!',
                pedido: novoPedido,
            });
        } catch (error) {
            console.error('Erro ao criar pedido:', error.message);
            res.status(500).json({ message: error.message });
        }
    }

    async listarPedidosPorUsuario(req, res) {
        try {
            const id_usuario = req.params.id_usuario;
            const pedidos = await PedidoService.listarPedidosPorUsuario(id_usuario);
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async baixarComprovante(req, res) {
        try {
            const { id_pedido } = req.params;

            
            const pedido = await PedidoService.obterPedidoPorId(id_pedido);
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado.' });
            }

            const comprovantePath = pedido.comprovante;
            if (!comprovantePath || !fs.existsSync(comprovantePath)) {
                return res.status(404).json({ message: 'Comprovante não encontrado.' });
            }

            
            res.download(comprovantePath, path.basename(comprovantePath), (err) => {
                if (err) {
                    console.error('Erro ao enviar o comprovante:', err);
                    res.status(500).json({ message: 'Erro ao enviar o comprovante.' });
                }
            });
        } catch (error) {
            console.error('Erro ao baixar o comprovante:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PedidoController();
