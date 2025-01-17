const { Client } = require('pg');
require('dotenv').config();

class Avaliacao {
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
            console.log('Conectado ao banco de dados para avaliações');
        }).catch((error) => {
            console.log('Erro ao conectar ao banco de dados para avaliações:', error);
        });
    }

    
    async salvarAvaliacao(id_pedido, status, carga_horaria_aprovada, comentario) {
        const query = `INSERT INTO avaliacoes (
            id_pedido, status, carga_horaria_aprovada, comentario
        ) VALUES ($1, $2, $3, $4) RETURNING *`;

        const values = [
            id_pedido,
            status,
            carga_horaria_aprovada,
            comentario || null,  
        ];

        const result = await this.client.query(query, values);
        return result.rows[0];  
    }

    
    async buscarAvaliacaoPorPedido(id_pedido) {
        const query = 'SELECT * FROM avaliacoes WHERE id_pedido = $1';
        const result = await this.client.query(query, [id_pedido]);
        return result.rows[0];  
    }
}

module.exports = new Avaliacao();
