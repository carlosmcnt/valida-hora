const CancelamentoService = require('../services/cancelamentoService');

class CancelamentoController {
    async cancelarPedido(req, res) {
        try {
            const id_pedido = parseInt(req.params.id_pedido, 10);  

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



