const AvaliadorService = require('../services/avaliadorService');

class AvaliadorController {

    async listarTodosAvaliadores(req, res) {
        try {
            const avaliadores = await AvaliadorService.listarTodosAvaliadores();
            res.json(avaliadores);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterAvaliadorPorId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const avaliador = await AvaliadorService.obterAvaliadorPorId(id);
            res.json(avaliador);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async criarAvaliador(req, res) {
        try {
            const avaliador = req.body;
            await AvaliadorService.criarAvaliador(avaliador);
            res.status(201).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletarAvaliador(req, res) {
        try {
            const id = parseInt(req.params.id);
            await AvaliadorService.deletarAvaliador(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AvaliadorController();