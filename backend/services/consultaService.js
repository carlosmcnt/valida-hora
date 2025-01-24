const Consulta = require('../models/Consulta');

class ConsultaService {
    async listarPedidosPorMatricula(matricula_aluno) {
        return await Consulta.buscarPedidosPorMatricula(matricula_aluno);
    }

    async listarPedidosPorStatus(status) {
        return await Consulta.buscarPedidosPorStatus(status);
    }

    async listarTodosOsPedidos() {
        return await Consulta.buscarTodosOsPedidos();
    }
}

module.exports = new ConsultaService();


