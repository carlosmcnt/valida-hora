const Barema = require('../models/Barema');

class BaremaService {

    async criarBarema(barema) {
        await Barema.criarBarema(barema);
    }

    async obterCategoriasPorIdCurso(id_curso) {
        return await Barema.obterCategoriasPorIdCurso(id_curso);
    }

    async obterSubcategoriasPorIdCurso(id_curso) {
        return await Barema.obterSubcategoriasPorIdCurso(id_curso);
    }

    async obterTiposPorIdCurso(id_curso) {
        return await Barema.obterTiposPorIdCurso(id_curso);
    }
}

module.exports = { BaremaService };