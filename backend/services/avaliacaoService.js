const Pedido = require('../models/Pedido'); 

class AvaliacaoService {
    
    async salvarAvaliacao(id_pedido, status, carga_horaria_aprovada, comentario, subcategoria = null, tipo = null) {
        const query = `
            UPDATE pedidos
            SET 
                status = $1,
                carga_horaria_aprovada = $2,
                comentario = $3,
                subcategoria = $4,
                tipo = $5
            WHERE id_pedido = $6
            RETURNING *;
        `;
        const values = [status, carga_horaria_aprovada, comentario, subcategoria, tipo, id_pedido];
    
        const result = await Pedido.client.query(query, values);
        return result.rows[0];  
    }
}

module.exports = new AvaliacaoService();
