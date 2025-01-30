const PedidoService = require('../services/pedidoService');
const UsuarioService = require('../services/usuarioService');
const fs = require('fs');
const path = require('path');

class PedidoController {
    async criarPedido(req, res) {
        try {
            console.log("Request Body:", req.body);
            console.log("Request File:", req.file);

            const pedido = req.body;
            const id_usuario = pedido.id_usuario;

            pedido.categoria = Number(pedido.categoria);
            pedido.tipo = Number(pedido.tipo);

            if (isNaN(pedido.categoria) || isNaN(pedido.tipo)) {
                return res.status(400).json({ message: 'Categoria e tipo devem ser números.' });
            }

            if (pedido.subcategoria !== undefined && pedido.subcategoria !== null && isNaN(pedido.subcategoria)) {
                return res.status(400).json({ message: 'Subcategoria, se fornecida, deve ser um número.' });
            }

            const usuario = await UsuarioService.obterUsuarioPorId(id_usuario);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            pedido.nome = usuario.nome;
            pedido.matricula_aluno = usuario.matricula_aluno;
            pedido.curso = usuario.curso;

            const comprovante = req.file;
            console.log('Comprovante recebido:', comprovante);

            if (comprovante) {
                
                pedido.comprovante = fs.readFileSync(comprovante.path);
            }

            const novoPedido = await PedidoService.criarPedido(pedido);

            
            if (comprovante) {
                fs.unlinkSync(comprovante.path);
            }

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
        const { id_usuario } = req.params;
        try {
            const pedidos = await PedidoService.listarPedidosPorUsuario(id_usuario);
            res.status(200).json({ pedidos });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error.message);
            res.status(500).json({ message: error.message });
        }
    }

    
    async baixarComprovante(req, res) {
        const { id_pedido } = req.params; 
        try {
            
            const pedido = await PedidoService.buscarPedidoPorId(id_pedido);

            
            if (!pedido || !pedido.comprovante) {
                return res.status(404).json({ message: 'Pedido ou comprovante não encontrado.' });
            }

            
            res.setHeader('Content-Type', 'application/pdf');

            
            res.send(pedido.comprovante);
        } catch (error) {
            console.error('Erro ao baixar o comprovante:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PedidoController();
