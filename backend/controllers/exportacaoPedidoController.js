const fs = require('fs');
const path = require('path');
const ExportacaoService = require('../services/exportacaoPedidoService');

class ExportacaoController {
    
    async exportarPedidos(req, res) {
        try {
            const { id_usuario } = req.params;

            console.log(`Gerando arquivo para o usuário: ${id_usuario}`);
            
            
            const caminhoArquivo = await ExportacaoService.gerarArquivoTxtPorUsuario(id_usuario);

            console.log(`Arquivo gerado com sucesso: ${caminhoArquivo}`);
            
            
            res.download(caminhoArquivo, (err) => {
                if (err) {
                    console.error('Erro ao enviar o arquivo para o download:', err);
                    res.status(500).json({ message: 'Erro ao enviar o arquivo para o download.' });
                } else {
                    console.log('Arquivo enviado para o download com sucesso.');
                }
            });
        } catch (error) {
            console.error('Erro ao gerar o arquivo para o usuário:', error);
            res.status(400).json({ message: error.message });
        }
    }

    
    async exportarPedidoPorId(req, res) {
        try {
            const { id_pedido } = req.params;

            console.log(`Gerando arquivo para o pedido: ${id_pedido}`);
            
            
            const caminhoArquivo = await ExportacaoService.gerarArquivoTxtPorPedido(id_pedido);

            console.log(`Arquivo gerado para o pedido ${id_pedido}: ${caminhoArquivo}`);
            
            
            res.download(caminhoArquivo, (err) => {
                if (err) {
                    console.error('Erro ao enviar o arquivo para o download:', err);
                    res.status(500).json({ message: 'Erro ao enviar o arquivo para o download.' });
                } else {
                    console.log('Arquivo enviado para o download com sucesso.');
                }
            });
        } catch (error) {
            console.error('Erro ao gerar o arquivo para o pedido:', error);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ExportacaoController();
