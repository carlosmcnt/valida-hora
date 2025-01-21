const BaremaService = require('../services/baremaService');

class BaremaController {

    async criarBarema(req, res) {
        try {
            const barema = req.body;
            await BaremaService.criarBarema(barema);
            res.json({ message: 'Barema criado com sucesso!' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterCategoriasPorIdCurso(req, res) {
        try {
            const id_curso = req.params.id_curso;
            const categorias = await BaremaService.obterCategoriasPorIdCurso(id_curso);
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterSubcategoriasPorIdCurso(req, res) {
        try {
            const id_curso = req.params.id_curso;
            const subcategorias = await BaremaService.obterSubcategoriasPorIdCurso(id_curso);
            res.json(subcategorias);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterTiposPorIdCurso(req, res) {
        try {
            const id_curso = req.params.id_curso;
            const tipos = await BaremaService.obterTiposPorIdCurso(id_curso);
            res.json(tipos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new BaremaController();        