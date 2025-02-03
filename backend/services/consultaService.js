const Consulta = require('../models/Consulta');
const { converterNomes } = require('../utils/formatacao');

class ConsultaService {
    async listarPedidosPorMatricula(matricula_aluno) {
        return await Consulta.buscarPedidosPorMatricula(matricula_aluno); 
    }


    async listarPedidosPorStatus(status, id_usuario = null, tipo_usuario = null) {
       
        let query = 'SELECT * FROM pedidos WHERE status = $1';
        let params = [status];

        if (tipo_usuario === 'estudante') {
            query += ' AND id_usuario = $2';
            params.push(id_usuario);
        }

        const result = await Consulta.client.query(query, params); 
        return result.rows.map(converterNomes);
    }

    async listarTodosOsPedidos(id_usuario, tipo_usuario) {
       
        let query = 'SELECT * FROM pedidos';
        let params = [];

        if (tipo_usuario === 'estudante') {
            query += ' WHERE id_usuario = $1';
            params.push(id_usuario);
        }

        const result = await Consulta.client.query(query, params); 
        return result.rows.map(converterNomes);
    }
}

module.exports = new ConsultaService();




