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
            charset: 'UTF8',  // Certifique-se de que o charset esteja configurado corretamente
        });

        this.client.connect().then(() => {
            console.log('Conectado ao banco de dados para pedidos');
        }).catch((error) => {
            console.log('Erro ao conectar ao banco de dados para pedidos:', error);
        });
    }

    async criarPedido(pedido) {
        // Consulta para inserir o pedido no banco de dados, incluindo o caminho do arquivo
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
            pedido.comprovante,  // Caminho do arquivo (se houver)
            'pendente'  // Status padrão
        ];

        // Executa a consulta e retorna o pedido completo, incluindo o arquivo, se fornecido
        const result = await this.client.query(query, values);
        return result.rows[0];  // Retorna o pedido inserido, incluindo o caminho do arquivo
    }

    async listarPedidosPorUsuario(id_usuario) {
        const query = 'SELECT * FROM pedidos WHERE id_usuario = $1';
        const result = await this.client.query(query, [id_usuario]);
        return result.rows;
    }
}

module.exports = new Pedido();
