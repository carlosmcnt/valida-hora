const { Client } = require('pg');
require('dotenv').config();
const { converterNomes } = require('../utils/formatacao');

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

    async buscarPedidosPorMatricula(matricula_aluno) {
        const query = 'SELECT * FROM pedidos WHERE matricula_aluno = $1';
        const result = await this.client.query(query, [matricula_aluno]);
        return result.rows.map(converterNomes);
    }

    
    async buscarPedidosPorStatus(status, id_usuario = null, tipo_usuario = null) {
        let query = 'SELECT * FROM pedidos WHERE status = $1';
        let params = [status];
    

        if (tipo_usuario === 'estudante') {
            query += ' AND id_usuario = $2';
            params.push(id_usuario);
        }
    
        const result = await this.client.query(query, params);
        return result.rows.map(converterNomes);
    }
    
    async buscarTodosOsPedidos(id_usuario = null, tipo_usuario = null) {
        let query = 'SELECT * FROM pedidos';
        let params = [];
    
        
        if (tipo_usuario === 'estudante') {
            query += ' WHERE id_usuario = $1';
            params.push(id_usuario);
        }
    
        const result = await this.client.query(query, params);
        return result.rows.map(converterNomes);
    }
    
}

module.exports = new Consulta();
