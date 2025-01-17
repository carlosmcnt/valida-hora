const ConsultaService = require('../services/consultaService');

class ConsultaController {
    async obterPedidosPorUsuario(req, res) {
        try {
            const id_usuario = req.params.id_usuario;
            const pedidos = await ConsultaService.listarPedidosPorUsuario(id_usuario);
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterPedidosPorStatus(req, res) {
        try {
            const { status } = req.params;
            const pedidos = await ConsultaService.listarPedidosPorStatus(status);
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ConsultaController();
