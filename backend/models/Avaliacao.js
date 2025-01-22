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

    // Recuperar os valores atuais do pedido (ch_pretendida, subcategoria, tipo)
    async buscarValoresAtuais(id_pedido) {
        const query = 'SELECT ch_pretendida, subcategoria, tipo FROM pedidos WHERE id_pedido = $1';
        const result = await this.client.query(query, [id_pedido]);
        if (result.rows.length === 0) {
            throw new Error('Pedido não encontrado');
        }
        return result.rows[0];
    }

    // Atualizar os valores conforme necessário (com o uso de COALESCE)
    async atualizarValores(id_pedido, ch_pretendida, subcategoria, tipo) {
        const query = `
            UPDATE pedidos
            SET 
                ch_pretendida = COALESCE($1, ch_pretendida),
                subcategoria = COALESCE($2, subcategoria),
                tipo = COALESCE($3, tipo)
            WHERE id_pedido = $4
            RETURNING *;
        `;
        const values = [ch_pretendida, subcategoria, tipo, id_pedido];
        const result = await this.client.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Falha ao atualizar pedido');
        }
        return result.rows[0];  // Retorna o pedido atualizado
    }
}

module.exports = new Avaliacao();
