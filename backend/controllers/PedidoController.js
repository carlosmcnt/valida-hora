const PedidoService = require('../services/pedidoService');
const UsuarioService = require('../services/usuarioService');
const fs = require('fs');
const path = require('path');

class PedidoController {
    // Função para criar pedido
    async criarPedido(req, res) {
        try {
            console.log("Request Body:", req.body);
            console.log("Request File:", req.file);

            const pedido = req.body;
            const id_usuario = pedido.id_usuario;

            // Verifica se os valores de categoria, subcategoria e tipo são números
            pedido.categoria = Number(pedido.categoria);
            pedido.subcategoria = Number(pedido.subcategoria);
            pedido.tipo = Number(pedido.tipo);

            if (isNaN(pedido.categoria) || isNaN(pedido.subcategoria) || isNaN(pedido.tipo)) {
                return res.status(400).json({ message: 'Categoria, subcategoria e tipo devem ser números.' });
            }

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

    // Função para listar pedidos por usuário
    async listarPedidosPorUsuario(req, res) {
        const { id_usuario } = req.params;
        try {
            const pedidos = await PedidoService.listarPedidosPorUsuario(id_usuario);
            res.status(200).json({ pedidos });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error.message);
            res.status(500).json({ message: error.message });
        }
    }

    // Função para baixar comprovante
    async baixarComprovante(req, res) {
        const { id_pedido } = req.params;
        try {
            // Lógica para encontrar o comprovante no banco de dados
            const pedido = await PedidoService.buscarPedidoPorId(id_pedido);
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const filePath = path.join(__dirname, '../', pedido.comprovante);
            res.download(filePath);
        } catch (error) {
            console.error('Erro ao baixar comprovante:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PedidoController();
