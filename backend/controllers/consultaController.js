const ConsultaService = require('../services/ConsultaService');

class ConsultaController {
    async obterPedidosPorMatricula(req, res) {
        try {
            const matricula_aluno = req.params.matricula_aluno;
            const pedidos = await ConsultaService.listarPedidosPorMatricula(matricula_aluno);
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterPedidosPorStatus(req, res) {
        try {
            const { status } = req.params;

            // Converte status para número
            const statusNumero = Number(status);
            if (isNaN(statusNumero)) {
                return res.status(400).json({ message: 'O status deve ser um número.' });
            }

            const pedidos = await ConsultaService.listarPedidosPorStatus(statusNumero);
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterTodosOsPedidos(req, res) {
        try {
            const pedidos = await ConsultaService.listarTodosOsPedidos();
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ConsultaController();
