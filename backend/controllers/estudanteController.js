const EstudanteService = require('../services/estudanteService');

class EstudanteController {

    async listarTodosEstudantes(req, res) {
        try {
            const estudantes = await EstudanteService.listarTodosEstudantes();
            res.json(estudantes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterEstudantePorId(req, res) {
        try {
            const { id } = req.params;
            const estudante = await EstudanteService.obterEstudantePorId(id);
            res.json(estudante);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async criarEstudante(req, res) {
        try {
            const estudante = req.body;
            await EstudanteService.criarEstudante(estudante);
            res.json({ message: 'Estudante criado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletarEstudante(req, res) {
        try {
            const { id } = req.params;
            await EstudanteService.deletarEstudante(id);
            res.json({ message: 'Estudante deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new EstudanteController();