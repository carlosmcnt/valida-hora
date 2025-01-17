const Pedido = require('../models/Pedido'); 

class AvaliacaoController {
    // Criar ou atualizar a avaliação
    async salvarAvaliacao(req, res) {
        try {
            const { id_pedido } = req.params;  
            const { status, carga_horaria_aprovada, comentario, ch_pretendida, categoria, subcategoria, tipo } = req.body;  // Dados da avaliação
    
            // Atualizar a avaliação no pedido
            const query = `
                UPDATE pedidos
                SET 
                    status = $1,
                    carga_horaria_aprovada = $2,
                    comentario = $3,
                    ch_pretendida = $4,      -- Atualiza a carga horária pretendida
                    categoria = $5,          -- Atualiza a categoria
                    subcategoria = $6,       -- Atualiza a subcategoria
                    tipo = $7                -- Atualiza o tipo
                WHERE id_pedido = $8
                RETURNING *;
            `;
            const values = [status, carga_horaria_aprovada, comentario, ch_pretendida, categoria, subcategoria, tipo, id_pedido];
    
           
            const result = await Pedido.client.query(query, values);
    
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }
    
            res.status(200).json({
                message: 'Avaliação salva com sucesso!',
                pedidoAtualizado: result.rows[0],
            });
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
    

    // Buscar avaliação de um pedido
    async buscarAvaliacaoPorPedido(req, res) {
        try {
            const { id_pedido } = req.params;

            const query = 'SELECT * FROM pedidos WHERE id_pedido = $1';  
            const result = await Pedido.client.query(query, [id_pedido]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const avaliacao = {
                status: result.rows[0].status,  
                carga_horaria_aprovada: result.rows[0].carga_horaria_aprovada,
                comentario: result.rows[0].comentario,
            };

            res.json(avaliacao);
        } catch (error) {
            console.error('Erro ao buscar avaliação:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AvaliacaoController();
