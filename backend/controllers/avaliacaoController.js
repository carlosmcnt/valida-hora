const Pedido = require('../models/Pedido');

class AvaliacaoController {
    // Criar ou atualizar a avaliação
    async salvarAvaliacao(req, res) {
        try {
            const { id_pedido } = req.params;
            const { status, carga_horaria_aprovada, comentario, ch_pretendida, categoria, subcategoria = null, tipo = null } = req.body;

            // Verificando se categoria, subcategoria, e tipo são números
            if (isNaN(categoria) || isNaN(subcategoria) || isNaN(tipo)) {
                return res.status(400).json({ message: 'Categoria, subcategoria e tipo devem ser números.' });
            }

            // Buscar os valores atuais do banco de dados, incluindo todos os campos necessários
            const queryValoresAtuais = `
                SELECT id_usuario, nome, matricula_aluno, id_curso, descricao, data_inicio, data_fim, 
                       ch_total, ch_pretendida, categoria, subcategoria, tipo, comprovante, status 
                FROM pedidos 
                WHERE id_pedido = $1;
            `;
            const resultValoresAtuais = await Pedido.client.query(queryValoresAtuais, [id_pedido]);

            if (resultValoresAtuais.rows.length === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const valoresAtuais = resultValoresAtuais.rows[0];

            // Verificar se o pedido já foi avaliado (status diferente de 'pendente')
            if (valoresAtuais.status !== 0) { // Verificando se o status é 0 (pendente)
                return res.status(400).json({ message: 'Este pedido já foi avaliado e não pode ser reavaliado.' });
            }

            // Usar os valores do banco de dados se não forem fornecidos novos valores
            const novaChPretendida = ch_pretendida || valoresAtuais.ch_pretendida;
            const novaSubcategoria = subcategoria || valoresAtuais.subcategoria;
            const novoTipo = tipo || valoresAtuais.tipo;
            const novaCategoria = categoria || valoresAtuais.categoria; // Permite a alteração ou manutenção da categoria
            const statusAtual = status || valoresAtuais.status; // Usar o novo status fornecido

            // Atualizar o pedido com os valores fornecidos ou manter os atuais
            const query = `
                UPDATE pedidos
                SET 
                    status = $1,
                    carga_horaria_aprovada = $2,
                    comentario = $3,
                    ch_pretendida = $4,      -- Atualiza a carga horária pretendida
                    categoria = $5,          -- Atualiza ou mantém a categoria
                    subcategoria = $6,       -- Atualiza a subcategoria (pode ser nulo)
                    tipo = $7                -- Atualiza o tipo (pode ser nulo)
                WHERE id_pedido = $8
                RETURNING *;
            `;
            const values = [
                statusAtual, carga_horaria_aprovada, comentario, novaChPretendida, novaCategoria, novaSubcategoria, novoTipo, id_pedido
            ];

            const result = await Pedido.client.query(query, values);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            res.status(200).json({
                message: 'Avaliação salva com sucesso!',
                pedidoAtualizado: result.rows[0],
            });
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error.message);
            res.status(500).json({ message: error.message });
        }
    }

    // Buscar avaliação de um pedido
    async buscarAvaliacaoPorPedido(req, res) {
        try {
            const { id_pedido } = req.params;

            // Busca os dados do pedido, incluindo todos os campos necessários
            const query = `
                SELECT id_pedido, status, carga_horaria_aprovada, comentario, 
                       ch_pretendida, categoria, subcategoria, tipo, id_usuario, nome, matricula_aluno, id_curso, descricao, data_inicio, data_fim, ch_total, comprovante
                FROM pedidos 
                WHERE id_pedido = $1;
            `;
            const result = await Pedido.client.query(query, [id_pedido]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const pedido = result.rows[0];

            const avaliacao = {
                id_usuario: pedido.id_usuario,
                nome: pedido.nome,
                matricula_aluno: pedido.matricula_aluno,
                id_curso: pedido.id_curso,
                descricao: pedido.descricao,
                data_inicio: pedido.data_inicio,
                data_fim: pedido.data_fim,
                ch_total: pedido.ch_total,
                ch_pretendida: pedido.ch_pretendida,  // Valor vindo do banco
                categoria: pedido.categoria,          // Valor vindo do banco
                subcategoria: pedido.subcategoria,    // Valor vindo do banco
                tipo: pedido.tipo,                    // Valor vindo do banco
                comprovante: pedido.comprovante,
                status: pedido.status === 0 ? 'pendente' : (pedido.status === 1 ? 'aprovado' : 'reprovado') // Garantir o status numérico
            };

            res.json(avaliacao);
        } catch (error) {
            console.error('Erro ao buscar avaliação:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AvaliacaoController();
