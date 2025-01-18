const { Client } = require('pg');
require('dotenv').config();

class Consulta {
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
            console.log('Conectado ao banco de dados para consultas');
        }).catch((error) => {
            console.error('Erro ao conectar ao banco de dados para consultas:', error);
        });
    }

   
    async buscarPedidosPorUsuario(id_usuario) {
        const query = 'SELECT * FROM pedidos WHERE id_usuario = $1';
        const result = await this.client.query(query, [id_usuario]);
        return result.rows;
    }

    
    async buscarPedidosPorStatus(status) {
        const query = 'SELECT * FROM pedidos WHERE status = $1';
        const result = await this.client.query(query, [status]);
        return result.rows;
    }

   
    async buscarTodosOsPedidos() {
        const query = 'SELECT * FROM pedidos';
        const result = await this.client.query(query);
        return result.rows;
    }
}

module.exports = new Consulta();
