const Pedido = require('../models/Pedido'); 

class AvaliacaoService {
    // Método para salvar avaliação, atualizando os campos conforme necessário
    async salvarAvaliacao(id_pedido, status, carga_horaria_aprovada, comentario, subcategoria = null, tipo = null) {
        // Garantir que status seja um número válido
        if (![0, 1, 2].includes(status)) {
            throw new Error('Status inválido. Use 0 para pendente, 1 para aprovado ou 2 para reprovado.');
        }

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
