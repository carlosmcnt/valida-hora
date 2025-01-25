const { Client } = require('pg');
require('dotenv').config();
const mapeamento = require('../utils/mapeamento');  

class Consulta {
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
            console.log('Conectado ao banco de dados para consultas');
        }).catch((error) => {
            console.error('Erro ao conectar ao banco de dados para consultas:', error);
        });
    }

    async buscarPedidosPorMatricula(matricula_aluno) {
        const query = 'SELECT * FROM pedidos WHERE matricula_aluno = $1';
        const result = await this.client.query(query, [matricula_aluno]);
        return result.rows.map(pedido => this.converterNomes(pedido)); 
    }

    async buscarPedidosPorStatus(status) {
        const query = 'SELECT * FROM pedidos WHERE status = $1';
        const result = await this.client.query(query, [status]);
        return result.rows.map(pedido => this.converterNomes(pedido)); 
    }

    async buscarTodosOsPedidos() {
        const query = 'SELECT * FROM pedidos';
        const result = await this.client.query(query);
        return result.rows.map(pedido => this.converterNomes(pedido)); 
    }

    converterNomes(pedido) {
        let categoriaNome = '';
        let tipoNome = '';
        let subcategoriaNome = '';
    
        if (pedido.categoria == 1) {
            
            const categoria = mapeamento.categorias.categoria1.nome;
            const subcategoria = mapeamento.categorias.categoria1.subcategorias[pedido.subcategoria];
            categoriaNome = categoria;
            subcategoriaNome = subcategoria ? subcategoria.nome : 'Subcategoria desconhecida';
            tipoNome = subcategoria?.atividades[pedido.tipo] || 'Tipo desconhecido';
        } else if (pedido.categoria == 2) {
            
            categoriaNome = mapeamento.categorias.categoria2.nome;
            tipoNome = mapeamento.categorias.categoria2.atividades[pedido.tipo] || 'Tipo desconhecido';
            subcategoriaNome = tipoNome;
        } else if (pedido.categoria >= 10 && pedido.categoria <= 17) {
            
            const categoria = mapeamento.categorias.categoria1.subcategorias[pedido.categoria];
            categoriaNome = categoria ? categoria.nome : 'Categoria desconhecida';
            const tipo = categoria?.atividades[pedido.tipo];
            tipoNome = tipo || 'Tipo desconhecido';
            subcategoriaNome = tipoNome;
        } else if (pedido.categoria >= 200 && pedido.categoria <= 212) {
            
            categoriaNome = mapeamento.categorias.categoria2.nome || 'Categoria desconhecida';
            tipoNome = mapeamento.categorias.categoria2.atividades[pedido.tipo] || 'Tipo desconhecido';
            subcategoriaNome = tipoNome;
        } else {
            categoriaNome = 'Categoria desconhecida';
            tipoNome = 'Tipo desconhecido';
            subcategoriaNome = 'Subcategoria desconhecida';
        }
    
        
        const nomeCurso = mapeamento.cursoMapping[pedido.id_curso] || 'Curso desconhecido';
    
        
        const statusNome = mapeamento.statusMapping[pedido.status] || 'Status desconhecido';
    
        return {
            ...pedido,
            categoria: categoriaNome,
            subcategoria: subcategoriaNome,
            tipo: tipoNome,
            curso: nomeCurso,
            status: statusNome
        };
    }
    
    
}
    


module.exports = new Consulta();
