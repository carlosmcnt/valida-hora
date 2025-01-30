const { Client } = require('pg');
const { categorias, cursoMapping } = require('../utils/mapeamento');
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
            console.error('Erro ao conectar ao banco de dados para pedidos:', error);
        });
    }

    // Função simplificada para obter o nome da categoria, subcategoria e tipo
    getNomeCategoria(categoria, subcategoria, tipo) {
        const categoriaData = categorias[`categoria${categoria}`];

        if (!categoriaData) {
            return { nomeCategoria: 'Categoria não encontrada', nomeSubcategoria: '', nomeTipo: '' };
        }

        const subcategoriaData = categoriaData.subcategorias[subcategoria];
        if (!subcategoriaData) {
            return { nomeCategoria: categoriaData.nome, nomeSubcategoria: 'Subcategoria não encontrada', nomeTipo: '' };
        }

        const nomeCategoria = categoriaData.nome;
        const nomeSubcategoria = subcategoriaData.nome;
        const nomeTipo = subcategoriaData.atividades[tipo] || 'Tipo não encontrado';

        return { nomeCategoria, nomeSubcategoria, nomeTipo };
    }

    async criarPedido(pedido) {
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

        const categoriaNum = Number(pedido.categoria);
        const subcategoriaNum = Number(pedido.subcategoria);
        const tipoNum = Number(pedido.tipo);

        let comprovanteBuffer = null;
        if (pedido.comprovante) {
            if (Buffer.isBuffer(pedido.comprovante)) {
                comprovanteBuffer = pedido.comprovante;
            } else {
                throw new Error('O comprovante deve ser um arquivo binário.');
            }
        }

        const queryPedido = `
            INSERT INTO pedidos (
                id_usuario, nome, matricula_aluno, id_curso, descricao, data_inicio, data_fim, 
                ch_total, ch_pretendida, categoria, subcategoria, tipo, comprovante, status
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
            categoriaNum,
            subcategoriaNum,
            tipoNum,
            comprovanteBuffer,
            0
        ];

        const resultPedido = await this.client.query(queryPedido, values);
        return resultPedido.rows[0];
    }

    async buscarPedidoPorId(id_pedido) {
        const query = `SELECT * FROM pedidos WHERE id_pedido = $1`;

        const result = await this.client.query(query, [id_pedido]);
        if (result.rowCount === 0) {
            throw new Error('Pedido não encontrado');
        }

        const pedido = result.rows[0];
        const nomeCurso = cursoMapping[pedido.id_curso] || 'Curso não encontrado';
        return { ...pedido, nome_curso: nomeCurso };
    }

    async listarPedidos() {
        const query = `SELECT * FROM pedidos`;

        const result = await this.client.query(query);
        return result.rows.map((pedido) => {
            const nomeCurso = cursoMapping[pedido.id_curso] || 'Curso não encontrado';
            return { ...pedido, nome_curso: nomeCurso };
        });
    }

    async listarPedidosPorUsuario(id_usuario) {
        const query = `SELECT * FROM pedidos WHERE id_usuario = $1`;

        const result = await this.client.query(query, [id_usuario]);
        return result.rows.map((pedido) => {
            const nomeCurso = cursoMapping[pedido.id_curso] || 'Curso não encontrado';
            return { ...pedido, nome_curso: nomeCurso };
        });
    }
}

module.exports = new Pedido();


