const ConsultaService = require('../services/consultaService');
const Usuario = require('../models/Usuario');

class ConsultaController {
    async obterPedidosPorMatricula(req, res) {
        try {
            const { matricula_aluno } = req.params;  
    
            
            const pedidos = await ConsultaService.listarPedidosPorMatricula(matricula_aluno);
    
            if (!pedidos || pedidos.length === 0) {
                return res.status(404).json({ message: 'Nenhum pedido encontrado para esta matrícula' });
            }
    
            return res.json(pedidos);
    
        } catch (error) {
            console.error('Erro ao consultar pedidos por matrícula:', error);
            res.status(500).json({ message: error.message });
        }
    }
    

    async obterPedidosPorStatus(req, res) {
        try {
            const { status, id } = req.params;
            const statusNumero = Number(status);
    
            if (isNaN(statusNumero)) {
                return res.status(400).json({ message: 'O status deve ser um número.' });
            }
    
            const usuario = await Usuario.obterUsuarioPorId(id);
    
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
           
            if (usuario.tipo === 'estudante') {
                
                const pedidos = await ConsultaService.listarPedidosPorStatus(statusNumero, usuario.id_usuario, usuario.tipo);
                return res.json(pedidos);
            }
    
            if (usuario.tipo === 'avaliador') {
                
                const pedidos = await ConsultaService.listarPedidosPorStatus(statusNumero, null, 'avaliador');
                return res.json(pedidos);
            }
    
            return res.status(403).json({ message: 'Tipo de usuário não autorizado' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterTodosOsPedidos(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.obterUsuarioPorId(id);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const pedidos = await ConsultaService.listarTodosOsPedidos(
                usuario.tipo === 'estudante' ? usuario.id_usuario : null,
                usuario.tipo
            );

            return res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ConsultaController();
