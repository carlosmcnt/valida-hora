const Pedido = require('../models/Pedido'); 

class AvaliacaoService {
    
    async salvarAvaliacao(id_pedido, status, carga_horaria_aprovada, comentario) {
        
        const query = `
            UPDATE pedidos
            SET 
                status_avaliacao = $1,
                carga_horaria_aprovada = $2,
                comentario = $3
            WHERE id = $4
            RETURNING *`;  /

        const values = [status, carga_horaria_aprovada, comentario, id_pedido];

        
        const result = await Pedido.client.query(query, values);
        return result.rows[0];  
    }
}

module.exports = new AvaliacaoService();

