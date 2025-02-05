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
            return result.rows[0]; 
        } catch (error) {
            console.error('Erro ao buscar arquivo:', error);
            throw new Error('Erro ao buscar arquivo do banco de dados.');
        }
    }

    async buscarPedidoAprovadoPorId(id_pedido) {
        try {
            const query = `
                SELECT id_pedido, id_usuario, nome, matricula_aluno, id_curso, descricao, 
                       data_inicio, data_fim, ch_total, ch_pretendida, categoria, subcategoria, tipo
                FROM pedidos
                WHERE id_pedido = $1 AND status = 1
            `;

            const result = await this.client.query(query, [id_pedido]);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0]; 
        } catch (error) {
            console.error('Erro ao buscar pedido aprovado por ID:', error);
            throw new Error('Erro ao buscar pedido aprovado no banco de dados.');
        }
    }

    
    async salvarExportacao(id_usuario, nome_arquivo, conteudo) {
        const query = `
            INSERT INTO exportacoes (id_usuario, nome_arquivo, conteudo, data_criacao)
            VALUES ($1, $2, $3, NOW())
        `;
        await this.client.query(query, [id_usuario, nome_arquivo, conteudo]);
    }
}

module.exports = new Exportacao();
