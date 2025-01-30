const { Client } = require('pg');
const { converterNomes } = require('../utils/formatacao'); 
const mapeamento = require('../utils/mapeamento');
require('dotenv').config();

class Historico {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        this.client.connect()
            .then(() => console.log('Conectado ao banco de dados para histórico'))
            .catch((error) => console.error('Erro ao conectar ao banco de dados para histórico:', error));
    }

    async listarHistoricoPorUsuario(id_usuario) {
        const query = `
            SELECT 
                u.id_usuario,
                u.nome,
                e.matricula_aluno,
                e.id_curso,
                p.id_pedido,
                p.descricao,
                p.data_inicio,
                p.data_fim,
                p.ch_total,
                p.ch_pretendida,
                p.categoria,
                p.subcategoria,
                p.tipo,
                p.comprovante,
                p.status,
                CASE WHEN p.status = 1 THEN p.ch_pretendida ELSE 0 END AS carga_horaria_aprovada
            FROM 
                pedidos p
            JOIN 
                usuario u ON p.id_usuario = u.id_usuario
            JOIN
                estudante e ON e.id_usuario = u.id_usuario
            WHERE 
                p.id_usuario = $1
            ORDER BY 
                p.categoria, p.subcategoria, p.tipo;
        `;
    
        const result = await this.client.query(query, [id_usuario]);
        return result.rows.map(converterNomes);
    }
    

    formatarResposta(historico) {
        const categorias = {};

        historico.forEach(pedido => {
            const { categoria, id_pedido, descricao, data_inicio, data_fim, ch_total, ch_pretendida, subcategoria, tipo, status, carga_horaria_aprovada, nome, matricula_aluno, id_curso } = pedido;
            const nomeCurso = mapeamento.cursoMapping[pedido.id_curso] || 'Curso desconhecido';

            if (!categorias[categoria]) {
                categorias[categoria] = {
                    categoria,
                    pedidos: [],
                    horas_computadas: 0,
                };
            }

            categorias[categoria].pedidos.push({
                id_pedido,
                descricao,
                data_inicio,
                data_fim,
                ch_total,
                ch_pretendida,
                categoria,
                subcategoria,
                tipo,
                comprovante: null,
                status,
                carga_horaria_aprovada,
                comentario: status === 'aprovado' ? 'Pedido Aprovado' : 'Pedido Rejeitado',
                nome,
                matricula_aluno,
                id_curso : nomeCurso,
            });

            categorias[categoria].horas_computadas += carga_horaria_aprovada;
        });

        const categoriasArray = Object.values(categorias);
        categoriasArray.forEach(categoria => {
            categoria.horas_computadas = categoria.categoria === 'Extensão'
                ? `${categoria.horas_computadas} / 330`
                : `${categoria.horas_computadas} / 100`;
        });

        return categoriasArray;
    }
}

module.exports = new Historico();
