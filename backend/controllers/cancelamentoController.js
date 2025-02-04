const CancelamentoService = require('../services/cancelamentoService');

class CancelamentoController {
    async cancelarPedido(req, res) {
        try {
            console.log("Parâmetros recebidos:", req.params); 
            const id_pedido = Number(req.params.id_pedido);

            if (isNaN(id_pedido) || id_pedido <= 0) {
                return res.status(400).json({ message: 'ID do pedido inválido. Certifique-se de passar um número válido na URL.' });
            }

            const pedidoRemovido = await CancelamentoService.cancelarPedido(id_pedido);

            res.status(200).json({
                message: 'Pedido cancelado e removido com sucesso!',
                pedido: pedidoRemovido,
            });
        } catch (error) {
            console.error('Erro ao cancelar pedido:', error.message);

            const statusCode = error.message.includes('Somente pedidos') || error.message.includes('não encontrado') ? 400 : 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
}

module.exports = new CancelamentoController();
