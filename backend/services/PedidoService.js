const Pedido = require('../models/Pedido');

class PedidoService {
    // Chama o método criarPedido do modelo
    async criarPedido(pedido) {
        return await Pedido.criarPedido(pedido);  
    }

    // Chama o método listarPedidosPorUsuario do modelo
    async listarPedidosPorUsuario(id_usuario) {
        return await Pedido.listarPedidosPorUsuario(id_usuario);
    }

    // Chama o método buscarPedidoPorId do modelo
    async buscarPedidoPorId(id_pedido) {
        return await Pedido.buscarPedidoPorId(id_pedido);
    }

    // Chama o método atualizarStatusPedido do modelo
    async atualizarStatusPedido(id_pedido, status) {
        return await Pedido.atualizarStatusPedido(id_pedido, status);  
    }
}

module.exports = new PedidoService();

