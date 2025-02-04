const Cancelamento = require('../models/Cancelamento');

class CancelamentoService {
    async cancelarPedido(id_pedido) {
        return await Cancelamento.cancelarPedido(id_pedido);
    }
}

module.exports = new CancelamentoService();
