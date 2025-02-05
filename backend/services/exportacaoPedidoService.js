const fs = require('fs');
const path = require('path');
const Exportacao = require('../models/ExportacaoPedido');
const { converterNomes} = require('../utils/mapeamento');
const { formatarData} = require('../utils/formatacao');

class ExportacaoService {
   
    async gerarArquivoTxtPorUsuario(id_usuario) {
        const pedidos = await Exportacao.buscarPedidosAprovados(id_usuario);

        if (!pedidos || pedidos.length === 0) {
            throw new Error('Nenhum pedido aprovado encontrado.');
        }

        
        const conteudo = pedidos.map(pedido => {
            return `
            Pedido Aprovado - ID Pedido: ${pedido.id_pedido}
            Nome: ${pedido.nome}
            Matrícula: ${pedido.matricula_aluno}
            Curso: ${pedido.id_curso}
            Descrição: ${pedido.descricao}
            Data de Início: ${formatarData(pedido.data_inicio)}  
            Data de Fim: ${formatarData(pedido.data_fim)}      
            CH Total: ${pedido.ch_total}
            CH Pretendida: ${pedido.ch_pretendida}
            Categoria: ${pedido.categoria}
            Subcategoria: ${pedido.subcategoria}
            Tipo: ${pedido.tipo}
            Status: Aprovado
            --------------------------------
            `;
        }).join('\n');

        const nomeArquivo = `pedido_${id_usuario}_${Date.now()}.txt`;
        const caminhoArquivo = path.join(__dirname, '../exports', nomeArquivo); 

        
        if (!fs.existsSync(path.dirname(caminhoArquivo))) {
            fs.mkdirSync(path.dirname(caminhoArquivo), { recursive: true });
        }

        
        fs.writeFileSync(caminhoArquivo, conteudo, 'utf8');

       
        await Exportacao.salvarExportacao(id_usuario, nomeArquivo, conteudo); 

        return caminhoArquivo;
    }

    
    async gerarArquivoTxtPorPedido(id_pedido) {
        try {
            
            const pedido = await Exportacao.buscarPedidoAprovadoPorId(id_pedido);
            if (!pedido) {
                throw new Error('Pedido não encontrado ou não aprovado.');
            }
    
            
            const conteudo = `
                Pedido Aprovado - ID Pedido: ${pedido.id_pedido}
                ----------------------------------------
                Nome: ${pedido.nome}
                Matrícula: ${pedido.matricula_aluno}
                Curso: ${pedido.id_curso}
                Descrição: ${pedido.descricao}
                Data de Início: ${formatarData(pedido.data_inicio)}  
                Data de Fim: ${formatarData(pedido.data_fim)}      
                CH Total: ${pedido.ch_total}
                CH Pretendida: ${pedido.ch_pretendida}
                Categoria: ${pedido.categoria}
                Subcategoria: ${pedido.subcategoria}
                Tipo: ${pedido.tipo}
                Status: Aprovado
            `;
    
            
            console.log('Conteúdo do arquivo gerado:', conteudo);
    
           
            const exportDir = path.join(__dirname, '..', 'exports');
            
           
            console.log(`Pasta de exportação: ${exportDir}`);
            
            if (!fs.existsSync(exportDir)) {
                fs.mkdirSync(exportDir, { recursive: true });
            }
    
            
            const filePath = path.join(exportDir, `pedido_${id_pedido}.txt`);
            
           
            console.log(`Caminho completo do arquivo: ${filePath}`);
    
           
            await fs.promises.writeFile(filePath, conteudo, 'utf-8');
    
            return filePath; 
    
        } catch (error) {
            console.error('Erro ao gerar o arquivo:', error);
            throw new Error('Erro ao gerar o arquivo para o pedido.');
        }
    }
}

module.exports = new ExportacaoService();
