const FilaService = require('../services/filaService');

class FilaController {
    
    async listarFila(req, res) {
        try {
            const fila = await FilaService.listarFila();
            return res.status(200).json(fila);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    
    async consultarPosicao(req, res) {
        const { id_pedido } = req.params;

        try {
            const resultado = await FilaService.consultarPosicao(parseInt(id_pedido, 10));
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new FilaController();
