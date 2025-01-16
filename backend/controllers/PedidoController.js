const PedidoService = require('../services/PedidoService');
const UsuarioService = require('../services/UsuarioService');  // Importar o serviço de usuário
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Configuração do multer para armazenar arquivos na pasta "uploads/"

class PedidoController {
    async criarPedido(req, res) {
        try {
            console.log("Request Body:", req.body); // Verifique o corpo da requisição
            console.log("Request File:", req.file); // Verifique o arquivo recebido
    
            const pedido = req.body;
            const id_usuario = pedido.id_usuario;
    
            // Buscar informações do usuário (nome, matrícula, curso) com base no id_usuario
            const usuario = await UsuarioService.obterUsuarioPorId(id_usuario);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            // Adicionar os dados do usuário ao pedido
            pedido.nome = usuario.nome;
            pedido.matricula = usuario.matricula;
            pedido.curso = usuario.curso;
    
            // Processar o arquivo de comprovante (caso enviado)
            const comprovante = req.file;  // O arquivo enviado pelo usuário (comprovante)
            console.log('Comprovante recebido:', comprovante);  // Verifique o arquivo para debugar
            pedido.comprovante = comprovante ? comprovante.path : null;  // Se houver arquivo, armazene o caminho
    
            // Criar pedido e capturar o objeto retornado
            const novoPedido = await PedidoService.criarPedido(pedido);
    
            // Retornar o pedido completo na resposta
            res.status(201).json({
                message: 'Pedido criado com sucesso!',
                pedido: novoPedido,  // Retornar o pedido criado, incluindo dados do arquivo
            });
        } catch (error) {
            console.error('Erro ao criar pedido:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
    

    async listarPedidosPorUsuario(req, res) {
        try {
            const id_usuario = req.params.id_usuario;
            const pedidos = await PedidoService.listarPedidosPorUsuario(id_usuario);
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PedidoController();
