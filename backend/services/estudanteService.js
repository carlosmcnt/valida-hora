const Estudante = require('../models/Estudante');

class EstudanteService {

    async listarTodosEstudantes() {
        return await Estudante.listarTodosEstudantes();
    }

    async obterEstudantePorId(id) {
        return await Estudante.obterEstudantePorId(id);
    }

    async criarEstudante(estudante) {
        await Estudante.criarEstudante(estudante);
    }

    async deletarEstudante(id) {
        await Estudante.deletarEstudante(id);
    }
}

module.exports = new EstudanteService();