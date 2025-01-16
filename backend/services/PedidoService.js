const Pedido = require('../models/Pedido');

class PedidoService {
    async criarPedido(pedido) {
        return await Pedido.criarPedido(pedido);  // Retorna o pedido completo
    }

    async listarPedidosPorUsuario(id_usuario) {
        return await Pedido.listarPedidosPorUsuario(id_usuario);
    }
}

module.exports = new PedidoService();
