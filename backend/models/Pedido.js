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
        // Buscar nome, matrícula e curso com base no id_usuario
        const queryUsuario = `
            SELECT u.nome, e.matricula_aluno, e.id_curso
            FROM usuario u
            INNER JOIN estudante e ON u.id_usuario = e.id_usuario
            WHERE u.id_usuario = $1
        `;
        const resultUsuario = await this.client.query(queryUsuario, [pedido.id_usuario]);
    
        if (resultUsuario.rowCount === 0) {
            throw new Error('Usuário não encontrado ou não é um estudante.');
        }
    
        const { nome, matricula_aluno, id_curso } = resultUsuario.rows[0];
    
        // Inserir o pedido com os dados obtidos
        const queryPedido = `
            INSERT INTO pedidos (
                id_usuario, nome, matricula_aluno, curso, descricao, data_inicio, data_fim, ch_total, ch_pretendida, categoria, subcategoria, tipo, comprovante, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *
        `;
    
        const values = [
            pedido.id_usuario,
            nome,
            matricula_aluno,
            id_curso, 
            pedido.descricao,
            pedido.data_inicio,
            pedido.data_fim,
            pedido.ch_total,
            pedido.ch_pretendida,
            pedido.categoria,
            pedido.subcategoria,
            pedido.tipo,
            pedido.comprovante,
            'pendente' // Status padrão
        ];
    
        const resultPedido = await this.client.query(queryPedido, values);
        return resultPedido.rows[0];  
    }
    
}

module.exports = new Pedido();
