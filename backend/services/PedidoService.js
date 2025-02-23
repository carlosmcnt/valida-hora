const Pedido = require('../models/Pedido');

class PedidoService {
    async criarPedido(pedido) {
        return await Pedido.criarPedido(pedido);
    }

    async listarPedidosPorUsuario(id_usuario) {
        return await Pedido.listarPedidosPorUsuario(id_usuario);
    }

    async buscarPedidoPorId(id_pedido) {
        return await Pedido.buscarPedidoPorId(id_pedido);
    }

    async atualizarStatusPedido(id_pedido, status) {
        return await Pedido.atualizarStatusPedido(id_pedido, status);
    }
}

module.exports = new PedidoService();
