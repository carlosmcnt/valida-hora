const Historico = require('../models/Historico');

class HistoricoService {
    async listarHistoricoPorUsuario(id_usuario) {
        console.log('Consultando histórico para o usuário:', id_usuario); 
        const historico = await Historico.listarHistoricoPorUsuario(id_usuario);
        console.log('Resultado da consulta ao banco de dados:', historico); 
        return Historico.formatarResposta(historico);
    }
}

module.exports = new HistoricoService();

