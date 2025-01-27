const Fila = require('../models/Fila');  

class FilaService {
    
    async consultarPosicao(id_pedido) {
        try {
           
            const pedidosPendentes = await Fila.buscarFila();

           
            if (pedidosPendentes.length === 0) {
                throw new Error('Não há pedidos pendentes na fila.');
            }

            
            const posicao = pedidosPendentes.findIndex(pedido => pedido.id_pedido === id_pedido);

           
            if (posicao === -1) {
                throw new Error('Pedido não encontrado na fila.');
            }

            
            const filaInfo = {
                id_pedido: id_pedido,
                posicao: posicao + 1,  
                pedidosAFrente: posicao  
            };

            console.log('Posição do pedido na fila:', filaInfo);

            return filaInfo;
        } catch (error) {
            console.error('Erro ao consultar posição na fila:', error); 
            throw new Error('Erro ao consultar posição na fila.');
        }
    }
}

module.exports = new FilaService();
