const HistoricoService = require('../services/HistoricoService');

class HistoricoController {
    async listarHistoricoPorUsuario(req, res) {
        try {
            const { id_usuario } = req.params;
            console.log('Id do usuário na requisição:', id_usuario); 

            const historico = await HistoricoService.listarHistoricoPorUsuario(id_usuario);
            console.log('Historico retornado do serviço:', JSON.stringify(historico, null, 2)); 

            if (historico.length === 0) {
                return res.status(404).json({ message: 'Nenhum histórico encontrado para este usuário.' });
            }


            const primeiroPedido = historico[0].pedidos[0]; 
            if (!primeiroPedido) {
                return res.status(404).json({ message: 'Nenhum pedido encontrado para o usuário.' });
            }

            const { nome, matricula_aluno, id_curso } = primeiroPedido; 
            console.log('Dados do usuário:', nome, matricula_aluno, id_curso); 

            res.json({
                id_usuario: id_usuario,
                nome: nome,
                matricula_aluno: matricula_aluno,
                id_curso: id_curso,
                categorias: historico.map(item => ({
                    categoria: item.categoria,
                    pedidos: item.pedidos.map(pedido => ({
                        id_pedido: pedido.id_pedido,
                        descricao: pedido.descricao,
                        data_inicio: pedido.data_inicio,
                        data_fim: pedido.data_fim,
                        ch_total: pedido.ch_total,
                        ch_pretendida: pedido.ch_pretendida,
                        categoria: pedido.categoria,
                        subcategoria: pedido.subcategoria,
                        tipo: pedido.tipo,
                        comprovante: pedido.comprovante,
                        status: pedido.status,
                        carga_horaria_aprovada: pedido.carga_horaria_aprovada,
                        comentario: pedido.comentario
                    })),
                    horas_computadas: item.horas_computadas,
                })),
            });
        } catch (error) {
            console.error('Erro ao listar histórico:', error.message);
            res.status(500).json({ message: 'Erro ao buscar histórico do usuário.' });
        }
    }
}

module.exports = new HistoricoController();

