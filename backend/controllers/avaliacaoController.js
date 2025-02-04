const Pedido = require('../models/Pedido');
const { categorias, cursoMapping, statusMapping } = require('../utils/mapeamento'); 

class AvaliacaoController {
    
    async salvarAvaliacao(req, res) {
        try {
            const { id_pedido } = req.params;
            const { status, carga_horaria_aprovada, comentario, ch_pretendida, categoria, subcategoria = null, tipo = null } = req.body;

            const queryValoresAtuais = `
                SELECT id_pedido, ch_pretendida, categoria, subcategoria, tipo, status
                FROM pedidos 
                WHERE id_pedido = $1;
            `;
            const resultValoresAtuais = await Pedido.client.query(queryValoresAtuais, [id_pedido]);

            if (resultValoresAtuais.rows.length === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const valoresAtuais = resultValoresAtuais.rows[0];

            if (valoresAtuais.status !== 0) {
                return res.status(400).json({ message: 'Este pedido já foi avaliado e não pode ser reavaliado.' });
            }

            const novaChPretendida = ch_pretendida || valoresAtuais.ch_pretendida;
            const novaCategoria = categoria || valoresAtuais.categoria;
            const novaSubcategoria = subcategoria || valoresAtuais.subcategoria;
            const novoTipo = tipo || valoresAtuais.tipo;
            const novoStatus = status || valoresAtuais.status;

            const queryAtualizar = `
                UPDATE pedidos
                SET 
                    status = $1,
                    carga_horaria_aprovada = $2,
                    comentario = $3,
                    ch_pretendida = $4,
                    categoria = $5,
                    subcategoria = $6,
                    tipo = $7
                WHERE id_pedido = $8
                RETURNING *;
            `;
            const values = [
                novoStatus, carga_horaria_aprovada, comentario, novaChPretendida,
                novaCategoria, novaSubcategoria, novoTipo, id_pedido
            ];

            const resultAtualizar = await Pedido.client.query(queryAtualizar, values);

            if (resultAtualizar.rows.length === 0) {
                return res.status(404).json({ message: 'Falha ao atualizar o pedido.' });
            }

            res.status(200).json({
                message: 'Avaliação salva com sucesso!',
                pedidoAtualizado: resultAtualizar.rows[0],
            });
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error.message);
            res.status(500).json({ message: error.message });
        }
    }

    async buscarAvaliacaoPorPedido(req, res) {
        try {
            const { id_pedido } = req.params;

            const query = `
                SELECT id_pedido, status, carga_horaria_aprovada, comentario, 
                       ch_pretendida, categoria, subcategoria, tipo, id_usuario, 
                       nome, matricula_aluno, id_curso, descricao, data_inicio, data_fim, 
                       ch_total, comprovante
                FROM pedidos 
                WHERE id_pedido = $1;
            `;
            const result = await Pedido.client.query(query, [id_pedido]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const pedido = result.rows[0];

            console.log("Pedido retornado do banco:", pedido); 

            const categoriaKey = `categoria${pedido.categoria}`;
            const categoria = categorias[categoriaKey];

            if (!categoria) {
                console.error("Erro: Categoria não encontrada para o pedido:", pedido.categoria);
            }

            let subcategoriaNome = null;
            let tipoNome = null;

            if (categoria?.subcategorias) {
                const subcategoria = categoria.subcategorias[pedido.subcategoria];
                if (subcategoria) {
                    subcategoriaNome = subcategoria.nome;
                    tipoNome = subcategoria.atividades[pedido.tipo] || null;
                }
            }

            if (!tipoNome && categoria?.atividades) {
                tipoNome = categoria.atividades[pedido.tipo] || null;
            }

            if (!tipoNome) {
                console.error(`Erro: Tipo não encontrado (${pedido.tipo}) na categoria ${pedido.categoria}`);
            }

            res.json({
                id_usuario: pedido.id_usuario,
                nome: pedido.nome,
                matricula_aluno: pedido.matricula_aluno,
                id_curso: pedido.id_curso,
                descricao: pedido.descricao,
                data_inicio: pedido.data_inicio,
                data_fim: pedido.data_fim,
                ch_total: pedido.ch_total,
                ch_pretendida: pedido.ch_pretendida,
                categoria: categoria ? categoria.nome : 'Categoria Desconhecida',
                subcategoria: subcategoriaNome || 'Subcategoria Desconhecida',
                tipo: tipoNome || 'Tipo Desconhecido',
                comprovante: pedido.comprovante,
                status: statusMapping[pedido.status] || 'pendente',
            });
        } catch (error) {
            console.error('Erro ao buscar avaliação:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AvaliacaoController();
