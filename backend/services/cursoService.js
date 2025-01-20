const Curso = require('../models/Curso');

class CursoService {

    async criarCurso(curso) {
        await Curso.criarCurso(curso);
    }

    async obterNomeTodosCursos() {
        return await Curso.obterNomeTodosCursos();
    }

    async obterCargaHorariaTotalExtensaoPorCursoId(id) {
        return await Curso.obterCargaHorariaTotalExtensaoPorCursoId(id);
    }

    async obterCargaHorariaTotalComplementarPorCursoId(id) {
        return await Curso.obterCargaHorariaTotalComplementarPorCursoId(id);
    }
}

module.exports = { CursoService };