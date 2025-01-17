const Avaliador = require('../models/Avaliador');

class AvaliadorService {

    async listarTodosAvaliadores() {
        return await Avaliador.listarTodosAvaliadores();
    }

    async obterAvaliadorPorId(id) {
        return await Avaliador.obterAvaliadorPorId(id);
    }

    async criarAvaliador(avaliador) {
        await Avaliador.criarAvaliador(avaliador);
    }

    async deletarAvaliador(id) {
        await Avaliador.deletarAvaliador(id);
    }
}

module.exports = new AvaliadorService();