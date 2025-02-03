const fs = require('fs');
const path = require('path');
const Exportacao = require('../models/ExportacaoPedido');
const { converterNomes } = require('../utils/formatacao');
const { formatarData } = require('../utils/formatacao'); 
require('dotenv').config();

class ExportacaoService {
    async gerarArquivoTxt(id_usuario) {
        const pedidos = await Exportacao.buscarPedidosAprovados(id_usuario);

        if (pedidos.length === 0) {
            throw new Error('Nenhum pedido aprovado encontrado para esse usuário.');
        }

        let conteudo = `Pedidos Aprovados - Usuário ID: ${id_usuario}\n\n`;

        pedidos.forEach((pedido, index) => {
            const pedidoFormatado = converterNomes(pedido);
            conteudo += `Pedido ${index + 1}:\n`;
            conteudo += `Nome: ${pedidoFormatado.nome}\n`;
            conteudo += `Matrícula: ${pedidoFormatado.matricula_aluno}\n`;
            conteudo += `Curso: ${pedidoFormatado.curso}\n`;
            conteudo += `Descrição: ${pedidoFormatado.descricao}\n`;
            conteudo += `Data de Início: ${formatarData(pedidoFormatado.data_inicio)}\n`;
            conteudo += `Data de Fim: ${formatarData(pedidoFormatado.data_fim)}\n`;
            conteudo += `CH Total: ${pedidoFormatado.ch_total}\n`;
            conteudo += `CH Pretendida: ${pedidoFormatado.ch_pretendida}\n`;
            conteudo += `Categoria: ${pedidoFormatado.categoria}\n`;
            conteudo += `Subcategoria: ${pedidoFormatado.subcategoria}\n`;
            conteudo += `Tipo: ${pedidoFormatado.tipo}\n`;
            conteudo += `Status: Aprovado\n`;
            conteudo += `--------------------------------\n\n`;
        });

        
        const nomeArquivo = `pedidos_${id_usuario}.txt`;
        const caminhoArquivo = path.join(__dirname, `../exports/${nomeArquivo}`);

        if (!fs.existsSync(path.dirname(caminhoArquivo))) {
            fs.mkdirSync(path.dirname(caminhoArquivo), { recursive: true });
        }

        fs.writeFileSync(caminhoArquivo, conteudo, 'utf8');

        
        await this.salvarArquivoNoBanco(id_usuario, nomeArquivo, conteudo);

        return caminhoArquivo;
    }

    async salvarArquivoNoBanco(id_usuario, nomeArquivo, conteudo) {
        const query = `
            INSERT INTO exportacoes (id_usuario, nome_arquivo, conteudo, data_criacao)
            VALUES ($1, $2, $3, NOW())
        `;

        await this.client.query(query, [id_usuario, nomeArquivo, conteudo]);
    }
}

module.exports = new ExportacaoService();
