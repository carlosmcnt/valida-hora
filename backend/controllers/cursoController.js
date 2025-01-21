const CursoService = require('../services/cursoService');

class CursoController {

    async criarCurso(req, res) {
        try {
            const curso = req.body;
            await CursoService.criarCurso(curso);
            res.json({ message: 'Curso criado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterNomeTodosCursos(req, res) {
        try {
            const cursos = await CursoService.obterNomeTodosCursos();
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterCargaHorariaTotalExtensaoPorCursoId(req, res) {
        try {
            const id = req.params.id;
            const cargaHoraria = await CursoService.obterCargaHorariaTotalExtensaoPorCursoId(id);
            res.json(cargaHoraria);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterCargaHorariaTotalComplementarPorCursoId(req, res) {
        try {
            const id = req.params.id;
            const cargaHoraria = await CursoService.obterCargaHorariaTotalComplementarPorCursoId(id);
            res.json(cargaHoraria);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new CursoController();