const { Client } = require('pg');
require('dotenv').config();

class Cancelamento {
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
            console.log('Conectado ao banco de dados para cancelamento');
        }).catch((error) => {
            console.log('Erro ao conectar ao banco de dados para cancelamento:', error);
        });
    }

    async cancelarPedido(id_pedido) {
        const verificarStatusQuery = 'SELECT * FROM pedidos WHERE id_pedido = $1';
        const statusResult = await this.client.query(verificarStatusQuery, [id_pedido]);
    
        if (statusResult.rows.length === 0) {
            throw new Error('Pedido não encontrado.');
        }
    
        const pedido = statusResult.rows[0];
        if (pedido.status !== 0) { // Verificando se o status é 0 (pendente)
            throw new Error('Somente pedidos com status "pendente" podem ser cancelados.');
        }
    
        const deleteQuery = 'DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *';
        const deleteResult = await this.client.query(deleteQuery, [id_pedido]);
        return deleteResult.rows[0]; 
    }
}

module.exports = new Cancelamento();

