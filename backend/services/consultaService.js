const Consulta = require('../models/Consulta');

class ConsultaService {
    async listarPedidosPorUsuario(id_usuario) {
        return await Consulta.buscarPedidosPorUsuario(id_usuario);
    }

    async listarPedidosPorStatus(status) {
        return await Consulta.buscarPedidosPorStatus(status);
    }

    async listarTodosOsPedidos() {
        return await Consulta.buscarTodosOsPedidos();
    }
}

module.exports = new ConsultaService();
