const { Client } = require('pg');
require('dotenv').config();

class Pedido {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            charset: 'UTF8',  
        });

        this.client.connect().then(() => {
            console.log('Conectado ao banco de dados para pedidos');
        }).catch((error) => {
            console.log('Erro ao conectar ao banco de dados para pedidos:', error);
        });
    }

    
    async criarPedido(pedido) {
        const query = `INSERT INTO pedidos (
            id_usuario, nome, matricula, curso, descricao, data_inicio, data_fim, ch_total, ch_pretendida, categoria, subcategoria, tipo, comprovante, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;

        const values = [
            pedido.id_usuario,
            pedido.nome,
            pedido.matricula,
            pedido.curso,
            pedido.descricao,
            pedido.data_inicio,
            pedido.data_fim,
            pedido.ch_total,
            pedido.ch_pretendida,
            pedido.categoria,
            pedido.subcategoria,
            pedido.tipo,
            pedido.comprovante,  
            'pendente'  
        ];

        const result = await this.client.query(query, values);
        return result.rows[0];  
    }

    
    async listarPedidosPorUsuario(id_usuario) {
        const query = 'SELECT * FROM pedidos WHERE id_usuario = $1';
        const result = await this.client.query(query, [id_usuario]);
        return result.rows;
    }

    
    async atualizarStatusPedido(id_pedido, status) {
        const query = 'UPDATE pedidos SET status = $1 WHERE id = $2 RETURNING *';
        const values = [status, id_pedido];
        const result = await this.client.query(query, values);
        return result.rows[0];  
    }
}

module.exports = new Pedido();
