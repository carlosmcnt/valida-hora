const { Client } = require('pg');
require('dotenv').config();

class Exportacao {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            charset: 'UTF8',
        });

        this.client.connect()
            .then(() => {
                console.log('Conectado ao banco de dados para exportação');
            })
            .catch((error) => {
                console.error('Erro ao conectar ao banco de dados:', error);
                this.client = null; 
            });
    }

    async buscarPedidosAprovados(id_usuario) {
        if (!this.client) {
            throw new Error('A conexão com o banco de dados não foi estabelecida corretamente.');
        }

        try {
            const query = `
                SELECT * FROM pedidos 
                WHERE id_usuario = $1 AND status = 1
            `;
            const result = await this.client.query(query, [id_usuario]);
            return result.rows;
        } catch (error) {
            console.error('Erro ao buscar pedidos aprovados:', error);
            throw new Error('Erro ao buscar pedidos aprovados no banco de dados.');
        }
    }

    
    async buscarArquivoPorUsuario(id_usuario) {
        try {
            const query = `
                SELECT nome_arquivo, conteudo FROM exportacoes
                WHERE id_usuario = $1
                ORDER BY data_criacao DESC LIMIT 1
            `;
            const result = await this.client.query(query, [id_usuario]);
            return result.rows;
        } catch (error) {
            console.error('Erro ao buscar arquivo:', error);
            throw new Error('Erro ao buscar arquivo do banco de dados.');
        }
    }
}

module.exports = new Exportacao();
